import { connect } from 'react-redux';
import TableVacations from './TableVacations';

const mapStateToProps = state => ({ state });
// const mapDispatchToProps = dispatch => (
//   {
//     addEmployee: bindActionCreators(addEmployee, dispatch)
//   }
// );

export default connect(mapStateToProps, null)(TableVacations);
