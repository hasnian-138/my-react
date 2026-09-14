function TransactionList({
  transactions,
  deleteTransaction,
  editTransaction,
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
  currency,
}) {
  let filteredTransactions = transactions.filter(
    (transaction) => {
      const matchesSearch = transaction.title
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesFilter =
        filter === "all" ||
        transaction.type === filter;

      return matchesSearch && matchesFilter;
    }
  );

  if (sort === "newest") {
    filteredTransactions.sort(
      (a, b) => b.id - a.id
    );
  }

  if (sort === "oldest") {
    filteredTransactions.sort(
      (a, b) => a.id - b.id
    );
  }

  if (sort === "highest") {
    filteredTransactions.sort(
      (a, b) => b.amount - a.amount
    );
  }

  if (sort === "lowest") {
    filteredTransactions.sort(
      (a, b) => a.amount - b.amount
    );
  }

  return (
    <div className="transactions">
      <div className="transactions-header">
        <div>
          <h2>Recent Transactions</h2>

          <span>
            Showing {filteredTransactions.length} of{" "}
            {transactions.length} transactions
          </span>
        </div>
      </div>

      <div className="transaction-options">
        <input
          type="text"
          placeholder="🔍 Search transaction..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        >
          <option value="all">All</option>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="highest">Highest Amount</option>
          <option value="lowest">Lowest Amount</option>
        </select>
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="empty">
          <div className="empty-icon">📭</div>

          <p>No transactions found.</p>

          <small>
            Try changing your search or filter.
          </small>
        </div>
      ) : (
        filteredTransactions.map((transaction) => (
          <div
            className="transaction"
            key={transaction.id}
          >
            <div className="transaction-left">
              <div
                className={`transaction-icon ${transaction.type}`}
              >
                {transaction.type === "income"
                  ? "↓"
                  : "↑"}
              </div>

              <div>
                <h3>{transaction.title}</h3>

                <p>
                  {transaction.type === "income"
                    ? "Income"
                    : "Expense"}
                </p>
              </div>
            </div>

            <div className="transaction-right">
              <strong
                className={
                  transaction.type === "income"
                    ? "income"
                    : "expense"
                }
              >
                {transaction.type === "income"
                  ? "+"
                  : "-"}
                {currency}
                {transaction.amount.toFixed(2)}
              </strong>

              <div className="transaction-actions">
                <button
                  className="edit-btn"
                  onClick={() =>
                    editTransaction(transaction)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    deleteTransaction(transaction.id)
                  }
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default TransactionList;
