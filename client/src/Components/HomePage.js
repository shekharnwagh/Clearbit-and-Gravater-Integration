import React, { Component } from 'react';
import CompanySearch from './CompanySearch';
import './style.css';
const crypto = require('crypto');

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: '',
      type: '',
      valid: false,
      requestUrl: '',
      view: 'string',
      prevState: {
        inputString: '',
        type: '',
        valid: false,
      },
    };
  }

  validateInput = input => {
    let type = '', valid = false;

    const mailReg = /^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$/i;
    const urlReg = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i;

    if (mailReg.test(input)) {
      type = 'mail';
      valid = true;
    }
    else if (urlReg.test(input)) {
      type = 'url';
      valid = true;
    }

    return { type, valid };
  }

  generateMailLink = str => {
    const hash = crypto.createHash('md5').update(str).digest('hex');
    return `https://www.gravatar.com/avatar/${hash}`;
  }

  generateUrlLink = str => {
    return `https://logo.clearbit.com/${str}`;
  }

  handleChange = event => {
    const validation = this.validateInput(event.target.value);
    this.setState({
      ...this.state,
      [event.target.id]: event.target.value,
      type: validation.type,
      valid: validation.valid
    });
  };

  onSubmit = event => {
    let requestUrl = '';
    let prevState = {
      inputString: '',
      type: '',
      valid: false,
    }
    if (this.state.valid) {
      if (this.state.type === 'mail') {
        requestUrl = this.generateMailLink(this.state.inputString);
      }
      else if (this.state.type === 'url') {
        requestUrl = this.generateUrlLink(this.state.inputString);
      }
      prevState = {
        inputString: this.state.inputString,
        type: this.state.type,
        valid: this.state.valid
      }
      this.setState({
        ...this.state,
        requestUrl,
        prevState
      });
    }
    else {
      this.setState({
        ...this.state,
        requestUrl,
        prevState
      }, () => {
        alert('Invalid Input');
      });
    }
  }

  onViewClick = event => {
    this.setState({
      ...this.state,
      view: event.target.id
    })
  }

  fallbackImage = () => {
    console.log('FFFF');
    const requestUrl = require('./not_available.png');
    this.setState({
      ...this.state,
      requestUrl
    });
  }

  render() {
    let stringClass, searchClass;
    if (this.state.view==='string') {
      stringClass = 'btn btn-primary btn-block';
      searchClass = 'btn btn-outline-primary btn-block'
    }
    else {
      stringClass = 'btn btn-outline-primary btn-block';
      searchClass = 'btn btn-primary btn-block'
    }

    const displayCardHidden =
      !this.state.prevState.valid ||
      !this.state.requestUrl ||
      (this.state.view === 'search');

    const DisplayCard = (
      <div
        className='card col-md-4'
        style={{
          marginTop: '20px'
        }}
      >
        <div className='row card-body'>
          <div className='col-md-5 square'>
            <img
              className='img img-responsive full-width align-self-center'
              src={this.state.requestUrl}
              onError={this.fallbackImage}
            >
            </img>
          </div>

          <div className='col-md-7 align-self-center'>
            <h4 className='card-title'>
              Entered String
            </h4>
            <p className='card-text'>
              {this.state.prevState.inputString}
            </p>
            <h4 className='card-title'>
              Type
            </h4>
            <p className='card-text'>
              {
                this.state.prevState.type === 'mail' ?
                'Email Address' :
                'Website Domain'
              }
            </p>
          </div>
        </div>
      </div>
    )

    return (
      <div>
        <div className="container-fluid">
        <div className="row justify-content-md-center">
            <div
              className="col-md-4"
              style={{ marginTop: '80px' }}
            >
              <div className="btn-group btn-block">
                <button
                  id='string'
                  type="button"
                  className={stringClass}
                  style={{margin: '0px'}}
                  onClick={this.onViewClick}
                >
                  Enter String
                </button>
                <button
                  id='search'
                  type="button"
                  className={searchClass}
                  style={{margin: '0px'}}
                  onClick={this.onViewClick}
                >
                  Search Company
                </button>
              </div>
            </div>
        </div>
          <div
            className="row justify-content-md-center"
            hidden={this.state.view === 'string' ? false : true}
          >
            <div className="col-md-4">
              <form>
                <div className="form-group">
                  <input
                    type="text"
                    className="form-control"
                    style={{ marginTop: '40px' }}
                    id="inputString"
                    placeholder="Please enter email or web address"
                    onChange={this.handleChange}
                  >
                  </input>
                </div>
              </form>
              <button
                className="btn btn-primary btn-block"
                style={{ marginTop: '10px' }}
                onClick={this.onSubmit}
              >
                Get Image/Logo
                  </button>
            </div>
          </div>
          <div
            className='row justify-content-md-center'
            hidden={displayCardHidden}
          >
            {DisplayCard}
          </div>
          <div hidden={this.state.view === 'string' ? true : false}>
            <CompanySearch/>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage