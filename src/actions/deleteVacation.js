import * as constants from '../constants/constants';

export const deleteVacation = idVacation => ({
  type: constants.DELETE_VACATION,
  idVacation
});
