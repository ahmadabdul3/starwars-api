import React, { PureComponent } from 'react';
import InputButtonCombo from './components/input_button_combo';
import Results from './components/results';
import starWarsClient from './api_clients/starwars_api_client.js';
import appClient from './api_clients/app_api_client.js';

export default class Home extends PureComponent {
  state = { resource: '', id: 0, apiData: {} };

  makeRequest = (e) => {
    e.preventDefault();
    const { resource, id } = this.state;

    appClient.getResource({ resource, id }).then((res) => {
      if (res) this.setState({ apiData: res.person });
    }).catch((err) => {
      console.warn('err', err);
    });
  }

  getResource(inputValue) {
    const parts = inputValue.split('/');
    return { resource: parts[0], id: parts[1] };
  }

  changeResource = (e) => {
    const { value } = e.target;
    const { resource, id } = this.getResource(value);

    this.setState({ resource, id });
  }

  render() {
    const { apiData } = this.state;

    return (
      <div className='home'>
        <form onSubmit={this.makeRequest}>
          <InputButtonCombo
            inputChange={this.changeResource}
            buttonText='request'
            placeholder='/people/1'
            autoFocus
          />
        </form>
        <Results data={apiData} />
      </div>
    );
  }
}
