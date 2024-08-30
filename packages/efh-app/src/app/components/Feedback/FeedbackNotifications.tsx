import { useStore } from "@/app/store";
import { EventFeedback } from "@/app/types";
import {
  SUBMIT_FEEDBACK_MUTATION,
  SUBMITTED_FEEDBACK_SUBSCRIPTION,
} from "@/graphql/feedback";
import { useSubscription } from "@apollo/client";
import { Feedback } from "efh-core";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export type FeedbackNotificationsProps = {
  feedbacks: EventFeedback[];
};

export default function FeedbackNotifications(
  props: FeedbackNotificationsProps
) {
  const { feedbacks, setFeedbacks } = useStore();

  const { data, loading, error } = useSubscription<{
    submittedFeedback: EventFeedback;
  }>(SUBMITTED_FEEDBACK_SUBSCRIPTION);

  useEffect(() => {
    if (data?.submittedFeedback) {
      const newFeedback = data.submittedFeedback;

      // Check if the new feedback is already in the existing feedbacks
      const isNewFeedback = !feedbacks.some(
        (feedback) => feedback.id === newFeedback.id
      );

      if (isNewFeedback) {
        // Show a toast notification for the new feedback
        toast.success(`New feedback received ${newFeedback.text}`);

        // Optionally update the feedbacks list
        setFeedbacks([...feedbacks, newFeedback]);
      }
    }

    if (error) {
      console.error("Subscription error:", error);
    }
  }, [data, error, feedbacks, setFeedbacks]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const feedback = data?.submittedFeedback;

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
