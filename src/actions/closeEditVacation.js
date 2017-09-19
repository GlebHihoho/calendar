import * as constants from '../constants/constants';

export const closeEditVacation = (name, startDate, endDate, oldStartDate, idEmployee, idVacation) => ({
  type: constants.CLOSE_EDIT_VACATION,
  name,
  startDate,
  endDate,
  oldStartDate,
  idEmployee,
  idVacation
});
