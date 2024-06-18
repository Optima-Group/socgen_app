import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';

@Component({
    selector: 'department-detail',
    templateUrl: 'department.detail.html',
    inputs: [ 'teamLeaderLink', 'employeeSelectedEvent' ],
    outputs: ['employeeNeeded']
})
export class DepartmentDetail extends GenericDetail<Department, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    protected teamLeaderFullName: string = '';
    protected employeeSelectedEvent: EventEmitter<Employee>;
    protected employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private teamLeaderLink: boolean = false;

    ngOnInit() {
        super.ngOnInit();

        if (this.employeeSelectedEvent != null) {
            this.employeeSelectedEvent.subscribe(
                (employee: Employee) => {
                    this.item.teamLeaderId = employee.id;
                    this.teamLeaderFullName = employee.firstName + ', ' + employee.lastName;
                });
        }
    }

    setItemDefaultValues() {
        this.item = new Department(0, '', '', null);
    }

    private askForEmployee() {
        this.employeeNeeded.emit(null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}