import React from 'react';
import './style_sheets/Wallet.css';
import { connect } from 'react-redux';
import trybeWallet from '../images/trybe_wallet_white_2.png'
import { Redirect } from 'react-router-dom';
import { fetchCurrencies } from '../redux/actions/fetchCurrencies';
import TransactionsDashboard from '../components/TransactionsDashboard';
import AccountBalance from '../components/AccountBalance';
import '../layout_general/style_sheets_general/dashboard-controls.css';

class Wallet extends React.Component {
  constructor() {
    super();

    this.addTransaction = this.addTransaction.bind(this);

    this.state = {
      redirect: '',
    }
  }

  componentDidMount() {
    const { dispatchFetchCurrencies, currencies } = this.props;
    if(currencies.length === 1) {
      dispatchFetchCurrencies();
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

    const { userEmail, transactions } = this.props;
    return (
      <div>
      <header className="wallet-header">
          <p className="header-text"><b>User: </b>{ userEmail }</p>
          <img src={ trybeWallet } width="200px" alt="Trybe Wallet Logo" />
          <p className="header-text"><b>Despesa Total: </b>0 BRL</p>
      </header>
      <main className="wallet-body">

        <AccountBalance className="dashboard-control" />
        
        <TransactionsDashboard className="dashboard-control" />

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
  currencies: state.wallet.currencies,
  transactions: state.wallet.transactions,
  paymentMethods: state.config.paymentMethods,
  categories: state.config.categories,
  typeOfTransactions: state.config.typeOfTransactions,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchFetchCurrencies: () => dispatch(fetchCurrencies()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);