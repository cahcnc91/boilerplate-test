import React from "react";
import { useGetMoviesQuery } from '../../generated/types.d'

export default function MovieList() {
  const { loading, error, data } = useGetMoviesQuery()
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
          <p>owner: {movie.owner.firstName} {movie.owner.lastName}</p>
        </div>
      ))}
    </div>
  );
}
