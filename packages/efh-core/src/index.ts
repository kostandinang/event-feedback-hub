import { createGraphqlSchema } from "./graphql";
import { pubSub } from "./lib/pubsub";
import { EventResolver } from "./pkg/event/resolvers";
import { Event } from "./pkg/event/types";
import { FeedbackResolver } from "./pkg/feedback/resolvers";
import { Feedback } from "./pkg/feedback/types";
import { UserResolver } from "./pkg/user/resolvers";
import { getGuestUser } from "./pkg/user/services";
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
    user: {
      getGuestUser: typeof getGuestUser;
    };
  };
}

const core: Core = {
  graphql: {
    schema: createGraphqlSchema,
    pubSub: pubSub,
  },
  models: {
    user: User,
    event: Event,
    feedback: Feedback,
  },
  resolvers: {
    user: UserResolver,
    event: EventResolver,
    feedback: FeedbackResolver,
  },

  services: {
    user: {
      getGuestUser: getGuestUser,
    },
  },
};

export default core;
