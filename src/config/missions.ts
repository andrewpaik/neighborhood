import type { MissionType, SubmissionFormat } from "@/types";

export interface MissionTemplate {
  week: number;
  title: string;
  description: string;
  type: MissionType;
  prompt: string;
  submissionFormat: SubmissionFormat;
  durationDays: number;
}

export const MISSION_PROGRESSION: MissionTemplate[] = [
  {
    week: 1,
    title: "Your Favorite Spot",
    description:
      "Share a photo of your favorite spot in LA and why it matters to you. Could be a coffee shop, a park bench, a rooftop — anywhere that feels like yours.",
    type: "low-stakes-intro",
    prompt:
      "Share a photo of your favorite spot in LA and tell us why it matters to you.",
    submissionFormat: "photo",
    durationDays: 7,
  },
  {
    week: 2,
    title: "Kitchen Experiment",
    description:
      "Cook a meal you've never attempted before. Post the result — disasters are absolutely encouraged. The worse it looks, the better the story.",
    type: "parallel-challenge",
    prompt:
      "Cook something you've never tried before and show us how it turned out. Bonus points for spectacular failures.",
    submissionFormat: "photo",
    durationDays: 7,
  },
  {
    week: 3,
    title: "Dream Restaurant",
    description:
      "Your neighborhood designs a fictional restaurant together. Come up with a name, a signature dish, and the vibe. Vote on the best concept.",
    type: "creative-collab",
    prompt:
      "Pitch your dream restaurant — name it, describe the vibe, and share the signature dish. The neighborhood votes on the winner.",
    submissionFormat: "text",
    durationDays: 7,
  },
  {
    week: 4,
    title: "500 Miles Together",
    description:
      "Collectively walk, run, or bike 500 miles as a neighborhood this week. Track individually, celebrate together. Every step counts.",
    type: "physical-goal",
    prompt:
      "Log your miles this week! Walk, run, bike — it all counts. Let's hit 500 miles as a neighborhood.",
    submissionFormat: "text",
    durationDays: 7,
  },
  {
    week: 5,
    title: "Neighborhood Book Club",
    description:
      "Everyone reads the same short article or essay, then the neighborhood hosts a live discussion. Time to share what you really think.",
    type: "discussion",
    prompt:
      "Read the shared article, then join the neighborhood discussion. Share your honest take — agree or disagree.",
    submissionFormat: "text",
    durationDays: 7,
  },
  {
    week: 6,
    title: "Teach Something",
    description:
      "Teach your neighborhood something you know. A 3-minute video, a photo tutorial, a step-by-step guide. Share what you're good at.",
    type: "skill-share",
    prompt:
      "Teach us something! Share a skill, a recipe, a life hack, a creative technique — anything you know well.",
    submissionFormat: "mixed",
    durationDays: 7,
  },
  {
    week: 7,
    title: "Neighborhood Potluck",
    description:
      "Time to meet for real. Organize a neighborhood potluck in a local park. The platform provides the logistics template — your group decides when and where.",
    type: "irl-bridge",
    prompt:
      "Plan the neighborhood potluck! Propose a time and place, decide what to bring, and let's make it happen.",
    submissionFormat: "text",
    durationDays: 7,
  },
  {
    week: 8,
    title: "Gratitude & What's Next",
    description:
      "Write a short note to someone in your neighborhood who made your week better. Then vote on what missions you want next.",
    type: "reflection",
    prompt:
      "Write a note to a neighbor who made an impact on you. Then share: what kind of missions do you want to see next?",
    submissionFormat: "text",
    durationDays: 7,
  },
];
