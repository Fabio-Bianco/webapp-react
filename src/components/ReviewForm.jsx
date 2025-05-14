import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

export default function ReviewForm({ movieId, onReviewAdded }) {
  const [name, setName] = useState("");
  const [vote, setVote] = useState(1);
  const [text, setText] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4000/movies/${movieId}/reviews`, {
        name,
        vote: Number(vote),
        text,
      });

      setName("");
      setVote(1);
      setText("");

      if (onReviewAdded) onReviewAdded(); // 🔄 Ricarica recensioni
    } catch (err) {
      console.error("Errore invio recensione:", err);
    }
  };

  return (
    <div className="card review-form shadow-sm mt-4">
      <div className="card-body">
        <h5 className="card-title mb-3 text-dark">Lascia una recensione</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Il tuo nome</label>
            <input
              className="form-control"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Mario Rossi"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Voto</label>
            <select
              className="form-select"
              value={vote}
              onChange={(e) => setVote(e.target.value)}
            >
              {[1, 2, 3, 4, 5].map((v) => (
                <option key={v} value={v}>
                  {v} stella{v > 1 ? "e" : ""}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Recensione</label>
            <textarea
              className="form-control"
              rows="3"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Scrivi il tuo commento..."
            />
          </div>

          <button className="btn btn-warning fw-semibold">
            Invia recensione
          </button>
        </form>
      </div>
    </div>
  );
}
