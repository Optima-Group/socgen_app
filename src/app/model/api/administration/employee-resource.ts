export class EmployeeResource {
    id: number;
    internalCode: string;
    firstName: string;
    lastName: string;

    constructor (id: number, internalCode: string, firstName: string, lastName: string) {
        this.id = id;
        this.internalCode = internalCode;
        this.firstName = firstName;
        this.lastName = lastName;
    }
}