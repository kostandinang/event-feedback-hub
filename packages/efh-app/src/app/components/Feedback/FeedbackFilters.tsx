"use client";

import { Event } from "efh-core";
import EventFilter from "../Event/EventFilter";
import FeedbackRatingFilter from "./FeedbackRatingFilter";

export type EventFilterProps = {
  events: Event[];
};

export default function FeedbackFilters(props: EventFilterProps) {
  const { events } = props;

  return (
    <div className="flex flex-row gap-2 items-center align-middle">
      <EventFilter events={events} />
      <FeedbackRatingFilter />
    </div>
  );
}
