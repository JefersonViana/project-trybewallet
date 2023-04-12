import { screen } from '@testing-library/react';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import Wallet from '../pages/Wallet';

describe('Testando a página Wallet', () => {
  test('Verifica se a página renderiza 2 campos "textbox" e 3 campos "select"', () => {
    const { history } = renderWithRouterAndRedux(<Wallet />, { initialEntries: ['/carteira'] });
    const { pathname } = history.location;
    const titlePrice = screen.getByText(/0\.00/i);
    const titleBrl = screen.getByText(/brl/i);
    const btnAddExpense = screen.getByRole('button', { name: 'Adicionar despesa' });

    expect(titlePrice).toBeInTheDocument();
    expect(titleBrl).toBeInTheDocument();
    expect(btnAddExpense).toBeInTheDocument();
    expect(pathname).toBe('/carteira');
  });
});
