"use client";

import {
  SUBMIT_FEEDBACK_MUTATION,
  SUBMITTED_FEEDBACK_SUBSCRIPTION,
} from "@/graphql/feedback";
import { useSubscription } from "@apollo/client";

export default function FeedbackForm() {
  const { data, loading, error } = useSubscription(
    SUBMIT_FEEDBACK_MUTATION,
    {}
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const feedback = data && data.submittedFeedback;

  return (
    <div>
      {feedback && (
        <>
          <p>ID: {feedback.id}</p>
          <p>Text: {feedback.text}</p>
          <p>Rating: {feedback.rating}</p>
          <p>Event ID: {feedback.eventId}</p>
        </>
      )}
    </div>
  );
}
