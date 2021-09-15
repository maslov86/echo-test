import React from 'react'
import styles from './Checkbox.module.scss'

/**
 * Компонент чекбокса.
 *
 * @param props Пропсы.
 */
const Checkbox = props => {
    const {label, onCheck} = props
    const htmlFor = `checkbox-${Math.random()}`

    return (
        <div className={styles.Checkbox}>
            <input
                type="checkbox"
                id={htmlFor}
                onChange={onCheck}
            />
            <label htmlFor={htmlFor}>{label}</label>
        </div>
    )
}

export default Checkbox