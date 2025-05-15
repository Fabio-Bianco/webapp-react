import { useState, useEffect } from "react";
import axios from "axios";
import "./AddMovieForm.css";

export default function AddMovieForm({ onSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    director: "",
    genre: "",
    release_year: "",
    abstract: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (formData.image) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result);
      reader.readAsDataURL(formData.image);
    } else {
      setPreview(null);
    }
  }, [formData.image]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      const file = files[0];
      if (file && !["image/jpeg", "image/png"].includes(file.type)) {
        setError("Solo immagini .jpg o .png sono accettate.");
        return;
      }
      setError(null);
      setFormData({ ...formData, image: file });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
      await axios.post("http://localhost:4000/movies", data);
      setMessage("✅ Film salvato con successo.");
      if (onSuccess) onSuccess(); // Chiude modale + ricarica
    } catch (err) {
      console.error(err);
      setError("❌ Errore durante il salvataggio.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="add-movie-form">
      <input name="title" placeholder="Titolo" value={formData.title} onChange={handleChange} required />
      <input name="director" placeholder="Regista" value={formData.director} onChange={handleChange} required />
      <input name="genre" placeholder="Genere" value={formData.genre} onChange={handleChange} required />
      <input type="number" name="release_year" placeholder="Anno" value={formData.release_year} onChange={handleChange} required />
      <textarea name="abstract" placeholder="Trama" value={formData.abstract} onChange={handleChange} required />
      <input type="file" name="image" accept="image/*" onChange={handleChange} required />

      {preview && (
        <img src={preview} alt="Anteprima" className="img-thumbnail mb-2" style={{ maxHeight: "150px" }} />
      )}

      <button className="btn btn-primary mt-2">Salva film</button>

      {message && <div className="alert alert-success mt-2">{message}</div>}
      {error && <div className="alert alert-danger mt-2">{error}</div>}
    </form>
  );
}
