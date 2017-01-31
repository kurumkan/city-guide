const INITIAL_STATE = {
  all: [],
  selectedSpot: null,
  spotsCount: 0  
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'GET_SPOTS':       
      return {
        ...state,
        all: action.payload
      };

    case 'SELECT_SPOT':    
      return {
        ...state,
        selectedSpot: action.payload
      };
      
    case 'SET_SPOTS_COUNT':   
      return {
        ...state,
        spotsCount: action.payload
      }                 
      

    default:
      return state;
  }

}