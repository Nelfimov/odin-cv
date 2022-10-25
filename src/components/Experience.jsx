import React from 'react';
import propTypes from 'prop-types';
import uniqid from 'uniqid';

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
      id: uniqid(),
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

  changeExistingHandler(e) {
    this.setState((prevState) => ({
      experiences: prevState.experiences.map(
        (experience) => (experience.id === e.target.parentElement.id
          ? { ...experience, [e.target.name]: e.target.value }
          : experience),
      ),
    }));
  }

  addAnotherExperience() {
    const {
      companyName, position, tasks, fromDate, untilDate, experiences, id,
    } = this.state;

    if (!companyName || !position || !tasks || !fromDate || !untilDate) {
      alert('You have to input something');
      return;
    }

    this.setState({
      companyName: '',
      position: '',
      tasks: '',
      fromDate: '',
      untilDate: '',
      id: uniqid(),
      experiences: experiences.concat({
        companyName, position, tasks, fromDate, untilDate, id,
      }),
    });
  }

  submitHandler(e) {
    e.preventDefault();

    const {
      companyName, position, tasks, fromDate, untilDate, id,
    } = this.state;

    if (!companyName || !position || !tasks || !fromDate || !untilDate) {
      // eslint-disable-next-line react/destructuring-assignment
      if (this.state.experiences.length < 1) {
        alert('You have to input something');
        return;
      }

      this.setState({
        section: 'overall',
      }, () => {
        const { handleSection, handleInfo } = this.props;
        const { section, experiences } = this.state;

        handleSection(section);
        handleInfo('experience', experiences);
      });
    } else {
      this.setState((prevState) => ({
        experiences: prevState.experiences.concat({
          companyName,
          position,
          tasks,
          fromDate,
          untilDate,
          id,
        }),
        section: 'overall',
      }), () => {
        const { handleSection, handleInfo } = this.props;
        const { section, experiences } = this.state;

        handleSection(section);
        handleInfo('experience', experiences);
      });
    }
  }

  render() {
    const {
      companyName, position, tasks, fromDate, untilDate, experiences,
    } = this.state;

    const { finished, handleSection } = this.props;

    let content;
    if (!finished) {
      content = (
        <form onSubmit={this.submitHandler.bind(this)}>
          { experiences.length > 0 && (
          <ul>
            <h2>Your experience</h2>
            {experiences.map((experience) => (
              <li key={experience.id} id={experience.id}>
                <input
                  value={experience.companyName}
                  onChange={this.changeExistingHandler.bind(this)}
                  name="companyName"
                  type="text"
                  placeholder="Company name"
                />
                <input
                  value={experience.position}
                  onChange={this.changeExistingHandler.bind(this)}
                  name="position"
                  type="text"
                  placeholder="Position"
                />
                <input
                  value={experience.tasks}
                  onChange={this.changeExistingHandler.bind(this)}
                  name="tasks"
                  type="text"
                  placeholder="Your main tasks"
                />
                <input
                  value={experience.fromDate}
                  onChange={this.changeExistingHandler.bind(this)}
                  name="fromDate"
                  type="text"
                  onFocus={(e) => {
                    e.target.type = 'date';
                  }}
                  onBlur={(e) => {
                    e.target.type = 'text';
                  }}
                  placeholder="Company name"
                />
                <input
                  value={experience.untilDate}
                  onChange={this.changeExistingHandler.bind(this)}
                  name="untilDate"
                  type="text"
                  onFocus={(e) => {
                    e.target.type = 'date';
                  }}
                  onBlur={(e) => {
                    e.target.type = 'text';
                  }}
                  placeholder="Company name"
                />
              </li>
            ))}
          </ul>
          )}
          <input
            value={companyName}
            onChange={this.changeHandler.bind(this)}
            name="companyName"
            id="company-name"
            type="text"
            placeholder="Company name"
          />
          <input
            value={position}
            onChange={this.changeHandler.bind(this)}
            name="position"
            id="position"
            type="text"
            placeholder="Position"
          />
          <input
            value={tasks}
            onChange={this.changeHandler.bind(this)}
            name="tasks"
            id="tasks"
            type="text"
            placeholder="Your main tasks"
          />
          <input
            value={fromDate}
            onChange={this.changeHandler.bind(this)}
            name="fromDate"
            id="from-date"
            type="text"
            onFocus={(e) => {
              e.target.type = 'date';
            }}
            onBlur={(e) => {
              e.target.type = 'text';
            }}
            placeholder="Start date"
          />
          <input
            value={untilDate}
            onChange={this.changeHandler.bind(this)}
            name="untilDate"
            id="until-date"
            type="text"
            onFocus={(e) => {
              e.target.type = 'date';
            }}
            onBlur={(e) => {
              e.target.type = 'text';
            }}
            placeholder="End date"
          />
          <button type="button" data="add" onClick={this.addAnotherExperience.bind(this)}>Add another</button>
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
