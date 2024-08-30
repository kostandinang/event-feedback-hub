import { createGraphqlSchema } from "./graphql";
import { pubSub } from "./lib/pubsub";
import { EventResolver } from "./modules/event/resolvers";
import { Event } from "./modules/event/types";
import { FeedbackResolver } from "./modules/feedback/resolvers";
import { Feedback } from "./modules/feedback/types";
import { UserResolver } from "./modules/user/resolvers";
import { getGuestUser } from "./modules/user/services";
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
