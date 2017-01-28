import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';

// App css
require('style!css!sass!applicationStyles');

import reducers from 'Reducers';

import Main from 'Main';
import NotFound404 from 'NotFound404';
import IndexPage from 'IndexPage';

const createStoreWithMiddleware = applyMiddleware()(createStore);


ReactDOM.render(
	<Provider store={createStoreWithMiddleware(reducers)}>
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
