import '../styles/global.css';
import type { Book_t } from '../components/appContext';

import React, { useState, useEffect } from 'react';
import { AppContextProvider } from '../components/appContext';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  const [favorites, setFavorites] = useState<Book_t[]>([]);

  useEffect(() => {
        const savedFavoritesJSON = localStorage.getItem('favorites');
        const savedFavorites = (savedFavoritesJSON !== null) ? JSON.parse(savedFavoritesJSON) as Book_t[] : [];
        setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (book: Book_t) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some((f:Book_t) => f.id === book.id);
      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter((f: Book_t) => f.id !== book.id)
        : [...prevFavorites, book];
      localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  return (
      <AppContextProvider value={{ favorites, handleFavorite }}>
        <Component {...pageProps} />
      </AppContextProvider>
  );
}

export default MyApp;
