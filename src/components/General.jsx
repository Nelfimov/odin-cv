import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

/**
 * General information component: name, email, date of birth
 * @param {Map.<String, any>} props
 */
function General(props) {
  const {
    section: propSection, generals: oldGenerals, finished, handleInfo, handleSection,
  } = props;

  const [general, setGeneral] = useState({
    name: '',
    email: '',
    dateOfBirth: '',
  });
  const [section, setSection] = useState(propSection);
  const [generals, setGenerals] = useState(oldGenerals);

  const changeHandler = (e) => {
    setGeneral({
      ...general,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    handleInfo('general', generals);
    if (section !== 'general') handleSection(section);
  }, [generals]);

  const submitHandler = (e) => {
    e.preventDefault();

    setGenerals(general);
    setGeneral({
      name: '',
      email: '',
      dateOfBirth: '',
    });
    setSection('education');
  };

  /**
   * Create content based on *finished* status
   */
  const createContent = () => {
    if (!finished) {
      return (
        <form onSubmit={submitHandler}>
          <input
            required
            value={general.name}
            name="name"
            type="text"
            placeholder="Full name"
            onChange={changeHandler}
          />
          <input
            required
            value={general.email}
            name="email"
            type="email"
            placeholder="Email"
            onChange={changeHandler}
          />
          <input
            required
            value={general.dateOfBirth}
            name="dateOfBirth"
            type="text"
            onFocus={(e) => {
              e.target.type = 'date';
            }}
            onBlur={(e) => {
              e.target.type = 'text';
            }}
            placeholder="Date of birth"
            onChange={changeHandler}
          />
          <button type="submit">Save</button>
        </form>
      );
    }
    return (
      <>
        <table>
          <tbody>
            <tr>
              <td>Name: </td>
              <td>{generals.name}</td>
            </tr>
            <tr>
              <td>Email: </td>
              <td>{generals.email}</td>
            </tr>
            <tr>
              <td>Date of birth: </td>
              <td>{new Date(generals.dateOfBirth).toLocaleDateString()}</td>
            </tr>
          </tbody>
        </table>
        <button type="button" onClick={() => handleSection('general')}>Edit</button>
      </>
    );
  };

  return (
    <div id="general-info">
      <h2>General info</h2>
      {createContent()}
    </div>
  );
}

General.propTypes = {
  handleSection: propTypes.func.isRequired,
  handleInfo: propTypes.func.isRequired,
  section: propTypes.string.isRequired,
  finished: propTypes.bool.isRequired,
  generals: propTypes.shape(),
};

General.defaultProps = {
  generals: [],
};

export default General;
