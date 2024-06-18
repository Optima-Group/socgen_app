import { EmployeeImport } from './../../../model/common/import/employee-import';
import { AppConfig } from './../../../config';
import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild, ElementRef, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';

import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeDetail } from '../../../model/api/administration/employee-detail';

import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { EmployeeDetailHttpService } from '../../../services/http/administration/employee-detail.http.service';
import { EmployeeDetail as EmployeeDetailUI } from 'app/forms/administration/employees/employee.detail';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';
import { DepartmentList } from 'app/forms/administration/departments/department.list';
import { DepartmentHttpService } from 'app/services/http/administration/department.http.service';
import { AppUtils } from 'app/common/app.utils';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
import { AppData } from 'app/app-data';
import { saveAs as fileSaveAs } from "file-saver";
import { EntityTypeHttpService } from 'app/services/http/common/entity-type.http.service';
import { EntityType } from 'app/model/api/common/entity-type';

@Component({
    selector: 'employee-manage',
    templateUrl: 'employee.manage.html',
    providers: [ DepartmentHttpService, EmployeeHttpService, EmployeeDetailHttpService ]
})
export class EmployeeManage  extends GenericManage<Employee, number> implements OnInit {

    @ViewChild('employeeDetailModal') employeeDetailModal: ModalDirective;
    @ViewChild('employeeList') employeeList: EmployeeList;
    @ViewChild('employeeDetail') employeeDetail: EmployeeDetailUI;
    @ViewChild('departmentListModal') departmentListModal: ModalDirective;
    @ViewChild('departmentList') departmentList: DepartmentList;
    @ViewChild('importDataModal') private importDataModal: ModalDirective;
    @ViewChild('fileInput') fileInput: ElementRef;

    private filter: string = '';
    private selectedDepartment: Department = null;
    lastSync: Date;

    private data;
    private importLines: Array<EmployeeImport> = new Array<EmployeeImport>();
    private importIndex: number = 0;
    private fileEvent: any = null;
    private deletedEmployees: boolean = false;
    private get isAdmin(): boolean { return AppData.UserIsAdmin; }
    isActive= '-';
    showBtnSync = true;
    showBtnExport = true;
    showBtnDelete = true;

