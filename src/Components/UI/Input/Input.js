import React, {useState} from 'react'
import styles from './Input.module.scss'

const Input = props => {
    const {type = 'text', label, value, onChange} = props

    const [isHidden, setIsHidden] = useState(true)

    const htmlFor = `${type}-${Math.random()}`
    const iconClassName = `${styles.InputIcon} fas fa-eye${isHidden ? '-slash' : ''}`

    /**
     * Хэндлер нажатия на иконку "Показать пароль".
     */
    const handleHiding = () => {
        setIsHidden(!isHidden)
    }

    /**
     * Формирование атрибутов инпута.
     */
    const getInputConfig = () => {
        const inputConfig = {
            type: isHidden ? type : 'text',
            id: htmlFor,
            value,
            onChange,
        }

        if (type === 'password') {
            inputConfig.autoComplete = 'on'
        }

        return inputConfig
    }

    return (
        <div className={styles.Input}>
            <label htmlFor={htmlFor}>{label}</label>
            <div>
                <input {...getInputConfig()} />
                {type === 'password' && <i className={iconClassName} onClick={handleHiding}/>}
            </div>
        </div>
    )
}

export default Input