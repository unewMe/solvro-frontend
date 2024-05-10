import React from 'react';
import Favorites from '../components/Favorites';
import NavBar from '../components/NavBar';

import { useAppContext } from '../components/appContext';

const Fav = () => {
    const { favorites, handleFavorite } = useAppContext();

    return (
        <div>
            <NavBar />
            <Favorites favorites={favorites} handleFavorite={handleFavorite} />
        </div>
    )
}

export default Fav;