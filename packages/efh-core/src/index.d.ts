import { createGraphqlSchema } from "./graphql";
import { pubSub } from "./lib/pubsub";
import { EventResolver } from "./pkg/event/resolvers";
import { Event } from "./pkg/event/types";
import { FeedbackResolver } from "./pkg/feedback/resolvers";
import { Feedback } from "./pkg/feedback/types";
import { UserResolver } from "./pkg/user/resolvers";
import * as UserServices from "./pkg/user/services";
import { User } from "./pkg/user/types";

export type { User, Event, Feedback };

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
