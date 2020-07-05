import React from "react";
import MovieList from "./components/MovieList/MovieList";
import Input from "./components/Input/Input";

const App: React.FC = () => {
  return (
    <div>
      <MovieList />
      <Input />
    </div>
  );
};

export default App;
