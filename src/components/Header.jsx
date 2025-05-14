import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Header.css";

export default function Header() {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim()) {
      navigate(`/movies?search=${encodeURIComponent(search.trim())}`);
      setSearch("");
    }
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">Logo</span>
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Cerca film..."
            className="search-input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="search-button" type="submit">Cerca</button>
        </form>
      </div>

      <nav className="header-right nav">
        <Link className="nav-link" to="/">Home</Link>
        <Link className="nav-link" to="/movies">Film</Link>
        <Link className="nav-link" to="/chi-siamo">Chi siamo</Link>
        <Link className="nav-link" to="/contatti">Contatti</Link>
      </nav>
    </header>
  );
}
