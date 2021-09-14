import axios from 'axios'
import {
    AUTH_SUCCESS,
    CLEAR_ERROR_MESSAGE_SUCCESS,
    CLEAR_STATE,
    FETCH_USER_DATA_SUCCESS,
    FORGOT_END_SUCCESS,
    FORGOT_START_SUCCESS,
    LOADING_START,
    LOG_ERROR,
    REGISTRATION_SUCCESS,
} from '../actionTypes'
import {TOKEN} from '../../Consts/Consts'

const URL = 'https://backend-front-test.dev.echo-company.ru/api'

/**
 * Обработка запроса на Регистрацию.
 *
 * @param controlsData Значения инпутов.
 */
export const fetchRegistration = controlsData => {
    return async dispatch => {
        try {
            const body = {
                phone: controlsData.phone.value.replace(/[^0-9]/g, ''),
                password: controlsData.password.value,
                first_name: controlsData.firstName.value,
                last_name: controlsData.secondName.value,
            }

            dispatch(loadingStart())

            const {data: {token, success}} = await axios.post(`${URL}/user/registration`, body)

            success && dispatch(registrationSuccess(token))
        } catch (e) {
            dispatch(logError(e.response.data.message))
        }
    }
}

/**
 * Обработка запроса на Авторизацию.
 *
 * @param controlsData Значения инпутов.
 */
export const fetchAuth = controlsData => {
    return async dispatch => {
        try {
            const body = {
                phone: controlsData.phone.value.replace(/[^0-9]/g, ''),
                password: controlsData.password.value,
            }

            dispatch(loadingStart())

            const {data: {token, success: loginSuccess}} = await axios.post(`${URL}/auth/login`, body)

            controlsData.isChecked && localStorage.setItem(TOKEN, token)
            loginSuccess && dispatch(authSuccess(token))
        } catch (e) {
            dispatch(logError(e.response.data.message))
        }
    }
}

/**
 * Обработка запроса на Восстановление пароля. Шаг 1.
 *
 * @param controlsData Значения инпутов.
 */
export const fetchForgotStart = controlsData => {
    return async dispatch => {
        try {
            const body = {
                phone: controlsData.phone.replace(/[^0-9]/g, ''),
            }

            dispatch(loadingStart())

            const {data: {success}} = await axios.post(`${URL}/user/forgot-start`, body)

            success && dispatch(forgotStartSuccess(controlsData.phone))
        } catch (e) {
            dispatch(logError(e.response.data.message))
        }
    }
}

/**
 * Обработка запроса на Восстановление пароля. Шаг 2.
 *
 * @param controlsData Значения инпутов.
 */
export const fetchForgotEnd = controlsData => {
    return async dispatch => {
        try {
            const body = {
                phone: controlsData.phone.replace(/[^0-9]/g, ''),
                code: controlsData.code,
                password: controlsData.password,
            }

            dispatch(loadingStart())

            const {data: {success, token}} = await axios.post(`${URL}/user/forgot-end`, body)

            success && dispatch(forgotEndSuccess(token))
        } catch (e) {
            dispatch(logError(e.response.data.message))
        }
    }
}

/**
 * Обработка запроса на Получение данных о пользователе.
 *
 * @param token Токен пользователя.
 */
export const fetchUserData = token => {
    return async dispatch => {
        try {
            dispatch(loadingStart())

            const {data: {first_name: firstName, success}} = await axios.get(`${URL}/user?Authorization=${token}`)

            success && dispatch(fetchUserDataSuccess(token, firstName))
        } catch (e) {
            dispatch(logError(e.response.data.message))
        }
    }
}

/**
 * Выход из аккаунта.
 */
export const logout = () => {
    return dispatch => {
        dispatch(clearState())
        localStorage.removeItem(TOKEN)
    }
}

/**
 * Очистка сообщения об ошибке.
 */
export const clearErrorMessage = () => {
    return dispatch => {
        dispatch(clearErrorMessageSuccess())
    }
}

/**
 * Экшен успешной очистки сообщения об ошибке.
 */
function clearErrorMessageSuccess() {
    return {
        type: CLEAR_ERROR_MESSAGE_SUCCESS,
    }
}

/**
 * Экшен успешной обработки запроса на получение данных о пользователе.
 */
function fetchUserDataSuccess(token, firstName) {
    return {
        type: FETCH_USER_DATA_SUCCESS,
        token,
        firstName,
    }
}

/**
 * Экшен успешной обработки запроса на восстановление пароля (шаг 1).
 */
function forgotStartSuccess(phone) {
    return {
        type: FORGOT_START_SUCCESS,
        phone,
    }
}

/**
 * Экшен успешной обработки запроса на восстановление пароля (шаг 2).
 */
function forgotEndSuccess(token) {
    return {
        type: FORGOT_END_SUCCESS,
        token,
    }
}

/**
 * Экшен вывода сообщения об ошибке.
 */
function logError(message) {
    return {
        type: LOG_ERROR,
        message,
    }
}

/**
 * Экшен успешной обработки запроса на авторизацию.
 */
function authSuccess(token) {
    return {
        type: AUTH_SUCCESS,
        token,
    }
}

/**
 * Экшен очистки стейта.
 */
function clearState() {
    return {
        type: CLEAR_STATE,
    }
}

/**
 * Экшен успешной обработки запроса на ргеистрацию.
 */
function registrationSuccess(token) {
    return {
        type: REGISTRATION_SUCCESS,
        token,
    }
}

/**
 * Экшен включения индикатора загрузки.
 */
function loadingStart() {
    return {
        type: LOADING_START,
    }
}