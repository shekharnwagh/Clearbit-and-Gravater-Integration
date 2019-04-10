import React, { Component } from 'react';
import AsyncSelect from 'react-select/lib/Async';
import axios from 'axios';
import './style.css';

class CompanySearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {
        name: '',
        domain: '',
        logo: ''
      },
      prevState: {
        name: '',
        domain: '',
        logo: ''
      }
    };
  }

  parseDataForAsyncSelect = data => {
    const asyncSelectData = [];
    for (let company of data) {
      asyncSelectData.push({
        label: `${company.name} - (${company.domain})`,
        value: company
      });
    }

    return asyncSelectData;
  }

  promiseOptions = async (inputValue) => {
    if (inputValue) {
      try {
        const url = `https://autocomplete.clearbit.com/v1/companies/suggest?query=${inputValue}`;
        const res = await axios.get(url);
        if (res.status === 200 && res.data.length) {
          const asyncSelectData = this.parseDataForAsyncSelect(res.data);
          return asyncSelectData;
        }
      }
      catch (err) {
        console.log('Error in getting clearbit Autocomplete API : ', err.stack);
      }
    }
  }

  handleChange = (event, id) => {
    this.setState({
      ...this.state,
      [id]: event.value
    })
  }

  onSubmit = () => {
    const prevState = {
      name: this.state.company.name,
      domain: this.state.company.domain,
      logo: this.state.company.logo
    };
    this.setState({
      ...this.state,
      prevState 
    });
  }

  fallbackImage = () => {
    const requestUrl = require('./not_available.png');
    this.setState({
      ...this.state,
      company: {
        ...this.state.company,
        logo: requestUrl
      }
    });
  }

  render() {
    const displayCardHidden = this.state.prevState.name ? false : true;

    const DisplayCard =
      (
        <div
          className='card col-md-4'
          style={{
            marginTop: '20px'
          }}
        >
          <div className='row card-body'>
            <div className='col-md-4 square'>
              <img
                className='img img-responsive full-width align-self-center'
                src={this.state.prevState.logo}
                onError={this.fallbackImage}
              >
              </img>
            </div>

            <div className='col-md-8 align-self-center'>
              <h4 className='card-title'>
                Company Name
            </h4>
              <p className='card-text'>
                {this.state.prevState.name}
              </p>
              <h4 className='card-title'>
                Company Domain
            </h4>
              <p className='card-text'>
                {this.state.prevState.domain}
              </p>
            </div>
          </div>
        </div>
      )

    return (
      <div>
        <div
          className="row justify-content-md-center"
        >
          <div className="col-md-4">
            <form>
              <div className="form-group" style={{ marginTop: '40px' }} >
                <AsyncSelect
                  loadOptions={this.promiseOptions}
                  placeholder={'Enter company name to search'}
                  onChange={val => this.handleChange(val, 'company')}
                />
              </div>
            </form>
            <button
              className="btn btn-primary btn-block"
              style={{ marginTop: '15px' }}
              onClick={this.onSubmit}
            >
              Get Company Logo
            </button>
          </div>
        </div>
        <div
          className='row justify-content-md-center'
          hidden={displayCardHidden}
        >
          {DisplayCard}
        </div>
      </div>
    )
  }
}

export default CompanySearch;