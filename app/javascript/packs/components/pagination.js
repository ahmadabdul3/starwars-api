import React, { PureComponent } from 'react';

export default class Pagination extends PureComponent {
  render() {
    const { next, prev, navigate } = this.props;
    if (!next && !prev) return null;

    return (
      <div className='pagination'>
        <section className='page-section'>
          <PaginationButton title='previous' link={prev} navigate={navigate} />
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
    if (!link) return;

    const parts = link.split('?');
    let subtitle = parts[1];
    subtitle = subtitle.replace('=', ' ');

    return subtitle.toUpperCase();
  }

  render() {
    const { title, link } = this.props;

    return (
      <button onClick={this.navigate} className='navigation-button'>
        <div className='title'>
          { title.toUpperCase() }
        </div>
        <div className='subtitle'>
          { this.subtitle || 'NO ROUTE' }
        </div>
      </button>
    );
  }
}
