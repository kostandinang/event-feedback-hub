"use client";

import { EventFeedback, EventType } from "@/app/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { SUBMITTED_FEEDBACK_SUBSCRIPTION } from "@/graphql/feedback";
import { useSubscription } from "@apollo/client";
import { Feedback } from "efh-core";
import FeedbackRating from "./FeedbackRating";
import EventTypeBadge from "../Event/EventTypeBadge";

export type FeedbackItemProps = {
  feedback: EventFeedback;
};

export default function FeedbackItem(props: FeedbackItemProps) {
  const { feedback } = props;
  // const { data, loading, error } = useSubscription(
  //   SUBMITTED_FEEDBACK_SUBSCRIPTION,
  //   {}
  // );

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // const feedback = data && data.submittedFeedback;

  if (!feedback) return;

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="w-full flex justify-between gap-2">
            <span className="flex gap-2 flex-col">
              <span>{feedback.event.name}</span>
              <EventTypeBadge type={feedback.event.type as EventType} />
            </span>
            <FeedbackRating readonly rating={feedback.rating} />
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{feedback.text}</CardDescription>
      </CardContent>
    </Card>
  );
}
