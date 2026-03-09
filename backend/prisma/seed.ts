import 'dotenv/config';
import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';
import { users } from './data/users.data';
import { events } from './data/events.data';
import { hashPassword } from './utils/hash';

const { DATABASE_URL } = process.env;

const connectionString = `${DATABASE_URL}`;
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function main() {
  await prisma.$transaction(async (tx) => {
    const preparedUsers = await Promise.all(
      users.map(async (user) => ({
        ...user,
        password: await hashPassword(user.password),
      })),
    );

    const createdUsers = await Promise.all(
      preparedUsers.map((user) => tx.user.create({ data: user })),
    );

    const createdEvents = await Promise.all(
      events.map((event, index) =>
        tx.event.create({
          data: {
            ...event,
            creatorId: createdUsers[index % createdUsers.length].id,
          },
        }),
      ),
    );

    await tx.participation.createMany({
      data: [
        {
          userId: createdUsers[0].id,
          eventId: createdEvents[0].id,
          joinedAt: new Date('2026-03-06'),
        },
        {
          userId: createdUsers[0].id,
          eventId: createdEvents[1].id,
          joinedAt: new Date('2026-03-06'),
        },
        {
          userId: createdUsers[0].id,
          eventId: createdEvents[2].id,
          joinedAt: new Date('2026-03-06'),
        },
        {
          userId: createdUsers[1].id,
          eventId: createdEvents[0].id,
          joinedAt: new Date('2026-03-05'),
        },
        {
          userId: createdUsers[1].id,
          eventId: createdEvents[3].id,
          joinedAt: new Date('2026-03-08'),
        },
      ],
    });
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
    await pool.end();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    await pool.end();
    process.exit(1);
  });
