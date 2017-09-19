import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import EditVacationForm from './EditVacationForm';
import { closeEditVacation } from '../actions/closeEditVacation';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => (
  {
    closeEditVacation: bindActionCreators(closeEditVacation, dispatch),
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(EditVacationForm);
