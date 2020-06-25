import React from "react";
import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import { Movie } from '../../generated/types'

const GET_MOVIES = gql`
{
  movies{
    id
    ownerId
    title,
    owner {
      name
    }
  }
}
`

interface MovieData {
  movies: Movie[]
}

export default function MovieList() {
  const { loading, error, data } = useQuery<MovieData>(GET_MOVIES)
  if (loading){
    return (<p>loading</p>)
  } 
  if (error) return <p>Error :(</p>;

  return (
    <div>
      <h1>Movies</h1>
      {data && data.movies.map(movie => (
        <div key={movie.id}>
          <p>title: {movie.title}</p>
          <p>owner: {movie.owner.name}</p>
        </div>
      ))}
    </div>
  );
}
