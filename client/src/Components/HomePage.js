import React, { Component } from 'react';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputString: '',
      type: '',
      valid: false
    };
  }

  validateInput = input => {
    let type = '', valid = false;

    const mailReg = new RegExp("^(?=[A-Z0-9][A-Z0-9@._%+-]{5,253}$)[A-Z0-9._%+-]{1,64}@(?:(?=[A-Z0-9-]{1,63}\.)[A-Z0-9]+(?:-[A-Z0-9]+)*\.){1,8}[A-Z]{2,63}$", "i");
    const urlReg = new RegExp("^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\\-\\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$", "i");

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
    console.log(`--------> ${this.state.inputString}`)
  }

  render() {
    return (
      <div>
        <div class="container-fluid">
          <div class="row">
            <div class="col-md-3">
              <form>
                <div class="form-group">
                  <input 
                    type="text"
                    class="form-control"
                    id="inputString"
                    placeholder="Please enter email or web address"
                    onChange={this.handleChange}
                  >
                  </input>
                  <button
                    type="submit"
                    class="btn btn-primary btn-block"
                    onClick={this.onSubmit}
                  >
                  Get Image
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage