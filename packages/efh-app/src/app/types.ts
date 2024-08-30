import { Feedback, Event } from "efh-core";

export type EventFeedback = Feedback & {
  event: Event;
};

export type EventType = "conference" | "workshop" | "webinar";

export type TabId = "feedbacks" | "events";
