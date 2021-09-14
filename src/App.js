import React from 'react'
import {Redirect, Route, Switch} from 'react-router'
import {Auth} from './Components/Pages/Auth/Auth'
import {PasswordRecovery} from './Components/Pages/PasswordRecovery/PasswordRecovery'
import {Registration} from './Components/Pages/Registration/Registration'
import {Profile} from './Components/Pages/Profile/Profile'
import styles from './App.module.scss'
import {Layout} from './HOCs/Layout/Layout'
import {useSelector} from 'react-redux'

function App() {
    const token = useSelector((state) => state.main.token)

    /**
     * Рендер роутов.
     */
    const renderRoutes = () => {
        return (
            token
                ? <Switch>
                    <Route path="/profile" component={Profile}/>
                    <Redirect to="/profile"/>
                </Switch>
                : <Switch>
                    <Route path="/" component={Auth} exact/>
                    <Route path="/auth" component={Auth}/>
                    <Route path="/password-recovery" component={PasswordRecovery}/>
                    <Route path="/registration" component={Registration}/>
                    <Route path="/profile" component={Profile}/>
                    <Redirect to="/"/>
                </Switch>
        )
    }

    return (
        <div className={styles.App}>
            <Layout>{renderRoutes()}</Layout>
        </div>
    )
}

export default App
