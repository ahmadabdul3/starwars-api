import React, { PureComponent } from 'react';

export default class Results extends PureComponent {
  render() {
    const { data, linkClick } = this.props;
    if (!data) return null;

    return (
      <div className='results'>
        {
          Object.keys(data).map((dataKey, index) => {
            return (
              <div className='key-value-pair' key={`${index}${dataKey}`}>
                <span className='key'>
                  { dataKey }
                </span>
                <DataValue value={data[dataKey]} linkClick={linkClick} />
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
      const { linkClick } = this.props;
      return (
        <span key={`${key}${value}`} className='value value-link'>
          <button onClick={() => { linkClick(value); }}>
            {value}
          </button>
        </span>
      );
    }

    return <span key={`${key}${value}`} className='value'>{value}</span>;
  }

  get valueList() {
    const { value } = this.props;
    const noData = '- no data -';

    if (value.length < 1) return this.determineElement(noData);
    return value.map((val, key) => this.determineElement(val, key));
  }

  render() {
    const { value } = this.props;

    if (!Array.isArray(value)) return this.determineElement(`${value}`);
    return <div className='value-list'> {this.valueList} </div>;
  }
}
