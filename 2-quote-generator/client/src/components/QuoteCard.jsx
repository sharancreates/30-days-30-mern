import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteCard = () => {
    const [quote, setQuote] = useState({ text: '', author: '' });
    const [loading, setLoading] = useState(false);
    const [saved, setSaved] = useState(false);

    // fetching random quote
    const fetchNewQuote = async () => {
        setLoading(true);
        setSaved(false); 
        try {
            const response = await axios.get('https://dummyjson.com/quotes/random');
            setQuote({
                text: response.data.quote,
                author: response.data.author
            });
        } 
        catch (error) {
            console.error("Error fetching quote:", error);
        }
        setLoading(false);
    };

    //save the quote
    const saveToFavorites = async () => {
        try {
            await axios.post('http://localhost:5000/api/quotes', quote);
            setSaved(true); 
            alert('Quote saved to favorites!');
        } catch (error) {
            console.error("Error saving quote:", error);
            alert('Failed to save (or duplicate).');
        }
    };

    //fetch a quote as soon as the component loads
    useEffect(() => {
        fetchNewQuote();
    }, []);

    return (
        <div className="quote-card">
            {loading ? (<p>Loading...</p>) : (
                <>
                    <p className="quote-text">"{quote.text}"</p>
                    <p className="quote-author">- {quote.author}</p>
                </>
            )}

            <div className="buttons">
                <button onClick={fetchNewQuote} className="btn-new">
                    New Quote
                </button>
                
                <button 
                    onClick={saveToFavorites} 
                    className="btn-save"
                    disabled={saved}//disable if already saved
                >
                    {saved ? 'Saved' : 'Save to Favorites'}
                </button>
            </div>
        </div>
    );
};

export default QuoteCard;