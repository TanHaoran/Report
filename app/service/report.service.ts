import {Injectable} from '@angular/core';

import {Form} from '../entity/form';
import {FORMS} from './mock-form';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'


// 数据服务
@Injectable()
export class ReportService {


    private loginUrl = 'http://192.168.0.238:3002/login/';
    private getOfficesUrl = 'http://localhost:3002/getOffices';
    private getReportFormsUrl = 'http://localhost:3002/getReportForms';
    private getSensitivesUrl = 'http://localhost:3002/getSensitives/';
    private postFormData = 'http://localhost:3002/postFormData';

    constructor(private http: Http) {

    }

    // 获取所有表单结构数据
    getForms(): Promise<Form[]> {
        return Promise.resolve(FORMS);
    }

    /**
     * 发送用户名和密码到服务端验证登陆
     * @param username 用户名
     * @param password 密码
     * @returns {Observable<R>}
     */
    getUser(username: string, password: string) {
        var url = this.loginUrl + username + "/" + password;
        console.log("请求地址：" + url);
        return this.http.get(url).map(res => res.json());
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
     * 提交一天的上报表
     */
    postSensitives() {

        // var creds = "username=123" + "&password=123";
        //
        // var headers = new Headers();
        // headers.append('Content-Type', 'application/json');
        //
        // this.http.post(this.postFormData, creds, {
        //     headers: headers
        // }).map(res => res.json()).subscribe(
        //     data => console.log(data),
        //     err => console.log('error'),
        //     () => console.log('Authentication Complete')
        // );


        var json = JSON.stringify({var1: 'test', var2: 3});
        var params = 'user=' + json;
        var headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        headers.append('Content-Type', 'application/json');
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.postFormData, params, {
            headers: headers
        }).map(res => res.json());

    }
}
