import { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from './search.module.css';

const Search = () => {
    const router = useRouter();
    const [query, setQuery] = useState('');
    const [movies, setMovies] = useState([]);

    const fetchMovies = async () => {
        const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=a2b07930&s`);
        const fetchedMovies = response.data.Search || [];
        setMovies(fetchedMovies);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetchMovies();
    };

    useEffect(() => {
        const { movies: savedMovies, query: savedQuery } = router.query;
        if (savedMovies) {
            setMovies(JSON.parse(savedMovies));
        }
        if (savedQuery) {
            setQuery(savedQuery);
        }
    }, [router.query]);

    return (
        <div className={styles.container}>
            <h1 className={styles.zag}>Поиск Фильмов</h1>
            <form className={styles.formSearch} onSubmit={handleSubmit}>
                <input className={styles.inp}
                    type="text" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    placeholder="Поиск фильмов ..."
                />
                <button className={styles.btn} type="submit">Поиск</button>
            </form>
            <div>
                {movies.length > 0 && (
                    <ul className={styles['movie-list']}>
                        {movies.map((movie) => (
                            <li key={movie.imdbID}>
                                <Link href={{
                                    pathname: `/movie/${movie.imdbID}`,
                                    query: { srcMovies: JSON.stringify(movies), query: query }
                                    }}>
                                    <img 
                                        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/150'} 
                                        alt={movie.Title} 
                                    />
                                    <p>{movie.Title} ({movie.Year})</p>
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
};

export default Search;