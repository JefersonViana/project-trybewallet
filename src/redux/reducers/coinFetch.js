import { expenseAction } from '../actions';

const coinFetch = (object) => async (dispatch) => {
  try {
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const data = await response.json();
    const valueInBrl = Number(data[object.currency].ask) * Number(object.value);

    dispatch(expenseAction({
      ...object,
      exchangeRates: data,
    }, valueInBrl));
  } catch (error) {
    console.log(error);
  }
};

export default coinFetch;
