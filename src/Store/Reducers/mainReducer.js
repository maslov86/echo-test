import {
    AUTH_SUCCESS, CLEAR_ERROR_MESSAGE_SUCCESS, CLEAR_STATE,
    FETCH_USER_DATA_SUCCESS,
    FORGOT_END_SUCCESS,
    FORGOT_START_SUCCESS,
    LOADING_START,
    LOG_ERROR,
    REGISTRATION_SUCCESS,
} from '../actionTypes'
import {TOKEN} from '../../Consts/Consts'

const initialState = {
    loading: false,
    token: localStorage.getItem(TOKEN) || '',
    firstName: '',
    errorMessage: '',
    passwordRecoveryStep: 1,
    phone: '',
}

const handlers = {
    [LOADING_START]: (state) => ({...state, loading: true}),
    [REGISTRATION_SUCCESS]: (state, {token}) => ({
        ...state,
        token,
        loading: false,
        errorMessage: '',
    }),
    [CLEAR_STATE]: (state) => ({
        ...state,
        token: '',
        phone: '',
        firstName: '',
        errorMessage: '',
    }),
    [AUTH_SUCCESS]: (state, {token}) => ({
        ...state,
        token,
        loading: false,
        errorMessage: '',
    }),
    [LOG_ERROR]: (state, {message}) => ({
        ...state,
        errorMessage: message,
        loading: false,
    }),
    [FORGOT_START_SUCCESS]: (state, {phone}) => ({
        ...state,
        phone,
        passwordRecoveryStep: 2,
        loading: false,
        errorMessage: '',
    }),
    [FORGOT_END_SUCCESS]: (state, {token}) => ({
        ...state,
        token,
        passwordRecoveryStep: 1,
        loading: false,
        errorMessage: '',
    }),
    [FETCH_USER_DATA_SUCCESS]: (state, {token, firstName}) => ({
        ...state,
        token,
        firstName,
        loading: false,
        errorMessage: '',
    }),
    [CLEAR_ERROR_MESSAGE_SUCCESS]: (state) => ({...state, errorMessage: ''}),
    DEFAULT: state => state,
}

export const mainReducer = (state = initialState, action) => {
    const handler = handlers[action.type] || handlers.DEFAULT
    return handler(state, action)
}