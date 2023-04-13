import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';

describe('Testando a página Wallet', () => {
  const object = {
    wallet: {
      currencies: [
        'USD',
        'CAD',
        'GBP',
        'ARS',
        'BTC',
        'LTC',
        'EUR',
        'JPY',
        'CHF',
        'AUD',
        'CNY',
        'ILS',
        'ETH',
        'XRP',
        'DOGE',
      ],
      expenses: [
        {
          id: 0,
          value: '5',
          currency: 'USD',
          description: '',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: mockData,
        },
        {
          id: 1,
          value: '6',
          currency: 'USD',
          description: '',
          method: 'Dinheiro',
          tag: 'Alimentação',
          exchangeRates: mockData,
        },
      ],
      editor: false,
      idToEdit: 2,
      priceTotal: '54.21',
      object: {
        value: '0',
      },
    },
  };
  test('Verifica se a página renderiza 2 campos "textbox" e 3 campos "select"', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    const titlePrice = screen.getByText(/0\.00/i);
    const titleBrl = screen.getByText(/brl/i);
    const btnAddExpense = screen.getByRole('button', { name: /Adicionar despesa/i });

    expect(titlePrice).toBeInTheDocument();
    expect(titleBrl).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();
    expect(pathname).toBe('/carteira');
  });
  test('Testando se o priceTotal é alterado após excluir uma despesa', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'], initialState: object });

    const inputValue = screen.getByTestId('value-input');
    const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(inputValue).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();

    userEvent.type(inputValue, '5');
    userEvent.click(btnAddExpense);

    userEvent.type(inputValue, '6');
    userEvent.click(btnAddExpense);

    const btnsDelete = await screen.findAllByRole('button', { name: /excluir/i });

    expect(btnsDelete).toHaveLength(2);
    userEvent.click(btnsDelete[1]);
    const priceTotal = await screen.findByTestId('total-field');

    expect(priceTotal.innerHTML).toBe('25.69');
  });
});
