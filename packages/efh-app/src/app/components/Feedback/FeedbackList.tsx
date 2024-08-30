"use client";

import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FEEDBACKS_QUERY } from "@/graphql/feedback";
import { useStore } from "@/app/store";
import FeedbackItem from "./FeedbackItem";
import { Feedback, Event } from "efh-core";
import { EventFeedback } from "@/app/types";
import FeedbackNotifications from "./FeedbackNotifications";

type FeedbackListProps = {};

export default function FeedbackList(props: FeedbackListProps) {
  // Filters
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(0);
  const [rating, setRating] = useState<number>(0);
  const { filterEventId } = useStore();

  const { loading, error, data } = useQuery(GET_FEEDBACKS_QUERY, {
    variables: {
      eventId: filterEventId ?? "",
      // rating,
      // skip,
      // take,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  if (!data) return null;

  return (
    <>
      <FeedbackNotifications feedbacks={data.feedbacks} />
      <ul className="flex flex-col gap-4 mt-4 h-max overflow-auto">
        {data.feedbacks.map((feedback: EventFeedback) => (
          <li key={feedback.id.toString()}>
            <FeedbackItem feedback={feedback} />
          </li>
        ))}
      </ul>
    </>
  );
}
