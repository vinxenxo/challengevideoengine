import { createFileRoute } from "@tanstack/react-router";
import { ChallengeEnginePage } from "@/components/challenge-engine/ChallengeEnginePage";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Challenge Engine — Deterministic Procedural Video System" },
      { name: "description", content: "Challenge Engine is a deterministic procedural video system for reproducible game challenges, visual loops, drills and scalable audiovisual production." },
      { name: "keywords", content: "procedural video, deterministic video generation, challenge engine, procedural graphics, generative video, visual loops, visual drills, reproducible media" },
      { property: "og:title", content: "Challenge Engine — Build Once. Generate Reproducibly." },
      { property: "og:description", content: "A deterministic audiovisual production system built around simulation truth, declarative presentation and traceable generation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChallengeEnginePage,
});
