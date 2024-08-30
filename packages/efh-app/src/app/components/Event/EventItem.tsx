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
import { EventType } from "@/app/types";
import { toLocaleDate } from "@/lib/utils";

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
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>
          <div className="w-full flex justify-between gap-2">
            {toLocaleDate(new Date(event.date))}
            <EventTypeBadge type={event.type as EventType} />
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
