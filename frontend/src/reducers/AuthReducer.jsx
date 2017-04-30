export default function ( state = {}, action ) {
  switch ( action.type ) {
    case "AUTH_USER":
      const { username, userid } = action.payload;
      return { ...state, authenticated: true, username, userid };
    case "UNAUTH_USER":
      return { ...state, authenticated: false, username: "", userid: null };
    default:
      return state;
  }
}
