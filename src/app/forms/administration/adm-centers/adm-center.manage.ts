import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { GenericManage, GenericManageViewMode } from "app/forms/generic/generic.manage";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { Param } from "app/model/common/param";
import { PagedResult } from "app/model/common/paged-result";
import { EmployeeList } from '../employees/employee.list';
import { Employee } from 'app/model/api/administration/employee';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { AdmCenterDetail } from './adm-center.detail';
import { AdmCenterList } from './adm-center.list';
import { AppUtils } from 'app/common/app.utils';

@Component({
    selector: 'adm-center-manage',
    templateUrl: 'adm-center.manage.html',
    providers: [ AdmCenterHttpService,  EmployeeHttpService]
})
export class AdmCenterManage extends GenericManage<AdmCenter, number> {

     // @ViewChild('itemDetailModal') modal: ModalDirective;
     @ViewChild('employeeListModal') employeeListModal: ModalDirective;
     @ViewChild('employeeList') employeeList: EmployeeList;
     @ViewChild('admCenterDetailModal') admCenterDetailModal: ModalDirective;
     @ViewChild('admCenterList') admCenterList: AdmCenterList;
     @ViewChild('admCenterDetail') admCenterDetail: AdmCenterDetail;

    private filter: string = '';
    private selectedEmployee: Employee = null;

    constructor(
        private admCenterHttpService: AdmCenterHttpService,
        private employeeHttpService: EmployeeHttpService) {
        super();
    }


    protected addNewItem() {
        super.addNewItem();

        this.admCenterDetail.employee = null;
    }

    protected editItem() {
        super.editItem();

        let admCenter: AdmCenter = this.selectedItem as AdmCenter;

        this.admCenterDetail.employee = null;

        if ((admCenter != null) && (admCenter.employeeId != null)) {
            this.employeeHttpService
                .getById(admCenter.employeeId)
                .subscribe((employee: Employee) => {
                    this.admCenterDetail.employee = employee;
                });
        }

    }

     protected detailInitialize() {
        this.admCenterDetailModal.show();
    }

    protected detailTerminate() {
        this.admCenterDetailModal.hide();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>([ this.selectedEmployee ])));

        this.admCenterList.refresh(params);
    }


    private onAdmCenterDetailEmployeeNeeded() {
        this.admCenterDetailModal.hide();
        this.selectEmployee();
    }

    private onEmployeeListCancel() {
        this.employeeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.admCenterDetailModal.show();
        }
    }

    private selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    private setSelectedEmployee() {
        this.viewMode = 2;
        switch(this.viewMode) {

            case GenericManageViewMode.ItemList:
                this.selectedEmployee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.admCenterDetail.employee = this.employeeList.selectedItem;
                this.employeeListModal.hide();
                this.admCenterDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectEmployee() {
        this.selectedEmployee = null;
        this.refresh();
    }



    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.admCenterHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<AdmCenter>) => {

                let options = {
                    sheetid: 'AssetTypes',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                    name as [Denumire],
                    employee->firstName as [Gestionar Nume],
                    employee->lastName as [Gestionar Prenume],
                    employee->email as [Gestionar Email]
                    INTO XLSX("AssetTypes.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
