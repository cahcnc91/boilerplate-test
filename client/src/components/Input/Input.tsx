import React, { useState } from "react";
import { useCreateMovieMutation, GetMoviesDocument, GetMoviesQuery, useGetMoviesQuery } from '../../generated/types.d'

export default function Input() {
  const [newMovie, setNewMovie] = useState("");
  const [createMovie, { error }] = useCreateMovieMutation();

  const pressedEnter = async (e: number) => {
    if (e == 13) {
      await createMovie({
        variables: { options: { minutes: 100, title: newMovie } },
        update: (cache, {data}) => {
          const movies = cache.readQuery<GetMoviesQuery>({
            query: GetMoviesDocument
          });
          if(!data){
            return null
          }

          console.log(data.createMovie)
          console.log(movies?.movies)

          cache.writeQuery({
            query: GetMoviesDocument,
            data: {
              movies: [
                ...movies?.movies!,
                data.createMovie
              ]
            }
          })
        }
        
      }).catch(err => console.log(err))
    }
  };

  if(error){
    return <div>error !</div>
  }

  return (
    <input
      value={newMovie}
      onChange={(e) => setNewMovie(e.target.value)}
      onKeyDown={(e) => pressedEnter(e.keyCode)}
    />
  );
}
