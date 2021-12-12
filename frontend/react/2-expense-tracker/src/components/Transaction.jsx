import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Transaction = ({transaction}) => {
  const {deleteTransaction} = useContext(GlobalContext);

  const isExpense = transaction.amount < 0;
  const sign = isExpense ? '-' : '+';
  const amount = `${sign}$${Math.abs(transaction.amount)}`;

  return (
    <li className={isExpense ? 'minus' : 'plus'}>
      {transaction.text} <span>{amount}</span>
      <button
        className="delete-btn"
        onClick={() => deleteTransaction(transaction.id)}>
        x
      </button>
    </li>
  );
};
