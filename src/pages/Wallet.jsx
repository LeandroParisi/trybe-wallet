import React from 'react';
import './style_sheets/Wallet.css';
import { connect } from 'react-redux';
import trybeWallet from '../images/trybe_wallet_white_2.png'
import { Redirect } from 'react-router-dom';

class Wallet extends React.Component {
  constructor() {
    super();

    this.addTransaction = this.addTransaction.bind(this);

    this.state = {
      redirect: '',
    }
  }

  addTransaction() {
    this.setState({ redirect: '/addtransaction' })
  }

  render() {
    const { redirect } = this.state;
    if(redirect !== '') {
      return <Redirect to={ redirect } />
    }

    const { userEmail } = this.props;
    return (
      <div>
      <header className="wallet-header">
          <p className="header-text"><b>User: </b>{ userEmail }</p>
          <img src={ trybeWallet } width="200px" alt="Trybe Wallet Logo" />
          <p className="header-text"><b>Despesa Total: </b>0 BRL</p>
      </header>
      <main className="wallet-body">

        <button className='trybe-btn-1 register-expense-button' onClick={ this.addTransaction }>
          +
        </button>
      </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
})

export default connect(mapStateToProps)(Wallet);