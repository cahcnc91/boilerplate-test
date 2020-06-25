import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import gql from "graphql-tag";
import { Movie, MovieInput } from "../../generated/types";

const ADD_MOVIE = gql`
  mutation createMovie($options: MovieInput!) {
    createMovie(options: $options) {
      title
      owner {
        name
      }
    }
  }
`;

export default function Input() {
  const [newMovie, setNewMovie] = useState("");
  const [createMovie, { error, data }] = useMutation(ADD_MOVIE, {
    variables: { options: { minutes: 100, title: newMovie } },
  });

  const pressedEnter = (e: number) => {
    if (e == 13) {
      createMovie();
    }
  };
  console.log(data);

  return (
    <input
      value={newMovie}
      onChange={(e) => setNewMovie(e.target.value)}
      onKeyDown={(e) => pressedEnter(e.keyCode)}
    />
  );
}
