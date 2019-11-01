import axios from 'axios';

const initialState = {
    userId: null,
    firstName: '',
    lastName: '',
    isAdmin: false
};

const REGISTER_USER = 'REGISTER_USER';
const LOGIN_USER = 'LOGIN_USER';
const LOGOUT_USER = 'LOGOUT_USER';

export function registerUser(userInfo) {
    return {
        type: REGISTER_USER,
        payload: axios.post('/auth/user/new', userInfo)
    }
}

export function loginUser(userInfo) {
    return {
        type: LOGIN_USER,
        payload: axios.post('/auth/user/login', userInfo)
    }
}

export function logoutUser() {
    return {
        type: LOGOUT_USER,
        payload: axios.post('/auth/user/logout')
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${REGISTER_USER}_FULFILLED`:
            return {
                userId: payload.data.userId,
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                isAdmin: payload.data.isAdmin
            }
        case `${LOGIN_USER}_FULFILLED`:
            console.log(payload)
            return {
                userId: payload.data.userId,
                firstName: payload.data.firstName,
                lastName: payload.data.lastName,
                isAdmin: payload.data.isAdmin
            }
        case `${LOGOUT_USER}_FULFILLED`:
            return initialState;
        default: return state;
    }
}