import React from 'react';
import trybeWallet from '../images/trybe_wallet_white_2.png'
import './style_sheets/WalletHeader.css';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSubMenu from './sub-components/HeaderSubMenu';
import { render } from '@testing-library/react';
import { withRouter } from 'react-router-dom';

class WalletHeader extends React.Component {
  constructor() {
    super();

    this.setSubMenu = this.setSubMenu.bind(this);

    this.state = {
      subMenuDisplay: false,
      iconColor: 'white',
    }
  }

  setSubMenu() {
    const { subMenuDisplay } = this.state;

    if (subMenuDisplay) {
      this.setState({ 
        subMenuDisplay: false,
        iconColor: 'white',
      })
    } else {
      this.setState({
        subMenuDisplay: true,
        iconColor: 'rgb(200, 200, 200)',
      })
    }
  }

  render() {
    const { subMenuDisplay, iconColor } = this.state;
    return (
      <div>
        <header className="wallet-header">
          <img className='logo' src={ trybeWallet } width="200px" alt="Trybe Wallet Logo" />
          <nav className='menu' onMouseEnter={ this.setSubMenu }>
            <FontAwesomeIcon icon={ faCogs } color={ iconColor } />
          </nav>
        </header>

        <HeaderSubMenu display={ subMenuDisplay } event={ this.setSubMenu } />
      
      </div>
    )
  }

}

export default WalletHeader;