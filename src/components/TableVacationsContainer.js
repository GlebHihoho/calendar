import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableVacations from './TableVacations';
import { deleteVacation } from '../actions/deleteVacation';
import { openEditVacation } from '../actions/openEditVacation';
import { closeEditVacation } from '../actions/closeEditVacation';
import { sortByName } from '../actions/sortByName';
import { sortByDate } from '../actions/sortByDate';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => (
  {
    deleteVacation: bindActionCreators(deleteVacation, dispatch),
    openEditVacation: bindActionCreators(openEditVacation, dispatch),
    closeEditVacation: bindActionCreators(closeEditVacation, dispatch),
    sortByName: bindActionCreators(sortByName, dispatch),
    sortByDate: bindActionCreators(sortByDate, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TableVacations);
