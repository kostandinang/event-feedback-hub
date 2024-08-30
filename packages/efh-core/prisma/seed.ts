import { PrismaClient, Event, User } from "@prisma/client";

const prisma = new PrismaClient();

// Seed events
const events: Pick<Event, "id" | "name" | "type" | "date">[] = [
  {
    id: "cm0e3bs0q0000wczri9p71zrl",
    name: "React JS Conference",
    type: "conference",
    date: new Date("2024-05-12"),
  },
  {
    id: "cm0e3bs0r0001wczrae7rt2qb",
    name: "GraphQL Workshop",
    type: "workshop",
    date: new Date("2024-06-20"),
  },
  {
    id: "cm0e3d8i40000b9lzalkorxng",
    name: "NodeJS Internals - Webinar",
    type: "webinar",
    date: new Date("2025-01-12"),
  },
];

// Guest user
const user: Pick<User, "id" | "username"> = {
  id: process.env.GUEST_USER_ID || "",
  username: "guest",
};

async function main() {
  await prisma.user.create({
    data: {
      id: user.id,
      githubId: 0,
      username: user.username,
    },
  });
  await Promise.all(
    events.map((event) =>
      prisma.event.upsert({
        create: event,
        update: event,
        where: { id: event.id },
      })
    )
  );
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
