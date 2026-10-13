import { createFileRoute } from "@tanstack/react-router";
import { ChallengeEnginePage } from "@/components/challenge-engine/ChallengeEnginePage";

const description = "Challenge Engine is a deterministic creative-production framework for interactive challenges, procedural visual worlds and repeatable vertical-video planning. Currently in engineering validation; production rendering is not authorized.";

export const Route = createFileRoute("/")({
  head: () => ({
    links: [{ rel: "canonical", href: "https://challengevideoengine.lovable.app" }],
    meta: [
      { title: "Challenge Engine — Deterministic Creative Technology" },
      { name: "description", content: description },
      { property: "og:title", content: "Challenge Engine — The Creative Laboratory of Precision" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChallengeEnginePage,
});
