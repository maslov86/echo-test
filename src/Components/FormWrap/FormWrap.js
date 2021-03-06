import React from 'react'
import styles from './FormWrap.module.scss'

/**
 * Компонент обертки для формы.
 *
 * @param props Пропсы.
 */
export const FormWrap = props => {
    /**
     * Отмена отправки формы.
     */
    const submitHandler = event => {
        event.preventDefault()
    }

    return <form onSubmit={submitHandler} className={styles.FormWrap}>{props.children}</form>
}