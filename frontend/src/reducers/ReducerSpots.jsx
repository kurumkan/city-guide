const INITIAL_STATE = {
  all: [],
  spot: null  
};

export default function(state = INITIAL_STATE, action) {

  switch (action.type) {
    case 'GET_SPOTS':    
      return {
        ...state,
        all: action.payload
      };

    case 'GET_SINGLE_SPOT':    
      return {
        ...state,
        spot: action.payload
      };

    default:
      return state;
  }

}