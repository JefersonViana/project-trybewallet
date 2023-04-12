import { SAVE_WALLET, SAVE_EXPENSE, SAVE_COIN, DELETE_EXPENSE } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  priceTotal: '0.00',
};

const wallet = (state = INITIAL_STATE, action) => {
  const value = (Number(state.priceTotal) - Number(action.convertedValue));
  switch (action.type) {
  case SAVE_WALLET:
    return {
      ...state,
      currencies: action.payload,
    };
  case SAVE_EXPENSE:
    return {
      ...state,
      expenses: [...state.expenses, action.payload],
      idToEdit: state.idToEdit + 1,
      priceTotal: (Number(state.priceTotal) + Number(action.sumPriceTotal)).toFixed(2),
    };

  case SAVE_COIN:
    return {
      ...state,
      quotation: [...state.quotation, action.payload],
    };
  case DELETE_EXPENSE:
    return {
      ...state,
      expenses: [...action.expenses],
      priceTotal: value <= 0 ? '0.00' : `${value.toFixed(2)}`,
    };
  default:
    return state;
  }
};

export default wallet;
