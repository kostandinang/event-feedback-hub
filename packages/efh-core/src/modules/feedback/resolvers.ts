import z from "zod";
import {
  Arg,
  Int,
  Query,
  Mutation,
  Resolver,
  Ctx,
  Subscription,
  Root,
  PubSub,
} from "type-graphql";
import { client } from "../../lib/prisma";
import { Feedback } from "./types";
import { type Context } from "../user/types";
import { pubSub } from "../../lib/pubsub";

export const SUBMIT_FEEDBACK_TOPIC = "SUBMIT_FEEDBACK";

const submitFeedbackSchema = z.object({
  eventId: z.string(),
  feedbackText: z.string(),
  rating: z.number().int().min(1).max(5),
});

@Resolver()
export class FeedbackResolver {
  @Query(() => [Feedback])
  async feedback(
    @Arg("eventName", () => String, { nullable: true }) eventName?: string,
    @Arg("rating", () => Int, { nullable: true }) rating?: number,
    @Arg("skip", () => Int) skip?: number,
    @Arg("take", () => Int) take?: number
  ) {
    try {
      const where: any = {};
      if (eventName) where.eventName = eventName;
      if (rating) where.rating = rating;

      return await client.feedback.findMany({
        where,
        skip,
        take,
        include: {
          event: true,
        },
      });
    } catch (error) {
      throw new Error("Failed to fetch feedback");
    }
  }

  @Mutation(() => Feedback)
  async submitFeedback(
    @Arg("eventId", () => String) eventId: string,
    @Arg("feedbackText", () => String) feedbackText: string,
    @Arg("rating", () => Int) rating: number,
    @Ctx() ctx: Context
  ) {
    try {
      const parsed = submitFeedbackSchema.parse({
        eventId,
        feedbackText,
        rating,
      });
      // const userId = ctx.session.user.id;
      const userId = process.env.GUEST_USER_ID || "";
      const feedback = await client.feedback.create({
        data: {
          eventId: parsed.eventId,
          text: parsed.feedbackText,
          rating: parsed.rating,
          userId,
        },
        include: {
          event: true,
        },
      });
      if (!feedback) throw new Error("Feedback failed to create");
      pubSub.publish(SUBMIT_FEEDBACK_TOPIC, feedback);
      return feedback;
    } catch (error) {
      console.error(error);
      throw new Error("Failed to submit feedback");
    }
  }

  @Subscription(() => Feedback, {
    topics: SUBMIT_FEEDBACK_TOPIC,
  })
  submittedFeedback(
    @Root() feedback: Feedback | null,
    @Arg("eventId", () => String, { nullable: true }) eventId?: string,
    @Arg("rating", () => Int, { nullable: true }) rating?: number
  ): Feedback | null {
    return feedback;
  }
}
