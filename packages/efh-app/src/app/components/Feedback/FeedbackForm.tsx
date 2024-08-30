"use client";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
  DrawerHeader,
  DrawerDescription,
  DrawerClose,
  DrawerFooter,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  SUBMIT_FEEDBACK_MUTATION,
  SUBMITTED_FEEDBACK_SUBSCRIPTION,
} from "@/graphql/feedback";
import { useMutation, useSubscription } from "@apollo/client";
import FeedbackRating from "./FeedbackRating";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { useState } from "react";

type FeedbackFormProps = {
  eventId: string;
};

export default function FeedbackForm(props: FeedbackFormProps) {
  const { eventId } = props;

  const [rating, setRating] = useState<number>(5);
  const [feedbackText, setFeedbackText] = useState<string>("");

  const [submitFeedback, { loading, error }] = useMutation(
    SUBMIT_FEEDBACK_MUTATION
  );

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const handleSubmit = async () => {
    try {
      const { data } = await submitFeedback({
        variables: {
          rating,
          eventId: eventId,
          feedbackText,
        },
      });
      if (data) {
        console.log("Feedback submitted:", data);
      }
    } catch (err) {
      toast.error("Failed to submit feedback");
    }
  };

  return (
    <Drawer>
      <DrawerTrigger>
        <Button variant={"secondary"}>Leave feedback ⭐</Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Leave your feedback fo the event</DrawerTitle>
          <DrawerDescription>
            <FeedbackRating
              rating={rating}
              onRating={(value) => setRating(value)}
            />
          </DrawerDescription>
          <Textarea
            placeholder="Leave your message here"
            value={feedbackText}
            onChange={(e) => setFeedbackText(e.target.value)}
          />
        </DrawerHeader>
        <DrawerFooter>
          <Button onClick={handleSubmit}>Submit</Button>
          <DrawerClose>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
