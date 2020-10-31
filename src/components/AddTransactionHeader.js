import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

class AddTransactionHeader extends React.Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick({ target }) {
    const { selectTransaction } = this.props;
    selectTransaction(target.innerText);
  }

  render() {
    const { transactionType, selectedTransaction } = this.props;
    const typeOfTransactions = ['Expense', 'Income', 'Transfer']
    const selected = 'header-item selected';
    const unselected = 'header-item'
    return (
      <header className={`transaction-header ${ selectedTransaction }`}>
        { typeOfTransactions.map(transaction => (          
          <div
            className={ transaction === selectedTransaction ? selected : unselected }
            onClick={ this.handleClick }
          >
            { transaction }
          </div>
        ))}
      </header>
    )
  }
}

export default AddTransactionHeader;