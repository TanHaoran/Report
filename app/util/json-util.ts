///<reference path="../entity/sensitive.ts"/>
import {Sensitive} from "../entity/sensitive";
import {Office} from "../entity/office";
/**
 * Created by Jerry on 2016/11/28.
 */


export class JsonUtil {

    /**
     * 将Json转换成敏感词汇
     * @param sensitives 敏感词汇json字串
     */
    static parseJsonToSensitive(sensitives): Sensitive[] {
        // 最终要返回的结果集合
        var sensitiveArray = new Array<Sensitive>();

        for (var i = 0; i < sensitives.length; i++) {
            // 从json中取出每一个属性
            var sensitiveId = sensitives[i].SensitiveId;
            var name = sensitives[i].Name;
            var hasChildren = sensitives[i].HasChildren;
            var parentId = sensitives[i].ParentId;
            var parentName = sensitives[i].ParentName;
            var reportFormId = sensitives[i].ReportFormId;

            // 构建敏感词
            var s = new Sensitive();
            s.sensitiveId = sensitiveId;
            s.name = name;
            s.hasChildren = hasChildren;
            s.parentId = parentId;
            s.parentName = parentName;
            s.reportFormId = reportFormId;

            // 如果是不是父级就直接添加进去，如果是父级就跳过
            if (!hasChildren) {
                sensitiveArray.push(s);
            }
        }
        return sensitiveArray;
    }

    /**
     * 通过科室名称获取科室id
     * @param officeName
     * @param offices
     */
    static getOfficeId(officeName: string, offices: Office[]): number {
        for (var i = 0; i < offices.length; i++) {
            if (offices[i].name == officeName) {
                return offices[i].id;
            }
        }
        return 0;
    }

    /**
     * 通过科室id获取科室名称
     * @param officeId
     * @param offices
     */
    static getOfficeName(officeId: number, offices: Office[]): string {
        for (var i = 0; i < offices.length; i++) {
            if (offices[i].id == officeId) {
                return offices[i].name;
            }
        }
        return '';
    }

    /**
     * 将读取到的人数数据添加到集合中
     * @param sensitiveDataJson
     * @param sensitives
     * @returns {Sensitive[]}
     */
    static addPeopleToSensitive(date: string, sensitiveDataJson, sensitives: Sensitive[]): Sensitive[] {

        var ss = [];

        // 取得当月的哪一天
        var day = this.getDayOfMonth(date);
        // 设置天数
        for (var i = 0; i < sensitives.length; i++) {
            var s = new Sensitive();
            s.sensitiveId = sensitives[i].sensitiveId;
            s.name = sensitives[i].name;
            s.hasChildren = sensitives[i].hasChildren;
            s.parentId = sensitives[i].parentId;
            s.parentName = sensitives[i].parentName;
            s.reportFormId = sensitives[i].reportFormId;
            s.day = day;
            ss.push(s);
        }

        // 获取是哪一天的数据
        var json = sensitiveDataJson.data;
        for (var i = 0; i < json.length; i++) {
            var sensitiveId = json[i].SensitiveId;
            var j = 0;
            for (j = 0; j < ss.length; j++) {
                if (sensitiveId == ss[j].sensitiveId) {
                    ss[j].people = json[i].People;
                }
            }
        }
        return ss;
    }

    /**
     * 将全部数据设置为0
     * @param sensitives
     * @returns {Sensitive[]}
     */
    static setEmptyPeopleToSensitive(date: string, sensitives: Sensitive[]): Sensitive[] {

        var ss = [];

        // 取得当月的哪一天
        var day = this.getDayOfMonth(date);

        for (var i = 0; i < sensitives.length; i++) {
            var s = new Sensitive();
            s.sensitiveId = sensitives[i].sensitiveId;
            s.people = 0;
            s.day = day;
            s.name = sensitives[i].name;
            s.hasChildren = sensitives[i].hasChildren;
            s.parentId = sensitives[i].parentId;
            s.parentName = sensitives[i].parentName;
            s.reportFormId = sensitives[i].reportFormId;
            ss.push(s);
        }
        return ss;
    }

    /**
     * 取得当月的哪一天
     * @param date
     * @returns {number}
     */
    static getDayOfMonth(date: string): number {
        var lastIndex = date.lastIndexOf('/');
        var day = Number.parseInt(date.substr(lastIndex + 1, date.length));
        return day;
    }
}