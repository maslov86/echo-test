import React from 'react'
import styles from './Alert.module.scss'

/**
 * Компонент сообщения об ошибке.
 *
 * @param props Пропсы.
 */
export const Alert = props => <div className={styles.Alert}>{props.children}</div>