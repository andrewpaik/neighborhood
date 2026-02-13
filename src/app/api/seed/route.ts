import { NextRequest, NextResponse } from "next/server";
import { getAdminDb } from "@/lib/firebase-admin";

const MOCK_NAMES = [
  "Alex Rivera",
  "Jordan Chen",
  "Sam Patel",
  "Casey Kim",
  "Morgan Liu",
  "Riley Brooks",
  "Avery Santos",
  "Quinn Martinez",
  "Dakota Lee",
  "Skyler Nguyen",
  "Jamie Park",
  "Reese Taylor",
  "Charlie Huang",
  "Sage Williams",
  "Rowan Garcia",
];

const MOCK_BIOS = [
  "Coffee enthusiast. Always down for a walk.",
  "Film nerd looking for movie buddies",
  "New to LA, trying to find my people",
  "Cook who makes too much food for one person",
  "Bookworm who also likes hiking",
  "Music producer. Let's jam sometime",
  "Dog mom. My pup needs friends too",
  "Sunset chaser and taco connoisseur",
  "Grad student surviving on good vibes",
  "Artist who paints better with company",
  "Runner training for my first marathon",
  "Plant parent with too many succulents",
  "Photographer looking for adventure partners",
  "Yoga lover and brunch enthusiast",
  "Night owl who makes great playlists",
];

const MISSION_SUBMISSIONS = [
  {
    text: "The rooftop of my apartment building at sunset. You can see downtown all the way to the mountains. I come up here when I need to think.",
    reactions: { fire: [0, 1, 2], heart: [3, 4] },
  },
  {
    text: "Grand Central Market. Something about the chaos and the smells and everyone eating together. It feels like what a city should be.",
    reactions: { heart: [0, 5], clap: [6, 7] },
  },
  {
    text: "This little bench in Echo Park by the lake. I eat my lunch there every Tuesday. The ducks know me by now.",
    reactions: { laugh: [0, 1], heart: [2, 8, 9] },
  },
  {
    text: "The Last Bookstore. Specifically the sci-fi section upstairs. I've spent entire Saturdays there and it never gets old.",
    reactions: { hundred: [3, 4], fire: [10] },
  },
  {
    text: "Venice Beach boardwalk at 6am before all the tourists. It's so peaceful you can hear the waves.",
    reactions: { heart: [5, 6, 11] },
  },
  {
    text: "My favorite taco truck on Figueroa. The al pastor is life-changing. I'll fight anyone who disagrees.",
    reactions: { fire: [0, 7, 12], laugh: [8, 13] },
  },
  {
    text: "Griffith Observatory parking lot at night. Best view of the city, free therapy session every time.",
    reactions: { heart: [1, 2, 9], fire: [14] },
  },
  {
    text: "The dog park in Silver Lake. My golden retriever has more friends there than I do. Trying to change that!",
    reactions: { laugh: [0, 3, 4, 10], heart: [5] },
  },
  {
    text: "This random coffee shop in Koreatown that plays jazz vinyl. The owner remembers everyone's order. That's community.",
    reactions: { clap: [6, 7, 11], hundred: [8] },
  },
  {
    text: "Angeles National Forest, specifically the trail to Switzer Falls. An hour from downtown and you're in a completely different world.",
    reactions: { fire: [9, 12], heart: [13, 14, 0] },
  },
];

