const INITIAL_STATE = {
  term: 'London',
  location: {lat:  51.509865, lng: -0.118092}
};


export default function(state=INITIAL_STATE, action){
	
	switch(action.type){

		case 'SET_TERM':	
			return {
				...state,
				term: action.payload
			}
		case 'SET_MAP_CENTER':	
			return {
				...state,
				location: action.payload
			}	
		
		default:
			return state;	
	}
}