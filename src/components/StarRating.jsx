export default function StarRating({ vote }) {
  const filled = Math.round(vote || 0);
  return (
    <div>
      {Array.from({ length: 5 }, (_, i) =>
        i < filled ? "★" : "☆"
      ).join(" ")}
    </div>
  );
}
