import { SAVE_WALLET, SAVE_EXPENSE, SAVE_COIN } from '../actions';

export const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  editor: false,
  idToEdit: 0,
  priceTotal: 0,
};

const wallet = (state = INITIAL_STATE, action) => {
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
      priceTotal: Number(state.priceTotal) + Number(action.sumPriceTotal),
    };

  case SAVE_COIN:
    return {
      ...state,
      quotation: [...state.quotation, action.payload],
    };
  default:
    return state;
  }
};

export default wallet;
