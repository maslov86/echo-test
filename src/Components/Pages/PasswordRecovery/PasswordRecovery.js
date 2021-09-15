import React, {useEffect, useState} from 'react'
import styles from './PasswordRecovery.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {NavLink} from 'react-router-dom'
import {FormWrap} from '../../FormWrap/FormWrap'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrorMessage, fetchForgotEnd, fetchForgotStart} from '../../../Store/Actions/mainActions'
import Loader from '../../UI/Loader/Loader'
import {Alert} from '../../Alert/Alert'
import InputMask from 'react-input-mask'
import {PASSWORD_RECOVERY_FORM} from '../../../Consts/Consts'

/**
 * Компонент страницы восстановления пароля.
 */
export const PasswordRecovery = () => {
    const passwordRecoveryFormData = JSON.parse(sessionStorage.getItem(PASSWORD_RECOVERY_FORM))
    const [controls, setControls] = useState({
        phone: passwordRecoveryFormData?.phone,
        code: '',
        password: '',
    })
    const dispatch = useDispatch()
    const passwordRecoveryStep = useSelector(state => state.main.passwordRecoveryStep)
    const loading = useSelector(state => state.main.loading)
    const faultMessage = useSelector(state => state.main.errorMessage)

    useEffect(() => {
        dispatch(clearErrorMessage())
    }, [])

    useEffect(() => {
        sessionStorage.setItem(PASSWORD_RECOVERY_FORM, JSON.stringify({
            phone: controls.phone,
        }))
    })

    /**
     * Хэндлер изменения значения инпута.
     *
     * @param key Наименование инпута.
     * @param value Значение инпута.
     */
    const handleChange = (key, value) => {
        setControls({...controls, [key]: value})
    }

    /**
     * Хэндлер нажатия на кнопку.
     */
    const handleClick = () => {
        if (passwordRecoveryStep === 1) {
            dispatch(fetchForgotStart(controls))
        } else if (passwordRecoveryStep === 2) {
            dispatch(fetchForgotEnd(controls))
        }
    }

    /**
     * Проверка инпутов на пустоту.
     *
     * @returns {boolean}
     */
    const isControlsEmpty = () => {
        if (passwordRecoveryStep === 1) {
            return !(controls.phone)
        }
        return !(controls.code && controls.password)
    }

    /**
     * Рендер содержимого формы.
     */
    const renderContent = () => {
        switch (passwordRecoveryStep) {
            case 1:
                return (
                    <div>
                        <InputMask
                            mask="+7 999 999-99-99"
                            maskChar=""
                            value={controls.phone}
                            onChange={event => handleChange('phone', event.target.value)}
                        >
                            {(inputProps) => <Input {...inputProps} type="tel" label="Телефон"/>}
                        </InputMask>
                        <Button
                            type="primary"
                            onClick={handleClick}
                            disabled={isControlsEmpty()}
                            children="Отправить"
                        />
                    </div>
                )
            case 2:
                return (
                    <div>
                        <Input
                            type="text"
                            label="Код из смс"
                            onChange={event => handleChange('code', event.target.value)}
                        />
                        <Input
                            type="password"
                            label="Новый пароль"
                            onChange={event => handleChange('password', event.target.value)}
                        />
                        <Button
                            type="primary"
                            onClick={handleClick}
                            disabled={isControlsEmpty()}
                            children="Подтвердить"
                        />
                    </div>
                )
        }
    }

    return (
        <div>
            <h1>Восстановление пароля</h1>
            <FormWrap>
                {
                    loading
                        ? <Loader/>
                        : <>
                            {faultMessage && <Alert>{faultMessage}</Alert>}
                            {renderContent()}
                            <div className={styles.Links}>
                                <NavLink to="/auth">Вспомнил пароль!</NavLink>
                                <NavLink to="/registration">Регистрация</NavLink>
                            </div>
                        </>
                }
            </FormWrap>
        </div>
    )
}
