import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/MovieCard";

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:4000/movies")
      .then((res) => setMovies(res.data))
      .catch((err) => console.error("Errore nel caricamento:", err));
  }, []);

  return (
    <div className="container py-4">
      <h2 className="mb-4 fw-bold">🎬 Tutti i film</h2>

      <div className="row gx-3 gy-4">
        {movies.map((movie) => (
          <div className="col-6 col-sm-6 col-md-4 col-lg-3 d-flex justify-content-center" key={movie.id}>
            <MovieCard data={movie} />
          </div>
        ))}
      </div>
    </div>
  );
}
