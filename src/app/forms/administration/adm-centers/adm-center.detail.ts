import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from 'app/forms/generic/generic.detail';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { Employee } from 'app/model/api/administration/employee';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';

@Component({
    selector: 'adm-center-detail',
    templateUrl: 'adm-center.detail.html',
    outputs: ['employeeNeeded']
})
export class AdmCenterDetail extends GenericDetail<AdmCenter, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    protected employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedEmployee: Employee;

    setItemDefaultValues() {
        this.item = new AdmCenter(0, '', '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set employee(employee: Employee) {
        this.setEmployee(employee);
    }

    private setEmployee(employee: Employee) {
        this.selectedEmployee = employee;
        this.item.employeeId = employee != null ? employee.id : null;
    }

    private askForEmployee() {
        this.employeeNeeded.emit();
    }
}