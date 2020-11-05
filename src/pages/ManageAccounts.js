import React from 'react';
import { connect } from 'react-redux';
import './style_sheets/ManageAccounts.css'

class ManageAccounts extends React.Component {
  constructor(props) {
    super();

    this.handleButtonClick = this.handleButtonClick.bind(this);

    this.state = {
      editAccount: false,
    }
  }

  handleButtonClick() {
    console.log('button clicked')
  }

  renderAccountEdit() {
    return (
      <section className="whole-page account-edit">
        <section className="whole-page-container">

        </section>
      </section>
    )
  }

  render() {
    const { accounts } = this.props;
    const { editAccount } = this.state;
    
    return(
      <section className="whole-page">
        <section className="whole-page-container">
          <h1>Manage Accounts:</h1>
          {Object.keys(accounts).map(account => (
            <div className="account-stats">
              <p><strong>{ account }</strong></p>
              <p>${ accounts[account] }</p>
              <div className="account-buttons-control">
                <button onClick={ this.handleButtonClick } className="trybe-btn-1">
                  +
                </button>
                <button onClick={ this.handleButtonClick } className="trybe-btn-1">
                  -
                </button>
              </div>
            </div>
          ))}
        </section>
      </section>
      

    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.config.accounts,
})

export default connect(mapStateToProps)(ManageAccounts);