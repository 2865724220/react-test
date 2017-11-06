import React, { Component } from 'react';
import './App.css';
import { Provider } from 'mobx-react';
import { HashRouter as Router, Route } from 'react-router-dom';

import BindCredit from './component/bindcredit/bindcredit';
import BankCard from './component/bankcard/bankcard';
import BorrowDetail from './component/borrowdetail/borrowdetail';
import BorrowProgress from './component/borrowprogress/borrowprogress';
import Repayment from './component/repayment/repayment';
import Demo from './component/demo/demo';
import stores from './stores'

class App extends Component {
    render() {
        // 
        return (
        	<Router>
                <Provider {...stores}>
        		<div className="App">
        			<Route exact path="/" component={Repayment} />
        	        <Route path="/progress" component={BorrowProgress} />
        	        <Route path="/borrowdetail" component={BorrowDetail} />
        	        <Route path="/bankcard" component={BankCard} />
        	        <Route path="/bindcredit" component={BindCredit} />
                    <Route path="/demo" component={Demo} />
        		</div>
                </Provider>
        	</Router>
        );
    }
}

export default App;
