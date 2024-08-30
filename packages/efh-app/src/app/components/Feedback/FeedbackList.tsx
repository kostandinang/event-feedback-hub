"use client";

import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_FEEDBACKS_QUERY } from "@/graphql/feedback";
import { useStore } from "@/app/store";
import FeedbackItem from "./FeedbackItem";
import { Feedback, Event } from "efh-core";
import { EventFeedback, FeedbackFilterParams } from "@/app/types";
import FeedbackNotifications from "./FeedbackNotifications";

type FeedbackListProps = {};

export default function FeedbackList(props: FeedbackListProps) {
  // Filters
  const [skip, setSkip] = useState<number>(0);
  const [take, setTake] = useState<number>(0);
  const { filterEventId, filterRating } = useStore();

  const { loading, error, data, refetch } = useQuery<
    { feedbacks: EventFeedback[] },
    FeedbackFilterParams
  >(GET_FEEDBACKS_QUERY, {
    variables: {
      eventId: filterEventId ?? undefined,
      rating: filterRating ?? undefined,
    },
  });

  useMemo(() => {
    const params: FeedbackFilterParams = {};
    if (filterEventId) {
      params.eventId = filterEventId;
    }
    if (filterRating > 0) {
      params.rating = filterRating;
    }
    if (Object.keys(params).length > 0) {
      refetch(params);
    }
  }, [filterEventId, filterRating, refetch]);

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
