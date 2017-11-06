import axios from 'axios';

export const Qs = () => {
	var sStr = location.search,
	    params = {};
	if(sStr && sStr.length > 1){
	  sStr = sStr.substring(1, sStr.length);
	  var arr = sStr.split('&');
	  for(var i = 0; i < arr.length; i++){
	    var kv = arr[i].split('=');
	    params[kv[0]] = kv[1];
	  }
	}
	return params;
}
const params = Qs();
const $http = axios.create({
	timeout:60000,
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'mobilePhone': params.mobilePhone,
        'deviceId': params.deviceId,
        'sessionid': params.sessionid,
	}
});

$http.interceptors.response.use(response => {
    return response.data;
}, error => {
    return Promise.reject(error);
});

export {$http}

export const toFix = num => {
    if(!isNaN(num)){
        return (num/100).toFixed(2);
    }
    return num;
}

const checkNum = n => {
    return n < 10 ? ("0" + n) : n;
}

export const DateF = (time, f) => {
	if(time){
		let d = new Date(time);
        let YMd = d.getFullYear() + '-' + checkNum(d.getMonth()) + "-" + checkNum(d.getDate());
        let Hms = checkNum(d.getHours()) + ":" + checkNum(d.getMinutes()) + ":" + checkNum(d.getSeconds());
        if(f === 'date'){
            return YMd;
        }
		return YMd + " " + Hms;
	}
    return time;
}