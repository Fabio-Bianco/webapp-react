import { Link } from "react-router-dom";

export default function MovieCard({ data }) {
  const { id, title, image, average_vote } = data;

  const imageUrl = image
    ? `http://localhost:4000/images/movies/${image}`
    : "/placeholder.jpg";

  return (
    <div className="card movie-card shadow-sm h-100">
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
        <h5 className="card-title">{title}</h5>
        <p className="card-text text-muted">
          Voto medio: <strong>{average_vote?.toFixed(1) || "N/A"}</strong>
        </p>


      </div>
    </div>
  );
}
