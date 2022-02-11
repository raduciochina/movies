const INITIAL_STATE = {
    movieList: [],
    error: null,
    fetching: false,
    fetched: false
}

export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'GET_MOVIES_PENDING':
        case 'ADD_MOVIE_PENDING':
        case 'UPDATE_MOVIE_PENDING':
        case 'DELETE_MOVIE_PENDING':
            return {...state, error: null, fetching: true, fetched: false }
        case 'GET_MOVIES_FULFILLED':
        case 'ADD_MOVIE_FULFILLED':
        case 'UPDATE_MOVIE_FULFILLED':
        case 'DELETE_MOVIE_FULFILLED':
            return {...state, movieList: action.payload.records, fetching: false, fetched: true }
        case 'GET_MOVIES_REJECTED':
        case 'ADD_MOVIE_REJECTED':
        case 'UPDATE_MOVIE_REJECTED':
        case 'DELETE_MOVIE_REJECTED':
            return {...state, error: action.payload.records, fetching: false, fetched: false }
        default:
            return state
    }
}