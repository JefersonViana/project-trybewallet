import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';

class WalletForm extends Component {
  render() {
    console.log(this.props);
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
          {/* <option selected disabled>Moeda...</option> */}
          {currencies && currencies.map((element, index) => (
            <option key={ index }>{element}</option>
          ))}
        </select>
        <select data-testid="method-input">
          {/* <option selected disabled>Pagamento...</option> */}
          <option>Dinheiro</option>
          <option>Cartão de crédito</option>
          <option>Cartão de débito</option>
        </select>
        <select data-testid="tag-input">
          {/* <option selected disabled>Categoria...</option> */}
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
    currencies: PropTypes.shape({
      map: PropTypes.func.isRequired,
    }).isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
});

export default connect(mapStateToProps)(WalletForm);
