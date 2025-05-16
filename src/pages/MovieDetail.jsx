import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "../components/ReviewForm";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/movies/${id}`);
      setMovie(response.data);
      setError(null); // reset errore
    } catch (err) {
      console.error("Errore caricamento film:", err);
      setError("Impossibile caricare i dati del film. Riprova più tardi.");
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleReviewAdded = () => {
    fetchMovie();
    setShowForm(false);
  };

  if (error) {
    return <div className="alert alert-danger mt-4">{error}</div>;
  }

  if (!movie) {
    return (
      <div className="d-flex justify-content-center mt-5">
        <div className="spinner-border text-primary" role="status" />
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2>{movie.title}</h2>
      <p><strong>Regista:</strong> {movie.director}</p>
      <p><strong>Anno:</strong> {movie.release_year}</p>
      <p>{movie.abstract}</p>

      <div className="d-flex justify-content-between align-items-center mt-4 mb-3">
        <h4 className="mb-0">Recensioni</h4>
        {!showForm && (
          <button
            className="btn btn-warning fw-semibold"
            onClick={() => setShowForm(true)}
          >
            ➕ Aggiungi recensione
          </button>
        )}
      </div>


      {movie.reviews.length > 0 ? (
        movie.reviews.map((review) => (
          <div key={review.id} className="mb-3 border-bottom pb-2">
            <strong>{review.name}</strong>
            <div>
              {[...Array(5)].map((_, i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={i < review.vote ? solidStar : emptyStar}
                  className="text-warning me-1"
                />
              ))}
            </div>
            <p className="mt-1">{review.text}</p>
          </div>
        ))
      ) : (
        <p>Nessuna recensione ancora.</p>
      )}


      {showForm && (
        <ReviewForm movieId={id} onReviewAdded={handleReviewAdded} />
      )}
    </div>
  );
}
