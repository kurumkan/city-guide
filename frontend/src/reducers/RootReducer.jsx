import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerSearch from 'ReducerSearch';

const RootReducer = combineReducers({
	spots: ReducerSpots,		
	error: ErrorReducer,
	search: ReducerSearch
});

export default RootReducer;
