import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./MovieList.module.css";
import ToRoman from "../ToRoman/ToRoman";
import Header from "../Header/Header";

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [selectedMovies, setSelectedMovies] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://swapi.dev/api/films/?format=json"
        );
        setMovies(response.data.results);
        setFilteredMovies(response.data.results);
      } catch (error) {
        console.error("Error fetching movies:", error);
        setMovies([]);
        setFilteredMovies([]);
      }
    };

    fetchData();
  }, []);

  const handleApiItemClick = (movies) => {
    setSelectedMovies(movies);
  };
  return (
    <div>
      <Header movies={movies} setFilteredMovies={setFilteredMovies} />
      <div className={styles.appContainer}>
        <div className={styles.column}>
          {filteredMovies.length === 0 ? (
            <div className={styles.no_data}>No Data Found</div>
          ) : (
            <ul>
              {filteredMovies.map((movie) => (
                <li
                  className={styles.list}
                  key={movie.episode_id}
                  onClick={() => handleApiItemClick(movie)}
                >
                  <span>
                    Episode {movie.episode_id} Episode{" "}
                    {ToRoman(movie.episode_id)} - {movie.title}
                  </span>
                  <span>{movie.release_date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={styles.column}>
          {selectedMovies ? (
            <div className={styles.description}>
              <h1>
                Episode {ToRoman(selectedMovies.episode_id)} -
                {selectedMovies.title}
              </h1>
              <p>{selectedMovies.opening_crawl}</p>
              <p>Directed by : {selectedMovies.director}</p>
            </div>
          ) : (
            <p className={styles.no_data}>No movie is selected</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
