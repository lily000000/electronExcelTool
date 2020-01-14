let validaors = {
  /**
   * Validaor
   * @param val 需要校验的值
   * @param lenmin {number} 最小长度允许
   * @param lenmax {number} 最大长度允许
   * @returns {boolean}
   *    返回 true 表示验证错误
   *    返回 false 表示验证正确
   * @author xiaoBao
   */
  //数字和字母 必须包括数字
   isNumberLetter(val,min,max){
    if(!(/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$/.test(val) && val.length<=max && val.length>=min)){
      return true
    }else{
      return false
    }
  },
  //只输入 英文 数字 中文
  isNormal(val,num){
    if (! (/^[a-zA-Z0-9\u4E00-\u9FFF]+$/.test(val) && val.length<=num)) {
      return true
    }else{
      return false
    }
  },
  //输入A-Z 和 数字
  isUser(val,num){
  if (! (/^[A-ZAa-z0-9]+$/.test(val)&& val.length <= num)) {
    return true
  }else{
    return false
  }
},
  //手机号验证
  isTel(val){
    if (!/^1(3|4|5|6|7|8|9)\d{9}$/.test(val) ) {
      return true
    }else{
      return false
    }
  },
  //姓名限制
  isName(val,num){
    if (! (/^[\u4E00-\u9FFF]+$/.test(val)&& val.length <= num)) {
      return true
    }else{
      return false
    }
  },
  // 字母
  str: function (val, lenmin, lenmax) {
    var reg = /^[A-Za-z]+$/

    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },
  hans: function(val, lenmin, lenmax){
    var reg =  /^[A-Za\u4e00-\u9fa5]+$/gi;
    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },
  han: function(val, lenmin, lenmax){
    var reg = /^[\u4e00-\u9fa5]+$/;
    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },
  // 字母 数字
  strnum: function (val, lenmin, lenmax) {
    var reg = /^[A-Za-z0-9]*$/;

    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },

  // 字母 数字 汉字
  strnumhan: function (val, lenmin, lenmax) {
    var reg = /^[a-z0-9A-Z\u4e00-\u9fa5]+$/

    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },

  // 小数点后两位
  moneyCommon: function (val, lenmin, lenmax) {
    var reg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;

    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && val.length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) && val.length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) && val.length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },
  moneyCommonCZ: function (val, lenmin, lenmax) {
    var reg=/^(([1-9][0-9]*)|(([0]\.\d{1,2}|[1-9][0-9]*\.\d{1,2})))$/;

    if (lenmin && lenmax) {
      if (reg.test(val) && val.length >= lenmin && String(parseInt(val)).length <= lenmax) {
        return false
      } else {
        return true
      }
      return
    }

    if (lenmin) {
      if (reg.test(val) &&  String(parseInt(val)).length >= lenmin) {
        return false
      } else {
        return true
      }
    }
    if (lenmax) {
      if (reg.test(val) &&  String(parseInt(val)).length <= lenmax) {
        return false
      } else {
        return true
      }
    }
  },

}
export default validaors;
