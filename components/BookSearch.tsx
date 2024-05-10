import React, { useState, useEffect } from 'react';
import Book from './Book';
import styles from '../styles/book-search.module.css';

const baseUrl = 'https://gutendex.com/books';
export const languages = ['pl', 'en', 'fr'];


export function toggleStringInList(string, list) {
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


function BooksSearch({ favorites, handleFavorite}) {
  const [books, setBooks] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currUrl, setCurrUrl] = useState(baseUrl);
  const [prevUrl, setPrevUrl] = useState("");
  const [nextUrl, setNextUrl] = useState("");
  const [filterTags, setFilterdTags] = useState([]);
  console.log(filterTags);



  useEffect(() => {
    const delay = searchQuery ? 300 : 0; // no delay for initial fetch
    const getBooksByDebouncing = setTimeout(async () => {
      const url = new URL(currUrl);
      if (searchQuery) {
        url.searchParams.append('search', searchQuery);
      }
      console.log(filterTags);
    
      if(filterTags.length >= 1){
        url.searchParams.append('languages', filterTags.join(','));
      }

      console.log(url);

      try {
        const response = await fetch(url);
        const data = await response.json();
        const booksWithHtml = data.results.map(book => {
          return {
            ...book,
            htmlLink: book.formats['text/html'] 
          };
        });
        setBooks(booksWithHtml);
        setPrevUrl(data.previous);
        setNextUrl(data.next);
      } catch (error) {
        console.error('An error occured:', error);
      }
    }, delay);

    return () => clearTimeout(getBooksByDebouncing)
   
  }, [searchQuery, currUrl, filterTags]); 


  if(!books ){
    return <div className={styles.loading}>Loading books...</div>;
  }

  return (
    <div>
    <div className={styles.content_container}>

      <div>
        <input className={styles.search_box}
          type="text"
          value={searchQuery}
          onChange={(e) => { setCurrUrl(baseUrl); setSearchQuery(e.target.value); }}
          placeholder="Search for books..."
        />
      </div>
  
    <div>
    {
      languages.map(clickedLanguage => (
        <button className={`${styles.language_button} ${filterTags.includes(clickedLanguage) ? styles.active : ''}`} onClick={() => { 
          var newList = [...filterTags];
          toggleStringInList(clickedLanguage, newList);
          setBooks(null);
            setCurrUrl(baseUrl);
            setFilterdTags(newList);
        }}>{clickedLanguage.toUpperCase()}</button>
      ))
    }
    </div>

    <div className={styles.nav_pages}>
      {prevUrl && <div><button className={styles.page_button} onClick={() => {setBooks(null); setCurrUrl(prevUrl); }}>Previous</button></div>}
      {nextUrl && <div><button className={styles.page_button} onClick={() => {setBooks(null); setCurrUrl(nextUrl); }}>Next</button></div>}
    </div>

    

    </div>


    <div>
    {books.map(book => (
        <Book 
          key={book.id} 
          book={book} 
          isFavorite={favorites.some(f => f.id === book.id)}
          handleFavorite={handleFavorite}
        />
      ))}
    </div>
    </div>
  );
}

export default BooksSearch;
