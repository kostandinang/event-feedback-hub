"use client";

import EventItem from "./EventItem";
import { Event } from "efh-core";

type EventListProps = {
  events: Event[];
};

export default function EventList(props: EventListProps) {
  const { events } = props;

  return (
    <div className="flex flex-col gap-4 mt-4 h-max overflow-auto">
      {events &&
        events.map((event: Event) => (
          <EventItem key={event.id} event={event} />
        ))}
    </div>
  );
}
