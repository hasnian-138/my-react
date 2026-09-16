import { useEffect, useState } from "react";

import Navbar from "./assets/Navbar";
import Sidebar from "./assets/Sidebar";
import SummaryCard from "./assets/SummaryCard";
import Transaction from "./assets/Transaction";
import TransactionList from "./assets/TransactionList";

import "./App.css";

const defaultTransactions = [
  {
    id: 1,
    title: "Salary",
    amount: 3000,
    type: "income",
  },
  {
    id: 2,
    title: "Food",
    amount: 120,
    type: "expense",
  },
  {
    id: 3,
    title: "Shopping",
    amount: 250,
    type: "expense",
  },
];

function App() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem("expenseTransactions");

    return saved ? JSON.parse(saved) : defaultTransactions;
  });

  const [editingTransaction, setEditingTransaction] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const [sort, setSort] = useState("newest");

  const [activePage, setActivePage] = useState("dashboard");

  const [currency, setCurrency] = useState("$");

  useEffect(() => {
    localStorage.setItem(
      "expenseTransactions",
      JSON.stringify(transactions)
    );
  }, [transactions]);

  function addTransaction(transaction) {
    setTransactions((prev) => [transaction, ...prev]);
  }

  function deleteTransaction(id) {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this transaction?"
    );

    if (!confirmDelete) {
      return;
    }

    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== id)
    );
  }

  function editTransaction(transaction) {
    setEditingTransaction(transaction);
    setActivePage("dashboard");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  function updateTransaction(updatedTransaction) {
    setTransactions((prev) =>
      prev.map((transaction) =>
        transaction.id === updatedTransaction.id
          ? updatedTransaction
          : transaction
      )
    );

    setEditingTransaction(null);
  }

  function cancelEdit() {
    setEditingTransaction(null);
  }

  function clearAllTransactions() {
    const confirmClear = window.confirm(
      "Are you sure you want to delete ALL transactions?"
    );

    if (!confirmClear) {
      return;
    }

    setTransactions([]);
    setEditingTransaction(null);
  }

  const income = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const expenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((total, transaction) => total + transaction.amount, 0);

  const balance = income - expenses;

  function renderDashboard() {
    return (
      <>
        <div className="welcome">
          <h1>Good Morning, Hasnain Ayub 👋</h1>
          <p>Here's what's happening with your money.</p>
        </div>

        <div className="summary-grid">
          <SummaryCard
            title="Total Balance"
            amount={balance}
            icon="💰"
            color="#e8f1ff"
            currency={currency}
          />

          <SummaryCard
            title="Total Income"
            amount={income}
            icon="📈"
            color="#e8fff1"
            currency={currency}
          />

          <SummaryCard
            title="Total Expenses"
            amount={expenses}
            icon="📉"
            color="#fff0f0"
            currency={currency}
          />
        </div>

        <div className="dashboard-grid">
          <Transaction
            addTransaction={addTransaction}
            updateTransaction={updateTransaction}
            editingTransaction={editingTransaction}
            cancelEdit={cancelEdit}
          />

          <TransactionList
            transactions={transactions}
            deleteTransaction={deleteTransaction}
            editTransaction={editTransaction}
            search={search}
            setSearch={setSearch}
            filter={filter}
            setFilter={setFilter}
            sort={sort}
            setSort={setSort}
            currency={currency}
          />
        </div>
      </>
    );
  }

  function renderTransactions() {
    return (
      <div className="page-section">
        <div className="page-title">
          <h1>💳 Transactions</h1>
          <p>Manage all your income and expenses.</p>
        </div>

        <TransactionList
          transactions={transactions}
          deleteTransaction={deleteTransaction}
          editTransaction={editTransaction}
          search={search}
          setSearch={setSearch}
          filter={filter}
          setFilter={setFilter}
          sort={sort}
          setSort={setSort}
          currency={currency}
        />
      </div>
    );
  }

  function renderReports() {
    const total = income + expenses;

    const incomePercentage =
      total === 0 ? 0 : (income / total) * 100;

    const expensePercentage =
      total === 0 ? 0 : (expenses / total) * 100;

    return (
      <div className="page-section">
        <div className="page-title">
          <h1>📊 Reports</h1>
          <p>See your financial summary.</p>
        </div>

        <div className="report-grid">
          <div className="report-card">
            <span>💰</span>
            <p>Current Balance</p>
            <h2>
              {currency}
              {balance.toFixed(2)}
            </h2>
          </div>

          <div className="report-card">
            <span>📈</span>
            <p>Total Income</p>
            <h2 className="income">
              {currency}
              {income.toFixed(2)}
            </h2>
          </div>

          <div className="report-card">
            <span>📉</span>
            <p>Total Expenses</p>
            <h2 className="expense">
              {currency}
              {expenses.toFixed(2)}
            </h2>
          </div>

          <div className="report-card">
            <span>💳</span>
            <p>Total Transactions</p>
            <h2>{transactions.length}</h2>
          </div>
        </div>

        <div className="chart-card">
          <h2>Income vs Expenses</h2>

          <div className="bar-container">
            <div className="bar-label">
              <span>Income</span>
              <strong>
                {currency}
                {income.toFixed(2)}
              </strong>
            </div>

            <div className="bar">
              <div
                className="income-bar"
                style={{ width: `${incomePercentage}%` }}
              ></div>
            </div>
          </div>

          <div className="bar-container">
            <div className="bar-label">
              <span>Expenses</span>
              <strong>
                {currency}
                {expenses.toFixed(2)}
              </strong>
            </div>

            <div className="bar">
              <div
                className="expense-bar"
                style={{ width: `${expensePercentage}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  function renderSettings() {
    return (
      <div className="page-section">
        <div className="page-title">
          <h1>⚙️ Settings</h1>
          <p>Customize your expense tracker.</p>
        </div>

        <div className="settings-card">
          <h2>Currency</h2>
          <p>Select your preferred currency.</p>

          <select
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
          >
            <option value="$">$ - Dollar</option>
            <option value="Rs">Rs - Pakistani Rupee</option>
            <option value="€">€ - Euro</option>
            <option value="£">£ - Pound</option>
          </select>
        </div>

        <div className="settings-card danger-settings">
          <h2>Delete Data</h2>

          <p>
            This will permanently remove all transactions.
          </p>

          <button
            className="clear-btn"
            onClick={clearAllTransactions}
          >
            🗑 Delete All Transactions
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="app">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main">
        <Navbar />

        <section className="content">
          {activePage === "dashboard" && renderDashboard()}

          {activePage === "transactions" &&
            renderTransactions()}

          {activePage === "reports" && renderReports()}

          {activePage === "settings" && renderSettings()}
        </section>
      </main>
    </div>
  );
}

export default App;
