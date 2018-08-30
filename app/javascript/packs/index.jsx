// Run this example by adding <%= javascript_pack_tag 'hello_react' %> to the head of your layout file,
// like app/views/layouts/application.html.erb. All it does is render <div>Hello React</div> at the bottom
// of the page.

import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Route, BrowserRouter } from 'react-router-dom';
import Home from './home';
import appRoutes from './constants';
import 'whatwg-fetch';

class App extends PureComponent {
  render() {
    return (
      <BrowserRouter>
        <Route exact path={appRoutes.home} component={Home} />
      </BrowserRouter>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <App />,
    document.getElementById('react-entry')
  );
});
