"use client";

import styles from "./Search.module.css";

export const Search = () => {
  const handleSearchClick = () => console.log("todo handleSearchClick");

  return (
    <div className={styles.pageContent}>
      <div className={styles.imageContainer}>
        <div className={styles.searchContainer}>
          <p className={styles.shopText}>МАГАЗИН</p>
          <p className={styles.searchText}>Части втора употреба</p>
          <button className={styles.searchBtn} onClick={handleSearchClick}>
            ТЪРСИ
          </button>
        </div>
      </div>
    </div>
  );
};
