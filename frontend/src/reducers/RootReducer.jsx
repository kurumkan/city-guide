import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerLocation from 'ReducerLocation';

const RootReducer = combineReducers({
	spots: ReducerSpots,	
	location: ReducerLocation,
	error: ErrorReducer
});

export default RootReducer;
