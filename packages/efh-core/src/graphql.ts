import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { EventResolver } from "./pkg/event/resolvers";
import { FeedbackResolver } from "./pkg/feedback/resolvers";
import { UserResolver } from "./pkg/user/resolvers";
import { pubSub } from "./lib/pubsub";

export const createGraphqlSchema = async () =>
  await buildSchema({
    pubSub,
    resolvers: [EventResolver, FeedbackResolver, UserResolver], //Add other resolvers here
  });
