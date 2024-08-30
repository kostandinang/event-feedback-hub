import { createGraphqlSchema } from "./graphql";
import { pubSub } from "./lib/pubsub";
import { EventResolver } from "./modules/event/resolvers";
import { Event } from "./modules/event/types";
import { FeedbackResolver } from "./modules/feedback/resolvers";
import { Feedback } from "./modules/feedback/types";
import { UserResolver } from "./modules/user/resolvers";
import * as UserServices from "./modules/user/services";
import { User } from "./modules/user/types";

interface Core {
  graphql: {
    schema: typeof createGraphqlSchema;
    pubSub: typeof pubSub;
  };
  models: {
    user: typeof User;
    event: typeof Event;
    feedback: typeof Feedback;
  };
  resolvers: {
    // Added resolvers to the interface
    user: typeof UserResolver;
    event: typeof EventResolver;
    feedback: typeof FeedbackResolver;
  };
  services: {
    user: typeof UserServices;
  };
}

declare const core: Core;
export default core;
