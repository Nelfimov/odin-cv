import React from 'react';
import Education from './Education';

class GeneralInfo extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: '',
      email: '',
      dateOfBirth: '',
      generals: [],
      finished: false,
    };
  };

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  };

  submitHandler(e) {
    e.preventDefault();

    this.setState({
      name: '',
      email: '',
      dateOfBirth: '',
      generals: this.state.generals.concat({
        name: this.state.name, 
        email: this.state.email, 
        dateOfBirth: this.state.dateOfBirth,
      }),
      finished: true,
    }, () => console.log(this.state));
  };

  isFinished() {
    if (this.state.finished) {
      return <Education fields={this.state.generals}/>;
    }
    return (
      <div id='general-info'>
        <h2>General info</h2>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input name='name' type='text' placeholder='Full name' onChange={this.changeHandler.bind(this)} />
          <input name='email' type='email' placeholder='email' onChange={this.changeHandler.bind(this)} />
          <input name='dateOfBirth' type='date' placeholder='Date of birth' onChange={this.changeHandler.bind(this)} />
          <button>Submit</button>
        </form>
      </div>
    )
  }

  render() {

    return (
      <div>
        {this.isFinished()}
      </div>
    )
  }
}

export default GeneralInfo;
