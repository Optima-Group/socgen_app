import { Department } from './department';

export class DepartmentDetail extends Department {
    internalCode: string;
    firstName: string;
    lastName: string;

    constructor(id: number, code: string, name: string, teamLeaderId: number, internalCode: string, firstName: string, lastName: string) {
        super(id, code, name, teamLeaderId);
        this.internalCode = internalCode;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}