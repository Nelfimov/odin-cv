import React from 'react';
import propTypes from 'prop-types';

export default class GeneralInfo extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      name: '',
      email: '',
      dateOfBirth: '',
      generals: [],
      section: 'general',
    };
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      name, email, dateOfBirth,
    } = this.state;

    this.setState((prevState) => ({
      name,
      email,
      dateOfBirth,
      generals: prevState.generals.concat({
        name,
        email,
        dateOfBirth,
      }),
      section: 'education',
    }), () => {
      const { handleSection, handleInfo } = this.props;
      const { section, generals } = this.state;

      handleInfo('generalInfo', generals);
      handleSection(section);
    });
  }

  render() {
    return (
      <div id="general-info">
        <h2>General info</h2>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input name="name" type="text" placeholder="Full name" onChange={this.changeHandler.bind(this)} />
          <input name="email" type="email" placeholder="Email" onChange={this.changeHandler.bind(this)} />
          <input name="dateOfBirth" type="date" placeholder="Date of birth" onChange={this.changeHandler.bind(this)} />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

GeneralInfo.propTypes = {
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
};
