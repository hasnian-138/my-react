function SummaryCard({
  title,
  amount,
  icon,
  color,
  currency,
}) {
  return (
    <div className="summary-card">
      <div>
        <p>{title}</p>

        <h2>
          {currency}
          {amount.toFixed(2)}
        </h2>
      </div>

      <div
        className="summary-icon"
        style={{ backgroundColor: color }}
      >
        {icon}
      </div>
    </div>
  );
}

export default SummaryCard;
