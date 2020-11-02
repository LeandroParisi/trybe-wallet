import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDollarSign, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import './style_sheets/DashBoardControlValues.css'

class DashboardControlValues extends Component {
  render() {
    const { value, transactionType } = this.props;
    const formattedNumber = (Math.round(value * 100) / 100).toFixed(2)

    return (
      <div className="icon-value-container">
        <FontAwesomeIcon icon={ faDollarSign } className={ `control-icons ${transactionType}` } />
        <span className={ `${ transactionType } `}>{ formattedNumber }</span>
      </div>
    )
  }
}

export default DashboardControlValues