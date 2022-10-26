import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import uniqid from 'uniqid';

/**
 * Education component. Gets school *name*, *title* and *date*. Can be added several.
 * @param {Map.<String, any>} props
 * @param {String} props.section - name of the section
 * @param {Array} props.education - array of educations from App, which have already been filled
 */
function Education(props) {
  const {
    section: propSection, education: oldEducations, handleInfo, handleSection, finished,
  } = props;

  const [education, setEducation] = useState({
    schoolName: '',
    schoolTitle: '',
    schoolDate: '',
    id: uniqid(),
  });
  const [educations, setEducations] = useState(oldEducations);
  const [section, setSection] = useState(propSection);

  useEffect(() => {
    handleInfo('education', educations);
    handleSection(section);
  }, [section]);

  const getBack = () => handleSection('general');

  const changeHandler = (e) => {
    setEducation({
      ...education,
      [e.target.name]: e.target.value,
    });
  };

  const changeExistingHandler = (e) => {
    const { id } = e.target.parentElement;
    setEducations((prevState) => {
      const newState = prevState.map((item) => (
        item.id === id
          ? { ...item, [e.target.name]: e.target.value }
          : item));
      return newState;
    });
  };

  const addAnotherSchool = () => {
    const { schoolName, schoolDate, schoolTitle } = education;

    if (schoolName && schoolDate && schoolTitle) {
      setEducations((prevState) => prevState.concat(education));
      setEducation({
        schoolName: '',
        schoolTitle: '',
        schoolDate: '',
        id: uniqid(),
      });
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();

    setEducations((prevState) => {
      const { schoolDate, schoolName, schoolTitle } = education;
      if (schoolDate && schoolName && schoolTitle) {
        return (prevState.concat(education));
      }
      return prevState;
    });
    setEducation({
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      id: uniqid(),
    });
    setSection((prevState) => {
      if (educations.length > 0) return 'experience';
      return prevState;
    });
  };

  const createContent = () => {
    if (!finished) {
      return (
        <form onSubmit={submitHandler}>
          { educations.length > 0
              && (
              <ul>
                <h2>Your education</h2>
                {educations.map((school) => (
                  <li key={school.id} id={school.id}>
                    <input
                      type="text"
                      name="schoolName"
                      value={school.schoolName}
                      placeholder="School name"
                      onChange={changeExistingHandler}
                    />
                    <input
                      type="text"
                      name="schoolTitle"
                      value={school.schoolTitle}
                      placeholder="Title"
                      onChange={changeExistingHandler}
                    />
                    <input
                      type="text"
                      onFocus={(e) => {
                        e.target.type = 'date';
                      }}
                      onBlur={(e) => {
                        e.target.type = 'text';
                      }}
                      name="schoolDate"
                      value={school.schoolDate}
                      placeholder="Date"
                      onChange={changeExistingHandler}
                    />
                  </li>
                ))}
              </ul>
              )}

          <input
            type="text"
            name="schoolName"
            value={education.schoolName}
            id="school-name"
            placeholder="School name"
            onChange={changeHandler}
          />
          <input
            type="text"
            name="schoolTitle"
            value={education.schoolTitle}
            id="school-title"
            placeholder="Title"
            onChange={changeHandler}
          />
          <input
            type="text"
            onFocus={(e) => {
              e.target.type = 'date';
            }}
            onBlur={(e) => {
              e.target.type = 'text';
            }}
            name="schoolDate"
            value={education.schoolDate}
            id="school-date"
            placeholder="Date"
            onChange={changeHandler}
          />

          <button type="button" data="add" onClick={addAnotherSchool}>Add another</button>
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
              <th>School name</th>
              <th>Title</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {educations.map((school) => (
              <tr key={school.id}>
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
  };

  return (
    <div id="education">
      <h2>Education</h2>
      {createContent()}
    </div>
  );
}

Education.propTypes = {
  section: propTypes.string.isRequired,
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
  finished: propTypes.bool.isRequired,
  education: propTypes.arrayOf(propTypes.shape).isRequired,
};

export default Education;
