import * as actions from '../constants/addEmployees';
import employeesList from '../content/employeesList';
import { remove } from 'lodash';

const initialState = {
    employeesList,
    vacations: [],
    editVacation: false,
    middlewareVacation: {}
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

  const deleteVacations = () => {
    remove(state.vacations, el => el.name === action.name && el.vacationStartDate == action.startDate);

    return state.vacations;
  };

  const deleteVacationInEmployeesList = () => {
    return state.employeesList.map(e => {
      remove(e.vacations, v => v.vacationStartDate == action.startDate);

      return e;
    })
  };

  const editVacation = () => {
    return state.vacations.map(el => {
      if (el.name === action.name && el.vacationStartDate == action.oldStartDate) {
        el.vacationStartDate = action.startDate;
        el.vacationEndDate = action.endDate;
      }
      return el;
    })
  };

  const editEmployeesListVacation = () => {
    return state.employeesList.map(el => {
      if (el.name === action.name) {
        el.vacations.map(v => {
          if (v.vacationStartDate == action.oldStartDate) {
            v.vacationStartDate = action.startDate;
            v.vacationEndDate = action.endDate;
          }
          return v;
        })
        return el;
      }
      return el;
    })
  }

  switch (action.type) {
    case actions.ADD_EMPLOYEES_LIST:
      return {
        ...state,
        employeesList: editEmployeesList(),
        vacations: [...state.vacations, action.employee]
      };
    case actions.DELETE_VACATION:
      return {
        ...state,
        employeesList: deleteVacationInEmployeesList(),
        vacations: deleteVacations()
      };
    case actions.OPEN_EDIT_VACATION:
      return {
        ...state,
        editVacation: true,
        middlewareVacation: {
          name: action.name,
          vacationStartDate: action.startDate,
        }
      };
    case actions.CLOSE_EDIT_VACATION:
      return {
        employeesList: editEmployeesListVacation(),
        vacations: editVacation(),
        editVacation: false,
        middlewareVacation: {
          name: action.name,
          startDate: action.startDate,
          endDate: action.endDate,
          oldStartDate: action.oldStartDate,
        }
      };
    default: return state;
  }
};
