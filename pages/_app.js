import '../styles/global.css';

import React, { useState, useEffect } from 'react';
import { AppContextProvider } from '../components/appContext';

function MyApp({ Component, pageProps }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavorites(savedFavorites);
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  const handleFavorite = (book) => {
    setFavorites((prevFavorites) => {
      const isAlreadyFavorite = prevFavorites.some(f => f.id === book.id);
      const updatedFavorites = isAlreadyFavorite
        ? prevFavorites.filter(f => f.id !== book.id)
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
