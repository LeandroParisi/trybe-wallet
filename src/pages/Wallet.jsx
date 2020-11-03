import React from 'react';
import './style_sheets/Wallet.css';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchCurrencies } from '../redux/actions/fetchCurrencies';
import { DetailedBalance, AccountBalance, MonthlyBalance, WalletHeader } from '../components';
import { DateSelect } from '../components/sub-components';
import '../layout_general/style_sheets_general/dashboard-controls.css';
import { months, currentMonth, returnSelectedDropdown, filterByMonth } from '../utils'; 

class Wallet extends React.Component {
  constructor() {
    super();

    this.addTransaction = this.addTransaction.bind(this);
    this.handleDateSelect = this.handleDateSelect.bind(this);

    this.state = {
      redirect: '',
      currentMonth: '',
      transactions: [],
    }
  }

  componentDidMount() {
    const { dispatchFetchCurrencies, currencies, transactions } = this.props;
    if(currencies.length === 1) {
      dispatchFetchCurrencies();
    }

    this.setState({ currentMonth: currentMonth, transactions })
  }

  addTransaction() {
    this.setState({ redirect: '/addtransaction' })
  }

  handleDateSelect(event) {
    const { key, selected } = returnSelectedDropdown(event);
    const { transactions } = this.props;

    const filteredMonth = filterByMonth(transactions, selected);

    this.setState((currentState) => ({
      transactions: filteredMonth,
      [key]: selected,
    }))
  }

  render() {
    const { redirect } = this.state;
    if(redirect !== '') {
      return <Redirect to={ redirect } />
    }

    const { userEmail } = this.props;
    const { currentMonth, transactions } = this.state;

    return (
      <div>

      <WalletHeader userEmail={ userEmail } />
      
      <main className="wallet-body">

        <DateSelect months={ months } currentMonth={ currentMonth } handleDateSelect={ this.handleDateSelect } />

        <AccountBalance className="dashboard-control" transactions={ transactions } />

        <MonthlyBalance className="dashboard-control" transactions={ transactions } />
        
        <DetailedBalance className="dashboard-control" transactions={ transactions } />

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