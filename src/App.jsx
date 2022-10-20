import './styles/App.css';
import React from 'react';
import GeneralInfo from './components/GeneralInfo';

class App extends React.Component {

  render() {
    return (
      <div className="App">
        <GeneralInfo />
      </div>
    );
  }
}

export default App;
