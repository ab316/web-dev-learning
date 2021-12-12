import React, {useContext} from 'react';
import {GlobalContext} from '../context/GlobalState';

export const Balance = () => {
  const {transactions} = useContext(GlobalContext);
  const balance = transactions
    .map((t) => t.amount)
    .reduce((prev, cur) => prev + cur, 0)
    .toFixed(2);

  return (
    <>
      <h4>Your Balance</h4>
      <h1 id="balance">${balance}</h1>
    </>
  );
};
