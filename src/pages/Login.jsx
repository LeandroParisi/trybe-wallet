import React from 'react';
import trybeWalletImg from '../images/trybeWallet.png';
import './style_sheets/Login.css';
import { Redirect } from 'react-router-dom';
import { saveEmail } from '../redux/actions';
import propTypes from 'prop-types';
import { connect } from 'react-redux';

class Login extends React.Component {
  constructor() {
    super();

    this.checkEmailValidity = this.checkEmailValidity.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.checkPasswordValidity = this.checkPasswordValidity.bind(this);
    this.handleInputBlur = this.handleInputBlur.bind(this);
    this.handleInputClick = this.handleInputClick.bind(this);
    this.handleButtonClick = this.handleButtonClick.bind(this);


    this.state = {
      email: '',
      password: '',
      buttonDisabled: true,
      emailInputError: false,
      passwordInputError: false,
      redirect: false,
    };
  }


  async handleInputClick({ target }) {
    const { name } = target;
    if(name === 'email') {
      this.setState({ emailInputError: false })
    } else {
      this.setState({ passwordInputError: false })
    }
  }

  async handleInputChange({ target }) {
    const { value, name } = target;
    await this.setState({ [name]: value });
    if(name === 'email') {
      this.checkEmailValidity();
    } else if (name === 'password') {
     this.checkPasswordValidity();
    }
  }

  async checkEmailValidity() {
    const { email } = this.state;
    const pattern = /^[A-Z0-9a-z._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,64}$/;
    const valid = email.match(pattern);
    if(valid !== null) {
      await this.setState({ emailVerified: true })
    } else {
      await this.setState({ emailVerified: false })
    }
  }

  async checkPasswordValidity() {
    const { password } = this.state;
    const exactLength = 6;
    if(password.length === exactLength) {
      await this.setState({ passwordVerified: true })
    } else {
      await this.setState({ passwordVerified: false })
    }
  }

  handleInputBlur({ target }) {
    const { emailVerified, passwordVerified } = this.state;
    const { name } = target;
    if (name === "email") {
      return emailVerified === false ? this.setState({ emailInputError: true }) : null
    }
    if (name === "password") {
      return passwordVerified === false ? this.setState({ passwordInputError: true }) : null
    }
  }

  handleButtonClick() {
    const { dispatchSaveEmail } = this.props;
    const { email } = this.state;
    dispatchSaveEmail(email)
    this.setState({ redirect: true })
  }

  render() {
    if(this.state.redirect) {
      return <Redirect to='/carteira' />
    }
    const { emailVerified = 0, passwordVerified = 0, emailInputError, passwordInputError } = this.state;
    return (
      <section className="login-page">
        <main className="login-container">
          <img src={trybeWalletImg} alt="Trybe Wallet Logo" />
          <input
            placeholder="Login"
            type="text"
            data-testid="email-input"
            name='email'
            className={ emailInputError ? 'input-error' : null }
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputBlur }
            onClick={ this.handleInputClick }
          />
          { emailInputError === true ?  <span className="email-error">Invalid Email!</span> : null }
          <input 
            placeholder="Password" 
            type="password" 
            data-testid="password-input"
            name='password'
            maxLength = '6'
            className={ passwordInputError ? 'input-error' : null }
            onChange={ this.handleInputChange }
            onBlur={ this.handleInputBlur }
            onClick={ this.handleInputClick }
          />
          { passwordInputError === true ?  <span className="email-error">Invalid password, it should have exactly 6 characters!</span> : null }
          <button 
            type="button" 
            className="trybe-btn-1"
            disabled={ !(emailVerified && passwordVerified) }
            onClick={ this.handleButtonClick }
          >
            Login
          </button>
        </main>
      </section>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  dispatchSaveEmail: (email) => dispatch(saveEmail(email))
})

Login.propType = {
  dispatchSaveEmail: propTypes.func.isRequired,
}

export default connect(null, mapDispatchToProps)(Login);
