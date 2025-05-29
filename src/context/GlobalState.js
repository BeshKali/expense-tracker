// src/context/GlobalState.js
import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';
import { toast } from 'react-toastify'; // Import toast

// Load initial state from localStorage
const getInitialState = () => {
  const localData = localStorage.getItem('transactions_data');
  if (localData) {
    try {
      const parsedData = JSON.parse(localData);
      // Ensure transactions is an array and editingTransaction is properly handled
      return {
        transactions: Array.isArray(parsedData.transactions) ? parsedData.transactions : [],
        editingTransaction: parsedData.editingTransaction || null, 
        // Add other potential state properties you might save
      };
    } catch (error) {
      console.error("Error parsing transactions from localStorage:", error);
      // Fallback to default if parsing fails
      return { transactions: [], editingTransaction: null };
    }
  }
  return { transactions: [], editingTransaction: null }; // Default initial state
};

const initialState = getInitialState();

// Create context
export const GlobalContext = createContext(initialState);

// Provider component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  // Save state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('transactions_data', JSON.stringify({
        transactions: state.transactions,
        // Persist editingTransaction only if truly necessary, usually it's transient
        // editingTransaction: state.editingTransaction 
    }));
  }, [state.transactions /*, state.editingTransaction (if you decide to persist it) */]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
    toast.info("Transaction deleted!");
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
    toast.success("Transaction added!");
  }

  // --- New Actions for Editing ---
  function setEditingTransaction(transaction) {
    dispatch({
      type: 'SET_EDITING_TRANSACTION',
      payload: transaction
    });
  }

  function updateTransaction(transaction) {
    dispatch({
      type: 'UPDATE_TRANSACTION',
      payload: transaction
    });
    toast.success("Transaction updated!");
  }

  function cancelEdit() {
    dispatch({
      type: 'CANCEL_EDIT'
    });
  }
  // --- End New Actions for Editing ---


  return (
    <GlobalContext.Provider value={{
      transactions: state.transactions,
      editingTransaction: state.editingTransaction, // Provide editing state
      deleteTransaction,
      addTransaction,
      setEditingTransaction, // Provide new actions
      updateTransaction,
      cancelEdit
    }}>
      {children}
    </GlobalContext.Provider>
  );
};