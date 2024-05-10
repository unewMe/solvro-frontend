

import NavBar from '../components/NavBar';
import { useAppContext } from '../components/appContext';
import BooksSearch from '../components/BookSearch';

function Books() {
  const { favorites, handleFavorite } = useAppContext();

  return (
    <div>
      <NavBar />
      <BooksSearch favorites={favorites} handleFavorite={handleFavorite} />
    </div>
  );
}

export default Books;


