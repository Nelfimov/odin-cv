import React from 'react';

class Experience extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      experience: {
        companyName: '',
        position: '',
        tasks: '',
        fromDate: '',
        untilDate: '',
      },
      experiences: [],
      finished: false,
    };
  };


  render() {
    return (
      <div id='experience'>
        <h2>Practical experience</h2>
        <form onSubmit={this.submitHandler}>
          <input id='company-name' type='text' placeholder='Company name' />
          <input id='position' type='text' placeholder='Position' />
          <input id='tasks' type='text' placeholder='Your main tasks' />
          <input id='from-date' type='date' placeholder='Company name' />
          <input id='until-date' type='date' placeholder='Company name' />
          <button type='button' data='submit'>Submit</button>
          <button type='button' data='back'>Back</button>
        </form>
      </div>
    );
  };
};

export default Experience;
