const INITIAL_STATE = {
  all: [],
  selectedSpot: null  
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

    default:
      return state;
  }

}