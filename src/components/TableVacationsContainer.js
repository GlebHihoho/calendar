import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import TableVacations from './TableVacations';
import { deleteVacation,
         openEditVacation,
         closeEditVacation,
         submitEditVacation } from '../actions/addEmployee';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => (
  {
    deleteVacation: bindActionCreators(deleteVacation, dispatch),
    openEditVacation: bindActionCreators(openEditVacation, dispatch),
    closeEditVacation: bindActionCreators(closeEditVacation, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(TableVacations);
