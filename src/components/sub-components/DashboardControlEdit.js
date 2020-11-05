import React from 'react';
import './style_sheets/DashboardControlEdit.css';
import { connect } from 'react-redux';
import { returnSelectedDropdown } from '../../utils';
import { addToAccount, subtractFromAccount } from '../../redux/actions';

class DashboardControlEdit extends React.Component {
  constructor() {
    super();

    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.setEditMode = this.setEditMode.bind(this);
    this.setAmount = this.setAmount.bind(this);
    this.saveAccountEdit = this.saveAccountEdit.bind(this);


    this.state = {
      selectedAccount: "",
      editMode: "",
      value: '',
    }
  }

  setEditMode({ target }) {
    const { name } = target;

    this.setState({ editMode: name })
  }

  setAmount({ target }) {
    const { name, value } = target;

    const valueToNumber = parseFloat(value)

    this.setState({ [name]: valueToNumber })

  }

  handleSelectChange(event) {
    const { key, selected } = returnSelectedDropdown(event)
    this.setState({ [key]: selected })
  }

  saveAccountEdit() {
    const { value, selectedAccount, editMode } = this.state;
    const { dispatchAddToAccount, dispatchSubtractFromAccount } = this.props;

    const payload = { account: selectedAccount, value: value }

    if(editMode === 'Add') {
      dispatchAddToAccount(payload);
    } else {
      dispatchSubtractFromAccount(payload)
    }
  }

  render() {
    const { accounts } = this.props;
    const { selectedAccount, editMode, value } = this.state;

    return (
      <section className='dashboard-control-edit'>

        <div className={`edit-account-container ${editMode}`}>

          <div className="edit-mode-container">
            <button name="Add" className="Income trybe-btn-1" onClick={ this.setEditMode }>
              Add
            </button>
            <button name="Subtract" className="Expense trybe-btn-1" onClick={ this.setEditMode }>
              Subtract
            </button>
          </div>

          { editMode ?  
            <select name="selectedAccount" onChange={ this.handleSelectChange }>
              <option selected disabled>-- Choose an account</option>
              {Object.keys(accounts).map(account => (
                <option value={ account }>{ account }</option>
              ))}
            </select> 
            : null
          }

          {selectedAccount ? 
            <input 
              name="value"
              type="number" 
              value = { value }
              placeholder="Amount" 
              onChange={ this.setAmount }
            /> 
            : null
          }

          {value ? 
            <button className="trybe-btn-1 save-button" onClick={ this.saveAccountEdit }>
              Save!
            </button>
            : null
          }
        </div>

      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  accounts: state.config.accounts,
})

const mapDispatchToProps = (dispatch) => ({
  dispatchAddToAccount: (payload) => dispatch(addToAccount(payload)),
  dispatchSubtractFromAccount: (payload) => dispatch(subtractFromAccount(payload))
})

export default connect(mapStateToProps, mapDispatchToProps)(DashboardControlEdit);