import React, {Component} from 'react';
import SelectField from 'material-ui/SelectField';
import FlatButton from 'material-ui/FlatButton';
import MenuItem from 'material-ui/MenuItem';
import DatePicker from 'material-ui/DatePicker';
import { find } from 'lodash';

const MIN_DAY_VACATION = 2;
const MAX_DAY_VACATION = 15;

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

    function minDayVacation(startDate, endDate) {
      const msMinDay = MIN_DAY_VACATION * 24 * 60 * 60 * 1000;
      const difference = endDate - startDate;

      if (difference < msMinDay) {
        return true;
      }

      return false;
    }

    function maxDayVacation(startDate, endDate) {
      const msMaxDay = MAX_DAY_VACATION * 24 * 60 *60 * 1000;
      const difference = endDate - startDate;

      if (difference > msMaxDay) {
        return true;
      }

      return false;
    }

    if (!startDate || !endDate) {
      this.setState({validationMessage: 'Выберите даты начала и/или окончания отпуска'});
    } else if (endDate < startDate) {
      this.setState({validationMessage: 'Дата окончания отпуска раньше даты начала'});
    } else if (minDayVacation(startDate, endDate)) {
      this.setState({validationMessage: 'Минимальный непрерывный период отпуска - 2 календарных дня'});
    } else if (maxDayVacation(startDate, endDate)) {
      this.setState({validationMessage: 'Максимальный непрерывный период отпуска - 15 календарных дней'});
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
