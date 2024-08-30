import "reflect-metadata";
import { ObjectType, Field, ID, Int } from "type-graphql";
import { Event } from "../event/types";

@ObjectType("Feedback")
export class Feedback {
  @Field((type) => ID)
  id!: String;

  @Field((type) => String)
  text!: string;

  @Field((type) => String)
  eventId!: string;

  @Field((type) => Int)
  rating!: number;

  @Field(() => Event, { nullable: true })
  event!: Event | null;
}
