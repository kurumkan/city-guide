import { combineReducers } from 'redux';
import ReducerSpots from 'ReducerSpots';
import ErrorReducer from 'ErrorReducer';
import ReducerSearch from 'ReducerSearch';
import ReducerLoader from 'ReducerLoader';
import ReducerDisplayType from 'ReducerDisplayType';
import AuthReducer from 'AuthReducer';
import {reducer as form} from 'redux-form';


const RootReducer = combineReducers({
	spots: ReducerSpots,		
	error: ErrorReducer,
	search: ReducerSearch,
	isLoading: ReducerLoader,
	displayType: ReducerDisplayType,
	form,
	auth: AuthReducer,
});

export default RootReducer;
