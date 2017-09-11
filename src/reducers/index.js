import { combineReducers } from 'redux'

import employees from './employee'

const rootReducer = combineReducers({
  employees,
})

export default rootReducer
