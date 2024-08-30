import { client } from "../../lib/prisma";
import { User } from "@prisma/client";

let cachedUser: User | null = null;

export async function getGuestUser(): Promise<User | null> {
  if (cachedUser) {
    return cachedUser;
  }
  try {
    const user = await client.user.findFirst({
      where: {
        id: process.env.GUEST_USER_ID,
      },
    });
    //Enable cached user
    cachedUser = user;
    return user;
  } catch (error) {
    console.error("Invalid user", error);
    return null;
  }
}
