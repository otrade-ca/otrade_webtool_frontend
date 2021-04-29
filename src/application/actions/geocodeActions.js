import axios from 'axios';
import {
    GEOCODE_FETCH_REQUEST,
    GEOCODE_FETCH_SUCCESS,
    GEOCODE_FETCH_FAIL,
} from '../constants/geocodeConstants';

export const fetchGeocode = () => async (dispatch) => {
    try {
        dispatch({type: GEOCODE_FETCH_REQUEST});

        const {data} = await axios.get('https://ipapi.co/json');

        dispatch({type: GEOCODE_FETCH_SUCCESS, payload: data});
    } catch (error) {
        dispatch({
            type: GEOCODE_FETCH_FAIL,
            payload:
				error.response && error.response.data.message
					? error.response.data.message
					: error.message,
        })
    }
}