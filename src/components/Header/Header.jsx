import React, { useState } from "react";
import styles from "./Header.module.css";

const Header = ({ movies, setFilteredMovies }) => {
  const [showSortMenu, setShowSortMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortType, setSortType] = useState(null);

  const toggleSortMenu = () => {
    setShowSortMenu(!showSortMenu);
  };

  const closeSortMenu = () => {
    setShowSortMenu(false);
  };

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);

    const filteredMovies = movies.filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );

    setFilteredMovies(filteredMovies);
  };

  const handleSort = (type) => {
    const sortedMovies = [...movies].sort((a, b) => {
      if (type === "episode_id") {
        return a[type] - b[type];
      } else if (
        type === "release_date" &&
        typeof a[type] === "string" &&
        typeof b[type] === "string"
      ) {
        return sortType === type
          ? b[type].localeCompare(a[type])
          : a[type].localeCompare(b[type]);
      } else {
        return 0;
      }
    });

    setSortType(type);
    setFilteredMovies(sortedMovies);
    closeSortMenu();
  };
  return (
    <div className={styles.container}>
      <button onClick={toggleSortMenu}>Sort by...</button>
      {showSortMenu && (
        <div className={styles.sortMenu}>
          <div className={styles.menuHeader}>
            <span>Sort by</span>
            <button onClick={closeSortMenu}>&times;</button>
          </div>
          <div style={{ cursor: "pointer", padding: 10, gap: 20 }}>
            <div onClick={() => handleSort("episode_id")}>Episode</div>
            <div onClick={() => handleSort("release_date")}>Year</div>
          </div>
        </div>
      )}
      <input
        type="text"
        placeholder="Type to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
};

export default Header;
