import "reflect-metadata";

import { buildSchema } from "type-graphql";
import { EventResolver } from "./modules/event/resolvers";
import { FeedbackResolver } from "./modules/feedback/resolvers";
import { UserResolver } from "./modules/user/resolvers";
import { pubSub } from "./lib/pubsub";

export const createGraphqlSchema = async () =>
  await buildSchema({
    pubSub,
    resolvers: [EventResolver, FeedbackResolver, UserResolver], //Add other resolvers here
  });
