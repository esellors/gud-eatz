import axios from 'axios';

const initialState = {
    restaurants: [],
    restaurant: {}
};

const GET_ALL = 'GET_ALL';
const GET_ONE = 'GET_ONE';

export function getAll() {
    return {
        type: GET_ALL,
        payload: axios.get('/api/restaurants')
    }
}

export function getOne(restId) {
    return {
        type: GET_ONE,
        payload: axios.get(`/api/restaurants/${restId}`)
    }
}

export default function reducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case `${GET_ALL}_FULFILLED`:
            return {
                ...state,
                restaurants: payload.data
            }
        case `${GET_ONE}_FULFILLED`:
            return {
                ...state,
                restaurant: payload.data
            }
        default: return state;
    }
}