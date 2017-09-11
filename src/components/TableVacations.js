import React, {Component} from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn,
} from 'material-ui/Table';

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
    height: '500px'
  };

  render() {
    const { vacations } = this.props.state.employees;

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
              <TableHeaderColumn colSpan="4" tooltip="Super Header" style={{textAlign: 'center'}}>
                Список работников
              </TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn tooltip="Фамилия Имя Отчество">ФИО</TableHeaderColumn>
              <TableHeaderColumn tooltip="Должность">Должность</TableHeaderColumn>
              <TableHeaderColumn tooltip="Дата начала отпуска">Начало отпуска</TableHeaderColumn>
              <TableHeaderColumn tooltip="Дата окончания отпуска">Конец отпуска</TableHeaderColumn>
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
                <TableRow key={index}>
                  <TableRowColumn>{row.name}</TableRowColumn>
                  <TableRowColumn>{row.position}</TableRowColumn>
                  <TableRowColumn>{row.vacationStartDate.toLocaleString('ru')}</TableRowColumn>
                  <TableRowColumn>{row.vacationEndDate.toLocaleString('ru')}</TableRowColumn>
                </TableRow>
                )) : ''
              }
          </TableBody>
        </Table>
      </div>
    );
  }
}
