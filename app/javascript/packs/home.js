import React, { PureComponent } from 'react';
import InputButtonCombo from './components/input_button_combo';
import Results from './components/results';
import starWarsClient from './api_clients/starwars_api_client.js';
import appClient from './api_clients/app_api_client.js';

export default class Home extends PureComponent {
  state = { id: 0, apiData: {} };

  makeRequest = (e) => {
    e.preventDefault();
    appClient.getPerson(this.state.id).then((res) => {
      if (res) this.setState({ apiData: res.person });
    });
  }

  changeId = (e) => {
    const id = e.target.value;
    this.setState({ id: parseInt(id, 10) });
  }

  render() {
    const { apiData } = this.state;

    return (
      <div className='home'>
        <form onSubmit={this.makeRequest}>
          <InputButtonCombo
            inputChange={this.changeId}
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
