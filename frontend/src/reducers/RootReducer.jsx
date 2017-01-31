import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerSearch from 'ReducerSearch';
import ReducerLoader from 'ReducerLoader';

const RootReducer = combineReducers({
	spots: ReducerSpots,		
	error: ErrorReducer,
	search: ReducerSearch,
	isLoading: ReducerLoader
});

export default RootReducer;
