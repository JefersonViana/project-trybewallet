import { fireEvent, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
// import { renderWithRouterAndRedux } from './helpers/renderWithRouterAndRedux';
import Wallet from '../pages/Wallet';
import mockData from './helpers/mockData';
import renderWithRouterAndRedux from './helpers/rendeWithRouterAndRedux';

describe('Testando o componente "Table"', () => {
  beforeEach(() => {
    jest.spyOn(global, 'fetch').mockResolvedValue({
      json: async () => (mockData),
    });
  });
  const cardCredit = 'Cartão de crédito';
  const VALUE_INPUT = 'value-input';
  const returnCoins = { wallet: {
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
    expenses: [],
    editor: false,
    idToEdit: 0,
    priceTotal: '0.00',
    object: {
      value: '0',
    },
  } };
  test('O componente Table renderiza ', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: returnCoins });
    const btnExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = await screen.findByTestId('currency-input');
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
    fireEvent.change(inputMethod, { target: { value: cardCredit } });
    fireEvent.change(inputCurrency, { target: { value: 'CAD' } });
    fireEvent.change(inputTag, { target: { value: 'Saúde' } });
    userEvent.click(btnExpense);

    const tdValue = await screen.findByRole('cell', { name: /5\.00/i });
    const tdDescription = await screen.findByRole('cell', { name: /ice cream/i });
    const tdCurrency = await screen.findByRole('cell', { name: /dólar canadense\/real brasileiro/i });
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
  test('Testando se o valor total é atualizado', async () => {
    const returnStateUpdate = {
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
            currency: 'CAD',
            description: 'despesa 1',
            method: cardCredit,
            tag: 'Lazer',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 1,
        priceTotal: '18.77',
        object: {
          value: '0',
        },
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState: returnStateUpdate });
    const priceTotal = await screen.findByTestId('total-field');
    console.log(priceTotal);
    expect(priceTotal.innerHTML).toBe('18.77');
    expect(priceTotal).toBeInTheDocument();
  });
  test('Testando se o valor total é atualizado', async () => {
    const returnStateUpdate = {
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
            currency: 'CAD',
            description: 'despesa 1',
            method: cardCredit,
            tag: 'Lazer',
            exchangeRates: mockData,
          },
          {
            id: 1,
            value: '10',
            currency: 'EUR',
            description: 'despesa 2',
            method: 'Cartão de débito',
            tag: 'Trabalho',
            exchangeRates: mockData,
          },
        ],
        editor: false,
        idToEdit: 1,
        priceTotal: '70.03',
        object: {
          value: '0',
        },
      },
    };
    renderWithRouterAndRedux(<Wallet />, { initialState: returnStateUpdate });

    const editbuttons = await screen.findAllByRole('button', { name: /editar/i });
    expect(editbuttons).toHaveLength(2);
    act(() => {
      userEvent.click(editbuttons[1]);
    });

    const btnEditExpense = screen.getByRole('button', { name: /editar despesa/i });
    const inputValue = screen.getByTestId(VALUE_INPUT);

    expect(btnEditExpense).toBeInTheDocument();
    act(() => {
      userEvent.type(inputValue, '9');
      userEvent.click(btnEditExpense);
    });

    expect(screen.getByRole('cell', { name: /9\.00/i })).toBeInTheDocument();
    expect(screen.queryByRole('cell', { name: /10\.00/i })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /editar despesa/i })).not.toBeInTheDocument();

    const btnDelete = await screen.findAllByRole('button', { name: /excluir/i });
    expect(btnDelete).toHaveLength(2);
  });
  test('Testando se o valor total é atualizado e o button exluir funciona', async () => {
    renderWithRouterAndRedux(<Wallet />, { initialState: returnCoins });

    const btnExpense = screen.getByRole('button', { name: /adicionar despesa/i });
    const inputValue = screen.getByTestId(VALUE_INPUT);
    const inputDescription = screen.getByTestId('description-input');
    const inputCurrency = await screen.findByTestId('currency-input');
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
    fireEvent.change(inputMethod, { target: { value: cardCredit } });
    fireEvent.change(inputCurrency, { target: { value: 'CAD' } });
    fireEvent.change(inputTag, { target: { value: 'Saúde' } });
    userEvent.click(btnExpense);

    const tdValue = await screen.findByRole('cell', { name: /5\.00/i });
    const tdDescription = await screen.findByRole('cell', { name: /ice cream/i });
    const tdCurrency = await screen.findByRole('cell', { name: /dólar canadense\/real brasileiro/i });
    const tdMethod = await screen.findByRole('cell', { name: /cartão de crédito/i });
    const tdTag = await screen.findByRole('cell', { name: /saúde/i });
    const btnEdit = await screen.findAllByRole('button', { name: /editar/i });
    const btnDelete = await screen.findAllByRole('button', { name: /excluir/i });
    const tdValueNot = screen.queryByRole('cell', { name: /6\.00/i });

    expect(tdValue).toBeInTheDocument();
    expect(tdDescription).toBeInTheDocument();
    expect(tdCurrency).toBeInTheDocument();
    expect(tdMethod).toBeInTheDocument();
    expect(tdTag).toBeInTheDocument();
    expect(btnEdit).toHaveLength(1);
    expect(btnDelete).toHaveLength(1);
    expect(tdValueNot).not.toBeInTheDocument();

    userEvent.click(btnEdit[0]);
    userEvent.type(inputValue, '6');
    const btnUpdateExpense = screen.getByRole('button', { name: /editar despesa/i });

    expect(btnUpdateExpense).toBeInTheDocument();

    userEvent.click(btnUpdateExpense);

    const tdValueInDocument = screen.queryByRole('cell', { name: /6\.00/i });

    expect(tdValueInDocument).toBeInTheDocument();

    userEvent.click(btnDelete[0]);

    const tdValueNotInDocument = screen.queryByRole('cell', { name: /6\.00/i });

    expect(tdValueNotInDocument).not.toBeInTheDocument();
  });
});
