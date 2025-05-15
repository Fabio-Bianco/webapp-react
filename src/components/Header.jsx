import { Link, useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Header.css";

export default function Header() {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const currentQuery = searchParams.get("search") || "";
    setSearch(currentQuery);
  }, [searchParams]);

  const handleChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    navigate(`/movies?search=${encodeURIComponent(value)}`);
  };

  return (
    <header className="header">
      <div className="header-left">
        <span className="logo">Logo</span>
      </div>

      <div className="header-center">
        <form className="search-form" onSubmit={(e) => e.preventDefault()}>
          <input
            type="text"
            placeholder="Cerca film..."
            className="search-input"
            value={search}
            onChange={handleChange}
          />
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
