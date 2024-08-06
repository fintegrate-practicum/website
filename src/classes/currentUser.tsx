import Employee from '../modules/workers/classes/employee';
import User from '../modules/workers/classes/user';
class CurrentUser {
	employee!: Employee;
	user!: User;
	constructor() {}
}
export default CurrentUser;
