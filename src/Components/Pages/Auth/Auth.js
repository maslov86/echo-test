import React, {useEffect, useState} from 'react'
import styles from './Auth.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import Checkbox from '../../UI/Checkbox/Checkbox'
import {NavLink} from 'react-router-dom'
import {FormWrap} from '../../FormWrap/FormWrap'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrorMessage, fetchAuth} from '../../../Store/Actions/mainActions'
import Loader from '../../UI/Loader/Loader'
import {Alert} from '../../Alert/Alert'
import InputMask from 'react-input-mask'
import {AUTH_FORM} from '../../../Consts/Consts'

/**
 * Компонент страницы авторизации.
 */
export const Auth = () => {
    const authFormData = JSON.parse(sessionStorage.getItem(AUTH_FORM))
    const [controls, setControls] = useState({
        phone: {
            value: authFormData?.phone,
            type: 'tel',
            label: 'Телефон',
        },
        password: {
            value: '',
            type: 'password',
            label: 'Пароль',
        },
    })
    const [isChecked, setIsChecked] = useState(false)
    const dispatch = useDispatch()
    const faultMessage = useSelector(state => state.main.errorMessage)
    const loading = useSelector(state => state.main.loading)

    useEffect(() => {
        dispatch(clearErrorMessage())
    }, [])

    useEffect(() => {
        sessionStorage.setItem(AUTH_FORM, JSON.stringify({
            phone: controls.phone.value,
        }))
    })

    /**
     * Хэндлер изменения значения инпута.
     *
     * @param controlName Наименование инпута.
     * @param value Значение инпута.
     */
    const handleChange = (controlName, value) => {
        setControls({
            ...controls,
            [controlName]: {
                ...controls[controlName],
                value: value,
            },
        })
    }

    /**
     * Хэндлер изменения чекбокса.
     *
     * @param value Значение чекбокса.
     */
    const handleCheck = (value) => {
        setIsChecked(value)
    }

    /**
     * Хэндлер нажатия на кнопку.
     */
    const handleClick = () => {
        dispatch(fetchAuth({...controls, isChecked}))
    }

    /**
     * Проверка инпутов на пустоту.
     *
     * @returns {boolean}
     */
    const isControlsEmpty = () => {
        return !(controls.phone.value && controls.password.value)
    }

    /**
     * Рендер инпутов.
     */
    const renderInputs = () => {
        return Object.keys(controls).map((controlKey, index) => {
            const {value, type, label} = controls[controlKey]

            if (type === 'tel') {
                return (
                    <InputMask
                        mask="+7 999 999-99-99"
                        maskChar=""
                        value={value}
                        onChange={event => handleChange(controlKey, event.target.value)}
                        key={index}
                    >
                        {(inputProps) => <Input {...inputProps} type="tel" label={label}/>}
                    </InputMask>
                )
            }

            return (
                <Input
                    key={index}
                    type={type}
                    label={label}
                    value={value}
                    onChange={event => handleChange(controlKey, event.target.value)}
                />
            )
        })
    }

    return (
        <div>
            <h1>Авторизация</h1>
            <FormWrap>
                {
                    loading
                        ? <Loader/>
                        : <>
                            {faultMessage && <Alert>{faultMessage}</Alert>}
                            {renderInputs()}
                            <Checkbox label="Запомнить меня" onCheck={event => handleCheck(event.target.checked)}/>
                            <Button
                                type="primary"
                                onClick={handleClick}
                                disabled={isControlsEmpty()}
                                children="Войти"
                            />
                            <div className={styles.Links}>
                                <NavLink to="/password-recovery">Забыли пароль?</NavLink>
                                <NavLink to="/registration">Регистрация</NavLink>
                            </div>
                        </>
                }
            </FormWrap>
        </div>
    )
}
