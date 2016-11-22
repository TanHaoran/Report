import {Injectable} from '@angular/core';

import {Form} from '../entity/form';
import {FORMS} from './mock-form';
import {Http, Headers} from "@angular/http";

import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map'


// 数据服务
@Injectable()
export class FormService {


    private loginUrl = 'http://192.168.0.231:3002/login/yl';

    private testUrl = 'http://192.168.0.244:8001/NurseService.svc/getuserbyid/00001';
    // private testUrl = 'http://date.jsontest.com/';

    constructor(private http: Http) {

    }

    // 获取所有表单结构数据
    getForms(): Promise<Form[]> {
        return Promise.resolve(FORMS);
    }

    getUser() {
        // console.log("请求地址" + this.testUrl);
        // this.http.get(this.testUrl).map(res => {
        //     res.json();
        //     console.log(res.json());
        // });
        console.log("请求地址" + this.testUrl);
        return this.http.get(this.testUrl).map(res => res.json());
    }
}
