import React, { useEffect, useState } from "react";

import styles from "../styles/book-search.module.css";
import { Book } from "./Book";
import type { AppContextType, Book_t, JsonResponse } from "./appContext";

const baseUrl = "https://gutendex.com/books";
export const languages = ["pl", "en", "fr"];

const DELAY = 300;

export function toggleStringInList(string: string, list: string[]): string[] {
  const index = list.indexOf(string);
  if (index === -1) {
    // String not found in the list, so add it
    list.push(string);
  } else {
    // String found in the list, so remove it
    list.splice(index, 1);
  }
  return list;
}

function BooksSearch({ favorites, handleFavorite }: AppContextType) {
  const [books, setBooks] = useState<Book_t[] | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [currUrl, setCurrUrl] = useState(baseUrl);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [filterTags, setFilterdTags] = useState<string[]>([]);

  useEffect(() => {
    const delay = searchQuery ? DELAY : 0; // no delay for initial fetch
    const getBooksByDebouncing = setTimeout(() => {
        const fetchData = async () => {
            const url = new URL(currUrl);
            if (searchQuery) {
                url.searchParams.append("search", searchQuery);
            }

            if (filterTags.length >= 1) {
                url.searchParams.append("languages", filterTags.join(","));
            }

            try {
                const response = await fetch(url);
                const data = (await response.json()) as JsonResponse;
                const booksWithHtml = data.results.map((book) => {
                    return {
                        ...book,
                        htmlLink: book.formats["text/html"],
                    };
                });
                setBooks(booksWithHtml);
                setPrevUrl(data.previous);
                setNextUrl(data.next);
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error("Error fetching books", error);
            }
        };
        void fetchData();
    }, delay);

    return () => {clearTimeout(getBooksByDebouncing)};
}, [searchQuery, currUrl, filterTags]);

  if (!books) {
    return <div className={styles.loading}>Loading books...</div>;
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
              setCurrUrl(baseUrl);
              setSearchQuery(e.target.value);
            }}
            placeholder="Search for books..."
          />
        </div>

        <div>
          {languages.map((clickedLanguage) => (
            <button
            key={clickedLanguage} // Unique key prop added here
            className={`${styles.language_button} ${filterTags.includes(clickedLanguage) ? styles.active : ""}`}
            onClick={() => {
              const newList = [...filterTags];
              toggleStringInList(clickedLanguage, newList);
              setBooks(null);
              setCurrUrl(baseUrl);
              setFilterdTags(newList);
            }}
          >
              {clickedLanguage.toUpperCase()}
            </button>
          ))}
        </div>

        <div className={styles.nav_pages}>
          {prevUrl ? (
            <div>
              <button
                className={styles.page_button}
                onClick={() => {
                  setBooks(null);
                  setCurrUrl(prevUrl);
                }}
              >
                Previous
              </button>
            </div>
          ) : null}
          {nextUrl ? (
            <div>
              <button
                className={styles.page_button}
                onClick={() => {
                  setBooks(null);
                  setCurrUrl(nextUrl);
                }}
              >
                Next
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <div>
        {books.map((book) => (
          <Book
            key={book.id}
            book={book}
            isFavorite={favorites.some((f: Book_t) => f.id === book.id)}
            handleFavorite={handleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export { BooksSearch };
