import { useState } from 'react';
import axios from 'axios';
import styles from './search.module.css';

const Search = () => {
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=a2b07930&s`);
        setMovies(response.data.Search || []);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Поиск фильмов ..."
                />
                <button type="submit">Поиск</button>
            </form>
            <div>
                {movies.length > 0 && (
                    <ul className={styles['movie-list']}>
                        {movies.map((movie) => (
                            <li key={movie.imdbID}>
                                <img 
                                    src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
                                    alt={movie.Title} 
                                    style={{ width: '100px', marginRight: '10px' }}
                                />
                                {movie.Title} ({movie.Year})
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;