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
  const [showForm, setShowForm] = useState(false);

  const fetchMovie = async () => {
    try {
      const res = await axios.get(`http://localhost:4000/movies/${id}`);
      setMovie(res.data);
    } catch (err) {
      console.error("Errore caricamento film:", err);
    }
  };

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const handleReviewAdded = () => {
    fetchMovie();
    setShowForm(false);
  };

  if (!movie) return <p>Caricamento...</p>;

  return (
    <div className="container mt-4">
      <h2>{movie.title}</h2>
      <p><strong>Regista:</strong> {movie.director}</p>
      <p><strong>Anno:</strong> {movie.release_year}</p>
      <p>{movie.abstract}</p>

      <hr />
      <h4>Recensioni</h4>

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

      {!showForm && (
        <button className="btn btn-primary mt-3" onClick={() => setShowForm(true)}>
          Aggiungi recensione
        </button>
      )}

      {showForm && (
        <ReviewForm movieId={id} onReviewAdded={handleReviewAdded} />
      )}
    </div>
  );
}
