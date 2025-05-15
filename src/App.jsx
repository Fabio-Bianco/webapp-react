import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Movies from "./pages/MoviesPage";
import MovieDetail from "./pages/MovieDetail";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import "./index.css";
import Loader from "./components/Loader";
import { LoaderProvider } from "./contexts/LoaderContext";

export default function App() {
  return (
    <LoaderProvider>
    <BrowserRouter>
      <Routes>
        <Route element={<DefaultLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<Movies />} />
          <Route path="/movies/:id" element={<MovieDetail />} />
          <Route path="/chi-siamo" element={<AboutPage />} />
          <Route path="/contatti" element={<ContactPage />} />
        </Route>
        <Route path="*" element={<div className="p-4">404 - Pagina non trovata</div>} />
      </Routes>
    </BrowserRouter>
    </LoaderProvider>
  );
}

