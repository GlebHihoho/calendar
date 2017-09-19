import * as constants from '../constants/constants';

export const addEmployee = employee => ({
  type: constants.ADD_EMPLOYEES_LIST,
  employee
});
