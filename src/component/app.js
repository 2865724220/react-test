import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import BindCredit from './bindcredit/bindcredit';
import BankCard from './bankcard/bankcard';
import BorrowDetail from './borrowdetail/borrowdetail';
import BorrowProgress from './borrowprogress/borrowprogress';
import Repayment from './repayment/repayment';
import Demo from './demo/demo';

class App extends Component {
    render() {
        return (
            <div className="App">
                <Route exact path="/" component={Repayment} />
                <Route path="/progress" component={BorrowProgress} />
                <Route path="/borrowdetail" component={BorrowDetail} />
                <Route path="/bankcard" component={BankCard} />
                <Route path="/bindcredit" component={BindCredit} />
                <Route path="/demo" component={Demo} />
            </div>
        );
    }
}

export default App;
