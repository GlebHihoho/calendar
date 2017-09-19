import React, { Component } from 'react';
import DatePicker from 'material-ui/DatePicker';
import FlatButton from 'material-ui/FlatButton';
import { find,
  remove,
  last,
  filter,
  reject } from 'lodash';

const MIN_DAY_VACATION = 2;
const MAX_DAY_VACATION = 15;
const DAY_VACATION = 24;
const MS_IN_DAY = 86400000;

const buttonStyle = {
  backgroundColor: '#3759a0',
  color: 'white',
  fontSize: '0.8em',
  fontWeight: 700,
  height: '40px',
  width: '150px'
};

export default class EditVacationForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      name: 'Мотуз Глеб Игоревич',
      position: 'инженер',
      vacationStartDate: null,
      vacationEndDate: null,
      validationMessage: ''
    };
  }

  getName = id => find(this.props.state.employees.employeesList, { 'id': id }).name;
  handleChangeStartDate = (event, date) => this.setState({ vacationStartDate: date });
  handleChangeEndDate = (event, date) => this.setState({ vacationEndDate: date });
  getPosition = name => find(this.props.state.employees.employeesList, { 'name': name }).position;
  resetForm = () => (
    this.setState({
      name: 'Мотуз Глеб Игоревич',
      position: 'инженер',
      vacationStartDate: null,
      vacationEndDate: null,
      validationMessage: ''
    })
  );

  submit = () => {
    const startDate = this.state.vacationStartDate;
    const endDate = this.state.vacationEndDate;
    const name = this.state.name;
    const position = this.state.position;
    const oldStartDate = this.props.state.employees.middlewareVacation.vacationStartDate;
    const idEmployee = this.props.state.employees.middlewareVacation.idEmployee;
    const idVacation = this.props.state.employees.middlewareVacation.idVacation;
    const copyList = Object.assign(this.props.state.employees.employeesList);
    const middle = copyList.map(el => {
      if (el.name === name) {
        remove(el.vacations, v => v.vacationStartDate == oldStartDate);
      }
      return el;
    });
    const employeesList = middle;
    const vacationsArray = find(employeesList, { 'name': name }).vacations;

    function minСontinuousDayVacation() {
      const msMinDay = MIN_DAY_VACATION * MS_IN_DAY;
      const difference = (endDate - startDate) + MS_IN_DAY;
      const summ = difference - msMinDay;

      return summ < 0 ? true : false;
    }

    function maxСontinuousDayVacation() {
      const msMaxDay = MAX_DAY_VACATION * MS_IN_DAY;
      const difference = (endDate - startDate) + MS_IN_DAY;

      if (difference > msMaxDay) {
        return true;
      }

      return false;
    }

    function intersectionVacations() {
      if (vacationsArray.length) {
        return last(vacationsArray).vacationEndDate > startDate ? true : false;
      }

      return false;
    }

    function minPeriodBetweenVacations() {
      const vacation = last(vacationsArray) || [];
      const startVacation = vacation.vacationStartDate;
      const endVacation = vacation.vacationEndDate;
      const periodLastVacation = (endVacation - startVacation) + MS_IN_DAY * 2;
      const betweenPeriod = (startDate - endVacation) + MS_IN_DAY;

      if (betweenPeriod <= periodLastVacation) {
        return true;
      }

      return false;
    }

    function maxDay() {
      const msInFullVacation = DAY_VACATION * MS_IN_DAY;
      let msInVacation = endDate - startDate + MS_IN_DAY;

      vacationsArray.forEach(vacation => {
        return msInVacation = msInVacation + (vacation.vacationEndDate - vacation.vacationStartDate + MS_IN_DAY);
      })

      if (msInVacation > msInFullVacation) {
        return true;
      }

      return false;
    }

    function checkDateNow() {
      return startDate < Date.now() ? true : false;
    }

    function checkDate(dateArr) {
      const check = dateArr.map(vacation => {
        if (vacation.vacationStartDate > endDate) {
          return true;
        } else if (vacation.vacationEndDate < startDate) {
          return true;
        } else {
          return false;
        }
      })

      return !check.some(el => el === false);
    }

    function checkPositions() {
      const positions = filter(employeesList, { 'position': position });
      const pos = reject(positions, { 'name': name });
      const check = pos.map(el => {
        if (el.name === name) {
          return '';
        } else {
          return checkDate(el.vacations);
        }
      });
      let positive = 0;
      let negative = 0;

      check.map(el => {
        return el ? positive++ : negative++;
      })

      return negative >= positive ? true : false;
    }

    if (!startDate || !endDate) {
      this.setState({validationMessage: 'Выберите даты начала и/или окончания отпуска'});
    } else if (endDate < startDate) {
      this.setState({validationMessage: 'Дата окончания отпуска раньше даты начала'});
    } else if (minСontinuousDayVacation()) {
      this.setState({validationMessage: 'Минимальный непрерывный период отпуска - 2 календарных дня'});
    } else if (maxСontinuousDayVacation()) {
      this.setState({validationMessage: 'Максимальный непрерывный период отпуска - 15 календарных дней'});
    } else if (intersectionVacations()) {
      this.setState({validationMessage: 'Ещё не закончен старый отпуск'});
    } else if (minPeriodBetweenVacations()) {
      this.setState({validationMessage: 'Минимальный период между периодами отпуска равен размеру первого отпуска'});
    } else if (checkDateNow()) {
      this.setState({validationMessage: 'Выберите другое время'});
    } else if (maxDay()) {
      this.setState({validationMessage: 'Максимальное количество дней отпуска в году - 24 календарных дня'});
    } else if (checkPositions()) {
      this.setState({validationMessage: 'В отпуске имеют право находиться не более 50% сотрудников одной должности'})
    } else {
      this.setState(
        {
          validationMessage: 'Список обновлён'
        }
      )
      this.props.closeEditVacation(this.props.state.employees.middlewareVacation.name, startDate, endDate, oldStartDate, idEmployee, idVacation);
      this.resetForm();
    };
  }

  render() {
    const { editVacation,
            middlewareVacation } = this.props.state.employees;

    return (
      <div className='add-vacation'>
        {
          !editVacation ? '' :
          <div>
            <div>ФИО: {this.getName(middlewareVacation.idEmployee)}</div>
            <div>Должность: {this.getPosition(this.state.name)}</div>
            <DatePicker
                hintText="Дата начала отпуска"
                value={this.state.vacationStartDate}
                onChange={this.handleChangeStartDate}
            />
            <DatePicker
              hintText="Дата окончания отпуска"
              value={this.state.vacationEndDate}
              onChange={this.handleChangeEndDate}
            />
            <div className="validation">{this.state.validationMessage}</div>
            <FlatButton
                label={"Редактировать"}
                style={buttonStyle}
                onClick={this.submit}
            />
          </div>
        }
      </div>
    )
  }
}
