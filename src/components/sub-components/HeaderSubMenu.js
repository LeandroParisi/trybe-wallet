import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import '../../layout_general/style_sheets_general/full-page-content.css';
import { convertTransactions } from '../../redux/actions';
import { convertValues, returnSelectedDropdown } from '../../utils';
import './style_sheets/HeaderSubMenu.css';

class HeaderSubMenu extends React.Component {
  constructor(props) {
    super();

    this.setCurrency = this.setCurrency.bind(this);

    this.state = {
      currency: props.currency
    }
  }

  setCurrency(event) {
    const { transactions, dispatchConvertTransactions } = this.props;
    const { selected } = returnSelectedDropdown(event);

    this.setState({ currency: selected })
    const newTransactions = convertValues(transactions, selected);
    dispatchConvertTransactions(newTransactions);
  }

  render() {
    const { display, userEmail, event, currencies } = this.props
    const { currency } = this.state;
    const id = display ? "display" : "hidden"; 

    return (
      <section id={ id } className='slide-menu' onMouseLeave={ event }>
        Configurations:

        <div className='slide-menu-option'>
          <p>Current currency: </p>
          <select value={ currency } onChange={ this.setCurrency }>
            {currencies.map(currency => (
              <option name={ currency } key={ currency }>{ currency} </option>
            ))}

          </select>
        </div>

        <div className='slide-menu-option'>
         <p><b>User: </b>{ userEmail }</p>
        </div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  userEmail: state.user.email,
  currency: state.wallet.currencyToExchange,
  currencies: state.wallet.currencies,
  transactions: state.wallet.transactions,
})

const  mapDispatchToProps = (dispatch) => ({
  dispatchConvertTransactions: (transactions) => dispatch(convertTransactions(transactions)),
})

export default connect(mapStateToProps, mapDispatchToProps)(HeaderSubMenu);