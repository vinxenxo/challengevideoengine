# DEPLOY-SIN-DOCKER.md — Challenge Engine en un VPS sin Docker

Guía paso a paso para poner la web online en un VPS Linux usando **Node.js + PM2 + Nginx + Let's Encrypt (Certbot)**, sin Docker.

```text
Internet ──► :80/:443 Nginx (HTTPS) ──► 127.0.0.1:3000 (Node, gestionado por PM2)
```

> Sustituye `challengeengine.example.com`, `TU_IP` y `TU_USUARIO/TU_REPO` por tus valores reales.

---

## 0. Requisitos

- VPS con **Ubuntu 22.04/24.04** o Debian 12, mínimo 1 vCPU y 1 GB RAM (2 GB recomendados para compilar).
- Acceso SSH como `root` o usuario con `sudo`.
- Un dominio y el proyecto en GitHub (Lovable → GitHub → Connect).

---

## 1. DNS

Crea un registro **A** `challengeengine` → `TU_IP` (y opcionalmente AAAA). Comprueba:

```bash
dig +short challengeengine.example.com
```

---

## 2. Preparar el servidor

```bash
ssh root@TU_IP
apt update && apt upgrade -y
adduser deploy
usermod -aG sudo deploy
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy
exit
ssh deploy@TU_IP
```

Swap (si tienes ≤ 2 GB RAM):

```bash
sudo fallocate -l 2G /swapfile && sudo chmod 600 /swapfile
sudo mkswap /swapfile && sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 3. Cortafuegos

```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full' 2>/dev/null || { sudo ufw allow 80/tcp; sudo ufw allow 443/tcp; }
sudo ufw enable
```

No abras el puerto 3000.

---

## 4. Instalar Node.js 22, Bun, PM2, Git y Nginx

```bash
sudo apt install -y curl git unzip nginx
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs
curl -fsSL https://bun.sh/install | bash
source ~/.bashrc
sudo npm install -g pm2

node -v && bun -v && pm2 -v && nginx -v
```

---

## 5. Descargar el proyecto

```bash
sudo mkdir -p /var/www/challenge-engine
sudo chown deploy:deploy /var/www/challenge-engine
cd /var/www/challenge-engine
git clone https://github.com/TU_USUARIO/TU_REPO.git app
cd app
```

Repositorio privado: crea una clave con `ssh-keygen -t ed25519`, añádela como *Deploy key* en GitHub y clona con `git@github.com:...`.

---

## 6. Compilar como servidor Node

El proyecto se compila por defecto para entorno *edge*; en un VPS hay que compilarlo como **servidor Node** con `NITRO_PRESET=node-server`:

```bash
cd /var/www/challenge-engine/app
bun install --frozen-lockfile
NITRO_PRESET=node-server NODE_ENV=production bun run build
ls .output/server/index.mjs
```

Prueba rápida:

```bash
PORT=3000 HOST=127.0.0.1 node .output/server/index.mjs &
sleep 3 && curl -I http://127.0.0.1:3000/
kill %1
```

Debe devolver `HTTP/1.1 200 OK`.

---

## 7. Mantenerla siempre encendida con PM2

Crea `/var/www/challenge-engine/app/ecosystem.config.cjs`:

```js
module.exports = {
  apps: [
    {
      name: "challenge-engine",
      script: ".output/server/index.mjs",
      cwd: "/var/www/challenge-engine/app",
      env: { NODE_ENV: "production", HOST: "127.0.0.1", PORT: 3000 },
      instances: 1,
      autorestart: true,
      max_memory_restart: "400M",
    },
  ],
};
```

```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup systemd -u deploy --hp /home/deploy
# Ejecuta el comando "sudo env PATH=..." que te imprima PM2
pm2 status
```

---

## 8. Nginx como proxy inverso

Crea `/etc/nginx/sites-available/challenge-engine`:

```nginx
server {
    listen 80;
    listen [::]:80;
    server_name challengeengine.example.com;

    gzip on;
    gzip_types text/css application/javascript application/json image/svg+xml;

    location / {
        proxy_pass http://127.0.0.1:3000;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }

    add_header X-Content-Type-Options "nosniff" always;
    add_header X-Frame-Options "SAMEORIGIN" always;
    add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

```bash
sudo ln -s /etc/nginx/sites-available/challenge-engine /etc/nginx/sites-enabled/
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t && sudo systemctl reload nginx
```

---

## 9. HTTPS con Let's Encrypt

```bash
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d challengeengine.example.com --redirect -m tu@email.com --agree-tos -n
sudo certbot renew --dry-run
```

Certbot añade el HTTPS y la redirección HTTP → HTTPS, y renueva el certificado solo.

Abre `https://challengeengine.example.com`: la web ya está online.

---

## 10. Comprobaciones

```bash
curl -I https://challengeengine.example.com
curl -I http://challengeengine.example.com   # debe redirigir a https
pm2 status
```

- [ ] Candado HTTPS.
- [ ] El menú lleva a cada sección.
- [ ] Lab Mode y seed funcionan.
- [ ] Menú móvil correcto.

---

## 11. Actualizar tras cambios en Lovable

Crea `/var/www/challenge-engine/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /var/www/challenge-engine/app
git pull --ff-only
bun install --frozen-lockfile
NITRO_PRESET=node-server NODE_ENV=production bun run build
pm2 reload challenge-engine
echo "Despliegue completado: $(date)"
```

```bash
chmod +x /var/www/challenge-engine/deploy.sh
/var/www/challenge-engine/deploy.sh
```

---

## 12. Mantenimiento

- Logs: `pm2 logs challenge-engine`, `sudo tail -f /var/log/nginx/error.log`.
- Rotar logs de PM2: `pm2 install pm2-logrotate`.
- Actualizaciones de seguridad: `sudo apt install -y unattended-upgrades && sudo dpkg-reconfigure -plow unattended-upgrades`.
- SSH: en `/etc/ssh/sshd_config` pon `PermitRootLogin no` y `PasswordAuthentication no`, luego `sudo systemctl restart ssh` e instala `fail2ban`.

---

## 13. Problemas frecuentes

| Síntoma | Causa | Solución |
|---|---|---|
| `502 Bad Gateway` | La app no está corriendo | `pm2 status`, `pm2 logs`, `pm2 restart challenge-engine` |
| No existe `.output/server/index.mjs` | Se compiló sin `NITRO_PRESET=node-server` | Repetir el paso 6 |
| Compilación `Killed` | Poca RAM | Añadir swap (paso 2) |
| Certbot falla | DNS no apunta o puerto 80 cerrado | `dig +short dominio`, `sudo ufw status`, cortafuegos del proveedor |
| No arranca tras reiniciar | Falta `pm2 startup`/`pm2 save` | Repetir paso 7 |
