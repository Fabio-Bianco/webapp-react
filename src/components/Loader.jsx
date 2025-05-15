import { useContext } from "react";
import LoaderContext from "../contexts/LoaderContext";
import "./Loader.css";

export default function Loader() {
  const { loading } = useContext(LoaderContext);
  if (!loading) return null;

  return (
    <div className="loader-overlay">
      <div className="spinner-border text-primary" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}
