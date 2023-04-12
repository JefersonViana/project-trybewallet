const SAVE_EMAIL = 'SAVE_EMAIL';
const SAVE_WALLET = 'SAVE_WALLET';
const SAVE_EXPENSE = 'SAVE_EXPENSE';
const SAVE_COIN = 'SAVE_COIN';

const emailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const coinAction = (email) => ({
  type: SAVE_COIN,
  payload: email,
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
  coinAction,
  SAVE_EMAIL,
  SAVE_WALLET,
  SAVE_EXPENSE,
  SAVE_COIN,
};
