import axios from 'axios';
import {browserHistory} from 'react-router';

const ROOT_URL = '/api/spots/';

function validateParams(term,offset,sort){
	if(typeof term != 'string' || !term)
		return false;	
	if(offset===''||isNaN(offset)||+offset<0||+offset>=988)
		return false;		
	if(sort===''||isNaN(sort)||(+sort!==0&&+sort!=2))
		return false;
	return true;
}

//get list of polls
export function getSpots(term, offset, sort){
	return function(dispatch){		
		dispatch(removeErroMessage());						
		dispatch(changeLoadingStatus());		
		if(!validateParams(term,offset,sort)){
			browserHistory.push('/');
		}else{
			axios.get(ROOT_URL+'?location='+term+'&offset='+offset+'&sort='+sort+'&category_filter=bars')
			.then((response)=>{						
				dispatch({
					type: 'GET_SPOTS',
					payload: response.data.businesses
				});				
				dispatch(setMapCenter({
						lat: response.data.latitude,
						lng: response.data.longitude
					}));		
				dispatch({
						type: 'SET_SPOTS_COUNT',
						payload: response.data.total
					});		
				dispatch(changeLoadingStatus());
				dispatch(setSort(sort));
				dispatch(setTerm(term));
				dispatch(setOffset(offset));
				browserHistory.push('/search?term='+term+'&offset='+offset+'&sort='+sort);
			})
			.catch((error)=>{	
				var {status} = error.response;

				if(status==400){					
					dispatch(setErrorMessage('Sorry! No results were found for the requested search. Try searching with some different keywords'));	
				}else{
					dispatch(setErrorMessage('Something went wrong. We are working on it.'));	
				}								
			})	
		}
		
	}	
}

export function selectSpot(id){	
	return {
		type: 'SELECT_SPOT',
		payload: id
	};
}

export function setMapCenter(coords){
	return {
		type: 'SET_MAP_CENTER',
		payload: coords
	};	
}

export function setTerm(term){
	return {
		type: 'SET_TERM',
		payload: term
	}
}

export function setSort(sort){
	return {
		type: 'SET_SORT',
		payload: sort
	}
}

export function setOffset(offset){
	return {
		type: 'SET_OFFSET',
		payload: offset
	}
}


export function changeLoadingStatus(){			
	return {
		type: 'CHANGE_LOADING_STATUS'
	}
}

export function changeDisplayType(){	
	return {
		type: 'CHANGE_DISPLAY_TYPE'		
	}
}


export function setErrorMessage(error){
	return {
		type: 'SET_ERROR',
		payload: error
	}
}

export function removeErroMessage(){		
	return {
		type: 'REMOVE_ERROR'
	}
}


export function signinUser({login, password}){	
	
	return function(dispatch){		
		axios.post('/signin', {login, password})
			.then((response)=>{				
				//-update state to indicate user is authenticated
				var {username, userid, token} = response.data;
				dispatch({
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				});
				//-save jwt token
				localStorage.setItem('token', token);
				localStorage.setItem('username', username);
				localStorage.setItem('userid', userid);

				browserHistory.push('/');

				dispatch(removeErroMessage());				
			})
			.catch(()=>{
				//- show error message
				dispatch(setErrorMessage('Bad Login Info'));				
			});
	}	
}

export function signupUser({username, email, password}){
	//by using redux-thunk we have direct access to dispatch method
	//also action creator now returns a function, no an object
	//this function will immediately be called by redux thunk with dispatch method
	
	return function(dispatch){		
		axios.post('/signup', {username, email, password})
			.then((response)=>{			
				var {username, userid, token} = response.data;	
				//-update state to indicate user is authenticated
				dispatch({
					type: 'AUTH_USER', 
					payload: {
						username,
						userid
					}
				});
				//-save jwt token
				localStorage.setItem('token', token);
				localStorage.setItem('username', username);
				localStorage.setItem('userid', userid);
				
				browserHistory.push('/');

				dispatch(removeErroMessage());	
			})
			.catch((e)=>{
				//- show error message
				dispatch(setErrorMessage('This email or username are already in use'));				
			});
	}	
}

export function signoutUser(){
	localStorage.removeItem('token');
	localStorage.removeItem('username');
	localStorage.removeItem('userid');
	browserHistory.push('/');	
	return {
		type: 'UNAUTH_USER'
	}
}


