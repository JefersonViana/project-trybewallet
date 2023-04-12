import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import coinFetch from '../redux/reducers/coinFetch';

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

  handleChange = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  render() {
    const { wallet } = this.props;
    const { value, description, currency, method, tag } = this.state;
    const { currencies } = wallet;
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
            <option key={ index }>{element}</option>
          ))}
        </select>
        <select
          data-testid="method-input"
          name="method"
          value={ method }
          onChange={ (event) => this.handleChange(event) }
        >
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
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
        <button onClick={ this.handleClick }>
          Adicionar despesa
        </button>
      </div>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
    idToEdit: PropTypes.number.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(WalletForm);
