import { gql } from "apollo-boost";

export const GET_MOVIES = gql`
  {
    movies {
      id
      ownerId
      title
      owner {
        name
      }
    }
  }
`;