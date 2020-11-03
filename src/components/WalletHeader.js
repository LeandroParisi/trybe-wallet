import React from 'react';
import trybeWallet from '../images/trybe_wallet_white_2.png'
import './style_sheets/WalletHeader.css';
import { faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import HeaderSubMenu from './sub-components/HeaderSubMenu';
import { render } from '@testing-library/react';

class WalletHeader extends React.Component {
  constructor() {
    super();

    this.setSubMenu = this.setSubMenu.bind(this);

    this.state = {
      subMenuDisplay: false
    }
  }

  setSubMenu() {
    const { subMenuDisplay } = this.state;

    if (subMenuDisplay) {
      this.setState({ subMenuDisplay: false })
    } else {
      this.setState({ subMenuDisplay: true })
    }
  }

  render() {
    const { subMenuDisplay } = this.state;
    return (
      <div>
        <header className="wallet-header">
          <img className='logo' src={ trybeWallet } width="200px" alt="Trybe Wallet Logo" />
          <nav className='menu' onClick={ this.setSubMenu }>
            <FontAwesomeIcon icon={ faCogs } />
          </nav>
        </header>

        <HeaderSubMenu display={ subMenuDisplay } />
      
      </div>
    )
  }

}

export default WalletHeader;