/**
 * Created by Jerry on 2016/11/28.
 */


export class ElementUtil {
    /**
     * 控制输入框只能输入正整数
     * @param input
     * @returns {number}
     */
    static makePositiveInteger (input): number {
        if (input.value == undefined) {
            return;
        }
        input.value = input.value.replace(/[^\d]/g, ""); //把非数字的都替换掉
        return Number.parseInt(input.value);
    }
}
