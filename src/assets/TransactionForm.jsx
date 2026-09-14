import { useEffect, useState } from "react";

function TransactionForm({
  addTransaction,
  updateTransaction,
  editingTransaction,
  cancelEdit,
}) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");

  useEffect(() => {
    if (editingTransaction) {
      setTitle(editingTransaction.title);
      setAmount(editingTransaction.amount);
      setType(editingTransaction.type);
    } else {
      setTitle("");
      setAmount("");
      setType("expense");
    }
  }, [editingTransaction]);

  function handleSubmit(e) {
    e.preventDefault();

    if (!title.trim()) {
      alert("Please enter a title.");
      return;
    }

    if (!amount || Number(amount) <= 0) {
      alert("Please enter a valid amount.");
      return;
    }

    if (editingTransaction) {
      updateTransaction({
        ...editingTransaction,
        title: title.trim(),
        amount: Number(amount),
        type: type,
      });
    } else {
      const newTransaction = {
        id: Date.now(),
        title: title.trim(),
        amount: Number(amount),
        type: type,
      };

      addTransaction(newTransaction);
    }

    setTitle("");
    setAmount("");
    setType("expense");
  }

  function handleCancel() {
    setTitle("");
    setAmount("");
    setType("expense");

    cancelEdit();
  }

  return (
    <div className="form-container">
      <h2>
        {editingTransaction
          ? "Edit Transaction"
          : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Title</label>

          <input
            type="text"
            placeholder="e.g. Grocery"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Amount</label>

          <input
            type="number"
            min="0"
            step="0.01"
            placeholder="e.g. 100"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Type</label>

          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </div>

        <button type="submit" className="add-btn">
          {editingTransaction
            ? "✓ Update Transaction"
            : "+ Add Transaction"}
        </button>

        {editingTransaction && (
          <button
            type="button"
            className="cancel-btn"
            onClick={handleCancel}
          >
            Cancel Edit
          </button>
        )}
      </form>
    </div>
  );
}

export default TransactionForm;
