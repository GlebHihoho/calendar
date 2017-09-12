import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { find, last } from 'lodash';

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

class VacationForm extends Component {
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

  handleChangeStartDate = (event, date) => this.setState({ vacationStartDate: date });
  handleChangeEndDate = (event, date) => this.setState({ vacationEndDate: date });
  getPosition = name => find(this.props.state.employees.employeesList, { 'name': name }).position;
  handleChangeName = (event, index, name) => this.setState(
    {
      name,
      position: this.getPosition(name)
    }
  );
  resetForm = () => (
    this.setState({
      name: 'Мотуз Глеб Игоревич',
      position: 'инженер',
      vacationStartDate: null,
      vacationEndDate: null,
      validationMessage: ''
    })
  )

  submit = () => {
    const startDate = this.state.vacationStartDate;
    const endDate = this.state.vacationEndDate;
    const name = this.state.name;
    const employeesList = this.props.state.employees.employeesList;
    const vacationsArray = find(employeesList, { 'name': name }).vacations;

    function minСontinuousDayVacation() {
      const msMinDay = MIN_DAY_VACATION * 24 * 60 * 60 * 1000;
      const difference = (endDate - startDate) + MS_IN_DAY;
      const summ = difference - msMinDay;

      return summ < 0 ? true : false;
    }

    function maxСontinuousDayVacation() {
      const msMaxDay = MAX_DAY_VACATION * 24 * 60 *60 * 1000;
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
      const msInFullVacation = DAY_VACATION * 24 * 60 * 60 * 1000;
      let msInVacation = endDate - startDate + MS_IN_DAY;

      vacationsArray.forEach(vacation => {
        return msInVacation = msInVacation + (vacation.vacationEndDate - vacation.vacationStartDate + MS_IN_DAY);
      })

      if (msInVacation > msInFullVacation) {
        return true;
      }

      return false;
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
    } else if (maxDay()) {
      this.setState({validationMessage: 'Максимальное количество дней отпуска в году - 24 календарных дня'});
    } else {
      this.setState(
        {
          position: this.getPosition(this.state.name),
          validationMessage: 'Список обновлён'
        }
      );


      this.props.addEmployee(this.state);
      this.resetForm();
    }

  }

  render() {
    const { employeesList } = this.props.state.employees;

    return (
      <div className='add-vacation'>
        <SelectField
          floatingLabelText="Выберите имя"
          value={this.state.name}
          onChange={this.handleChangeName}
        >
          {
            employeesList.map(el => (
              <MenuItem key={el.name} value={el.name} primaryText={el.name} />
            ))
          }
        </SelectField>
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
          label="Добавить"
          style={buttonStyle}
          onClick={this.submit}
        />
      </div>
    );
  }
}

export default VacationForm;
