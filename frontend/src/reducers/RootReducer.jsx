import { combineReducers } from 'redux';

import ReducerSpots from 'reducers/ReducerSpots';
import ErrorReducer from 'reducers/ErrorReducer';
import ReducerSearch from 'reducers/ReducerSearch';
import ReducerLoader from 'reducers/ReducerLoader';
import ReducerDisplayType from 'reducers/ReducerDisplayType';
import AuthReducer from 'reducers/AuthReducer';
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
