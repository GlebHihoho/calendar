import * as constants from '../constants/addEmployees';

export const addEmployee = employee => ({
  type: constants.ADD_EMPLOYEES_LIST,
  employee
});

export const deleteVacation = (name, startDate) => ({
  type: constants.DELETE_VACATION,
  name,
  startDate
});

export const openEditVacation = (name, startDate) => ({
  type: constants.OPEN_EDIT_VACATION,
  name,
  startDate
});

export const closeEditVacation = (name, startDate, endDate, oldStartDate) => ({
  type: constants.CLOSE_EDIT_VACATION,
  name,
  startDate,
  endDate,
  oldStartDate
});

