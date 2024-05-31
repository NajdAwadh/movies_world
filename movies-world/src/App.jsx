import React, { useState, useEffect } from 'react';
import './App.css';

const API_KEY = 'f0038fce';
const API_URL = `http://www.omdbapi.com/?apikey=${API_KEY}&`;

const App = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [movies, setMovies] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        const fetchInitialMovies = async () => {
            try {
                setError(false);
                const response = await fetch(`${API_URL}s=star%20wars`);
                if (!response.ok) {
                    throw new Error('Failed to fetch initial movies');
                }
                const data = await response.json();
                if (data.Response === 'True') {
                    setMovies(data.Search || []);
                } else {
                    setMovies([]);
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching initial movies:', error);
                setError(true);
            }
        };

        fetchInitialMovies();
    }, []);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                setError(false);
                const response = await fetch(`${API_URL}s=${searchTerm}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch movies');
                }
                const data = await response.json();
                if (data.Response === 'True') {
                    setMovies(data.Search || []);
                } else {
                    setMovies([]);
                    setError(true);
                }
            } catch (error) {
                console.error('Error fetching movies:', error);
                setError(true);
            }
        };

        if (searchTerm) {
            fetchMovies();
        }
    }, [searchTerm]);

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
        setError(false); // Reset error message when user types
    };

    return (
        <div className="App">
            <h1>Movies World</h1>
            <input
                type="text"
                placeholder="Search for a movie..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-box"
            />
            {error && <p className="error-message">Movie not found</p>}
            <div className="movies-list">
                {movies.map((movie) => (
                    <div key={movie.imdbID} className="movie-card">
                        <h2>{movie.Title}</h2>
                        <p>{movie.Year}</p>
                        <img src={movie.Poster} alt={`${movie.Title} Poster`} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default App;
