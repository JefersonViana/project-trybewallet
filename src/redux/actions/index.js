const SAVE_EMAIL = 'SAVE_EMAIL';
const SAVE_WALLET = 'SAVE_WALLET';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const EDIT_UPDATE = 'EDIT_UPDATE';
const DELETE_EXPENSE = 'DELETE_EXPENSE';
const EDIT_EXPENSE = 'EDIT_EXPENSE';

const emailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const deleteExpenseAction = (expenses, convertedValue) => ({
  type: DELETE_EXPENSE,
  expenses,
  convertedValue,
});

const editExpenseAction = (objectExpense) => ({
  type: EDIT_EXPENSE,
  object: objectExpense,
});

const editUpdateAction = (priceTotal, newArrayExpenses) => ({
  type: EDIT_UPDATE,
  priceTotal,
  newArrayExpenses,
});

const walletAction = (wallet) => ({
  type: SAVE_WALLET,
  payload: wallet,
});

const expenseAction = (object, sumPriceTotal) => ({
  type: SAVE_EXPENSE,
  payload: object,
  sumPriceTotal,
});

export {
  emailAction,
  walletAction,
  expenseAction,
  editUpdateAction,
  deleteExpenseAction,
  editExpenseAction,
  SAVE_EMAIL,
  SAVE_WALLET,
  SAVE_EXPENSE,
  EDIT_UPDATE,
  DELETE_EXPENSE,
  EDIT_EXPENSE,
};
