import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerLocation from 'ReducerLocation';
import ReducerSearch from 'ReducerSearch';

const RootReducer = combineReducers({
	spots: ReducerSpots,	
	location: ReducerLocation,
	error: ErrorReducer,
	term: ReducerSearch
});

export default RootReducer;
