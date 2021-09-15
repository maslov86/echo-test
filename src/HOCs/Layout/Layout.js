import React from 'react'
import styles from './Layout.module.scss'

/**
 * Компонент обертки приложения.
 *
 * @param props Пропсы.
 */
export const Layout = props => <div className={styles.Layout}>{props.children}</div>