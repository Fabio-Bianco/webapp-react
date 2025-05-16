import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import AddMovieForm from "../components/AddMovieForm";
import "../components/MovieCard.css";
import "bootstrap/dist/css/bootstrap.min.css";


export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const [searchParams] = useSearchParams();
  const [showModal, setShowModal] = useState(false);

  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  const fetchMovies = () => {
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
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchQuery) ||
    movie.director.toLowerCase().includes(searchQuery)
  );

  const handleFormSuccess = () => {
    setShowModal(false);
    setMessage("✅ Film aggiunto con successo!");
    fetchMovies();
    setTimeout(() => setMessage(null), 3000);
  };

  return (
    <div className="container py-4">
      <h2 className="mb-4"> Movies</h2>

      {/* Bottone per aprire la modale */}
      <button
        className="btn btn-outline-warning mb-3"
        onClick={() => setShowModal(true)}
      >
         Aggiungi nuovo film
      </button>

      {/* ✅ Messaggio di successo */}
      {message && <div className="alert alert-success">{message}</div>}

      {/* ❌ Messaggio di errore */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* 💡 Lista dei film */}
      <div className="movie-grid">
        {filteredMovies.length > 0 ? (
          filteredMovies.map((movie) => (
            <MovieCard key={movie.id} data={movie} />
          ))
        ) : (
          <p className="text-muted">Nessun film trovato.</p>
        )}
      </div>

      {/* 🧱 Modal Bootstrap */}
      {showModal && (
        <div className="modal d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">

              <div className="modal-header">
                <h5 className="modal-title">Aggiungi un nuovo film</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body">
                <AddMovieForm onSuccess={handleFormSuccess} />
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
