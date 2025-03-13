import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const MovieDetail = () => {
    const router = useRouter();
    const { id, srcMovies, query } = router.query;
    const [movie, setMovie] = useState(null);

    useEffect(() => {
        if (id) {
            fetchMovieDetails();
        }
    }, [id]);

    const fetchMovieDetails = async () => {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=a2b07930&s`);
        setMovie(response.data);
    };

    if (!movie) return <p>Загрузка...</p>;

    return (
        <div style={{ padding: '20px' }}>
            <button onClick={() => router.push({
                pathname: '/',
                query: { movies: srcMovies, query: query }
            })} style={{ marginBottom: '20px' }}>Назад</button>
            <h1>{movie.Title} ({movie.Year})</h1>
            <img src={movie.Poster} alt={movie.Title} style={{ width: '200px', borderRadius: '8px' }} />
            <p><strong>Режиссер:</strong> {movie.Director}</p>
            <p><strong>Актеры:</strong> {movie.Actors}</p>
            <p><strong>Жанр:</strong> {movie.Genre}</p>
            <p><strong>Описание:</strong> {movie.Plot}</p>
            <p><strong>Рейтинг:</strong> {movie.imdbRating}</p>
            <p><strong>Время:</strong> {movie.Runtime}</p>
        </div>
    );
};

export default MovieDetail;