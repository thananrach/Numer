import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {Router,Route,Link,browserHistory} from 'react-router';
import bisection from './bisection';
import falseposition from './falseposition';
import onepointiteration from './onepointiteration';
import newtonraphson from './newtonraphson';
import secant from './secant';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={App}/>
        <Route path="/bisection" component={bisection}/>
        <Route path="/falseposition" component={falseposition}/>
        <Route path="/onepointiteration" component={onepointiteration}/>
        <Route path="/newtonraphson" component={newtonraphson}/>
        <Route path="/secant" component={secant}/>

    </Router>,document.getElementById('root')
);
