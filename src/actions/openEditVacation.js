import * as constants from '../constants/constants';

export const openEditVacation = (name, startDate, idEmployee, idVacation) => ({
  type: constants.OPEN_EDIT_VACATION,
  name,
  startDate,
  idEmployee,
  idVacation
});
