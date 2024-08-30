import { Query, Resolver } from "type-graphql";
import { client } from "../../lib/prisma";
import { Event } from "./types";

@Resolver()
export class EventResolver {
  @Query(() => [Event])
  async events() {
    return client.event.findMany({
      include: {
        feedback: true,
      },
    });
  }
}
