import React from 'react';
import Experience from './Experience';

class Education extends React.Component {
  constructor(props) {
    super(props);

    const {generals} = this.props;

    this.state = {
      schoolName: '',
      schoolTitle: '',
      schoolDate: '',
      schools: [],
      generals: generals,
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
      schools: this.state.schools.concat({
        schoolName: this.state.schoolName,
        schoolTitle: this.state.schoolTitle,
        schoolDate: this.state.schoolDate,
      }),
      finished: true,
    });
  };

  addAnotherSchool() {
    this.setState({
      schools: this.state.schools.concat(this.state.fields),
      schoolname: '',
      title: '',
      date: '',
      finished: false,
    });
  };

  ifFinished() {
    if (this.state.finished) return <Experience generals={this.state.generals} schools={this.state.schools} />;

    const {schoolName, schoolDate, schoolTitle, schools} = this.state;

    return (
      <div id='education'>
        <h2>Education</h2>
        <ul>
          {schools.map((school) => <li key={school.schoolName}>{school.schoolName}</li>)}
        </ul>
        <form onSubmit={this.submitHandler.bind(this)}>
          <input type='text' name='schoolName' value={schoolName} id='school-name' placeholder='School name' onInput={this.changeHandler.bind(this)} />
          <input type='text' name='schoolTitle' value={schoolTitle} id='school-title' placeholder='Title' onInput={this.changeHandler.bind(this)} />
          <input type='date' name='schoolDate' value={schoolDate} id='school-date' placeholder='Date' onInput={this.changeHandler.bind(this)} />
          <button type='button' data='add' onClick={this.addAnotherSchool.bind(this)}>Add another</button>
          <button type='submit' data='submit'>Submit</button>
          <button type='button' data='back'>Back</button>
        </form>
      </div>
    );
  }

  render() {
    return (
      <div>
        {this.ifFinished()}
      </div>
    );
  };
}

export default Education;
