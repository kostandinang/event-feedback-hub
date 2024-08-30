import { gql } from "@apollo/client";

export const GET_EVENTS = gql`
  query Events {
    events {
      id
      name
      type
      date
    }
  }
`;
