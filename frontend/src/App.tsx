import { string } from 'prop-types';
import React from 'react'
import { hot } from 'react-hot-loader/root';
import Pet from './pages/Pet'
import { HashRouter, Switch, Route } from 'react-router-dom'

function App() {
    return (
        <div>
            <HashRouter basename="/">
                <Switch>
                    <Route path="/pet/:id" component={Pet}></Route>
                </Switch>
            </HashRouter>
        </div>
    )
}
export default hot(App)