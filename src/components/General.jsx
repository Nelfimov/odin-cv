import React from 'react';
import propTypes from 'prop-types';

export default class General extends React.Component {
  constructor(props) {
    super(props);

    const { section, generals } = this.props;

    this.state = {
      name: generals.name,
      email: generals.email,
      dateOfBirth: generals.dateOfBirth,
      generals,
      section,
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

    this.setState(() => ({
      name,
      email,
      dateOfBirth,
      generals: {
        name,
        email,
        dateOfBirth,
      },
      section: 'education',
    }), () => {
      const { handleSection, handleInfo } = this.props;
      const { section, generals } = this.state;

      handleInfo('general', generals);
      handleSection(section);
    });
  }

  render() {
    const { finished } = this.props;
    const {
      generals, name, dateOfBirth, email,
    } = this.state;

    let content;
    if (!finished) {
      content = (
        <form onSubmit={this.submitHandler.bind(this)}>
          <input value={name} name="name" type="text" placeholder="Full name" onChange={this.changeHandler.bind(this)} />
          <input value={email} name="email" type="email" placeholder="Email" onChange={this.changeHandler.bind(this)} />
          <input value={dateOfBirth} name="dateOfBirth" type="date" placeholder="Date of birth" onChange={this.changeHandler.bind(this)} />
          <button type="submit">Save</button>
        </form>
      );
    } else {
      content = (
        <>
          <table>
            <tbody>
              <tr>
                <td>Name: </td>
                <td>{generals[0].name}</td>
              </tr>
              <tr>
                <td>Email: </td>
                <td>{generals[0].email}</td>
              </tr>
              <tr>
                <td>Date of birth: </td>
                <td>{new Date(generals[0].dateOfBirth).toLocaleDateString()}</td>
              </tr>
            </tbody>
          </table>
          <button type="button">Edit</button>
        </>
      );
    }

    return (
      <div id="general-info">
        <h2>General info</h2>
        {content}
      </div>
    );
  }
}

General.propTypes = {
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
  section: propTypes.string.isRequired,
  finished: propTypes.bool.isRequired,
  generals: propTypes.arrayOf(propTypes.shape),
};

General.defaultProps = {
  generals: [],
};
