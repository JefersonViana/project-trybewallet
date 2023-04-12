import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../pages/Login';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Testando a Página de Login', () => {
  test('Verifica se a página renderiza dois campos e um button', () => {
    renderWithRouterAndRedux(<Login />);

    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', { name: 'Entrar' });
    expect(inputEmail).toBeInTheDocument();
    expect(inputPassword).toBeInTheDocument();
    expect(buttonEl).toBeInTheDocument();
  });
  test('Verifica se o botão "Entrar" inicia desabilitado', () => {
    renderWithRouterAndRedux(<Login />);

    const buttonEl = screen.getByRole('button', { name: 'Entrar' });

    expect(buttonEl.disabled).toBe(true);
  });
  test('Verifica se o botão "Entrar" permanece desabilitado caso os campos não sejam validados', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const buttonEl = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, 'jefersonv28@gmail.com');
    userEvent.type(inputPassword, '12345');

    expect(buttonEl.disabled).toBe(true);
  });
  test('Verifica se o botão "Entrar" permanece desabilitado caso os campos não sejam validados', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const buttonEl = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, 'teste@teste.com');
    userEvent.type(inputPassword, '12345');

    expect(inputEmail.value).toBe('teste@teste.com');
    expect(inputPassword.value).toBe('12345');
    expect(buttonEl.disabled).toBe(true);
  });
  test('Verifica se o botão "Entrar" é habilitado caso os campos sejam validados', () => {
    renderWithRouterAndRedux(<Login />);
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const buttonEl = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, 'teste1@teste.com');
    userEvent.type(inputPassword, '123456');

    expect(inputEmail.value).toBe('teste1@teste.com');
    expect(inputPassword.value).toBe('123456');
    expect(buttonEl.disabled).toBe(false);
  });
  test('Verifica se o botão "Entrar" é habilitado caso os campos sejam validados', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    const inputEmail = screen.getByPlaceholderText('Email');
    const inputPassword = screen.getByPlaceholderText('Password');
    const buttonEl = screen.getByRole('button', { name: 'Entrar' });
    userEvent.type(inputEmail, 'teste2@teste.com');
    userEvent.type(inputPassword, '1234567');
    userEvent.click(buttonEl);

    expect(history.entries).toHaveLength(2);
  });
});
