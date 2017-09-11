import { combineReducers } from 'redux'

import employeeList from './employee'

const rootReducer = combineReducers({
  employeeList,
})

export default rootReducer
