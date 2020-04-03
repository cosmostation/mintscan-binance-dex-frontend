export const initialState = {
	data: null,
	error: false,
	loading: false,
	errorMessage: "",
};

export const INIT = "INIT";
export const FETCHING = "FETCHING";
export const SUCCESS = "SUCCESS";
export const ERROR = "ERROR";

export default function(state, action) {
	// console.log("fetchREDUCER", action.type);
	switch (action.type) {
		case INIT: {
			return {...initialState};
		}
		case FETCHING: {
			return {...state, loading: true, error: false};
		}
		case SUCCESS: {
			return {...state, loading: false, error: false, data: action.payload.data};
		}
		case ERROR: {
			return {...state, loading: false, error: true, data: null, errorMessage: action.payload.errorMessage};
		}
		default:
			return state;
	}
}
