import CountUp from "./CountUp.jsx";

export default function StatCard({ label, value, format }) {
  return (
    <div className="stat">
      <p className="stat-label">{label}</p>
      <p className="stat-value">
        <CountUp value={value} format={format} />
      </p>
    </div>
  );
}
