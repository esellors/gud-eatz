import React from 'react';
import {Switch, Route} from 'react-router-dom';
import LoginLogout from './components/LoginLogout';
import Restaurants from './components/Restaurants';
import Restaurant from './components/Restaurant';

export default (
    <Switch>
        <Route component={LoginLogout} exact path='/' />
        <Route component={Restaurants} path='/restaurants' />
        <Route component={Restaurant} path='/restaurant/:restId' />
        <Route render={() => <h1>404 - Not Found</h1>} />
    </Switch>
)