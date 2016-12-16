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
    public sensitiveId: number;
    /**
     * 敏感词汇
     */
    public name: string;
    /**
     * 是否含有子元素
     */
    public hasChildren: boolean;
    /**
     *  父级id
     */
    public parentId: number;
    /**
     * 父级名称
     */
    public parentName: string;
    /**
     * 所属上报表id
     */
    public reportFormId: string;
    /**
     * 人数
     */
    public people: number = 0;
    /**
     * 当月的哪一天
     */
    public day:number;
}