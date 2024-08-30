import { Query, Resolver } from "type-graphql";
import { User } from "./types";
import { getGuestUser } from "./services";

@Resolver()
export class UserResolver {
  @Query(() => User)
  async user() {
    return await getGuestUser();
  }
}
