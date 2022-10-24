import React from 'react';
import propTypes from 'prop-types';
import uniqid from 'uniqid';

export default class Education extends React.Component {
  constructor(props) {
    super(props);

    const { section, education } = this.props;

    this.state = {
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      id: uniqid(),
      schools: education,
      section,
    };
  }

  getBack() {
    const { handleSection } = this.props;
    handleSection('general');
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  /** Change existing schools in [school] by onChange */
  changeExistingHandler(e) {
    this.setState((prevState) => ({
      schools: prevState.schools.map(
        (school) => (school.id === e.target.parentElement.id
          ? { ...school, [e.target.name]: e.target.value }
          : school),
      ),
    }));
  }

  /** Add existing school to state and add new inputs */
  addAnotherSchool() {
    const {
      schools, schoolName, schoolTitle, schoolDate, section, id,
    } = this.state;

    if (!schoolDate || !schoolName || !schoolTitle) {
      alert('Fill in all required fields');
      return;
    }

    this.setState({
      schools: schools.concat({
        schoolName,
        schoolTitle,
        schoolDate,
        id,
      }),
      section,
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      id: uniqid(),
    });
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      schoolName, schoolTitle, schoolDate, id,
    } = this.state;

    /** If inputs are empty, check for anything in SCHOOLS. Else, ignore Submit. */
    if (!schoolDate || !schoolName || !schoolTitle) {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.schools.length < 1) {
        alert('You have to input something');
        return;
      }

      this.setState({
        section: 'experience',
      }, () => {
        const { handleSection, handleInfo } = this.props;
        const { section } = this.state;
        const { schools } = this.state;

        handleSection(section);
        handleInfo('education', schools);
      });
    } else {
      this.setState((prevState) => ({
        schools: prevState.schools.concat({
          schoolName,
          schoolTitle,
          schoolDate,
          id,
        }),
        section: 'experience',
      }), () => {
        const { handleSection, handleInfo } = this.props;
        const { section } = this.state;
        const { schools } = this.state;

        handleSection(section);
        handleInfo('education', schools);
      });
    }
  }

  render() {
    const {
      schools, schoolName, schoolDate, schoolTitle,
    } = this.state;

    const { finished, handleSection } = this.props;

    let content;
    if (!finished) {
      content = (
        <form onSubmit={this.submitHandler.bind(this)}>
          { schools.length > 0
              && (
              <ul>
                <h2>Your education</h2>
                {schools.map((school) => (
                  <li key={school.id} id={school.id}>
                    <input type="text" name="schoolName" value={school.schoolName} placeholder="School name" onChange={this.changeExistingHandler.bind(this)} />
                    <input type="text" name="schoolTitle" value={school.schoolTitle} placeholder="Title" onChange={this.changeExistingHandler.bind(this)} />
                    <input type="date" name="schoolDate" value={school.schoolDate} placeholder="Date" onChange={this.changeExistingHandler.bind(this)} />
                  </li>
                ))}
              </ul>
              )}

          <input type="text" name="schoolName" value={schoolName || ''} id="school-name" placeholder="School name" onChange={this.changeHandler.bind(this)} />
          <input type="text" name="schoolTitle" value={schoolTitle || ''} id="school-title" placeholder="Title" onChange={this.changeHandler.bind(this)} />
          <input type="date" name="schoolDate" value={schoolDate || ''} id="school-date" placeholder="Date" onChange={this.changeHandler.bind(this)} />

          <button type="button" data="add" onClick={this.addAnotherSchool.bind(this)}>Add another</button>
          <button type="submit" data="submit">Submit</button>
          <button type="button" data="back" onClick={this.getBack.bind(this)}>Back</button>
        </form>
      );
    } else {
      content = (
        <>
          <table>
            <thead>
              <tr>
                <th>School name</th>
                <th>Title</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {schools.map((school) => (
                <tr key={`${school.schoolName}_${school.schoolTitle}`}>
                  <td>{school.schoolName}</td>
                  <td>{school.schoolTitle}</td>
                  <td>{new Date(school.schoolDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => handleSection('education')}>Edit</button>
        </>
      );
    }

    return (
      <div id="education">
        <h2>Education</h2>
        {content}
      </div>
    );
  }
}

Education.propTypes = {
  section: propTypes.string.isRequired,
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
  finished: propTypes.bool.isRequired,
  education: propTypes.arrayOf(propTypes.shape),
};

Education.defaultProps = {
  education: [],
};
