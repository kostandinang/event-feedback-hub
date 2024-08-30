import { useStore } from "@/app/store";
import { EventFeedback } from "@/app/types";
import { SUBMITTED_FEEDBACK_SUBSCRIPTION } from "@/graphql/feedback";
import { gql, useSubscription } from "@apollo/client";

import { useEffect } from "react";
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
  }>(SUBMITTED_FEEDBACK_SUBSCRIPTION, {
    onData: ({ client, data: subscriptionData }) => {
      const newFeedback = subscriptionData.data?.submittedFeedback;
      client.cache.modify({
        fields: {
          feedbacks(existingFeedbacks = []) {
            const newFeedbackRef = client.cache.writeFragment({
              data: newFeedback,
              fragment: gql`
                fragment NewFeedback on Feedback {
                  id
                  text
                  eventId
                }
              `,
            });
            return [newFeedbackRef, ...existingFeedbacks];
          },
        },
      });
    },
  });

  useEffect(() => {
    if (data?.submittedFeedback) {
      debugger;
      const newFeedback = data.submittedFeedback;

      // Check if the new feedback is already in the existing feedbacks
      const isNewFeedback = !feedbacks.some(
        (feedback) => feedback.id === newFeedback.id
      );

      if (isNewFeedback) {
        // Show a toast notification for the new feedback
        toast.success(`New feedback received`);

        // Update the local feedbacks list
        setFeedbacks([...feedbacks, newFeedback].reverse());
      }
    }

    if (error) {
      console.error("Subscription error:", error);
    }
  }, [data, error, feedbacks, setFeedbacks]);

  if (loading)
    return (
      <p className="absolute top-[0] right-[0] mt-32 mr-24 animate-pulse">
        Awaiting feedback ...
      </p>
    );

  if (error)
    return (
      <p className="text-red-500 animate-pulse absolute top-[0] right-[0] mt-32 mr-24">
        Error: {error.message}
      </p>
    );

  const feedback = data?.submittedFeedback;

  return null;
}
