import React, { Component } from 'react';
import './App.css';

import TableExampleComplex from './components/Table';
import VacationFormContainer from './components/VacationFormContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="main">
            <VacationFormContainer />
            <TableExampleComplex />
          </div>
        </div>
      </ MuiThemeProvider>
    );
  }
}

export default App;
