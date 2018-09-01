import React, { PureComponent } from 'react';
import InputButtonCombo from './components/input_button_combo';
import Results from './components/results';
import Pagination from './components/pagination';
import starWarsClient from './api_clients/starwars_api_client.js';
import appClient from './api_clients/app_api_client.js';

export default class Home extends PureComponent {
  state = {
    inputValue: '',
    apiData: {},
  };

  componentDidMount() {
    const resource = 'people';
    const id = '1';
    this.getSingleResourceItem({ resource, id });
  }

  submitForm = (e) => {
    e.preventDefault();
    const { resource, id } = this.getResourceParts(this.state.inputValue);
    if (id) this.getSingleResourceItem({ resource, id });
    else this.getAllResourceItems({ resource });
  }

  getSingleResourceItem({ resource, id }) {
    appClient.getResource({ resource, id })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAllResourceItems({ resource }) {
    starWarsClient.getAll({ resource })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  handleNavButtonClick = (url) => {
    starWarsClient.getAllWithUrl(url)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  handleResponse = (res) => {
    if (!res) return;

    const resource = res.resource || res;
    const newState = { apiData: resource };
    let previous, next;

    if (resource.results) {
      previous = resource.previous;
      next = resource.next;
    }

    newState.previous = previous;
    newState.next = next;

    this.setState(newState);
  }

  handleError = (err) => { console.warn('err', err); }

  getResourceParts(inputValue) {
    const parts = inputValue.split('/');
    return { resource: parts[0], id: parts[1] };
  }

  inputChange = (e) => {
    const inputValue = e.target.value;
    this.setState({ inputValue });
  }

  linkClick = (path) => {
    const sawapiBaseUrl = 'https://swapi.co/api/';
    const substringStart = sawapiBaseUrl.length;
    const substringEnd = path.length;
    const resourcePath = path.substring(substringStart, substringEnd);
    const { resource, id } = this.getResourceParts(resourcePath);

    this.setState({ inputValue: `${resource}/${id}` });
    this.getSingleResourceItem({ resource, id });
  }

  render() {
    const { apiData, inputValue, previous, next } = this.state;

    return (
      <div className='home'>
        <form onSubmit={this.submitForm} className='search-bar'>
          <section className='page-section'>
            <InputButtonCombo
              inputChange={this.inputChange}
              buttonText='request'
              placeholder='people/1'
              inputValue={inputValue}
              autoFocus
            />
          </section>
        </form>
        <Results data={apiData} linkClick={this.linkClick} />
        <Pagination prev={previous} next={next} navigate={this.handleNavButtonClick} />
      </div>
    );
  }
}
