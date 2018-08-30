import React, { Component, PureComponent } from 'react';
import starWarsClient from './api_clients/starwars_api_client.js';
import appClient from './api_clients/app_api_client.js';

export default class Home extends PureComponent {
  state = { id: 0, apiData: {} };

  makeRequest = () => {
    appClient.getPerson(this.state.id).then((res) => {
      console.log(res);
      this.setState({ apiData: res.person });
    });
  }

  changeId = (e) => {
    this.setState({ id: e.target.value });
  }

  render() {
    const { apiData } = this.state;

    return (
      <div className='home'>
        <InputButtonCombo
          inputChange={this.changeId}
          buttonClick={this.makeRequest}
          buttonText='request'
          placeholder='/people/1'
        />
        <Results data={apiData} />
      </div>
    );
  }
}


class InputButtonCombo extends PureComponent {
  render() {
    const {
      inputChange,
      buttonText,
      buttonClick,
      placeholder,
    } = this.props;

    return (
      <div className='input-button-combo'>
        <input onChange={inputChange} placeholder={placeholder} />
        <button onClick={buttonClick}>
          { buttonText }
        </button>
      </div>
    )
  }
}

class Results extends PureComponent {
  render() {
    const { data } = this.props;
    if (!data) return null;

    return (
      <div>
        {
          Object.keys(data).map((dataKey, index) => {
            return (
              <div className='key-value-pair' key={`${index}${dataKey}`}>
                <span className='key'>
                  { dataKey }
                </span>
                <DataValue value={data[dataKey]} />
              </div>
            )
          })
        }
      </div>
    );
  }
}

class DataValue extends PureComponent {
  determineElement(value, key) {
    if (value.indexOf('https://') > -1) {
      return (
        <button key={`${key}${value}`} className='value-button'>
          {value}
        </button>
      );
    }

    return <span key={`${key}${value}`} className='value'>{value}</span>;
  }

  render() {
    const { value } = this.props;

    if (Array.isArray(value)) {
      return (
        <div className='value-list'>
          {
            value.map((val, key) => {
              return this.determineElement(val, key);
            })
          }
        </div>
      );
    }

    return this.determineElement(`${value}`);
  }
}
