import React, { useState, useEffect } from 'react';
import './App.css';
import { moviesData } from './moviesData';

const MoviesPerPage = 12;

const MovieCard = ({ movie }) => {
    return (
        <div className="movie-card">
            <img src={movie.moviemainphotos[0]} alt={movie.movietitle} className="movie-image" />
            <div className="movie-info">
                <h3 className="movie-title">{movie.movietitle}</h3>
                <p><strong>Languages:</strong> {movie.movielanguages.join(', ')}</p>
                <p><strong>Countries:</strong> {movie.moviecountries.join(', ')}</p>
                <p><strong>Genres:</strong> {movie.moviegenres.join(', ')}</p>
            </div>
        </div>
    );
};

const MovieList = ({ movies }) => {
    return (
        <div className="movie-list">
            {movies.map((movie, index) => (
                <MovieCard key={index} movie={movie} />
            ))}
        </div>
    );
};

const FilterForm = ({ onChange }) => {
    const [language, setLanguage] = useState('');
    const [country, setCountry] = useState('');
    const [genre, setGenre] = useState('');

    const handleFilterChange = () => {
        onChange(language, country, genre);
    };

    return (
        <div className="filter-form">
            <div>
                <label htmlFor="language">Language:</label>
                <select id="language" name="language" value={language} onChange={(e) => setLanguage(e.target.value)}>
                    <option value="">All</option>
                    <option value="Hindi">Hindi</option>
                    <option value="English">English</option>
                    <option value="Malayalam">Malayalam</option>
                    <option value="Tamil">Tamil</option>
                    <option value="Telugu">Telugu</option>
                    <option value="Kannada">Kannada</option>
                    <option value="Japanese">Japanese</option>
                    <option value="Chinese">Chinese</option>
                    <option value="Spanish">Spanish</option>
                    <option value="Korean">Korean</option>
                </select>
            </div>
            <div>
                <label htmlFor="country">Country:</label>
                <select id="country" name="country" value={country} onChange={(e) => setCountry(e.target.value)}>
                    <option value="">All</option>
                    <option value="Australia">Australia</option>
                    <option value="Canada">Canada</option>
                    <option value="Germany">Germany</option>
                    <option value="France">France</option>
                    <option value="United Kingdom">United Kingdom</option>
                    <option value="Ireland">Ireland</option>
                    <option value="India">India</option>
                    <option value="Norway">Norway</option>
                    <option value="United States">United States</option>
                </select>
            </div>
            <div>
                <label htmlFor="genre">Genre:</label>
                <select id="genre" name="genre" value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value="">All</option>
                    <option value="Action">Action</option>
                    <option value="Adventure">Adventure</option>
                    <option value="Fantasy">Fantasy</option>
                    <option value="Documentary">Documentary</option>
                    <option value="Crime">Crime</option>
                </select>
            </div>
            <button onClick={handleFilterChange}>Apply Filters</button>
        </div>
    );
};

const App = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        setFilteredMovies(moviesData);
        setTotalPages(Math.ceil(moviesData.length / MoviesPerPage));
    }, []);

    const handleFilterChange = (language, country, genre) => {
        let filtered = moviesData;
        if (language !== '') {
            filtered = filtered.filter(movie => movie.movielanguages.includes(language));
        }
        if (country !== '') {
            filtered = filtered.filter(movie => movie.moviecountries.includes(country));
        }
        if (genre !== '') {
            filtered = filtered.filter(movie => movie.moviegenres.includes(genre));
        }
        setFilteredMovies(filtered);
        setCurrentPage(1);
        setTotalPages(Math.ceil(filtered.length / MoviesPerPage));
    };

    const handleNextPage = () => {
        setCurrentPage(prevPage => prevPage + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage(prevPage => prevPage - 1);
    };

    const startIndex = (currentPage - 1) * MoviesPerPage;
    const endIndex = startIndex + MoviesPerPage;
    const currentMovies = filteredMovies.slice(startIndex, endIndex);

    return (
        <div className="app">
            <h1 className="app-title">Movie Library</h1>
            <FilterForm onChange={handleFilterChange} />
            <MovieList movies={currentMovies} />
            <div className="pagination">
                <button onClick={handlePrevPage} disabled={currentPage === 1}>Previous</button>
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
            </div>
        </div>
    );
};

export default App;
