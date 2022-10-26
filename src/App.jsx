import React from 'react';
import General from './components/General';
import Education from './components/Education';
import Experience from './components/Experience';
import Notification from './components/Notification';

const testList = [
  {
    title: 'Success',
    description: 'This is a success toast component',
  },
  {
    title: 'Danger',
    description: 'This is an error toast component',
  },
];

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      section: 'general',
      general: {},
      education: [],
      experience: [],
    };
  }

  handleSection = (string) => {
    this.setState({ section: string });
  };

  handleInfo = (key, value) => {
    this.setState({ [key]: value }, () => {
      console.log(this.state);
    });
  };

  flowApp = (section, general, education, experience) => {
    switch (section) {
      case 'general': return (
        <General
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          finished={false}
          generals={general}
        />
      );
      case 'education': return (
        <Education
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          education={education}
          finished={false}
        />
      );
      case 'experience': return (
        <Experience
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          experiences={experience}
          finished={false}
        />
      );
      default: return (
        <>
          <h1>Please confirm your data</h1>
          <General
            handleSection={this.handleSection}
            handleInfo={this.handleInfo}
            section={section}
            finished
            generals={general}
          />
          <Education
            handleSection={this.handleSection}
            handleInfo={this.handleInfo}
            section={section}
            finished
            education={education}
          />
          <Experience
            handleSection={this.handleSection}
            handleInfo={this.handleInfo}
            section={section}
            finished
            experiences={experience}
          />
        </>
      );
    }
  };

  render() {
    const {
      section, general, education, experience,
    } = this.state;

    return (
      <>
        <Notification notificationList={testList} />
        {this.flowApp(section, general, education, experience)}
      </>
    );
  }
}
