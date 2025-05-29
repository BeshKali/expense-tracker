import React, { useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

// Money formatter function (handles sign)
function moneyFormatter(num) {
  let p = num.toFixed(2).split('.');
  return (
    'Kes ' + (p[0].charAt(0) === '-' ? '-' : '') +
    p[0]
      .split('')
      .reverse()
      .reduce(function (acc, digit, i, orig) {
        return digit === '-' ? acc : digit + (i && !(i % 3) ? ',' : '') + acc;
      }, '') +
    '.' +
    p[1]
  );
}

export const Balance = () => {
  const { transactions } = useContext(GlobalContext);

  const amounts = transactions.map(transaction => transaction.amount);
  const total = amounts.reduce((acc, item) => (acc += item), 0);

  return (
    <>
      <h4>Your Balance</h4>
      {/* This h1 will be styled by the global h1 styles if not overridden,
          or you can add a specific class if needed.
          The moneyFormatter here already handles the sign. */}
      <h1>{moneyFormatter(total)}</h1>
    </>
  );
};