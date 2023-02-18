import React, { useState } from "react";

import MoviesList from "./components/MoviesList";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoading,setIsLodaing] = useState(false);
  const [error,setError] = useState(null);

  async function fetchMoviesHandler() {
    setIsLodaing(true);
    setError(null);

    try{
      const response = await fetch("https://swapi.dev/api/film/");
      // https://swapi.dev/api/films/ <-- correct
      if(!response.ok)
      {
        throw new Error("Something went wrong!");
      }
      const data = await response.json();

      const transformedMovies = data?.results?.map((moviesData) => {
        return {
          id: moviesData?.episode_id,
          title: moviesData?.title,
          openingText: moviesData?.opening_crawl,
          releaseDate: moviesData?.release_date,
        };
      });
  
      setMovies(transformedMovies);
      setIsLodaing(false);
    }
    catch(error)
    {
      setError(error.message);
    }
    setIsLodaing(false); //no matter success or failure we stop loading
  }


  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoading) {
    content = <p>Loading...</p>;
  }

  return (
    <React.Fragment>
      <section>
        <button onClick={fetchMoviesHandler}>Fetch Movies</button>
      </section>
      <section>
        {content}
      </section>
    </React.Fragment>
  );
}

export default App;
