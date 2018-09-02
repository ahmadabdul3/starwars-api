import React, { PureComponent } from 'react';

export default class Pagination extends PureComponent {
  get currentPage() {
    const { next, prev } = this.props;
    let number;

    if (next) number = this.getNumber(next) - 1;
    else number = this.getNumber(prev) + 1;

    return `PAGE ${number}`;
  }

  getNumber(link) {
    const pageNumber = getPageNumber(link);
    const number = pageNumber.split(' ')[1];
    return parseInt(number, 10);
  }

  render() {
    const { next, prev, navigate } = this.props;
    if (!next && !prev) return null;

    return (
      <div className='pagination'>
        <section className='page-section'>
          <PaginationButton title='previous' link={prev} navigate={navigate} />
          <h3>
            { this.currentPage }
          </h3>
          <PaginationButton title='next' link={next} navigate={navigate} />
        </section>
      </div>
    );
  }
}

class PaginationButton extends PureComponent {
  navigate = () => {
    const { link, navigate } = this.props;
    if (!link) return;

    navigate(link);
  }

  get subtitle() {
    const { link } = this.props;
    if (!link) return '-';
    return getPageNumber(link);
  }

  render() {
    const { title, link } = this.props;

    return (
      <button onClick={this.navigate} className='navigation-button'>
        <div className='title'>
          { title.toUpperCase() }
        </div>
        <div className='subtitle'>
          { this.subtitle }
        </div>
      </button>
    );
  }
}

function getPageNumber(link) {
  const parts = link.split('?');
  let subtitle = parts[1];
  subtitle = subtitle.replace('=', ' ');

  return subtitle.toUpperCase();
}
