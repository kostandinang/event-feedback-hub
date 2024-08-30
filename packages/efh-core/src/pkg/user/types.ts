import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";

export type Context = {
  user: any;
  session: any;
};

@ObjectType("User")
export class User {
  @Field((type) => ID)
  id?: string;

  @Field((type) => String)
  username?: string;

  @Field((type) => Number)
  githubId?: number;
}