    constructor(private departmentHttpService: DepartmentHttpService,
                private employeeHttpService: EmployeeHttpService,
                private router: Router,
                private toastr: ToastsManager,
                private vcr: ViewContainerRef,
                private employeeDetailHttpService: EmployeeDetailHttpService,
                private entityTypeHttpService: EntityTypeHttpService,
                private translate: TranslateService) {

        super();
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
         this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit(): void {
        this.entityTypeHttpService.getById(13).subscribe( (res: EntityType) => {
            this.lastSync = res.modifiedAt;
        });
    }

    private syncEmp() {

        this.employeeHttpService.updateAllEmp().subscribe((count) => {
             alert('Au fost actualizati ' + JSON.stringify(count) + ' angajati!');


             this.refresh();
            // this.toastr.success('Au fost actualizati ' + JSON.stringify(count) + ' angajati!');
       });

}

private deleteEmp() {
    this.showBtnDelete = false;
    if(confirm('Are you sure?')){
        this.employeeHttpService.deleteEmployee(this.selectedItem.id).subscribe((res) => {
            if(res) {
                alert('The employee was successfully deleted!');
                this.showBtnDelete = true;
                this.refresh();
            }
        });
    };
}

private syncERPEmployees() {
    this.showBtnSync = false;
    this.employeeHttpService.updateAllERPEmployees().subscribe((count) => {
        alert('Au fost actualizati ' + JSON.stringify(count) + ' angajati din ERP!');
        this.entityTypeHttpService.getById(13).subscribe( (res: EntityType) => {
            this.lastSync = res.modifiedAt;
            this.showBtnSync = true;
        });
        
   });

}

private onStatusUpdate(isActive: string) {
    this.isActive = isActive;
    this.refresh();
}

    private showDeletedEmployees(){

        let params = new Array<Param>();
        params.push(new Param('isActive', JSON.stringify(this.deletedEmployees)));

        this.employeeList.refresh(params);

    }

    protected addNewItem() {
        super.addNewItem();

        this.employeeDetail.department = null;
    }

    protected editItem() {
        super.editItem();

        let employee: EmployeeDetail = this.selectedItem as EmployeeDetail;

        this.employeeDetail.department = null;
        if (employee != null) {
            this.departmentHttpService
                .getById(employee.departmentId)
                .subscribe((department: Department) => {
                    this.employeeDetail.department = department;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.employeeDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.employeeDetailModal.hide();
    }

    private onEmployeeDetailDepartmentNeeded() {
        this.employeeDetailModal.hide();
        this.selectDepartment();
    }

    private onDepartmentListCancel() {
        this.departmentListModal.hide();
        this.employeeDetailModal.show();
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        // params.push(new Param('departmentId', this.selectedDepartment != null ? this.selectedDepartment.id.toString() : null));
        params.push(new Param("departmentIds", AppUtils.getIdsList<Department, number>([ this.selectedDepartment ])));
        params.push(new Param('isActive', ((this.isActive === '-') ? null : (this.isActive === 'YES' ? 'true' : 'false'))));

        this.employeeList.refresh(params);
    }

    private selectDepartment() {
        this.departmentListModal.show();
        this.departmentList.refresh(null);
    }

    private setSelectedDepartment() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedDepartment = this.departmentList.selectedItem;
                this.departmentListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.employeeDetail.department = this.departmentList.selectedItem;
                this.departmentListModal.hide();
                this.employeeDetailModal.show();
                break;
        }
    }

    private unselectDepartment() {
        this.selectedDepartment = null;
        this.refresh();
    }

    private loadFile(ev) {
        this.fileEvent = ev;
    }

    private doImportEmployees() {
        if (this.importIndex < this.importLines.length) {
            this.employeeDetailHttpService.upload(this.importLines[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportEmployees();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLines = new Array<EmployeeImport>();
        }
    }

    private importEmployees() {

        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.employeeHttpService
                .import(fileToUpload)
                .subscribe(res => {
                    if (res.statusCode === 200){
                         this.toastr.success('Employees have been successfully updated!');
                        // alert('Datele au fost actualizate cu success!');
                    }else{
                         this.toastr.error('Error importing employees!');
                            // alert('Eroare import!');
                    }
                    this.refresh();
                }, (error) => {
                    this.toastr.error('Error importing employees!');
                });
        }

    }

    // private importEmployees() {

    //     if (this.fileEvent === null) return;

    //     alasql.promise(`select
    //                         [ID] as [InternalCode],
    //                         [First Name] as [FirstName],
    //                         [Last Name] as [LastName],
    //                         [Email] as [Email],
    //                         [Supv ID] as [InternalCodeTl],
    //                         [Supervisor] as [FullNameTl],
    //                         [Dept] as [Department]
    //                         from FILE(?, {headers: true})`, [this.fileEvent])

    //         .then((importLines: Array<EmployeeImport>) => {

    //             this.importDataModal.show();

    //             this.importIndex = 0;
    //             this.importLines = importLines;

    //             this.doImportEmployees();
    //     });

    // }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param("departmentIds", AppUtils.getIdsList<Department, number>([this.selectedDepartment])));
        params.push(new Param('isActive', ((this.isActive === '-') ? null : (this.isActive === 'YES' ? 'true' : 'false'))));
        return params;
    }

    private exportToExcel() {
        this.showBtnExport = false;
        let params: Array<Param> = null;

        params = this.getFilters();
        this.employeeHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'employees.xlsx');
                this.showBtnExport = true;
            });
    }

    private editEmployee() {
        let selectedEmployeeId = this.employeeList.selectedItems.length > 0 ? this.employeeList.selectedItems[0].id : 0;
        if (selectedEmployeeId > 0) {
            this.router.navigate(['/employee', selectedEmployeeId]);
        }
    }
}

// enum EmployeeManageViewMode {
//     EmployeeList = 1,
//     EmployeeDetail = 2,
//     DepartmentList = 3
// }
