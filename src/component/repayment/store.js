import { observable, action, runInAction, useStrict, computed, extendObservable } from 'mobx';
import { $http, Qs } from '../../tools';
import Toast from '../../common/toast';

useStrict(true);

const params = Qs();

class Repayment {
    @observable selectIndex = {0:false, 1:false, 2:false, 3:false, 4: false, 5:false};
    @observable list = [];
    @observable repaymentOrderIds = [];
    @observable loadShow = true;

    @computed get maxNoPayIndex () {
        return this.list.filter(item => item.status == 30).length;
    }

    @computed get maxSelectIndex () {
        let index = -1;
        for(let i in this.selectIndex){
            if(this.selectIndex[i]){
                index = i;
            }
        }
        return index;
    }
    @computed get getRepaymentOrderId () {
        return this.list.filter((item,index) =>this.selectIndex[index]).map(item =>item.id);
    }

    @computed get payMoney () {
        let total = 0;
        this.list.forEach((item, index) =>{
            /*还款金额*/
            if(this.selectIndex[index] && item.status=='10'){
                total += item.repaymentTotalAmount*1;
                this.repaymentOrderIds = this.list.filter(index => this.selectIndex[index] ? item.id:'');
               /* console.log(this.list.filter(index => this.selectIndex[index]))*/
            }
        });
        return total;
    }

    @action.bound
    selectItem (index) {
       /* console.log(this.maxNoPayIndex)*/
        if(!this.selectIndex[index]){
            for(let i = this.maxNoPayIndex; i <= index; i ++){
                this.selectIndex[i] = true;
            }
        }else{
            for(let i = this.maxSelectIndex; i >= index; i --){
                this.selectIndex[i] = false;
            }
        }
    }

    @action
    getList = () => {
        $http.post('/service/repayment/repayment-orders', {
            "userId": params.userId,
            "loanId": params.loanId
        }).then(res => {
            if(res.code == "00"){
                runInAction(() => {
                    this.list = res.data;
                    this.loadShow = false;
                });
            }else {
                 runInAction(() => {
                    this.loadShow = false;
                });
                 Toast.show(res.msg);
            }
        }, err => {
            // 
        });
    }

    @action
    immediatePay = () => {
        $http.post('/service/repayment/repay-commit',{
            "userId": params.userId,
            "amount": this.payMoney,
            "repaymentOrderIds": this.getRepaymentOrderId,
        }).then(res => {
            if(res.code == "00"){
                let data = res.data;
                let exextData = JSON.parse(res.data.exextData);
                 runInAction(() => {
                location.href =`http://payment-prod.xianjinxia.com/?bizId=${data.bizId}&couponId=&userId=${params.userId}
                &repayMoney=${data.withholdingAmount}&couponMoney=&createTime=${exextData.createdAt}&expireDate=${data.expireDate}
                &deviceId=${params.deviceId}&bizType=${data.bizType}&requestSource=${data.requestSource}&sessionId=${params.sessionId}&mobile=&sign=${data.sign}#/app`;
                });
            }else{
                Toast.show(res.msg);
            }
 
        },err => {

        })
    }
}

export default new Repayment();