export default function(state=false, action){
	
	switch(action.type){

		case 'CHANGE_LOADING_STATUS':
			return !state;
		
		default:
			return state;	
	}
}