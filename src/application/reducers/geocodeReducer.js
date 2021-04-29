import {
    GEOCODE_FETCH_REQUEST,
    GEOCODE_FETCH_SUCCESS,
    GEOCODE_FETCH_FAIL,
    GEOCODE_FETCH_RESET
} from '../constants/geocodeConstants';

export const geocodeFetchReducer = (state = {}, action) => {
    switch(action.type) {
        case GEOCODE_FETCH_REQUEST:
            return {loading: true};
        case GEOCODE_FETCH_SUCCESS:
            return {loading: false, geocode: action.payload};
        case GEOCODE_FETCH_FAIL:
            return {loading: false, error: action.payload};
        case GEOCODE_FETCH_RESET:
            return { geocode: {} };
        default:
            return state;
    }
}