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
import SearchPage from 'SearchPage';

//auth components
import Signin from 'Signin';
import Signup from 'Signup';

var createStoreWithMiddleware = applyMiddleware(ReduxThunk)(createStore);
var store = createStoreWithMiddleware(RootReducer);

var token = localStorage.getItem('token');

if(token){	
	var username = localStorage.getItem('username');
	var userid = localStorage.getItem('userid');
	store.dispatch({type:'AUTH_USER', payload: {username, userid}});
}


ReactDOM.render(
	<Provider store={store}>
		<Router history={browserHistory}>
			<Route path="/" component={Main}>
				<IndexRoute component={IndexPage} />				
				<Route path='search' component={SearchPage}>
					<Route path='?term=:term&page=:page&sort=:sort' component={SearchPage} />					
				</Route>				
				
				<Route path='signup' component={Signup}/>
				<Route path='signin' component={Signin}/>				

			 	<Route path='404' component={NotFound404} />
				<Route path='*' component={NotFound404} />
			</Route>
		</Router>		
	</Provider>
  , document.querySelector('#app'));
