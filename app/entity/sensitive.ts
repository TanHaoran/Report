/**
 * Created by Jerry on 2016/11/24.
 */


/**
 * 敏感词汇
 */
export class Sensitive {
    /**
     * 敏感词汇id
     */
    public sensitiveId: string;
    /**
     * 敏感词汇
     */
    public name: string;
    /**
     * 父级名称
     */
    public parentName: string;
    /**
     * 是否含有子元素
     */
    public hasChildren: boolean;
    /**
     * 所属上报表id
     */
    public reportFormId: string;
}