const CHAT_MESSAGES = [
  { userIdx: 0, text: "hey everyone!! so excited to be in this neighborhood", hoursAgo: 72 },
  { userIdx: 1, text: "same!! this is such a cool concept", hoursAgo: 71 },
  { userIdx: 3, text: "hi hi! anyone in the USC area?", hoursAgo: 70 },
  { userIdx: 5, text: "me! i'm right by campus", hoursAgo: 69 },
  { userIdx: 2, text: "i'm in koreatown, not too far", hoursAgo: 68 },
  { userIdx: 0, text: "has everyone seen this week's mission? the favorite spot one is great", hoursAgo: 48 },
  { userIdx: 4, text: "yeah i already know what i'm posting haha", hoursAgo: 47 },
  { userIdx: 7, text: "this is gonna be fun, i have so many spots", hoursAgo: 46 },
  { userIdx: 1, text: "just posted mine! grand central market forever", hoursAgo: 36 },
  { userIdx: 6, text: "omg yes that place is amazing", hoursAgo: 35 },
  { userIdx: 8, text: "the mission submissions are so good so far", hoursAgo: 24 },
  { userIdx: 3, text: "right?? i love learning about everyone's spots", hoursAgo: 23 },
  { userIdx: 10, text: "who wants to check out some of these places together?", hoursAgo: 20 },
  { userIdx: 11, text: "i'd be down! especially that taco truck on figueroa", hoursAgo: 19 },
  { userIdx: 9, text: "count me in for tacos always", hoursAgo: 18 },
  { userIdx: 0, text: "we should totally do a little neighborhood food crawl", hoursAgo: 16 },
  { userIdx: 12, text: "yes!! someone propose it as a hangout", hoursAgo: 15 },
  { userIdx: 5, text: "anyone else a morning person? looking for a running buddy", hoursAgo: 12 },
  { userIdx: 10, text: "i run at griffith park most mornings!", hoursAgo: 11 },
  { userIdx: 13, text: "good morning neighborhood! happy wednesday", hoursAgo: 8 },
  { userIdx: 14, text: "good morning!! anyone else procrastinating on their mission submission?", hoursAgo: 7 },
  { userIdx: 4, text: "lol yes i keep changing my mind on which spot to pick", hoursAgo: 6 },
  { userIdx: 2, text: "just submit it! mine was totally last minute and everyone liked it", hoursAgo: 5 },
  { userIdx: 7, text: "this neighborhood is already my favorite part of the week ngl", hoursAgo: 3 },
  { userIdx: 6, text: "same honestly. feels good to actually connect with people", hoursAgo: 2 },
];

const HANGOUTS = [
  {
    title: "Coffee at Blue Bottle Saturday",
    description: "Chill morning coffee hangout. Let's actually meet face to face! I'll be the one with the terrible latte art.",
    locationName: "Blue Bottle Coffee, Arts District",
    locationAddress: "582 Mateo St, Los Angeles, CA",
    daysFromNow: 3,
    hour: 10,
    proposerIdx: 0,
    going: [0, 1, 5, 8],
    maybe: [3, 10, 12],
    cantMakeIt: [2],
  },
  {
    title: "Sunset hike at Griffith",
    description: "Easy hike to the observatory for sunset views. Meeting at the trailhead. Bring water and good vibes!",
    locationName: "Griffith Observatory Trailhead",
    locationAddress: "2800 E Observatory Rd, Los Angeles, CA",
    daysFromNow: 6,
    hour: 17,
    proposerIdx: 10,
    going: [10, 5, 9],
    maybe: [0, 4, 7, 14],
    cantMakeIt: [1, 3],
  },
];

