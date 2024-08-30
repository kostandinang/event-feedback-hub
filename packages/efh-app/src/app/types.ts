import { Feedback, Event } from "efh-core";

export type FeedbackFilterParams = {
  eventId?: string;
  rating?: number;
  skip?: number;
  take?: number;
};

export type EventFeedback = Feedback & {
  event: Event;
};

export type EventType = "conference" | "workshop" | "webinar";

export type TabId = "feedbacks" | "events";

export type StarRating = {
  value: number;
  label: string;
};
