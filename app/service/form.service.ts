import {Injectable} from '@angular/core';

import {Form} from '../entity/form';
import {FORMS} from './mock-form';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'


// 数据服务
@Injectable()
export class FormService {


    private loginUrl = 'http://192.168.0.231:3002/login/';
    private getOfficesUrl = 'http://localhost:3002/getOffices';
    private getSensitivesUrl = 'http://localhost:3002/getSensitive';

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

    getSensitives() {
        console.log("请求地址：" + this.getSensitivesUrl);
        return this.http.get(this.getSensitivesUrl).map(res => res.json());
    }
}
