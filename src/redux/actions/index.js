const SAVE_EMAIL = 'SAVE_EMAIL';
const SAVE_WALLET = 'SAVE_WALLET';

const emailAction = (email) => ({
  type: SAVE_EMAIL,
  payload: email,
});

const walletAction = (wallet) => ({
  type: SAVE_WALLET,
  payload: wallet,
});

export {
  emailAction,
  walletAction,
  SAVE_EMAIL,
  SAVE_WALLET,
};
