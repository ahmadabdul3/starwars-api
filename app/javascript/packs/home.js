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
    loaderVisible: false,
  };

  componentDidMount() {
    const resource = 'people';
    const id = '1';
    this.getSingleResourceItem({ resource, id });
  }

  showLoader() { this.setState({ loaderVisible: true }); }
  hideLoader() { this.setState({ loaderVisible: false }); }

  submitForm = (e) => {
    e.preventDefault();
    const { resource, id } = this.getResourceParts(this.state.inputValue);
    if (id) this.getSingleResourceItem({ resource, id });
    else this.getAllResourceItems({ resource });
  }

  getSingleResourceItem({ resource, id }) {
    this.showLoader();
    appClient.getResource({ resource, id })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  getAllResourceItems({ resource }) {
    this.showLoader();
    starWarsClient.getAll({ resource })
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  handleNavButtonClick = (url) => {
    this.showLoader();
    starWarsClient.getAllWithUrl(url)
      .then(this.handleResponse)
      .catch(this.handleError);
  }

  handleResponse = (res) => {
    this.hideLoader();
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

  handleError = (err) => {
    this.hideLoader();
    console.log('handle error', err);
    const error = err.detail || err;
    this.setState({ apiData: { error } });
  }

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
    const { apiData, inputValue, previous, next, loaderVisible } = this.state;

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
          <Loader loaderVisible={loaderVisible} />
          {
            loaderVisible ? null : <Results data={apiData} linkClick={this.linkClick} />
          }
        <Pagination prev={previous} next={next} navigate={this.handleNavButtonClick} />
      </div>
    );
  }
}

// - the reason the loader is hidden with css is so that the images are
//   not re-fetched everytime we show the loader
class Loader extends PureComponent {
  render() {
    const { loaderVisible } = this.props;
    const className = loaderVisible ? 'loader' : 'loader hidden';

    return (
      <div className={className}>
        <h2>
          Loading, please wait
        </h2>
        <section className='images'>
          <img
            src='https://orig00.deviantart.net/d13f/f/2018/019/d/c/vader_defend7_by_z_studios-dc0jfxq.gif'
            alt='loading...'
          />
          <img
            src='https://orig00.deviantart.net/ba1b/f/2018/006/b/0/droideka_shoot_by_z_studios-dbz5rdc.gif'
            alt='loading...'
          />
        </section>
      </div>
    )
  }
}