export const POST = async (request: NextRequest) => {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { success: false, message: "Seed not available in production" },
      { status: 403 }
    );
  }

  try {
    const body = await request.json();
    const { userId } = body;

    if (!userId) {
      return NextResponse.json(
        { success: false, message: "userId is required" },
        { status: 400 }
      );
    }

    const adminDb = getAdminDb();

    // Create neighborhood
    const neighborhoodRef = await adminDb.collection("neighborhoods").add({
      name: "Sunset Terrace",
      members: [userId],
      createdAt: new Date(),
      currentMissionId: "",
      missionWeek: 1,
      healthScore: 75,
      stats: {
        activeMembers7d: 12,
        messagesPerDay: 8,
        missionParticipationRate: 0.45,
        irlMeetupsCount: 0,
      },
    });

    const memberIds: string[] = [userId];
    const mockUserIds: string[] = [];

    // Create mock users
    for (let i = 0; i < MOCK_NAMES.length; i++) {
      const name = MOCK_NAMES[i];
      const seed = name.toLowerCase().replace(/\s/g, "");
      const mockUserRef = adminDb.collection("users").doc();

      await mockUserRef.set({
        id: mockUserRef.id,
        displayName: name,
        bio: MOCK_BIOS[i],
        photoURL: `https://api.dicebear.com/7.x/notionists/svg?seed=${seed}`,
        neighborhoodId: neighborhoodRef.id,
        quizResponses: [],
        connectionPreferences: {},
        joinedAt: new Date(),
        lastActiveAt: new Date(
          Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000
        ),
        missionsCompleted: Math.floor(Math.random() * 3),
        hangoutsAttended: 0,
        mutualConnections: [],
      });

      memberIds.push(mockUserRef.id);
      mockUserIds.push(mockUserRef.id);
    }

    // Update neighborhood with all member IDs
    await neighborhoodRef.update({ members: memberIds });

    // Update current user's neighborhoodId
    await adminDb.collection("users").doc(userId).update({
      neighborhoodId: neighborhoodRef.id,
    });

    // --- Create mission (Week 1) ---
    const now = new Date();
    const missionEnd = new Date(now.getTime() + 5 * 24 * 60 * 60 * 1000); // 5 days from now

    const missionRef = await adminDb.collection("missions").add({
      week: 1,
      title: "Your Favorite Spot",
      description:
        "Share a photo of your favorite spot in LA and why it matters to you.",
      type: "low-stakes-intro",
      prompt:
        "Share a photo of your favorite spot in LA and tell us why it matters to you.",
      submissionFormat: "photo",
      startsAt: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000), // started 2 days ago
      endsAt: missionEnd,
      neighborhoodId: neighborhoodRef.id,
    });

    // Update neighborhood with mission ID
    await neighborhoodRef.update({ currentMissionId: missionRef.id });

    // --- Create mission submissions ---
    for (let i = 0; i < MISSION_SUBMISSIONS.length; i++) {
      const sub = MISSION_SUBMISSIONS[i];
      const submitterIdx = i; // Each mock user submits one
      const submitterId = mockUserIds[submitterIdx];
      if (!submitterId) continue;

      // Map reaction user indices to actual user IDs
      const reactions: Record<string, string[]> = {};
      for (const [emoji, indices] of Object.entries(sub.reactions)) {
        reactions[emoji] = (indices as number[])
          .map((idx) => mockUserIds[idx])
          .filter(Boolean);
      }

      await adminDb.collection("mission_submissions").add({
        missionId: missionRef.id,
        userId: submitterId,
        neighborhoodId: neighborhoodRef.id,
        content: { text: sub.text, mediaURLs: [], mediaType: undefined },
        reactions,
        submittedAt: new Date(
          now.getTime() - (MISSION_SUBMISSIONS.length - i) * 4 * 60 * 60 * 1000
        ), // staggered over ~40 hours
      });
    }

    // --- Create hangouts ---
    for (const hangout of HANGOUTS) {
      const proposedTime = new Date();
      proposedTime.setDate(proposedTime.getDate() + hangout.daysFromNow);
      proposedTime.setHours(hangout.hour, 0, 0, 0);

      await adminDb.collection("hangouts").add({
        neighborhoodId: neighborhoodRef.id,
        proposedBy: mockUserIds[hangout.proposerIdx],
        title: hangout.title,
        description: hangout.description,
        location: {
          name: hangout.locationName,
          address: hangout.locationAddress,
        },
        proposedTime,
        rsvps: {
          going: hangout.going.map((idx) => mockUserIds[idx]).filter(Boolean),
          maybe: hangout.maybe.map((idx) => mockUserIds[idx]).filter(Boolean),
          cantMakeIt: hangout.cantMakeIt
            .map((idx) => mockUserIds[idx])
            .filter(Boolean),
        },
        status: "proposed",
        createdAt: new Date(now.getTime() - 24 * 60 * 60 * 1000),
      });
    }

    // --- Create chat messages ---
    for (const msg of CHAT_MESSAGES) {
      const senderId = mockUserIds[msg.userIdx];
      if (!senderId) continue;

      await adminDb.collection("chat_messages").add({
        neighborhoodId: neighborhoodRef.id,
        userId: senderId,
        text: msg.text,
        createdAt: new Date(now.getTime() - msg.hoursAgo * 60 * 60 * 1000),
      });
    }

    return NextResponse.json(
      {
        success: true,
        message: "Neighborhood seeded with missions, hangouts, and chat!",
        neighborhoodId: neighborhoodRef.id,
        memberCount: memberIds.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Seed error:", error);
    return NextResponse.json(
      { success: false, message: "Failed to seed data" },
      { status: 500 }
    );
  }
};
