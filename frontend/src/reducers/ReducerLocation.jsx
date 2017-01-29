export default function(state={lat:  51.509865, lng: -0.118092}, action){
	
	switch(action.type){

		case 'SET_LOCATION':	
			return action.payload;
		
		default:
			return state;	
	}
}