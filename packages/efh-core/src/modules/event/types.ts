import "reflect-metadata";
import { ObjectType, Field, ID } from "type-graphql";
import { Feedback } from "../feedback/types";

@ObjectType("Event")
export class Event {
  @Field((type) => ID)
  id!: string;

  @Field((type) => String)
  name!: string;

  @Field((type) => String)
  type!: string;

  @Field((type) => Date)
  date!: Date;

  @Field((type) => [Feedback], { nullable: true })
  feedback!: [Feedback] | null;
}
