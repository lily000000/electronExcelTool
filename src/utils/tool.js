import Cookie from './cookie';
import router from "../router/index";
import { Loading, Message } from 'element-ui';
const Tool = {
  GetQueryString: function(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)return  unescape(r[2]); return null;
  },
  checkURLExist:function(sUrl){
    var bIsUrl=false;
    var rUrl=new RegExp("(http://|https://)?((?:[A-Za-z0-9]+-[A-Za-z0-9]+|[A-Za-z0-9]+)\.)+([A-Za-z]+)[/\?\:]?.");
       if(sUrl!='' && sUrl!=undefined && sUrl.match(rUrl)!=null){
         bIsUrl=true;
       }
    return bIsUrl;
  },
  /**
   *
   * 微信号正则验证
   * @param {*} code
   * @returns
   */
  isEmojiCharacter(substring){
    if(substring){
     const reg=/^[a-zA-Z]{1}[-_a-zA-Z0-9]{5,19}$/g
      if(!reg.test(substring)){
        Message({
          type: 'error',
          message: "请核对用户微信号",
        })
        return true;
      }
    }else{
      Message({
        type: 'error',
        message: "请输入微信号",
      })
      return true;
    }
  },
  /**
   *
   * 判断是否有权限
   * @param {*} code
   * @returns
   */
  isAuth:function(code) { 
    if(Cookie.getCookie('codeList')){
      const codeList = JSON.parse(Cookie.getCookie('codeList')||[]);
      return codeList.includes(code)
    }else{
      router.push('/login');
    }
    
  },
  /**
   *
   * 每个月的初一
   * @param {*} code
   * @returns
   */
  timeMonthMat() {
    // 拼接时间
    let time1 = new Date();
    time1.setTime(time1.getTime());
    let Y1 = time1.getFullYear();
    var M1 = time1.getMonth() + 1;
        M1 = M1 < 10 ? '0' + M1:M1;
    let timer1 = Y1 + "-" + M1 + "-01"; // 当前时间
    return timer1;
  },
  /**
   *
   * 时隔多少天
   * @param {*} code
   * @returns
   */
  getNowFormatDate(time) {
    const start = new Date();
    start.setTime(start.getTime() - 3600 * 1000 * 24 * time);
    const d = new Date(start);
    var month = d.getMonth() + 1;//获取月（其中0表示一月，11表示十二月，所以在这里 +1 01）
    month = month < 10 ? '0' + month:month;
    var date = d.getDate(); //获取日期（1-31天 17）
    date = date < 10 ? '0' + date:date;
    let timer1 = d.getFullYear() + "-" + month + "-" + date;
    return timer1;
  },
  /**
   *
   * 取当天时间
   * @param {*} code
   * @returns
   */
  timeForMat() {
    let time1 = new Date();
    time1.setTime(time1.getTime());
    var year = time1.getFullYear(); //获取年（取得4位数的年 2019）
    var month = time1.getMonth() + 1;//获取月（其中0表示一月，11表示十二月，所以在这里 +1 01）
    month = month < 10 ? '0' + month:month;
    var date = time1.getDate(); //获取日期（1-31天 17）
    date = date < 10 ? '0' + date:date;
    let timer1 = year+ "-" + month + "-" + date; // 当前时间
    return timer1;
  },
  /**
   *
   * 国际时间转正常
   * @param {*} code
   * @returns
   */
  timeNomal(time){
   
    var time =  time.parse(expireDate.replace(/-/g, "/"))
    console.log(time)
    var d = new Date(time);
    var year = d .getFullYear(); //获取年（取得4位数的年 2019）
    var month = d .getMonth() + 1;//获取月（其中0表示一月，11表示十二月，所以在这里 +1 01）
    month = month < 10 ? '0' + month:month;
    var date = d.getDate(); //获取日期（1-31天 17）
    date = date < 10 ? '0' + date:date;
    var hours = d.getHours();
    hours = hours < 10 ? '0' + hours:hours;
    var  getMinutes= d.getMinutes();
    getMinutes = getMinutes < 10 ? '0' + getMinutes:getMinutes;

    var times=d.getFullYear() + '-' + month + '-' + date + ' ' + hours + ':' + getMinutes; 
    console.log(times)
    return times;
  }


};

export default Tool;
