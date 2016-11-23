/**
 * Created by Jerry on 2016/11/23.
 */


export  class SystemConfig {

    /**
     * 获取登陆用户名
     * @returns {any}
     */
    static getUsername(): string {
        var loginInfo = localStorage.getItem('user');
        console.log("登陆保存信息:" + loginInfo);
        var username = JSON.parse(loginInfo).LoginName;
        return username;
    }
}