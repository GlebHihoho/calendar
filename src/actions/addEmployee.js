import * as constants from '../constants/addEmployees';

export const addEmployee = employee => ({
  type: constants.ADD_EMPLOYEES_LIST,
  employee
})
