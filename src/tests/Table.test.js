import { fireEvent, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testando o componente "Table"', () => {
  test('O componente Table renderiza ', async () => {
    renderWithRouterAndRedux(<Wallet />);
    const btnExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputValue = screen.getByTestId('value-input');
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = screen.getByTestId('currency-input');
    const inputMethod = screen.getByTestId('method-input');
    const inputTag = screen.getByTestId('tag-input');

    expect(btnExpense).toBeInTheDocument();
    expect(inputValue).toBeInTheDocument();
    expect(inputDescription).toBeInTheDocument();
    expect(inputCurrency).toBeInTheDocument();
    expect(inputMethod).toBeInTheDocument();
    expect(inputTag).toBeInTheDocument();

    userEvent.type(inputValue, '5');
    userEvent.type(inputDescription, 'Ice Cream');
    fireEvent.change(inputMethod, { target: { value: 'Cartão de crédito' } });
    fireEvent.change(inputTag, { target: { value: 'Saúde' } });
    userEvent.click(btnExpense);

    const tdValue = await screen.findByRole('cell', { name: /5\.00/i });
    const tdDescription = await screen.findByRole('cell', { name: /ice cream/i });
    const tdCurrency = await screen.findByRole('cell', { name: /dólar americano\/real brasileiro/i });
    const tdMethod = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tdTag = await screen.findByRole('cell', { name: /saúde/i });
    const btnEdit = await screen.findByRole('button', { name: /editar/i });
    const btnDelete = await screen.findByRole('button', { name: /excluir/i });

    expect(tdValue).toBeInTheDocument();
    expect(tdDescription).toBeInTheDocument();
    expect(tdCurrency).toBeInTheDocument();
    expect(tdMethod).toBeInTheDocument();
    expect(tdTag).toBeInTheDocument();
    expect(btnEdit).toBeInTheDocument();
    expect(btnDelete).toBeInTheDocument();
  });
});
