function Sidebar({ activePage, setActivePage }) {
  return (
    <aside className="sidebar">
      <div className="logo">
        💰 <span>Expense</span>
      </div>

      <nav>
        <button
          className={activePage === "dashboard" ? "active" : ""}
          onClick={() => setActivePage("dashboard")}
        >
          🏠 Dashboard
        </button>

        <button
          className={activePage === "transactions" ? "active" : ""}
          onClick={() => setActivePage("transactions")}
        >
          💳 Transactions
        </button>

        <button
          className={activePage === "reports" ? "active" : ""}
          onClick={() => setActivePage("reports")}
        >
          📊 Reports
        </button>

        <button
          className={activePage === "settings" ? "active" : ""}
          onClick={() => setActivePage("settings")}
        >
          ⚙️ Settings
        </button>
      </nav>

      <div className="sidebar-bottom">
        <p>Track your expenses</p>
        <small>Make better financial decisions.</small>
      </div>
    </aside>
  );
}

export default Sidebar;
