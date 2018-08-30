import React, { PureComponent } from 'react';

export default class InputButtonCombo extends PureComponent {
  static defaultProps = {
    buttonClick: () => {},
  };

  inputRef = undefined;

  componentDidMount() {
    const { autoFocus } = this.props;
    if (autoFocus) this.inputRef.focus();
  }

  render() {
    const {
      inputChange,
      buttonText,
      buttonClick,
      placeholder,
    } = this.props;

    return (
      <div className='input-button-combo'>
        <input
          onChange={inputChange}
          placeholder={placeholder}
          ref={(input) => { this.inputRef = input; } }
        />
        <button onClick={buttonClick}>
          { buttonText }
        </button>
      </div>
    )
  }
}
