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
import FeedbackForm from "../Feedback/FeedbackForm";

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
            <div className="flex gap-2 align-middle items-center">
              <EventTypeBadge type={event.type as EventType} />
              <span>{toLocaleDate(new Date(event.date))}</span>
            </div>

            <div className="flex gap-2">
              <FeedbackForm eventId={event.id} />
            </div>
          </div>
        </CardDescription>
      </CardContent>
    </Card>
  );
}
