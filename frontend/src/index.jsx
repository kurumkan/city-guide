import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import { Router, Route, IndexRoute, browserHistory } from "react-router";
import ReduxThunk from "redux-thunk";

// App css
require( "style!css!sass!applicationStyles" );

import RootReducer from "reducers/RootReducer";

import Main from "components/Main";
import NotFound404 from "components/NotFound404";
import IndexPage from "components/IndexPage";
import SearchPage from "components/SearchPage";

//  auth components
import Signin from "components/Signin";
import Signup from "components/Signup";

const createStoreWithMiddleware = applyMiddleware( ReduxThunk )( createStore );
const store = createStoreWithMiddleware( RootReducer );

const token = localStorage.getItem( "token" );
if ( token ) {
  const username = localStorage.getItem( "username" );
  const userid = localStorage.getItem( "userid" );
  store.dispatch( { type: "AUTH_USER", payload: { username, userid } } );
}

ReactDOM.render(
  <Provider store={ store }>
    <Router history={ browserHistory }>
      <Route path="/" component={ Main }>
        <IndexRoute component={ IndexPage } />
        <Route path="search" component={ SearchPage }>
          <Route path="?term=:term&page=:page&sort=:sort" component={ SearchPage } />
        </Route>

        <Route path="signup" component={ Signup } />
        <Route path="signin" component={ Signin } />

        <Route path="404" component={ NotFound404 } />
        <Route path="*" component={ NotFound404 } />
      </Route>
    </Router>
  </Provider>
  , document.querySelector( "#app" ) );
