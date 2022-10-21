import './styles/App.css';
import React from 'react';
import General from './components/General';
import Education from './components/Education';
import Experience from './components/Experience';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      section: 'general',
      general: [],
      education: [],
      experience: [],
    };
  }

  handleSection = (string) => {
    this.setState({
      section: string,
    });
  };

  handleInfo = (key, value) => {
    this.setState(
      (prevState) => ({ [key]: prevState[key].concat(value) }),
      () => {
        console.log(this.state);
        console.log(key, value);
      },
    );
  };

  render() {
    const { section } = this.state;

    switch (section) {
      case 'general': return (
        <General
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          finished={false}
        />
      );
      case 'education': return (
        <Education
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          finished={false}
        />
      );
      case 'experience': return (
        <Experience
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
          finished={false}
        />
      );
      default: return (
        <>
          <General
            finished
          />
          <Education
            finished
          />
          <Experience
            finished
          />
        </>
      );
    }
  }
}
