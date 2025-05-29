// src/components/Transaction.js
import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';
// Optional: Import an edit icon
// import { FaEdit } from 'react-icons/fa'; 

// Money formatter function (assumes positive input)
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    'Kes ' +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, digit, i, orig) {
        return digit + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Transaction = ({ transaction, index }) => {
  const { deleteTransaction, setEditingTransaction } = useContext(GlobalContext); // Add setEditingTransaction

  const sign = transaction.amount < 0 ? '-' : '+';

  const handleEdit = () => {
    setEditingTransaction(transaction);
  };

  return (
    <li
      className={transaction.amount < 0 ? 'minus' : 'plus'}
      style={{ '--item-index': index }}
    >
      <div className="transaction-details"> {/* Wrapper for text and category */}
        <span className="transaction-text">{transaction.text}</span>
        {transaction.category && (
          <span className="transaction-category">
            ({transaction.category.charAt(0).toUpperCase() + transaction.category.slice(1)})
          </span>
        )}
      </div>
      <span className="transaction-amount">
        {sign}
        {moneyFormatter(Math.abs(transaction.amount))}
      </span>
      <div className="transaction-actions"> {/* Wrapper for buttons */}
        <button
          onClick={handleEdit}
          className="edit-btn" // Add class for styling
          aria-label={`Edit transaction: ${transaction.text}`}
        >
          {/* <FaEdit /> Alternatively, use text: */}
          Edit
        </button>
        <button
          onClick={() => deleteTransaction(transaction.id)}
          className="delete-btn"
          aria-label={`Delete transaction: ${transaction.text}`}
        >
          ×
        </button>
      </div>
    </li>
  );
};