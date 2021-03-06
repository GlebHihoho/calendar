import React, { Component } from 'react';
import './App.css';

import TableVacationsContainer from './components/TableVacationsContainer';
import VacationFormContainer from './components/VacationFormContainer';
import EditVacationFormContainer from './components/EditVacationFormContainer';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';


class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <div className="main">
            <div>
              <VacationFormContainer />
              <EditVacationFormContainer />
            </div>
            <TableVacationsContainer />
          </div>
        </div>
      </ MuiThemeProvider>
    );
  }
}

export default App;
