import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const IncomeExpenses = () => {
  const {transactions} = useContext(GlobalContext);
  console.log(transactions);
  const amounts = transactions.map((t) => t.amount);
  const income = amounts
    .filter((v) => v > 0)
    .reduce((prev, cur) => prev + cur, 0)
    .toFixed(2);

  const expense = (
    amounts.filter((v) => v < 0).reduce((prev, cur) => prev + cur, 0) * -1
  ).toFixed(2);

  return (
    <div className="inc-exp-container">
      <div>
        <h4>Income</h4>
        <p id="money-plus" className="money plus">
          +${income}
        </p>
      </div>

      <div>
        <h4>Expense</h4>
        <p id="money-minu" className="money minus">
          -${expense}
        </p>
      </div>
    </div>
  );
};
