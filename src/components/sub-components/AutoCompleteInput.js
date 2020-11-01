import { render } from '@testing-library/react';
import React from 'react';
import './style_sheets/AutoCompleteInput.css';

class AutoCompleteInput extends React.Component {
  constructor() {
    super();

    this.handleInputChange = this.handleInputChange.bind(this);
    this.renderSuggestions = this.renderSuggestions.bind(this);

    this.state = {
      currentSuggestions: [],
      inputValue: '',
    };
  }

  handleInputChange(event) {
    const { suggestions, saveInputedCurrency } = this.props;
    let currentSuggestions = [];
    const { value } = event.target;

    if(value.length > 0) {
      const regex = new RegExp(`^${value}`, 'i');
      currentSuggestions = suggestions.sort().filter(suggestion => regex.test(suggestion));
    }
    this.setState({ currentSuggestions, inputValue: value })
    saveInputedCurrency(value);
  }
  
  selectSuggestion(suggestion) {
    const { saveInputedCurrency } = this.props;
    this.setState(() => ({
      inputValue: suggestion,
      currentSuggestions: [],
    }))
    saveInputedCurrency(suggestion)
  }

  renderSuggestions() {
    const { currentSuggestions } = this.state;
    const { className } = this.props;
    if(currentSuggestions.length === 0) {
      return null
    } else {
      return (
      <ul className={ className }>
        { currentSuggestions.map(suggestion => (
          <li onClick={() => this.selectSuggestion(suggestion)} className={ className }>
            { suggestion }
          </li>
        )) }
      </ul>
      )
    }
  }

  render() {
    const { inputValue } = this.state;
    const { className } = this.props;
    return(
      <div className="autocomplete-container">
        <input value={ inputValue } className={ className } type='text' placeholder="currency: USD, BRL, etc." onChange={ this.handleInputChange } onBlur={ this.changeInputFocus } />
        { this.renderSuggestions() }
      </div>
    )
  }
}

export default AutoCompleteInput;