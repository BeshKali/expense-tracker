// src/context/AppReducer.js
export default (state, action) => {
  switch (action.type) {
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(transaction => transaction.id !== action.payload)
      };
    case 'ADD_TRANSACTION':
      return {
        ...state,
        transactions: [action.payload, ...state.transactions],
        editingTransaction: null // Clear editing state after adding
      };
    // --- New Cases for Editing ---
    case 'SET_EDITING_TRANSACTION':
      return {
        ...state,
        editingTransaction: action.payload
      };
    case 'UPDATE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.map(transaction =>
          transaction.id === action.payload.id ? action.payload : transaction
        ),
        editingTransaction: null // Clear editing state after update
      };
    case 'CANCEL_EDIT':
      return {
        ...state,
        editingTransaction: null
      };
    // --- End New Cases for Editing ---
    default:
      return state;
  }
};