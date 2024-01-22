import React from "react";
import styles from "./App.module.css";
import MovieList from "./components/MovieList/MovieList.jsx";
function App() {
  return (
    <div>
      <h1 className={styles.heading}>Star Wars Movies App</h1>
      <MovieList />
    </div>
  );
}

export default App;
