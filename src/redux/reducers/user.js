// Esse reducer será responsável por tratar as informações da pessoa usuária
import { INITIAL_STATE } from './index';
import { SAVE_EMAIL } from '../actions';

const user = (state = INITIAL_STATE.user, action) => {
  switch (action.type) {
  case SAVE_EMAIL:
    return {
      // ...state,
      email: action.payload,
    };
  default:
    return state;
  }
};

export default user;
