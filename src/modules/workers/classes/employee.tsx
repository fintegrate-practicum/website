import { Types } from "mongoose";
import { EmployeeRole } from "./employeeRole";
class Employee {
    userId!: string;
    businessId!: Types.ObjectId;
    code!: string;
    createdBy!: string;
    updatedBy!: string; 
    role!: EmployeeRole;
    nameEmployee!: string;   
    constructor( ) {}
}
export default Employee;