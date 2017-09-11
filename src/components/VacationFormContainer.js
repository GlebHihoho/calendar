import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import VacationForm from './VacationForm';
import { addEmployee } from '../actions/addEmployee';

const mapStateToProps = state => ({ state });
const mapDispatchToProps = dispatch => (
  {
    addEmployee: bindActionCreators(addEmployee, dispatch)
  }
);

export default connect(mapStateToProps, mapDispatchToProps)(VacationForm);
