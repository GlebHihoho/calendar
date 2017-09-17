import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import persistState from 'redux-localstorage'
import rootReducer from '../reducers';

const middleware = [createLogger({ collapsed: true })];
const middlewaresWithDevTools = composeWithDevTools(applyMiddleware(...middleware), persistState());
const store = createStore(rootReducer, middlewaresWithDevTools);

export default store;
