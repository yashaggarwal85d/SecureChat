import { LOGIN, SIGNUP, UPDATE_EMAIL, UPDATE_NAME, UPDATE_PASSWORD } from '../actions/LoginActions';

const AuthInitialState ={
    email: '',
	password:'',
	name:'',
}; 

const AuthReducer = (state = AuthInitialState, action) => {
	switch (action.type) {
		case LOGIN:
			return action.payload
		case SIGNUP:
			return action.payload
		case UPDATE_NAME:
			return { ...state, name: action.payload }
		case UPDATE_EMAIL:
			return { ...state, email: action.payload }
		case UPDATE_PASSWORD:
			return { ...state, password: action.payload }
		default:
			return state
	}
}

export default AuthReducer