import { useState } from "react";
import axios from "axios";
import "./ReviewForm.css";

export default function ReviewForm({ movieId, onReviewAdded }) {
  const initialValues = {
    name: "",
    vote: 1,
    text: "",
  };

  const [formData, setFormData] = useState(initialValues);

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    let currentValue = value;
    if (name === "vote") {
      currentValue = parseInt(value); // Assicura tipo number
    }

    setFormData((prev) => ({
      ...prev,
      [name]: currentValue,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:4000/movies/${movieId}/reviews`, formData);

      setFormData(initialValues);
      if (onReviewAdded) onReviewAdded();
    } catch (err) {
      console.error("Errore invio recensione:", err);
    }
  };

  return (
    <div className="review-form-container">
      <div className="card review-form shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">Lascia una recensione</h5>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">Il tuo nome</label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                placeholder="Mario Rossi"
                value={formData.name}
                onChange={handleFormChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="vote" className="form-label">Voto</label>
              <select
                id="vote"
                name="vote"
                className="form-select"
                value={formData.vote}
                onChange={handleFormChange}
              >
                {[1, 2, 3, 4, 5].map((v) => (
                  <option key={v} value={v}>
                    {v} {v === 1 ? "stella" : "stelle"}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label htmlFor="text" className="form-label">Recensione</label>
              <textarea
                id="text"
                name="text"
                className="form-control"
                rows="4"
                placeholder="Scrivi il tuo commento..."
                value={formData.text}
                onChange={handleFormChange}
              />
            </div>

            <button type="submit" className="btn btn-warning w-100 fw-semibold">
              Invia recensione
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
