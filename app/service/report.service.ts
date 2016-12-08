import {Injectable} from '@angular/core';

import {Form} from '../entity/form';
import {FORMS} from './mock-form';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'
import {Sensitive} from "../entity/sensitive";


// 数据服务
@Injectable()
export class ReportService {
    /**
     * 服务IP地址
     * @type {string}
     */
    public serviceIp = 'http://192.168.0.226';
    /**
     * 服务端口号码
     * @type {string}
     */
    public servicePort = ':3002';

    /**
     * 登陆(post请求)
     * @type {string}
     */
    private loginUrl = this.serviceIp + this.servicePort + '/login';
    /**
     * 获取所有科室(get请求)
     * @type {string}
     */
    private getOfficesUrl = this.serviceIp + this.servicePort + '/getOffices';

    /**
     * 注册(post请求)
     * @type {string}
     */
    private registerUrl = this.serviceIp + this.servicePort + '/register';

    /**
     * 获取所有上报表单(get请求)
     * @type {string}
     */
    private getReportFormsUrl = this.serviceIp + this.servicePort + '/getReportForms';
    /**
     * 获取敏感词汇(get请求)
     * @type {string}
     */
    private getSensitivesUrl = this.serviceIp + this.servicePort + '/getSensitives/';
    /**
     * 提交敏感词汇上报表(post请求)
     * @type {string}
     */
    private postFormData = this.serviceIp + this.servicePort + '/postFormData';

    constructor(private http: Http) {

    }

    /**
     * 获取所有表单结构数据
     * @returns {Promise<Form[]>}
     */
    getForms(): Promise<Form[]> {
        return Promise.resolve(FORMS);
    }

    /**
     * 发送用户名和密码到服务端验证登陆
     * @param username 用户名
     * @param password 密码
     * @returns {Observable<R>}
     */
    postUser(username: string, password: string) {
        var url = this.loginUrl;
        console.log("请求地址：" + url);

        var json = JSON.stringify({'username': username, 'password': password});
        var params = 'data=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, params, {
            headers: headers
        }).map(res => res.json());
    }

    /**
     * 获取所有科室信息
     * @returns {Observable<R>}
     */
    getOffices() {
        console.log("请求地址：" + this.getOfficesUrl);
        return this.http.get(this.getOfficesUrl).map(res => res.json());
    }

    /**
     * 用户进行注册
     * @param username
     * @param password
     * @param officeName
     */
    postRegister(username: string, password: string) {
        var url = this.registerUrl;
        console.log("请求地址：" + url);
        // 拼凑json字串
        var json = JSON.stringify({
            'username': username,
            'password': password
        });
        var params = 'data=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(url, params, {
            headers: headers
        }).map(res => res.json());
    }

    /**
     * 获取所有上报表信息
     * @returns {Observable<R>}
     */
    getReportForm() {
        console.log("请求地址：" + this.getReportFormsUrl);
        return this.http.get(this.getReportFormsUrl).map(res => res.json());
    }

    /**
     * 获取敏感词汇信息
     * @returns {Observable<R>}
     */
    getSensitives(reportFormId: string) {
        var url = this.getSensitivesUrl + reportFormId;
        console.log("请求地址：" + url);
        return this.http.get(url).map(res => res.json());
    }

    /**
     * 提交敏感词汇表
     * @param officeId 上报科室
     * @param operatorId 上报人员
     * @param sensitives 数据内容
     * @returns {Observable<R>}
     */
    postSensitives(officeId: number, operatorId: string, sensitives: Sensitive[]) {
        var json = JSON.stringify(sensitives);
        var params = 'officeId=' + officeId + '&operatorId=' + operatorId + '&data=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this.http.post(this.postFormData, params, {
            headers: headers
        }).map(res => res.json());

    }
}
