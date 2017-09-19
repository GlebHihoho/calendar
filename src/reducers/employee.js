import * as actions from '../constants/constants';
import employeesList from '../content/employeesList';
import { remove } from 'lodash';

const initialState = {
    employeesList,
    vacations: [],
    editVacation: false,
    middlewareVacation: {},
    sortByName: false,
    sortByDate: false
};

export default function(state = initialState, action) {
  const editEmployeesList = () => (
    state.employeesList.map(el => {
      if (el.id === action.employee.idEmployee) {
        el.vacations.push({
          idVacation: action.employee.idVacation,
          vacationStartDate: action.employee.vacationStartDate,
          vacationEndDate: action.employee.vacationEndDate
        })
      }

      return el;
    })
  );

  const deleteVacations = () => {
    remove(state.vacations, el => el.idVacation === action.idVacation);

    return state.vacations;
  };

  const deleteVacationInEmployeesList = () => {
    return state.employeesList.map(e => {
      remove(e.vacations, v => v.idVacation === action.idVacation);

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
      if (el.id === action.idEmployee) {
        el.vacations.map(v => {
          if (v.id === action.idVacation) {
            v.vacationStartDate = action.startDate;
            v.vacationEndDate = action.endDate;
          }
          return v;
        })
        return el;
      }
      return el;
    })
  };

  const sortByName = () => {
    if (state.sortByName) {
      return state.vacations.sort((a, b) => {
        if (a.name > b.name) {
          return 1;
        }
        if (a.name < b.name) {
          return -1;
        }
        return 0;
      })
    }

    return state.vacations.sort((a, b) => {
      if (a.name < b.name) {
        return 1;
      }
      if (a.name > b.name) {
        return -1;
      }
      return 0;
    })
  };

  const sortByDate = () => {
    if (state.sortByDate) {
      return state.vacations.sort((a, b) => {
        if (a.vacationStartDate > b.vacationStartDate) {
          return 1;
        }
        if (a.vacationStartDate < b.vacationStartDate) {
          return -1;
        }
        return 0;
      })
    }

    return state.vacations.sort((a, b) => {
      if (a.vacationStartDate < b.vacationStartDate) {
        return 1;
      }
      if (a.vacationStartDate > b.vacationStartDate) {
        return -1;
      }
      return 0;
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
        vacations: deleteVacations(),
        middlewareVacation: {}
      };
    case actions.OPEN_EDIT_VACATION:
      return {
        ...state,
        editVacation: true,
        middlewareVacation: {
          name: action.name,
          vacationStartDate: action.startDate,
          idEmployee: action.idEmployee,
          idVacation: action.idVacation
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
    case actions.SORT_BY_NAME:
      return {
        ...state,
        vacations: sortByName(),
        sortByName: action.sortByName
      };
    case actions.SORT_BY_DATE:
      return {
        ...state,
        vacations: sortByDate(),
        sortByDate: action.sortByDate
      };
    default: return state;
  }
};
