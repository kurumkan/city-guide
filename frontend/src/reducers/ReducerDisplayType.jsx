export default function(state='LIST', action){	
	switch(action.type){		

		case 'CHANGE_DISPLAY_TYPE':
			return state=='LIST'?'GRID':'LIST';
		
		default:
			return state;	
	}
}