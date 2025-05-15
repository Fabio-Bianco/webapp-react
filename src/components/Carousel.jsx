// src/components/Carousel.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar as solidStar } from "@fortawesome/free-solid-svg-icons";
import "./Carousel.css";

export default function Carousel() {
  const [slides, setSlides] = useState([]);
  const [index, setIndex] = useState(0);

  // Carica i film da API
  useEffect(() => {
    axios
      .get("http://localhost:4000/movies")
      .then((res) => {
        const moviesWithImages = res.data.filter(
          (m) => m.image && Number(m.average_vote) >= 4
        );
        setSlides(moviesWithImages);
      })
      .catch((err) => console.error("Errore carosello:", err));
  }, []);

  // Slide automatico ogni 3 secondi
  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [slides]);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i === 0 ? slides.length - 1 : i - 1));

  if (!slides.length) return null;

  const movie = slides[index];
  const imageUrl = `http://localhost:4000/images/movies/${movie.image}`;
  const vote = Math.round(Number(movie.average_vote));

  return (
    <div className="carousel-container">
      <div className="carousel-slide">
        <img src={imageUrl} alt={movie.title} className="carousel-img" />

        <div className="carousel-overlay">
          <h2>{movie.title}</h2>
          <p>"Un capolavoro assoluto, da non perdere!"</p>
          <div>
            {[...Array(5)].map((_, i) => (
              <FontAwesomeIcon
                key={i}
                icon={solidStar}
                className={i < vote ? "text-warning me-1" : "text-muted me-1"}
              />
            ))}
          </div>
        </div>

        <button className="carousel-prev" onClick={prev}>
          ◀
        </button>
        <button className="carousel-next" onClick={next}>
          ▶
        </button>
      </div>
    </div>
  );
}
