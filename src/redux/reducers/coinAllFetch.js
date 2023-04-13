import { walletAction } from '../actions';

const coinAllFetch = () => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const arrayTheKeys = Object.keys(data);
    const keys = arrayTheKeys.filter((coin) => coin !== 'USDT');
    dispatch(walletAction(keys));
  } catch (error) {
    // eslint-disable-next-line no-alert
    alert('Error 404');
  }
};

export default coinAllFetch;
