import React from 'react'
import styles from './Alert.module.scss'

export const Alert = props => {

    return (
        <div className={styles.Alert}>{props.children}</div>)
}