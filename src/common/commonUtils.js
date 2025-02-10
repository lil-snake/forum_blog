export function formatDateTime(date) {
    let y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h=h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    minute = minute < 10 ? ('0' + minute) : minute;
    let second=date.getSeconds();
    second=second < 10 ? ('0' + second) : second;
    return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
};

export function checkEmail(email){
    let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$"); //正则表达式
    if(email === ""){ //输入不能为空
        return false;
    }else if(!reg.test(email)){ //正则验证不通过，格式不对
        return false;
    }else{
        return true;
    }
}

/**
 * 生成一份随机码
 * @returns {string} 位数
 */
export function randomCode(num){
    let codeSequence = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T',
        'U', 'V', 'W', 'X', 'Y', 'Z', '2', '3', '4', '5', '6', '7', '8', '9'];
    let codeString = "";
    let code = '';
    for (let i = 0; i < num; i++) {
        let number = Math.round(Math.random() * (codeSequence.length - 1));
        codeString = codeSequence[number];
        code += codeString;
    }
    return code;
}


