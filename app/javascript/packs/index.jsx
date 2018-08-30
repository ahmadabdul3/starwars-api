// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Route, BrowserRouter } from 'react-router-dom';
import appRoutes from './constants';
import 'whatwg-fetch';
import starWarsClient from './api_clients/starwars_api_client.js';
import appClient from './api_clients/app_api_client.js';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Route exact path={appRoutes.home} component={Home} />
      </BrowserRouter>
    );
  }
}

class Home extends PureComponent {
  state = { id: 0 };

  getPersonStarwars = () => {
    starWarsClient.getPerson(this.state.id).then((res) => { console.log(res); });
  }

  getPersonApp = () => {
    appClient.getPerson(this.state.id).then((res) => { console.log(res); });
  }

  changeId = (e) => {
    this.setState({ id: e.target.value });
  }

  render() {
    return (
      <div>
        <input onChange={this.changeId} />
        <button onClick={this.getPersonStarwars}>
          get person starwars api
        </button>
        <button onClick={this.getPersonApp}>
          get person app api
        </button>
      </div>
    );
  }
}


document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-entry')
  );
});
