import React, {useEffect} from 'react'
import styles from './Profile.module.scss'
import {useHistory} from 'react-router-dom'
import Button from '../../UI/Button/Button'
import {useDispatch, useSelector} from 'react-redux'
import {fetchUserData, logout} from '../../../Store/Actions/mainActions'
import {Alert} from '../../Alert/Alert'

/**
 * Компонент страницы личного кабинета.
 */
export const Profile = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const firstName = useSelector(state => state.main.firstName)
    const token = useSelector(state => state.main.token)
    const faultMessage = useSelector(state => state.main.errorMessage)

    useEffect(() => {
        dispatch(fetchUserData(token))
    }, [])

    /**
     * Хэндлер нажатия на кнопку.
     */
    const handleClick = () => {
        dispatch(logout())
        history.push('/auth')
    }

    return (
        <div className={styles.Profile}>
            <h1>Личный кабинет</h1>
            <div>
                {faultMessage
                    ? <Alert>{faultMessage}</Alert>
                    : <p>Привет, <strong>{firstName}</strong>!</p>
                }
                <Button type="primary" onClick={handleClick} children="Выйти"/>
            </div>
        </div>
    )
}