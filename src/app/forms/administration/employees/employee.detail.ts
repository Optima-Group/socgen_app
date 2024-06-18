import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { AppConfig } from "app/config";

@Component({
    selector: 'employee-detail',
    templateUrl: 'employee.detail.html',
    outputs: ['departmentNeeded']
})
export class EmployeeDetail extends GenericDetail<Employee, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    protected departmentRequired: boolean = AppConfig.EMPLOYEE_DEPARTMENT_REQUIRED;
    protected departmentSelectedEvent: EventEmitter<Department>;
    protected departmentNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedDepartment: Department;
    private state  = 'INACTIV';

    setItemDefaultValues() {
        this.item = new Employee(0, '', '', '', 0, '', false, false, false, new Date(), new Date(), new Date(), new Date(), '', '', '');
    }

    public edit(item: Employee) {

        super.edit(item);
        this.state = item.isDeleted === true ? 'INACTIV' : 'ACTIV';
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set department(department: Department) {
        this.setDepartment(department);
    }

    private setDepartment(department: Department) {
        this.selectedDepartment = department;
        this.item.departmentId = department != null ? department.id : null;
    }

    private askForDepartment() {
        this.departmentNeeded.emit(null);
    }

    protected saveItem() {
        if ((this.departmentRequired) && (this.selectedDepartment == null)) {
            alert('Departamentul este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    private setSelectedState(selectedState: boolean) {
        this.item.isDeleted = selectedState;
        this.state = selectedState === true ? 'INACTIV' : 'ACTIV';
    }
}
