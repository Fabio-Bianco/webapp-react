import Carousel from "../components/Carousel";

export default function HomePage() {
  return (
    <div className="container py-4">
      <Carousel />
      <h2 className="mb-4">🎬 Film in evidenza</h2>
      <p className="text-muted">Contenuti in arrivo...</p>
    </div>
  );
}
