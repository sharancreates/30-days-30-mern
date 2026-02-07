import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Favorites = () => {
    const [favorites, setFavorites] = useState([]);

    // 1. Fetch saved quotes
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/quotes');
                setFavorites(response.data);
            } catch (error) {
                console.error("Error fetching favorites:", error);
            }
        };
        fetchFavorites();
    }, []);

    // 2. DELETE Function
    const deleteQuote = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/quotes/${id}`);
            // Filter out the deleted quote from the state so it disappears immediately
            setFavorites(favorites.filter((quote) => quote._id !== id));
        } catch (error) {
            console.error("Error deleting quote:", error);
        }
    };

    return (
        <div className="favorites-container">
            <h2>My Favorite Quotes Collection</h2>
            
            {favorites.length === 0 ? (
                <p>No favorites yet! Go save some.</p>
            ) : (
                <div className="favorites-grid">
                    {favorites.map((quote) => (
                        <div key={quote._id} className="favorite-card">
                            <p className="fav-text">"{quote.text}"</p>
                            <p className="fav-author">- {quote.author}</p>
                            <button className="btn-delete" onClick={() => deleteQuote(quote._id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;