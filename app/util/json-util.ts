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
     * @param offices
     * @param officeName
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
     * 将读取到的人数数据添加到集合中
     * @param sensitiveDataJson
     * @param sensitives
     * @returns {Sensitive[]}
     */
    static addPeopleToSensitive(sensitiveDataJson, sensitives: Sensitive[]): Sensitive[] {
        for (var i = 0; i < sensitiveDataJson.length; i++) {
            var sensitiveId = sensitiveDataJson[i].SensitiveId;
            for (var j = 0; j < sensitives.length; j++) {
                if (sensitiveId == sensitives[j].sensitiveId) {
                    sensitives[j].people = sensitiveDataJson[i].People;
                }
            }
        }
        return sensitives;
    }

    /**
     * 将全部数据设置为0
     * @param sensitives
     * @returns {Sensitive[]}
     */
    static setEmptyPepleToSensitive(sensitives: Sensitive[]): Sensitive[] {
        for (var i = 0; i < sensitives.length; i++) {
            sensitives[i].people = 0;
        }
        return sensitives;
    }
}