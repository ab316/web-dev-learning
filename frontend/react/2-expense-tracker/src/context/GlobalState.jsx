import React, {createContext, useReducer} from 'react';
import AppReducer from './AppReducer';

const stub = () => {
  throw new Error('You forgot to wrap the component in the GlobalContext');
};

// Initial State
const initalState = {
  transactions: [
    {id: 1, text: 'Flower', amount: -20},
    {id: 2, text: 'Salary', amount: 300},
    {id: 3, text: 'Book', amount: -10},
    {id: 4, text: 'Camera', amount: -150},
  ],
  addTransaction: stub,
  deleteTransaction: stub,
};

export const GlobalContext = createContext(initalState);

export const GlobalProvider = ({children}) => {
  // Reducer is used to make changes to the context, while automatically triggering render
  // Reducer is just like state, but more complex. It uses a state and actions that act on that state
  const [state, dispatch] = useReducer(AppReducer, initalState);

  const addTransaction = (transaction) => {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction,
    });
  };

  const deleteTransaction = (id) => {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id,
    });
  };

  return (
    <GlobalContext.Provider
      value={{
        transactions: state.transactions,
        addTransaction,
        deleteTransaction,
      }}>
      {children}
    </GlobalContext.Provider>
  );
};
