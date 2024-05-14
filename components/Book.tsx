import React from 'react';
import styles from '../styles/book.module.css';
import type { BookProps } from './appContext';

const Book = React.memo(function Book({ book, isFavorite, handleFavorite }: BookProps) {
  const handleFavoriteClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    handleFavorite(book);
};


  return (
    <div className={styles.book_item}>
      <div className={styles.book_text}>
        <h3 className={styles.book_title}>{book.title}</h3>
        <p className={styles.book_author}>by {book.authors.map(author => author.name).join(', ')}</p>
    </div>
      <div className={styles.book_actions}>
        <button className={styles.favorite_container} onClick={handleFavoriteClick}>
          {isFavorite
            ? <img src="/icons/heart-filled.svg" className={styles.heart_icon} alt="Remove from favorites" />
            : <img src="/icons/heart-icon.svg" className={styles.heart_icon} alt="Add to favorites" />}
        </button>
        <a href={book.htmlLink} target="_blank" rel="noreferrer" className={styles.book_link}>Read</a>
      </div>
    </div>
  );
});

export {Book};

