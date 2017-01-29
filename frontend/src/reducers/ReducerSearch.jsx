export default function(state='London', action){
	
	switch(action.type){

		case 'SET_TERM':	
			return action.payload;
		
		default:
			return state;	
	}
}