import type { QuizQuestion } from "@/types";

export const quizQuestions: QuizQuestion[] = [
  {
    id: "warmup-style",
    text: "When you meet someone new, you tend to...",
    subtext: "There's no wrong answer here",
    type: "single-choice",
    category: "warmupStyle",
    options: [
      {
        id: "jump-in",
        label: "Jump right in",
        emoji: "\u{1F680}",
        description: "I love meeting people — let's be friends immediately",
      },
      {
        id: "warm-up",
        label: "Warm up gradually",
        emoji: "\u{2615}",
        description: "Give me a few hangouts and I'll open up",
      },
      {
        id: "in-between",
        label: "Somewhere in between",
        emoji: "\u{1F31F}",
        description: "Depends on the vibe and the person",
      },
    ],
  },
  {
    id: "activity-vs-conversation",
    text: "Your ideal hangout is...",
    type: "single-choice",
    category: "activityVsConversation",
    options: [
      {
        id: "activity",
        label: "Doing something together",
        emoji: "\u{1F3B3}",
        description: "Cooking, hiking, games, exploring — keep us moving",
      },
      {
        id: "conversation",
        label: "Sitting and talking for hours",
        emoji: "\u{1F4AC}",
        description: "A cozy spot, good drinks, deep conversation",
      },
      {
        id: "mix",
        label: "A mix of both",
        emoji: "\u{2728}",
        description: "Activity first, then debrief over food",
      },
    ],
  },
  {
    id: "social-time",
    text: "When are you most social?",
    subtext: "When does your social energy peak?",
    type: "single-choice",
    category: "socialTime",
    options: [
      {
        id: "morning",
        label: "Morning person",
        emoji: "\u{1F305}",
        description: "Brunch and coffee are my love language",
      },
      {
        id: "afternoon",
        label: "Afternoon energy",
        emoji: "\u{2600}\u{FE0F}",
        description: "Post-lunch hangs, weekend activities",
      },
      {
        id: "night",
        label: "Night owl",
        emoji: "\u{1F319}",
        description: "Dinner and beyond — I come alive after dark",
      },
    ],
  },
  {
    id: "energy-level",
    text: "Your social energy is more...",
    type: "single-choice",
    category: "energyLevel",
    options: [
      {
        id: "chill",
        label: "Chill vibes",
        emoji: "\u{1F9D8}",
        description: "Low-key hangs, no need to be 'on'",
      },
      {
        id: "high-energy",
        label: "High energy",
        emoji: "\u{26A1}",
        description: "Let's do something wild — I bring the hype",
      },
      {
        id: "depends",
        label: "Depends on my mood",
        emoji: "\u{1F3AD}",
        description: "Sometimes chill, sometimes chaotic — no in between",
      },
    ],
  },
  {
    id: "group-size",
    text: "You feel most yourself in...",
    type: "single-choice",
    category: "groupSize",
    options: [
      {
        id: "one-on-one",
        label: "One-on-one conversations",
        emoji: "\u{1F91D}",
        description: "Deep connection with one person at a time",
      },
      {
        id: "small-group",
        label: "Small groups (3-6 people)",
        emoji: "\u{1F465}",
        description: "Enough energy but everyone still gets heard",
      },
      {
        id: "big-group",
        label: "The more the merrier",
        emoji: "\u{1F389}",
        description: "Big groups, lots of energy, lots of laughs",
      },
    ],
  },
  {
    id: "vulnerability",
    text: "When it comes to opening up...",
    subtext: "About real stuff — feelings, struggles, dreams",
    type: "single-choice",
    category: "warmupStyle",
    options: [
      {
        id: "open-book",
        label: "I'm an open book",
        emoji: "\u{1F4D6}",
        description: "Ask me anything, I'll tell you everything",
      },
      {
        id: "trust-first",
        label: "I need to trust someone first",
        emoji: "\u{1F512}",
        description: "Earn my trust and I'll share my world",
      },
      {
        id: "gradual",
        label: "I share gradually over time",
        emoji: "\u{1F331}",
        description: "Layer by layer — slow reveal",
      },
    ],
  },
  {
    id: "humor-style",
    text: "Your humor is more...",
    type: "single-choice",
    category: "activityVsConversation",
    options: [
      {
        id: "dry",
        label: "Dry and sarcastic",
        emoji: "\u{1F60F}",
        description: "Deadpan delivery, subtle wit",
      },
      {
        id: "silly",
        label: "Silly and goofy",
        emoji: "\u{1F92A}",
        description: "I'll do anything for a laugh — no shame",
      },
      {
        id: "witty",
        label: "Witty and observational",
        emoji: "\u{1F9D0}",
        description: "I notice the funny in everyday things",
      },
      {
        id: "laugh",
        label: "I mostly just laugh",
        emoji: "\u{1F602}",
        description: "I appreciate humor more than I create it",
      },
    ],
  },
  {
    id: "conflict-style",
    text: "When there's tension in a group, you...",
    type: "single-choice",
    category: "energyLevel",
    options: [
      {
        id: "head-on",
        label: "Address it head-on",
        emoji: "\u{1F4AA}",
        description: "Let's talk it out — avoiding makes it worse",
      },
      {
        id: "peacekeeper",
        label: "Try to keep the peace",
        emoji: "\u{1F54A}\u{FE0F}",
        description: "I'll find the compromise and smooth things over",
      },
      {
        id: "wait",
        label: "Wait for it to pass",
        emoji: "\u{23F3}",
        description: "Most things resolve themselves — stay calm",
      },
    ],
  },
  {
    id: "phone-habits",
    text: "Honestly, how much time do you spend on your phone?",
    subtext: "No judgment — we're all in this together",
    type: "single-choice",
    category: "socialTime",
    options: [
      {
        id: "too-much",
        label: "Way too much — help me",
        emoji: "\u{1F4F1}",
        description: "Screen time report? Don't look at it.",
      },
      {
        id: "healthy",
        label: "A healthy amount",
        emoji: "\u{1F44D}",
        description: "I have a good balance going",
      },
      {
        id: "minimal",
        label: "Less than most people",
        emoji: "\u{1F333}",
        description: "I'd rather be doing literally anything else",
      },
    ],
  },
  {
    id: "geographic-area",
    text: "Where in LA are you based?",
    subtext: "This helps us match you with people nearby",
    type: "single-choice",
    category: "geographicArea",
    options: [
      {
        id: "usc-downtown",
        label: "USC / Downtown",
        emoji: "\u{1F3D9}\u{FE0F}",
      },
      {
        id: "westside",
        label: "Westside",
        emoji: "\u{1F3D6}\u{FE0F}",
        description: "Santa Monica, Venice, Brentwood, etc.",
      },
      {
        id: "hollywood",
        label: "Hollywood / Koreatown",
        emoji: "\u{1F31F}",
      },
      {
        id: "eastside",
        label: "East LA / Silver Lake / Echo Park",
        emoji: "\u{1F3B5}",
      },
    ],
  },
];
