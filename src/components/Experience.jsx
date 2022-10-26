import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import uniqid from 'uniqid';

function Experience(props) {
  const {
    section: propSection, experiences: propExperiences, handleInfo, handleSection, finished,
  } = props;

  const [experience, setExperience] = useState({
    companyName: '',
    position: '',
    tasks: '',
    fromDate: '',
    untilDate: '',
    id: uniqid(),
  });
  const [experiences, setExperiences] = useState(propExperiences);
  const [section, setSection] = useState(propSection);

  useEffect(() => {
    handleInfo('experience', experiences);
    handleSection(section);
  }, [section]);

  const getBack = () => handleSection('general');

  const changeHandler = (e) => {
    setExperience({
      ...experience,
      [e.target.name]: e.target.value,
    });
  };

  const changeExistingHandler = (e) => {
    const { id } = e.target.parentElement;
    setExperiences((prevState) => {
      const newState = prevState.map((item) => (
        item.id === id
          ? { ...item, [e.target.name]: e.target.value }
          : item));
      return newState;
    });
  };

  const addAnotherExperience = () => {
    const {
      companyName, position, tasks, fromDate, untilDate,
    } = experience;

    if (companyName && position && tasks && fromDate && untilDate) {
      setExperiences((prevState) => prevState.concat(experience));
      setExperience({
        companyName: '',
        position: '',
        tasks: '',
        fromDate: '',
        untilDate: '',
        id: uniqid(),
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setExperiences((prevState) => {
      const {
        companyName, position, tasks, fromDate, untilDate,
      } = experience;
      if (companyName && position && tasks && fromDate && untilDate) {
        return (prevState.concat(experience));
      }
      return prevState;
    });
    setExperience({
      companyName: '',
      position: '',
      tasks: '',
      fromDate: '',
      untilDate: '',
      id: uniqid(),
    });
    setSection((prevState) => {
      if (experiences.length > 0) return 'overall';
      return prevState;
    });
  };

  const createContent = () => {
    if (!finished) {
      return (
        <form onSubmit={submitHandler}>
          { experiences.length > 0 && (
          <ul>
            <h2>Your experience</h2>
            {experiences.map((item) => (
              <li key={item.id} id={item.id}>
                <input
                  value={item.companyName}
                  onChange={changeExistingHandler}
                  name="companyName"
                  type="text"
                  placeholder="Company name"
                />
                <input
                  value={item.position}
                  onChange={changeExistingHandler}
                  name="position"
                  type="text"
                  placeholder="Position"
                />
                <input
                  value={item.tasks}
                  onChange={changeExistingHandler}
                  name="tasks"
                  type="text"
                  placeholder="Your main tasks"
                />
                <input
                  value={item.fromDate}
                  onChange={changeExistingHandler}
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
                  value={item.untilDate}
                  onChange={changeExistingHandler}
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
            value={experience.companyName}
            onChange={changeHandler}
            name="companyName"
            id="company-name"
            type="text"
            placeholder="Company name"
          />
          <input
            value={experience.position}
            onChange={changeHandler}
            name="position"
            id="position"
            type="text"
            placeholder="Position"
          />
          <input
            value={experience.tasks}
            onChange={changeHandler}
            name="tasks"
            id="tasks"
            type="text"
            placeholder="Your main tasks"
          />
          <input
            value={experience.fromDate}
            onChange={changeHandler}
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
            value={experience.untilDate}
            onChange={changeHandler}
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
          <button type="button" data="add" onClick={addAnotherExperience}>Add another</button>
          <button type="submit" data="submit">Submit</button>
          <button type="button" data="back" onClick={getBack}>Back</button>
        </form>
      );
    }
    return (
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
            {experiences.map((item) => (
              <tr key={`${item.companyName}_${item.position}`}>
                <td>{item.companyName}</td>
                <td>{item.position}</td>
                <td>{item.tasks}</td>
                <td>{new Date(item.fromDate).toLocaleDateString()}</td>
                <td>{new Date(item.untilDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button type="button" onClick={() => handleSection('experience')}>Edit</button>
      </>
    );
  };

  return (
    <div id="experience">
      <h2>Practical experience</h2>
      {createContent()}
    </div>
  );
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

export default Experience;
