import React, {useEffect, useState} from 'react'
import styles from './Registration.module.scss'
import Input from '../../UI/Input/Input'
import Button from '../../UI/Button/Button'
import {NavLink} from 'react-router-dom'
import {FormWrap} from '../../FormWrap/FormWrap'
import {useDispatch, useSelector} from 'react-redux'
import {clearErrorMessage, fetchRegistration} from '../../../Store/Actions/mainActions'
import Loader from '../../UI/Loader/Loader'
import {Alert} from '../../Alert/Alert'
import InputMask from 'react-input-mask'
import {REGISTRATION_FORM} from '../../../Consts/Consts'

/**
 * Компонент страницы регистрации.
 */
export const Registration = () => {
    const registrationFormData = JSON.parse(sessionStorage.getItem(REGISTRATION_FORM))
    const [controls, setControls] = useState({
        firstName: {
            value: registrationFormData?.firstName,
            type: 'text',
            label: 'Имя',
        },
        secondName: {
            value: registrationFormData?.secondName,
            type: 'text',
            label: 'Фамилия',
        },
        phone: {
            value: registrationFormData?.phone,
            type: 'tel',
            label: 'Телефон',
        },
        password: {
            value: '',
            type: 'password',
            label: 'Пароль',
        },
    })
    const dispatch = useDispatch()
    const loading = useSelector(state => state.main.loading)
    const faultMessage = useSelector(state => state.main.errorMessage)

    useEffect(() => {
        dispatch(clearErrorMessage())
    }, [])

    useEffect(() => {
        sessionStorage.setItem(REGISTRATION_FORM, JSON.stringify({
            firstName: controls.firstName.value,
            secondName: controls.secondName.value,
            phone: controls.phone.value,
        }))
    })

    /**
     * Проверка инпутов на пустоту.
     *
     * @returns {boolean}
     */
    const isControlsEmpty = () => {
        return !(controls.firstName.value && controls.secondName.value && controls.phone.value && controls.password.value)
    }

    /**
     * Хэндлер изменения значения инпута.
     *
     * @param controlName Наименование инпута.
     * @param value Значение инпута.
     */
    const handleChange = (controlName, value) => {
        setControls({...controls, [controlName]: {...controls[controlName], value: value}})
    }

    /**
     * Хэндлер нажатия на кнопку.
     */
    const handleClick = () => {
        dispatch(fetchRegistration(controls))
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
            <h1>Регистрация</h1>
            <FormWrap>
                {
                    loading
                        ? <Loader/>
                        : <>
                            {faultMessage && <Alert>{faultMessage}</Alert>}
                            {renderInputs()}
                            <Button
                                type="primary"
                                onClick={handleClick}
                                disabled={isControlsEmpty()}
                                children="Зарегистрироваться"
                            />
                            <div className={styles.Link}>
                                <NavLink to="/auth">Авторизация</NavLink>
                            </div>
                        </>
                }
            </FormWrap>
        </div>
    )
}