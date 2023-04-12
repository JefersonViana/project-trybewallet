import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { deleteExpenseAction, editExpenseAction } from '../redux/actions';

class Table extends Component {
  handleEdit = (objetoExpense) => {
    const { dispatch } = this.props;
    dispatch(editExpenseAction(objetoExpense));
  };

  handleDelete = (id, expenses, convertedValue) => {
    const { dispatch } = this.props;
    const filter = expenses.filter((element) => element.id !== id);
    dispatch(deleteExpenseAction(filter, convertedValue));
  };

  render() {
    const { expenses } = this.props;
    return (
      <table>
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Tag</th>
            <th>Método de pagamento</th>
            <th>Valor</th>
            <th>Moeda</th>
            <th>Câmbio utilizado</th>
            <th>Valor convertido</th>
            <th>Moeda de conversão</th>
            <th>Editar/Excluir</th>
          </tr>
        </thead>
        <tbody>
          { expenses && (
            expenses.map((element) => {
              const convertedValue = (Number(element.exchangeRates[element.currency].ask)
              * Number(element.value)).toFixed(2);
              const cambio = Number(element.exchangeRates[element.currency].ask)
                .toFixed(2);
              return (
                <tr key={ element.id }>
                  <td>{element.description}</td>
                  <td>{element.tag}</td>
                  <td>{element.method}</td>
                  <td>{`${element.value}.00`}</td>
                  <td>{element.exchangeRates[element.currency].name}</td>
                  <td>{cambio}</td>
                  <td>
                    {convertedValue}
                  </td>
                  <td>Real</td>
                  <td>
                    <button
                      data-testid="edit-btn"
                      type="button"
                      onClick={ () => this
                        .handleEdit(element) }
                    >
                      Editar
                    </button>
                    <button
                      data-testid="delete-btn"
                      type="button"
                      onClick={ () => this
                        .handleDelete(element.id, expenses, convertedValue) }
                    >
                      Excluir
                    </button>
                  </td>
                </tr>
              );
            })
          )}
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  ...state,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Table);
