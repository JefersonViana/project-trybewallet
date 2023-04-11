import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    const { wallet } = this.props;
    const { currencies } = wallet;
    return (
      <div>
        <input
          type="text"
          data-testid="value-input"
          placeholder="despesa"
        />
        <input
          type="text"
          data-testid="description-input"
          placeholder="descrição da despesa"
        />
        <select data-testid="currency-input">
          {currencies && currencies.map((element, index) => (
            <option key={ index }>{element}</option>
          ))}
        </select>
        <select data-testid="method-input">
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          <option>Alimentação</option>
          <option>Lazer</option>
          <option>Trabalho</option>
          <option>Transporte</option>
          <option>Saúde</option>
        </select>
      </div>
    );
  }
}

WalletForm.propTypes = {
  wallet: PropTypes.shape({
    currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(WalletForm);
