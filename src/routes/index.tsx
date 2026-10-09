import { createFileRoute } from "@tanstack/react-router";
import { ChallengeEnginePage } from "@/components/challenge-engine/ChallengeEnginePage";

const description = "Challenge Engine is a creative production system for building repeatable challenge videos, procedural visual experiences, motion and audiovisual content for vertical social formats.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Challenge Engine — Creative System for Challenge Videos" },
      { name: "description", content: description },
      { property: "og:title", content: "Challenge Engine — Turn Challenges Into Content People Want to Watch" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ChallengeEnginePage,
});
