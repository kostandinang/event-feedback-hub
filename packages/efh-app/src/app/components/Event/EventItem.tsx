"use client";

import { Event } from "efh-core";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EventTypeBadge from "./EventTypeBadge";

export type EventItem = {
  event: Event;
};

export default function EventItem(props: EventItem) {
  const { event } = props;

  if (!event) {
    return <></>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <span className="flex gap-2 flex-col">
            <span>{event.name}</span>
            <EventTypeBadge type={event.type as EventType} />
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{JSON.stringify(event.date)}</CardDescription>
      </CardContent>
    </Card>
  );
}
