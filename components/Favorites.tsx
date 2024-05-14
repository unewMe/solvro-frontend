import React, { useState, useEffect } from 'react';
import {Book} from './Book';
import styles from '../styles/book-search.module.css';
import { languages, toggleStringInList } from './BookSearch';
import type { AppContextType } from './appContext';

function Favorites({ favorites, handleFavorite }: AppContextType) {
  const [favoriteBooks, setFavoriteBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterTags, setFilterdTags] = useState([]);
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {

    setIsFirstLoad(false);

    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || favorites;

    const filtered = savedFavorites.filter(book => {
    const matchesSearchQuery = book.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLanguage = filterTags.length == 0 || book.languages.some(language => filterTags.includes(language));
    
    return matchesSearchQuery && matchesLanguage;
  });


    setFavoriteBooks(filtered);
  }, [favorites, searchQuery, filterTags]);

  if ((!favoriteBooks.length && !searchQuery && !filterTags.length && isFirstLoad) || JSON.parse(localStorage.getItem('favorites')).length == 0){
    return <div className={styles.loading}>Brak ulubionych książek.</div>;
  }

  return (
  <div>
    <div className={styles.content_container}>
      <div>
      <input className={styles.search_box}
        type="text"
        value={searchQuery}
        onChange={(e) => { setSearchQuery(e.target.value); }}
        placeholder="Search for books..."
      />
      </div>
    
      <div>
      {
        languages.map(clickedLanguage => (
          <button className={`${styles.language_button} ${filterTags.includes(clickedLanguage) ? styles.active : ''}`} onClick={() => { 
            var newList = [...filterTags];
            toggleStringInList(clickedLanguage, newList);
            setFavoriteBooks([]);
              setFilterdTags(newList);
          }}>{clickedLanguage.toUpperCase()}</button>
        ))
      }

      </div>
    </div>

    <div>
      {favoriteBooks.map(book  => (
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

export {Favorites};
