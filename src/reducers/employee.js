import * as actions from '../constants/addEmployees';
import employeesList from '../content/employeesList';

const initialState = {
    employeesList,
    vacations: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case actions.ADD_EMPLOYEES_LIST:
        return {
          ...state,
          vacations: [...state.vacations, action.employee]
        }
    default: return state;
  }
}
