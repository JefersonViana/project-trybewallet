import { walletAction } from '../actions';

const coinAllFetch = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const arrayTheKeys = Object.keys(data);
    const keys = [arrayTheKeys[0], ...arrayTheKeys.splice(2)];
    dispatch(walletAction(keys));
  } catch (error) {
    console.log(error);
  }
};

export default coinAllFetch;
