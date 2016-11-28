import {Sensitive} from "../entity/sensitive";
/**
 * Created by Jerry on 2016/11/28.
 */


export  class JsonUtil {

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
}