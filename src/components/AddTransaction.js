// src/components/AddTransaction.js
import React, { useState, useContext, useEffect, useRef } from 'react';
import { GlobalContext } from '../context/GlobalState';
import { toast } from 'react-toastify'; // Already imported in GlobalState, but good for direct use too

// Define some categories - you can expand this or fetch from elsewhere
const transactionCategories = [
  { value: 'general', label: 'General' },
  { value: 'food', label: 'Food & Drinks' },
  { value: 'transport', label: 'Transportation' },
  { value: 'salary', label: 'Salary' },
  { value: 'groceries', label: 'Groceries' },
  { value: 'bills', label: 'Bills & Utilities' },
  { value: 'entertainment', label: 'Entertainment' },
  { value: 'health', label: 'Health & Wellness' },
  { value: 'shopping', label: 'Shopping' },
  { value: 'other', label: 'Other' },
];

export const AddTransaction = () => {
  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [transactionType, setTransactionType] = useState('expense');
  const [category, setCategory] = useState(transactionCategories[0].value); // Default category

  const { addTransaction, editingTransaction, updateTransaction, cancelEdit } = useContext(GlobalContext);
  const textInputRef = useRef(null);

  const isEditing = !!editingTransaction;

  useEffect(() => {
    if (isEditing) {
      setText(editingTransaction.text);
      setAmount(String(Math.abs(editingTransaction.amount))); // Amount is always positive in form
      setTransactionType(editingTransaction.amount < 0 ? 'expense' : 'income');
      setCategory(editingTransaction.category || transactionCategories[0].value);
      if (textInputRef.current) {
        textInputRef.current.focus();
      }
    } else {
      // Clear form if not editing (e.g., after an edit is cancelled or completed)
      setText('');
      setAmount('');
      setTransactionType('expense');
      setCategory(transactionCategories[0].value);
    }
  }, [editingTransaction, isEditing]); // Depend on editingTransaction and isEditing

  const onSubmit = e => {
    e.preventDefault();

    let numericAmount = Math.abs(parseFloat(amount));

    if (!text.trim() || isNaN(numericAmount) || numericAmount === 0) {
      toast.error('Please enter valid text and a non-zero amount.');
      return;
    }
    if (!category) {
        toast.error('Please select a category.');
        return;
    }

    if (transactionType === 'expense') {
      numericAmount = -numericAmount;
    }

    const transactionData = {
      id: isEditing ? editingTransaction.id : Math.floor(Math.random() * 100000000),
      text,
      amount: numericAmount,
      category: category,
    };

    if (isEditing) {
      updateTransaction(transactionData);
    } else {
      addTransaction(transactionData);
    }

    // Clear form fields only if not switching from edit mode
    if (!isEditing) {
        setText('');
        setAmount('');
        setTransactionType('expense');
        setCategory(transactionCategories[0].value);
    }
    // If it was an edit, the useEffect will clear the form when editingTransaction becomes null

    if (textInputRef.current && !isEditing) { // Re-focus only when adding new
      textInputRef.current.focus();
    }
  };

  const handleCancelEdit = () => {
    cancelEdit(); // This will trigger the useEffect to clear the form
  };

  return (
    <>
      <h3>{isEditing ? 'Edit Transaction' : 'Add new transaction'}</h3>
      <form onSubmit={onSubmit}>
        <div className="form-control type-selector">
          <label>Type</label>
          <div className="radio-group">
            <div>
              <input type="radio" id="expense" name="transactionType" value="expense"
                checked={transactionType === 'expense'} onChange={(e) => setTransactionType(e.target.value)} />
              <label htmlFor="expense" className="radio-label">Expense</label>
            </div>
            <div>
              <input type="radio" id="income" name="transactionType" value="income"
                checked={transactionType === 'income'} onChange={(e) => setTransactionType(e.target.value)} />
              <label htmlFor="income" className="radio-label">Income</label>
            </div>
          </div>
        </div>

        <div className="form-control">
          <label htmlFor="text">Description</label>
          <input type="text" id="text" value={text} onChange={(e) => setText(e.target.value)}
            placeholder="Enter description..." ref={textInputRef} required />
        </div>

        {/* Category Selector */}
        <div className="form-control">
          <label htmlFor="category">Category</label>
          <select 
            id="category" 
            value={category} 
            onChange={(e) => setCategory(e.target.value)}
            required
            className="category-select" // Add class for styling
          >
            {transactionCategories.map(cat => (
              <option key={cat.value} value={cat.value}>{cat.label}</option>
            ))}
          </select>
        </div>

        <div className="form-control">
          <label htmlFor="amount">Amount (positive number)</label>
          <input type="number" id="amount" value={amount} onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount..." required step="0.01" min="0.01" />
        </div>

        <button className="btn" type="submit">
          {isEditing ? 'Update Transaction' : 'Add Transaction'}
        </button>
        {isEditing && (
          <button type="button" className="btn btn-cancel" onClick={handleCancelEdit} style={{marginTop: '10px', backgroundColor: 'var(--text-color-light)'}}>
            Cancel Edit
          </button>
        )}
      </form>
    </>
  );
};