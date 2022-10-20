import './styles/App.css';
import React from 'react';
import GeneralInfo from './components/GeneralInfo';
import Education from './components/Education';
import Experience from './components/Experience';

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      section: 'general',
      generalInfo: [],
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
        <GeneralInfo
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
        />
      );
      case 'education': return (
        <Education
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
        />
      );
      case 'experience': return (
        <Experience
          handleSection={this.handleSection}
          handleInfo={this.handleInfo}
          section={section}
        />
      );
      default: return (
        <>
          <generalInfo />
          <Education />
          <Experience />
        </>
      );
    }
  }
}
