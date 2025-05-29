import React, { useContext } from 'react';
import { Transaction } from './Transaction';
import { GlobalContext } from '../context/GlobalState';

export const TransactionList = () => {
  const { transactions } = useContext(GlobalContext);

  return (
    <>
      <h3>History</h3>
      {transactions.length === 0 ? (
        <p className="no-transactions-message" style={{ textAlign: 'center', color: 'var(--text-color-light)', margin: 'var(--spacing-md) 0' }}>
          No transactions yet. Add some!
        </p>
      ) : (
        <ul className="list">
          {transactions.map((transaction, index) => (
            <Transaction 
              key={transaction.id} 
              transaction={transaction} 
              index={index} // Pass index for staggered animation
            />
          ))}
        </ul>
      )}
    </>
  );
};