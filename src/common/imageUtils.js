/**
 * @Description: 获得base64的编码
 * @Author: Bernie_fang
 * @Since: 2021/8/23 16:47
 * @param null:
 * @return: null
 **/
export function getBase64(file) {
    return new Promise(function (resolve, reject) {
        let reader = new FileReader();
        let imgResult = "";
        reader.readAsDataURL(file);
        reader.onload = function () {
            imgResult = reader.result;
        };
        reader.onerror = function (error) {
            reject(error);
        };
        reader.onloadend = function () {
            resolve(imgResult);
        };
    });
}

export function beforeUpload(file) {
    this.getBase64(file).then(res => {
        console.log(res);
    })
}