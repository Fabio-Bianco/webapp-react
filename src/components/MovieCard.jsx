import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import { faStar as emptyStar } from "@fortawesome/free-regular-svg-icons";
import "./MovieCard.css"; // 💡 CSS separato per styling

export default function MovieCard({ data }) {
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

  return (
    <div className="movie-card card shadow-sm">
      <img
        src={imageUrl}
        alt={title}
        className="card-img-top movie-image"
        onError={(e) => {
          console.warn("❌ Errore immagine:", e.target.src);
          e.target.src = "/placeholder.jpg";
        }}
      />

      <div className="card-body d-flex flex-column">
        <h5 className="card-title text-dark">{title}</h5>

        <div className="mb-2">
          <small className="text-muted">
            🎬 {director} | {genre || "N/D"} | {release_year || "N/D"}
          </small>
        </div>

        <div className="mb-2 d-flex align-items-center">
          {[...Array(5)].map((_, i) => (
            <FontAwesomeIcon
              key={i}
              icon={i < fullStars ? solidStar : emptyStar}
              className="text-warning me-1"
            />
          ))}
          <span className="ms-2 text-muted">({vote.toFixed(1)})</span>
        </div>

        <p className="card-text small text-muted mb-3">
          {abstract?.length > 100 ? abstract.slice(0, 100) + "..." : abstract}
        </p>

        <Link to={`/movies/${id}`} className="btn btn-warning mt-auto fw-semibold">
          Scheda Film
        </Link>
      </div>
    </div>
  );
}
