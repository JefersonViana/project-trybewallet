import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { emailAction } from '../redux/actions';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
    };
  }

  handleClick = () => {
    const { history, dispatch } = this.props;
    const { email } = this.state;
    dispatch(emailAction(email));
    history.push('/carteira');
  };
  // handleChange = ({ target }) => {
  //   this.setState({
  //     [target.name]: target.value,
  //   });
  // };

  render() {
    const { email, password } = this.state;
    const isValidEmail = email.includes('@') && email.includes('.com');
    const numberMagic = 6;
    const isValidPassword = password.length < numberMagic;
    return (
      <form>
        <input
          type="text"
          data-testid="email-input"
          placeholder="Email"
          name="email"
          value={ email }
          onChange={ ({ target }) => this.setState({ [target.name]: target.value }) }
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          name="password"
          value={ password }
          onChange={ ({ target }) => this.setState({ [target.name]: target.value }) }
        />
        <button
          type="button"
          disabled={ !isValidEmail || isValidPassword }
          onClick={ this.handleClick }
        >
          Entrar
        </button>
      </form>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect()(Login);
