# DEPLOY.md — Challenge Engine en un VPS con Docker

Esta guía explica cómo poner la web online en un VPS Linux, desde cero y paso a paso, usando Docker, Docker Compose y Caddy (que gestiona HTTPS automático con Let's Encrypt).

```text
Internet ──► :80/:443 Caddy (HTTPS) ──► web:3000 (servidor Node de Challenge Engine)
```

---

## 0. Requisitos

- Un VPS con **Ubuntu 22.04/24.04** (o Debian 12), con al menos 1 vCPU, 1 GB de RAM (2 GB recomendados para compilar) y 10 GB de disco.
- Acceso SSH como `root` o como un usuario con `sudo`.
- Un dominio (por ejemplo `challengeengine.example.com`).
- El código del proyecto en un repositorio Git (GitHub/GitLab). En Lovable: **GitHub → Connect** para sincronizarlo.

> En toda la guía, sustituye `challengeengine.example.com`, `TU_IP` y `TU_USUARIO/TU_REPO` por tus valores reales.

---

## 1. Apuntar el dominio al VPS

En el panel DNS de tu proveedor de dominio, crea:

| Tipo | Nombre                 | Valor    | TTL  |
|------|------------------------|----------|------|
| A    | `challengeengine`      | `TU_IP`  | 300  |
| AAAA | `challengeengine` (opcional, si tienes IPv6) | `TU_IPv6` | 300 |

Comprueba la propagación desde tu ordenador:

```bash
dig +short challengeengine.example.com
```

Tiene que devolver `TU_IP` antes de llegar al paso 8 (si no, el certificado HTTPS no podrá emitirse).

---

## 2. Preparación inicial del servidor

```bash
ssh root@TU_IP

# Actualizar el sistema
apt update && apt upgrade -y

# Crear usuario de despliegue (evita trabajar como root)
adduser deploy
usermod -aG sudo deploy

# Copiar tu clave SSH al nuevo usuario
rsync --archive --chown=deploy:deploy ~/.ssh /home/deploy

# Zona horaria (opcional)
timedatectl set-timezone Europe/Madrid
```

Cierra la sesión y vuelve a entrar como `deploy`:

```bash
ssh deploy@TU_IP
```

### Swap (recomendado si el VPS tiene ≤ 2 GB de RAM)

La compilación puede quedarse sin memoria en VPS pequeños.

```bash
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

## 3. Cortafuegos

```bash
sudo apt install -y ufw
sudo ufw allow OpenSSH
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp   # HTTP/3
sudo ufw enable
sudo ufw status
```

> No abras el puerto 3000: la aplicación solo será accesible a través de Caddy.

---

## 4. Instalar Docker y Docker Compose

```bash
sudo apt install -y ca-certificates curl git
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker deploy
```

Sal y vuelve a entrar por SSH para aplicar el grupo, y comprueba:

```bash
docker --version
docker compose version
docker run --rm hello-world
```

---

## 5. Descargar el proyecto

```bash
sudo mkdir -p /opt/challenge-engine
sudo chown deploy:deploy /opt/challenge-engine
cd /opt/challenge-engine
git clone https://github.com/TU_USUARIO/TU_REPO.git app
cd app
```

Si el repositorio es privado, crea una clave de despliegue (`ssh-keygen -t ed25519`), añade `~/.ssh/id_ed25519.pub` como *Deploy key* de solo lectura en GitHub y clona con la URL `git@github.com:...`.

---

## 6. Crear los archivos de Docker

Todos estos archivos van en la raíz del proyecto (`/opt/challenge-engine/app`). Puedes también añadirlos al repositorio para no tener que recrearlos.

### 6.1 `Dockerfile`

El proyecto está construido con TanStack Start + Nitro. Por defecto se compila para un entorno *edge*; para un VPS se compila como **servidor Node** con la variable `NITRO_PRESET=node-server`, que genera `.output/server/index.mjs`.

```dockerfile
# ---------- Etapa 1: compilación ----------
FROM oven/bun:1 AS build
WORKDIR /app

# Instalar dependencias (capa cacheada)
COPY package.json bun.lock* bunfig.toml* ./
RUN bun install --frozen-lockfile

# Copiar el código y compilar como servidor Node
COPY . .
ENV NODE_ENV=production
ENV NITRO_PRESET=node-server
RUN bun run build

# ---------- Etapa 2: ejecución ----------
FROM node:22-alpine AS runtime
WORKDIR /app

ENV NODE_ENV=production
ENV HOST=0.0.0.0
ENV PORT=3000

# Solo se copia la salida compilada (autocontenida)
COPY --from=build /app/.output ./.output

# Usuario sin privilegios
USER node
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD wget -qO- http://127.0.0.1:3000/ >/dev/null || exit 1

CMD ["node", ".output/server/index.mjs"]
```

### 6.2 `.dockerignore`

```text
node_modules
.output
dist
.git
.github
.lovable
.env*
*.log
Dockerfile
docker-compose.yml
Caddyfile
```

### 6.3 `Caddyfile`

```text
challengeengine.example.com {
	encode zstd gzip
	reverse_proxy web:3000

	header {
		Strict-Transport-Security "max-age=31536000; includeSubDomains; preload"
		X-Content-Type-Options "nosniff"
		X-Frame-Options "SAMEORIGIN"
		Referrer-Policy "strict-origin-when-cross-origin"
		-Server
	}

	log {
		output stdout
		format console
	}
}

# Redirigir www al dominio principal (opcional; requiere registro DNS para www)
# www.challengeengine.example.com {
# 	redir https://challengeengine.example.com{uri} permanent
# }
```

### 6.4 `docker-compose.yml`

```yaml
services:
  web:
    build:
      context: .
      dockerfile: Dockerfile
    image: challenge-engine:latest
    container_name: challenge-engine-web
    restart: unless-stopped
    environment:
      NODE_ENV: production
      HOST: 0.0.0.0
      PORT: 3000
    expose:
      - "3000"
    networks:
      - internal

  caddy:
    image: caddy:2-alpine
    container_name: challenge-engine-caddy
    restart: unless-stopped
    depends_on:
      - web
    ports:
      - "80:80"
      - "443:443"
      - "443:443/udp"
    volumes:
      - ./Caddyfile:/etc/caddy/Caddyfile:ro
      - caddy_data:/data
      - caddy_config:/config
    networks:
      - internal

networks:
  internal:

volumes:
  caddy_data:
  caddy_config:
```

> `caddy_data` guarda los certificados HTTPS. No lo borres o Caddy tendrá que pedirlos de nuevo (y Let's Encrypt limita las peticiones).

---

## 7. Probar la compilación localmente en el VPS (opcional pero recomendado)

```bash
cd /opt/challenge-engine/app
docker compose build web
docker run --rm -p 127.0.0.1:3000:3000 challenge-engine:latest &
sleep 5
curl -I http://127.0.0.1:3000/
docker stop $(docker ps -q --filter ancestor=challenge-engine:latest)
```

Debe responder `HTTP/1.1 200 OK`.

---

## 8. Levantar la web

```bash
cd /opt/challenge-engine/app
docker compose up -d --build
docker compose ps
docker compose logs -f caddy
```

En los logs de Caddy verás `certificate obtained successfully` para tu dominio. Pulsa `Ctrl+C` para salir de los logs (los contenedores siguen funcionando).

Abre `https://challengeengine.example.com` en el navegador: la web ya está online, con HTTPS y renovación automática del certificado.

---

## 9. Comprobaciones finales

```bash
# Respuesta HTTPS y cabeceras
curl -I https://challengeengine.example.com

# Redirección HTTP → HTTPS
curl -I http://challengeengine.example.com

# Estado y salud de los contenedores
docker compose ps
docker inspect --format='{{.State.Health.Status}}' challenge-engine-web
```

Lista de verificación:

- [ ] La web carga con candado HTTPS.
- [ ] Los enlaces del menú (System, Architecture, Content, Roadmap) llevan a su sección.
- [ ] El Lab Mode y el cambio de seed funcionan.
- [ ] En el móvil, el menú se abre y se cierra.
- [ ] Al refrescar la página no aparece ningún error.

---

## 10. Actualizar la web tras nuevos cambios

```bash
cd /opt/challenge-engine/app
git pull
docker compose up -d --build web
docker image prune -f
```

Caddy no necesita reiniciarse. Si cambias el `Caddyfile`:

```bash
docker compose exec caddy caddy reload --config /etc/caddy/Caddyfile
```

### Script de despliegue (opcional)

Guarda como `/opt/challenge-engine/deploy.sh`:

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /opt/challenge-engine/app
git pull --ff-only
docker compose build web
docker compose up -d web
docker image prune -f
echo "Despliegue completado: $(date)"
```

```bash
chmod +x /opt/challenge-engine/deploy.sh
/opt/challenge-engine/deploy.sh
```

---

## 11. Arranque automático y mantenimiento

- **Reinicio del VPS:** Docker arranca al inicio y `restart: unless-stopped` vuelve a levantar los contenedores automáticamente. Compruébalo con `sudo reboot` y, al volver, `docker compose ps`.
- **Logs:** `docker compose logs --tail=200 web` y `docker compose logs --tail=200 caddy`.
- **Limitar el tamaño de los logs de Docker** — crea `/etc/docker/daemon.json`:

  ```json
  { "log-driver": "json-file", "log-opts": { "max-size": "10m", "max-file": "3" } }
  ```

  y aplica con `sudo systemctl restart docker`.
- **Actualizaciones de seguridad automáticas:**

  ```bash
  sudo apt install -y unattended-upgrades
  sudo dpkg-reconfigure -plow unattended-upgrades
  ```

- **Copia de seguridad de los certificados** (opcional):

  ```bash
  docker run --rm -v app_caddy_data:/data -v $PWD:/backup alpine \
    tar czf /backup/caddy_data.tgz -C /data .
  ```

  (El nombre del volumen lleva como prefijo el nombre de la carpeta; consúltalo con `docker volume ls`.)

---

## 12. Endurecimiento de SSH (recomendado)

Cuando confirmes que entras con tu clave como `deploy`, edita `/etc/ssh/sshd_config`:

```text
PermitRootLogin no
PasswordAuthentication no
```

```bash
sudo systemctl restart ssh
sudo apt install -y fail2ban
```

---

## 13. Solución de problemas

| Síntoma | Causa probable | Solución |
|---|---|---|
| Caddy no obtiene el certificado | El DNS aún no apunta al VPS o los puertos 80/443 están cerrados | `dig +short dominio`, `sudo ufw status`, revisar el cortafuegos del proveedor |
| `502 Bad Gateway` | El contenedor `web` no está arrancado o se cayó | `docker compose logs web`, `docker compose restart web` |
| La compilación se corta (`Killed`, `exit 137`) | Falta memoria | Añadir swap (paso 2) o compilar la imagen en otra máquina y subirla a un registro |
| Error `Cannot find module '.output/server/index.mjs'` | Se compiló para edge, no para Node | Confirmar que `ENV NITRO_PRESET=node-server` está antes de `bun run build` en el Dockerfile |
| `bun install --frozen-lockfile` falla | El `bun.lock` no coincide con `package.json` | Quitar `--frozen-lockfile` o regenerar el lock y subirlo |
| Puerto 80/443 ocupado | Otro servidor web (Apache/Nginx) en el VPS | `sudo ss -tulpn | grep -E ':80|:443'` y detenerlo/desinstalarlo |
| Los cambios no aparecen | Imagen antigua en caché | `docker compose build --no-cache web && docker compose up -d web` |

---

## Resumen rápido

```bash
# 1. DNS A → TU_IP
# 2. Servidor
apt update && apt upgrade -y && curl -fsSL https://get.docker.com | sh
ufw allow OpenSSH && ufw allow 80/tcp && ufw allow 443 && ufw enable
# 3. Código
git clone https://github.com/TU_USUARIO/TU_REPO.git /opt/challenge-engine/app
cd /opt/challenge-engine/app
# 4. Crear Dockerfile, .dockerignore, Caddyfile y docker-compose.yml (paso 6)
# 5. Lanzar
docker compose up -d --build
# 6. Abrir https://challengeengine.example.com
```
