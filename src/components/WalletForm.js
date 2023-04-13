import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import coinFetch from '../redux/reducers/coinFetch';
import { editUpdateAction } from '../redux/actions';
import coinAllFetch from '../redux/reducers/coinAllFetch';

class WalletForm extends Component {
  constructor() {
    super();

    this.state = {
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(coinAllFetch(dispatch));
  }

  handleClick = () => {
    const { value, currency, description, method, tag } = this.state;
    const { dispatch, wallet } = this.props;
    const object = {
      id: wallet.idToEdit,
      value,
      currency,
      description,
      method,
      tag,
    };
    dispatch(coinFetch(object));
    this.setState({
      value: '',
      description: '',
      currency: 'USD',
      method: 'Dinheiro',
      tag: 'Alimentação',
    });
  };

  handleEditor = () => {
    const { wallet, dispatch } = this.props;
    const { object, expenses } = wallet;
    const { exchangeRates } = object;
    const { value, description, currency, method, tag } = this.state;
    const filter = expenses.filter(({ id }) => id !== object.id);
    const newExpense = {
      id: object.id,
      value,
      currency,
      description,
      method,
      tag,
      exchangeRates,
    };
    const newArrayExpenses = [newExpense, ...filter];
    // .sort((a, b) => {
    //   const magic = -1;
    //   if (Number(a.id) > Number(b.id)) {
    //     return +1;
    //   }
    //   if (Number(a.id) < Number(b.id)) {
    //     return magic;
    //   }
    //   return 0;
    // });
    let priceTotal = 0;
    newArrayExpenses.forEach(({ value: valor, currency: moeda, exchangeRates: rate }) => {
      priceTotal += Number(valor) * Number(rate[moeda].ask);
    });
    dispatch(editUpdateAction(priceTotal.toFixed(2), newArrayExpenses));
  };

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { currencies, editor } = wallet;
    return (
      <div>
        <input
          type="text"
          data-testid="value-input"
          name="value"
          value={ value }
          placeholder="valor da despesa"
          onChange={ (event) => this.handleChange(event) }
        />
        <input
          type="text"
          data-testid="description-input"
          name="description"
          value={ description }
          placeholder="descrição da despesa"
          onChange={ (event) => this.handleChange(event) }
        />
        <select
          name="currency"
          value={ currency }
          onChange={ (event) => this.handleChange(event) }
          data-testid="currency-input"
        >
          {currencies && currencies.map((element, index) => (
            <option key={ index } value={ element }>{element}</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
        >
          <option value="Dinheiro">Dinheiro</option>
          <option value="Cartão de crédito">Cartão de crédito</option>
          <option value="Cartão de débito">Cartão de débito</option>
        </select>
        <select
          data-testid="tag-input"
          name="tag"
          value={ tag }
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
        { editor ? (
          <button
            type="button"
            onClick={ () => this.handleEditor() }
          >
            Editar despesa
          </button>
        ) : (
          <button onClick={ this.handleClick }>Adicionar despesa</button>
        )}
      </div>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
    idToEdit: PropTypes.number.isRequired,
    editor: PropTypes.bool.isRequired,
    object: PropTypes.shape({
      value: PropTypes.string.isRequired,
      exchangeRates: PropTypes.shape(PropTypes.object.isRequired),
      id: PropTypes.string,
    }).isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(WalletForm);
