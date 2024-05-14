import { BooksSearch } from "../components/BookSearch";
import { NavBar } from "../components/NavBar";
import { useAppContext } from "../components/appContext";

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
