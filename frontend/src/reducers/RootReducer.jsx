import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';

const RootReducer = combineReducers({
	spots: ReducerSpots,	
	error: ErrorReducer
});

export default RootReducer;
