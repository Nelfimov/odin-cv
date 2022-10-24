import React from 'react';
import propTypes from 'prop-types';

export default class Experience extends React.Component {
  constructor(props) {
    super(props);

    const { section, experiences } = this.props;

    this.state = {
      companyName: '',
      position: '',
      tasks: '',
      fromDate: '',
      untilDate: '',
      experiences,
      section,
    };
  }

  getBack() {
    const { handleSection } = this.props;
    handleSection('education');
  }

  changeHandler(e) {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  addAnotherExperience() {
    const {
      companyName, position, tasks, fromDate, untilDate, experiences,
    } = this.state;

    this.setState({
      companyName: '',
      position: '',
      tasks: '',
      fromDate: '',
      untilDate: '',
      experiences: experiences.concat({
        companyName, position, tasks, fromDate, untilDate,
      }),
    });
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      companyName, position, tasks, fromDate, untilDate,
    } = this.state;

    this.setState((prevState) => ({
      experiences: prevState.experiences.concat({
        companyName,
        position,
        tasks,
        fromDate,
        untilDate,
      }),
      section: 'overall',
    }), () => {
      const { handleSection, handleInfo } = this.props;
      const { section, experiences } = this.state;

      handleSection(section);
      handleInfo('experience', experiences);
    });
  }

  render() {
    const {
      companyName, position, tasks, fromDate, untilDate, experiences,
    } = this.state;

    const { finished, handleSection } = this.props;

    let content;
    if (!finished) {
      content = (
        <>
          <ul>
            {experiences.length > 0 && experiences.map((experience, index) => (
              <li key={experience.fromDate}>
                {index}
                :
                {' '}
                {experience.companyName}
                {' '}
                as
                {' '}
                {experience.position}
                <button type="button">Edit</button>
              </li>
            ))}
          </ul>
          <form onSubmit={this.submitHandler.bind(this)}>
            <input value={companyName} onChange={this.changeHandler.bind(this)} name="companyName" id="company-name" type="text" placeholder="Company name" />
            <input value={position} onChange={this.changeHandler.bind(this)} name="position" id="position" type="text" placeholder="Position" />
            <input value={tasks} onChange={this.changeHandler.bind(this)} name="tasks" id="tasks" type="text" placeholder="Your main tasks" />
            <input value={fromDate} onChange={this.changeHandler.bind(this)} name="fromDate" id="from-date" type="date" placeholder="Company name" />
            <input value={untilDate} onChange={this.changeHandler.bind(this)} name="untilDate" id="until-date" type="date" placeholder="Company name" />
            <button type="button" data="add" onClick={this.addAnotherExperience.bind(this)}>Add another</button>
            <button type="submit" data="submit">Submit</button>
            <button type="button" data="back" onClick={this.getBack.bind(this)}>Back</button>
          </form>
        </>
      );
    } else {
      content = (
        <>
          <table>
            <thead>
              <tr>
                <th>Company</th>
                <th>Position</th>
                <th>Performed tasks</th>
                <th>From, date</th>
                <th>Until, date</th>
              </tr>
            </thead>
            <tbody>
              {experiences.map((experience) => (
                <tr key={`${experience.companyName}_${experience.position}`}>
                  <td>{experience.companyName}</td>
                  <td>{experience.position}</td>
                  <td>{experience.tasks}</td>
                  <td>{new Date(experience.fromDate).toLocaleDateString()}</td>
                  <td>{new Date(experience.untilDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <button type="button" onClick={() => handleSection('experience')}>Edit</button>
        </>
      );
    }

    return (
      <div id="experience">
        <h2>Practical experience</h2>
        {content}
      </div>
    );
  }
}

Experience.propTypes = {
  section: propTypes.string.isRequired,
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
  finished: propTypes.bool.isRequired,
  experiences: propTypes.arrayOf(propTypes.shape),
};

Experience.defaultProps = {
  experiences: [],
};
