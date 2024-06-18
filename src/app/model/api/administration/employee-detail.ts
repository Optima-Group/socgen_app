import { Employee } from './employee';

export class EmployeeDetail extends Employee {
    departmentCode: string;
    departmentName: string;
    isDeleted: boolean;

    constructor(id: number, internalCode: string, firstName: string, lastName: string,
        departmentId: number, departmentCode: string, departmentName: string, isDeleted: boolean) {
        super(id, internalCode, firstName, lastName, departmentId, '', isDeleted, false, false, new Date(), new Date(), new Date(), new Date(), '', '', '');
        this.departmentCode = departmentCode;
        this.departmentName = departmentName;
        this.isDeleted = isDeleted;
    }
}
