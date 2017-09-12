import * as actions from '../constants/addEmployees';
import employeesList from '../content/employeesList';

const initialState = {
    employeesList,
    vacations: []
};

export default function(state = initialState, action) {
  const editEmployeesList = () => (
    state.employeesList.map(el => {
      if (el.name === action.employee.name) {
        el.vacations.push({
          vacationStartDate: action.employee.vacationStartDate,
          vacationEndDate: action.employee.vacationEndDate
        })
      }

      return el;
    })
  );

  switch (action.type) {
    case actions.ADD_EMPLOYEES_LIST:
        return {
          employeesList: editEmployeesList(),
          vacations: [...state.vacations, action.employee]
        }
    default: return state;
  }
};
