import React, { Component } from 'react';
import IconButton from 'material-ui/IconButton';
import ModeEdit from 'material-ui/svg-icons/editor/mode-edit';
import Done from 'material-ui/svg-icons/action/done';
import Close from 'material-ui/svg-icons/navigation/close';
import DatePicker from 'material-ui/DatePicker';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const colorVacation = row => {
  const PAST_VACATION_COLOR = '#F44336';
  const NOW_VACATION_COLOR = '#0277BD';
  const FUTURE_VACATION_COLOR = '#4CAF50';
  const dateNow = Date.now();
  let color = '';

  if (dateNow > row.vacationEndDate) {
    color = PAST_VACATION_COLOR;
  } else if (dateNow < row.vacationStartDate) {
    color = NOW_VACATION_COLOR;
  } else {
    color = FUTURE_VACATION_COLOR;
  }

  return color;
};

export default class TableVacations extends Component {
  state = {
    fixedHeader: true,
    stripedRows: false,
    showRowHover: false,
    selectable: true,
    multiSelectable: false,
    enableSelectAll: false,
    deselectOnClickaway: true,
    showCheckboxes: false,
    height: '500px',
  };

  handleChangeStartDate = (event, date) => this.setState({ vacationStartDate: date });
  handleChangeEndDate = (event, date) => this.setState({ vacationEndDate: date });

  deleteVacation = event => {
    const name = event.currentTarget.name;
    const startDate = event.currentTarget.value;

    this.props.deleteVacation(name, startDate);
  }

  checkNextVacation = row => {
    const dateNow = Date.now();

    if (dateNow > row.vacationEndDate) {
      return true;
    }

    return false;
  }

  editVacation = event => {
    const name = event.currentTarget.name;
    const startDate = event.currentTarget.value;
    const edit = this.props.state.employees.editVacation;

    edit ? this.props.closeEditVacation() : this.props.openEditVacation(name, startDate);
  }

  render() {
    const { vacations, editVacation, middlewareVacation } = this.props.state.employees;

    return (
      <div>
        <Table
          height={this.state.height}
          fixedHeader={this.state.fixedHeader}
          selectable={this.state.selectable}
          multiSelectable={this.state.multiSelectable}
        >
          <TableHeader
            displaySelectAll={this.state.showCheckboxes}
            adjustForCheckbox={this.state.showCheckboxes}
            enableSelectAll={this.state.enableSeleoptionsctAll}
          >
            <TableRow>
              <TableHeaderColumn colSpan="5" >
                Список работников
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn>ФИО</TableHeaderColumn>
              <TableHeaderColumn>Должность</TableHeaderColumn>
              <TableHeaderColumn>Начало отпуска</TableHeaderColumn>
              <TableHeaderColumn>Конец отпуска</TableHeaderColumn>
              <TableHeaderColumn>Редактировать</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody
            displayRowCheckbox={this.state.showCheckboxes}
            deselectOnClickaway={this.state.deselectOnClickaway}
            showRowHover={this.state.showRowHover}
            stripedRows={this.state.stripedRows}
          >
            {
              vacations ? vacations.map( (row, index) => (
              <TableRow
                key={index}
                style={{ color: colorVacation(row) }}
              >
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.position}</TableRowColumn>
                <TableRowColumn>{row.vacationStartDate.toLocaleString('ru')}</TableRowColumn>
                <TableRowColumn>{row.vacationEndDate.toLocaleString('ru')}</TableRowColumn>
                <TableRowColumn>
                  <IconButton
                    name={row.name}
                    value={row.vacationStartDate}
                    onClick={this.editVacation}
                    disabled={this.checkNextVacation(row)}
                  >
                    {editVacation && middlewareVacation.name === row.name && middlewareVacation.vacationStartDate == row.vacationStartDate ? <Done/> : <ModeEdit/>}
                  </IconButton>
                  <IconButton
                    name={row.name}
                    value={row.vacationStartDate}
                    onClick={this.deleteVacation}
                    disabled={this.checkNextVacation(row)}
                  >
                    <Close/>
                  </IconButton>
                </TableRowColumn>
              </TableRow>
              )) : ''
            }
          </TableBody>
        </Table>
      </div>
    );
  }
}
