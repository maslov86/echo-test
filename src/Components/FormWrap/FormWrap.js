import React from 'react'
import styles from './FormWrap.module.scss'

export const FormWrap = props => {
    const submitHandler = event => {
        event.preventDefault()
    }

    return (
        <form onSubmit={submitHandler} className={styles.FormWrap}>{props.children}</form>)
}