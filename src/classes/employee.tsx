import { Types } from "mongoose";
import { EmployeeRole } from "./enum/employeeRole.enum";
class Employee {
    id_user!: Types.ObjectId;
    businessId!: Types.ObjectId;
    code!: string;
    createdBy!: string;
    updatedBy!: string; 
    role!: EmployeeRole|undefined;
    nameEmployee!: string;   
    constructor( ) {}
}
export default Employee;