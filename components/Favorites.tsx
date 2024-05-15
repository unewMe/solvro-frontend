import React, { useEffect, useState } from "react";

import styles from "../styles/book-search.module.css";
import { Book } from "./Book";
import { languages, toggleStringInList } from "./BookSearch";
import type { AppContextType, Book_t } from "./appContext";

function Favorites({ favorites, handleFavorite }: AppContextType) {
  const [favoriteBooks, setFavoriteBooks] = useState<Book_t[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filterTags, setFilterdTags] = useState<string[]>([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    setIsFirstLoad(false);

    const savedFavoritesJSON = localStorage.getItem("favorites");
    const savedFavorites =
      savedFavoritesJSON !== null
        ? (JSON.parse(savedFavoritesJSON) as Book_t[])
        : [];

    const filtered = savedFavorites.filter((book) => {
      const matchesSearchQuery = book.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesLanguage =
        filterTags.length === 0 ||
        book.languages.some((language) => filterTags.includes(language.name));

      return matchesSearchQuery && matchesLanguage;
    });

    setFavoriteBooks(filtered);
  }, [favorites, searchQuery, filterTags]);

  const hasNoFavorites = () => {
    const savedFavoritesJSON = localStorage.getItem("favorites");
    if (savedFavoritesJSON !== null) {
      const savedFavorites = JSON.parse(savedFavoritesJSON) as Book_t[];
      return savedFavorites.length === 0;
    }
    return true;
  };

  if (
    (!favoriteBooks.length &&
      !searchQuery &&
      !filterTags.length &&
      isFirstLoad) ||
    hasNoFavorites()
  ) {
    return <div className={styles.loading}>Brak ulubionych książek.</div>;
  }

  return (
    <div>
      <div className={styles.content_container}>
        <div>
          <input
            className={styles.search_box}
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
            }}
            placeholder="Search for books..."
          />
        </div>

        <div>
          {languages.map((clickedLanguage) => (
            <button
              key={clickedLanguage}
              className={`${styles.language_button} ${filterTags.includes(clickedLanguage) ? styles.active : ""}`}
              onClick={() => {
                const newList = [...filterTags];
                toggleStringInList(clickedLanguage, newList);
                setFavoriteBooks([]);
                setFilterdTags(newList);
              }}
            >
              {clickedLanguage.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      <div>
        {favoriteBooks.map((book: Book_t) => (
          <Book
            key={book.id}
            book={book}
            isFavorite={true} // All books in this list are favorites
            handleFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export { Favorites };
