// src/pages/MoviesPage.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import "../components/MovieCard.css";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/movies")
      .then((res) => {
        setMovies(res.data);
        setError(null);
      })
      .catch((err) => {
        console.error("Errore nel caricamento:", err);
        setError("Impossibile caricare i film. Riprova più tardi.");
      });
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4">🎬 Tutti i film</h2>

      {error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <div className="movie-grid">
          {movies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
