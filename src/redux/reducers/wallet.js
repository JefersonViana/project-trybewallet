// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
import { INITIAL_STATE } from './index';
import { SAVE_WALLET } from '../actions';

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case SAVE_WALLET:
    return {
      // ...state,
      wallet: action.payload,
    };
  default:
    return state;
  }
};

export default wallet;
