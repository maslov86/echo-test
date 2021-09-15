import React from 'react'
import styles from './Button.module.scss'

/**
 * Компонент кнопки.
 *
 * @param props Пропсы.
 */
const Button = props => {
    const {type, onClick, disabled, children} = props

    const cls = [
        styles.Button,
        styles[type],
    ]

    return (
        <div className={styles.center}>
            <button
                onClick={onClick}
                className={cls.join(' ')}
                disabled={disabled}
            >
                {children}
            </button>
        </div>
    )
}

export default Button
