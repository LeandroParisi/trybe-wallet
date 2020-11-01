import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './style_sheets/DashBoardControlValues.css'

class DashboardControlValues extends Component {
  render() {
    const { value, transactionType } = this.props;
    return (
      <div className="icon-value-container">
        <FontAwesomeIcon icon={ faDollarSign } className={ `control-icons ${transactionType}` } />
        <span className={ `${ transactionType } `}>{value}</span>
      </div>
    )
  }
}

export default DashboardControlValues