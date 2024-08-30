import { gql } from "@apollo/client";

export const GET_FEEDBACKS_QUERY = gql`
  query Feedbacks($eventId: String, $rating: Int, $skip: Int, $take: Int) {
    feedbacks(eventId: $eventId, rating: $rating, skip: $skip, take: $take) {
      id
      rating
      text
      eventId
      event {
        id
        name
        type
      }
    }
  }
`;

export const SUBMIT_FEEDBACK_MUTATION = gql`
  mutation SubmitFeedback(
    $rating: Int!
    $feedbackText: String!
    $eventId: String!
  ) {
    submitFeedback(
      rating: $rating
      feedbackText: $feedbackText
      eventId: $eventId
    ) {
      id
      eventId
      rating
      text
    }
  }
`;

export const SUBMITTED_FEEDBACK_SUBSCRIPTION = gql`
  subscription SubmittedFeedback {
    submittedFeedback {
      id
      text
      rating
      eventId
    }
  }
`;
