import React, { PureComponent } from 'react';

export default class Results extends PureComponent {
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
