export class User {

	constructor(
		// id
		public id: number,
		// 姓名
		public username: string,
		// 密码
		public password: string,
		// 所属科室
		public office: string
	) {

	}
}