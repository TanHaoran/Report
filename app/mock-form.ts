import { Form } from './form';

// 模拟表单数据
export const FORMS: Form[] = [
	{
		id: 1, 
		index: 1, 
		name: "体温上报表",
		titles: ["糖尿病患者", "精神病患者", "体温异常患者", "危险患者"]
	},
	{
		id: 2, 
		index: 2, 
		name: "护理类型表",
		titles: ["一级护理人数", "二级护理人数", "三级护理人数"]
	},
	{
		id: 3, 
		index: 3, 
		name: "人员值班表",
		titles: ["白班", "午班", "夜班", "晚班"]
	}
];