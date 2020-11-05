import React from 'react';
import './style_sheets/Wallet.css';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { fetchCurrencies } from '../redux/actions/fetchCurrencies';
import { DetailedBalance, AccountBalance, MonthlyBalance, WalletHeader } from '../components';
import { DateSelect } from '../components/sub-components';
import '../layout_general/style_sheets_general/dashboard-controls.css';
import { months, currentMonth, returnSelectedDropdown, filterByMonth } from '../utils'; 

class Wallet extends React.Component {
  constructor(props) {
    super();

    this.handleDateSelect = this.handleDateSelect.bind(this);

    this.state = {
      redirect: '',
      currentMonth: currentMonth,
      transactions: props.transactions,
    }
  }

  componentDidMount() {
    const { dispatchFetchCurrencies, currencies } = this.props;
    if(currencies.length === 1) {
      dispatchFetchCurrencies();
    }
  }

  componentDidUpdate(prevProps) {
    if(prevProps.transactions !== this.props.transactions) {
      this.setState(currentState => ({
        ...currentState,
        transactions: this.props.transactions
      }))
    }
  }

  handleDateSelect(event) {
    const { key, selected } = returnSelectedDropdown(event);
    const { transactions } = this.props;

    const filteredMonth = filterByMonth(transactions, selected);
    console.log(filteredMonth)

    this.setState(() => ({
      transactions: filteredMonth,
      [key]: selected,
    }))
  }

  render() {

    const { currentMonth, transactions } = this.state;

    return (
      <div>

      <WalletHeader />
      
      <main className="wallet-body" >

        <DateSelect months={ months } currentMonth={ currentMonth } handleDateSelect={ this.handleDateSelect } />

        <AccountBalance className="dashboard-control" transactions={ transactions } />

        <MonthlyBalance className="dashboard-control" transactions={ transactions } />
        
        <DetailedBalance className="dashboard-control" transactions={ transactions } />

        <Link to='addtransaction'>
          <button className='trybe-btn-1 register-expense-button'>
            +
          </button>
        </Link>
      </main>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
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