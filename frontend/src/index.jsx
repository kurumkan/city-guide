import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import ReduxThunk from 'redux-thunk';

// App css
require('style!css!sass!applicationStyles');

import RootReducer from 'RootReducer';

import Main from 'Main';
import NotFound404 from 'NotFound404';
import IndexPage from 'IndexPage';

var createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
var store = createStoreWithMiddleware(RootReducer);

ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={IndexPage} />
			 	<Route path="polls" component={IndexPage} />

			 	<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />
			</Route>
		</Router>		
	</Provider>
  , document.querySelector('#app'));