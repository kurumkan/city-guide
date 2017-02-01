import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerSearch from 'ReducerSearch';
import ReducerLoader from 'ReducerLoader';
import ReducerDisplayType from 'ReducerDisplayType';

const RootReducer = combineReducers({
	spots: ReducerSpots,		
	error: ErrorReducer,
	search: ReducerSearch,
	isLoading: ReducerLoader,
	displayType: ReducerDisplayType
});

export default RootReducer;
