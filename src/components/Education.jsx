import React from 'react';
import PropTypes from 'prop-types';

export default class Education extends React.Component {
  constructor(props) {
    super(props);

    const { section } = this.props;

    this.state = {
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      schools: [],
      section,
    };
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addAnotherSchool() {
    const {
      schools, schoolName, schoolTitle, schoolDate, section,
    } = this.state;

    this.setState({
      section,
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      schools: schools.concat({
        schoolName,
        schoolTitle,
        schoolDate,
      }),
    }, () => { console.log(this.state); });
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      schoolName, schoolTitle, schoolDate,
    } = this.state;

    this.setState((prevState) => ({
      schoolName,
      schoolTitle,
      schoolDate,
      schools: prevState.schools.concat({
        schoolName,
        schoolTitle,
        schoolDate,
      }),
      section: 'experience',
    }), () => {
      const { handleSection, handleInfo } = this.props;
      const { section, schools } = this.state;

      handleSection(section);
      handleInfo('education', schools);
    });
  }

  render() {
    const {
      schools, schoolName, schoolDate, schoolTitle,
    } = this.state;

    return (
      <div id="education">
        <h2>Education</h2>
        <ul>
          {schools.map((school) => (
            <li
              key={school.schoolName}
              id={school.schoolName}
            >
              {school.schoolName}
            </li>
          ))}
        </ul>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input type="text" name="schoolName" value={schoolName} id="school-name" placeholder="School name" onChange={this.changeHandler.bind(this)} />
          <input type="text" name="schoolTitle" value={schoolTitle} id="school-title" placeholder="Title" onChange={this.changeHandler.bind(this)} />
          <input type="date" name="schoolDate" value={schoolDate} id="school-date" placeholder="Date" onChange={this.changeHandler.bind(this)} />
          <button type="button" data="add" onClick={this.addAnotherSchool.bind(this)}>Add another</button>
          <button type="submit" data="submit">Submit</button>
          <button type="button" data="back">Back</button>
        </form>
      </div>
    );
  }
}

Education.propTypes = {
  section: PropTypes.string.isRequired,
  handleSection: PropTypes.func.isRequired,
  handleInfo: PropTypes.func.isRequired,
};
