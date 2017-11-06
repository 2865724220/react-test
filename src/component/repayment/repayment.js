import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { DateF, toFix, Qs } from '../../tools';

const params = Qs();

@inject('repayment')
@observer
export default class repayment extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selectIndex: {}
    }
  }

  componentDidMount(){
    this.props.repayment.getList();
  }

  render() {
    document.title = '还款';
    const { payMoney, list, selectItem, selectIndex, immediatePay,loadShow} = this.props.repayment;
    return (
      <div className="borrowDetail">
       {/* <div className="header header-blue">
            <a className="back_arr" href="javascript:void(0);"></a>
            <h1>还款</h1>
            <em><a rel="external" href="javascript:;">借款详情</a></em>
        </div>*/}
         <div className="pay-num-wrap">
          <p className="pay-title">还款金额(元)</p>
          <p className="pay-num">{toFix(payMoney)}</p>
        </div>
        <div className="pay-installment">
          <p className="title">友情提示：支持多期还款，不支持非连续还款</p>
          <ul className="installment">
            <li className="repaymentLoad" style={{display: loadShow ? 'block':'none'}}>加载中...</li>
            {
              list.map((item, index) => {
                return <li className={item.status == 10 ? "no-pay" : "paid"} key={index} onClick={()=>{if(item.status==10) selectItem(index)}}>
                  <p className="term">第{item.period}期</p>
                  <div className="num-wrap installment-line">
                    还款金额：<span className="num">{toFix(item.repaymentTotalAmount)}元</span>（含利息{toFix(item.repaymentInterest)}）
                  </div>
                   <div className="date-wrap installment-line clearfix">
                    <p>还款日期：<span className="date">{DateF(item.repaymentPlanTime, 'date')}</span></p>
                    {item.lateFee && item.lateFee > 0 && <p className="late-fee">滞纳金：<span>{toFix(item.lateFee)}元</span></p>}
                  </div>
                  {
                    item.status == 10 && <div className={selectIndex[index] ? "pay-select selected" : "pay-select"}></div>
                  }
                </li>
              })
            }
          </ul>
        </div>
        <a rel="external" onClick={immediatePay} href="javascript:;"  className={payMoney > 0 ? "submit-btn submit-open" : "submit-btn" }>立即还款</a>
      </div>
    );
  }
}

