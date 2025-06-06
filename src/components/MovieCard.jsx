// src/components/MovieCard.jsx
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import "./MovieCard.css";

export default function MovieCard({ data }) {
  const navigate = useNavigate();
  const {
    id,
    title,
    director,
    genre,
    release_year,
    abstract,
    average_vote,
    image,
  } = data;

  const imageUrl = image
    ? `http://localhost:4000/images/movies/${image}`
    : "/placeholder.jpg";

  const vote = average_vote ? Number(average_vote) : 0;
  const fullStars = Math.round(vote);

  const handleClick = () => {
    navigate(`/movies/${id}`);
  };

  return (
    <div className="movie-card">
      <div className="card h-100 shadow-sm border-0">
        <img
          src={imageUrl}
          alt={`Locandina del film ${title}`}
          className="card-img-top"
          onError={(e) => {
            console.warn("Errore immagine:", e.target.src);
            e.target.src = "/placeholder.jpg";
          }}
        />

        <div className="card-body d-flex flex-column">
          <h5 className="card-title">{title}</h5>
          <p className="card-subtitle mb-2">
            🎬 {director} | {genre || "N/D"} | {release_year || "N/D"}
          </p>

          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={i < fullStars ? solidStar : emptyStar}
                className="text-warning me-1"
              />
            ))}
            <span className="text-muted ms-2">({vote.toFixed(1)})</span>
          </div>

          <p className="card-text flex-grow-1">
            {abstract?.length > 100 ? abstract.slice(0, 100) + "..." : abstract}
          </p>

          <button
            onClick={handleClick}
            className="btn btn-warning text-white fw-semibold mt-auto"
          >
            Scheda Film
          </button>
        </div>
      </div>
    </div>
  );
}
