import { LocationList } from './../../administration/locations/location.list';
import { DepartmentHttpService } from './../../../services/http/administration/department.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage } from '../../generic/generic.manage';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { InvCompDetail } from '../../../model/api/inventory/inv-comp-detail';
import { InvCompOp } from '../../../model/api/inventory/inv-comp-op';
import { InventoryInvCompDetail } from '../../../model/api/inventory/inventory-inv-comp-detail';

import { InventoryInvCompDetailHttpService } from
            '../../../services/http/inventory/inventory-inv-comp-detail.http.service';
import { InvCompDetailHttpService } from '../../../services/http/inventory/inv-comp-detail.http.service';
import { InvCompOpHttpService } from '../../../services/http/inventory/inv-comp-op.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';

import { DepartmentDetail as DepartmentUIDetail } from 'app/forms/administration/departments/department.detail';
import { DepartmentList } from 'app/forms/administration/departments/department.list';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';

@Component({
    selector: 'inventory-inv-comp-manage',
    templateUrl: 'inventory-inv-comp.manage.html',
    providers: [InvCompDetailHttpService, InvCompOpHttpService,
                InventoryInvCompDetailHttpService, LocationHttpService,
                RoomDetailHttpService, DepartmentHttpService, EmployeeHttpService ]
})
export class InventoryInvCompManage { // extends GenericManage<AssetInvDetail> {


    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('departmentList') public departmentList: DepartmentList;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

      @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;


    protected viewMode: number = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    protected operationType: number = OperationType.NotSet;

    private confirmationMessage: string = '';
    private filter: string = '';
    private smallPageSize: number = 5;
    private largePageSize: number = 10;
    private reportType: string = 'ALL';

    private notIdentifiedFilter: string = '';
    private conditionType: string = 'AND';
    private wordCount: number = 0;
    private wordMinLength: number = 3;
    private letterCount: number = 0;

    private selectedInventoryInvComp: InventoryInvCompDetail = null;
    private selectedInvCompNotIdentified: InvCompDetail = null;

    private selectedDepartment: Department = null;
    private selectedEmployee: Employee = null;
    private selectedLocation: Location = null;
    private selectedRoom: Room = null;

    private pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    private requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();

    private selectedEmployees: Array<Employee> = new Array<Employee>();
    private requestEmployeeRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestEmployeeSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    private updateEmployeeSelectionEvent: EventEmitter<Array<Employee>> = new EventEmitter<Array<Employee>>();

    private selectedLocations: Array<Location> = new Array<Location>();
    private requestLocationRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestLocationSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    private updateLocationSelectionEvent: EventEmitter<Array<Location>> = new EventEmitter<Array<Location>>();

    private selectedRooms: Array<Room> = new Array<Room>();
    private requestRoomRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestRoomSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    private updateRoomSelectionEvent: EventEmitter<Array<Room>> = new EventEmitter<Array<Room>>();




    private get invCompOpInvDetailListViewMode(): boolean { return this.viewMode
         === InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList; }
    private get employeeListViewMode(): boolean { return this.viewMode
        === InvCompOpInvDetailManageViewMode.EmployeeList; }
    private get locationListViewMode(): boolean { return this.viewMode
         === InvCompOpInvDetailManageViewMode.LocationList; }
    private get roomListViewMode(): boolean { return this.viewMode === InvCompOpInvDetailManageViewMode.RoomList; }
    private get notScannedViewMode(): boolean { return (this.reportType === 'NOT_SCANNED'); }
    private get allowReconciliation(): boolean { return ((this.reportType === 'NOT_SCANNED')
    && (this.selectedInventoryInvComp != null) && (this.selectedInvCompNotIdentified != null)); }

    constructor(private inventoryInvCompDetailHttpService:
                InventoryInvCompDetailHttpService, private invCompDetailHttpService: InvCompDetailHttpService,
                                                    private invCompOpHttpService: InvCompOpHttpService,
                                                    private locationHttpService: LocationHttpService,
                                                    private roomDetailHttpService: RoomDetailHttpService,
                                                    private departmentHttpService: DepartmentHttpService,
                                                    private employeeHttpService: EmployeeHttpService) {
    }

    ngAfterViewInit() {
        this.refreshInvCompOps();
    }

    private onAllMode() {
        this.reportType = 'ALL';
        this.pageSizeUpdatedEvent.emit(this.largePageSize);
        this.refreshInvCompOps();
    }

    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.Reconciliation:
                this.reconcile();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    private onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    private onInventoryInvCompSelectionChanged(inventoryInvComps: Array<InventoryInvCompDetail>) {
        this.selectedInventoryInvComp = ((inventoryInvComps != null)
        && (inventoryInvComps.length === 1)) ? inventoryInvComps[0] : null;

        this.notIdentifiedFilter = this.selectedInventoryInvComp != null ? this.selectedInventoryInvComp.name : '';
        this.refreshNotIdentified();
    }

    private onInvCompNotIdentifiedSelectionChanged(invCompDetails: Array<InvCompDetail>) {
        this.selectedInvCompNotIdentified =
        ((invCompDetails != null) && (invCompDetails.length === 1)) ? invCompDetails[0] : null;
    }

    private onNotScannedMode() {
        this.reportType = 'NOT_SCANNED';
        this.pageSizeUpdatedEvent.emit(this.smallPageSize);
        this.refreshInvCompOps();
    }

    private onScannedMode() {
        this.reportType = 'SCANNED';
        this.pageSizeUpdatedEvent.emit(this.largePageSize);
        this.refreshInvCompOps();
    }

    private onReconcile() {
        this.operationType = OperationType.Reconciliation;
        this.confirmationMessage = 'Reconciliati inregistrarile selectate?';
        this.confirmationModal.show();
    }

    private reconcile() {
        let invCompOp: InvCompOp = new InvCompOp();
        invCompOp.InventoryId = 1;
        invCompOp.InvCompId = this.selectedInvCompNotIdentified.id;
        invCompOp.ParentInvCompId = this.selectedInventoryInvComp.id;
        this.invCompOpHttpService.create(invCompOp).subscribe(() => {
            this.refreshInvCompOps();
            this.refreshNotIdentified();
        });
    }

    private updateConditionType(conditionType: string) {
        this.conditionType = conditionType;
        this.refreshNotIdentified();
    }

    private updateLetterCount(letterCount: number) {
        this.letterCount = letterCount;
        this.refreshNotIdentified();
    }

    private updateWordCount(wordCount: number) {
        this.wordCount = wordCount;
        this.refreshNotIdentified();
    }

    private updateWordMinLength(wordMinLength: number) {
        this.wordMinLength = wordMinLength;
        this.refreshNotIdentified();
    }

        /* begin department */
    private selectDepartment() {
        this.departmentList.refresh(null);
        this.departmentListModal.show();
    }

    private setSelectedDepartment() {
        let items: Array<Department> = this.departmentList.selectedItems;
        this.selectedDepartment = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.departmentListModal.hide();
    }

    /*end department */

     /*begin employee*/
    private selectEmployee() {
        this.employeeList.refresh(null);
        this.employeeListModal.show();
    }

    private setSelectedEmployee() {
        let items: Array<Employee> = this.employeeList.selectedItems;
        this.selectedEmployee = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.employeeListModal.hide();
    }
    private onSelectEmployees() {
        this.requestEmployeeRefreshEvent.emit(null);
        this.updateEmployeeSelectionEvent.emit(this.selectedEmployees);
        // this.viewMode = InvCompOpInvDetailManageViewMode.EmployeeList;
        this.employeeListModal.show();
    }

    private employeeSelectionCanceled() {
        // this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
        this.employeeListModal.hide();
    }

    private addToEmployeeSelection(employees: Array<Employee>) {
        if (employees != null) {
            employees.forEach((employee) => {
                let index: number = this.selectedEmployees.indexOf(employee);
                if (index < 0) this.selectedEmployees.push(employee);
            });

            this.checkForRefresh();
        }
    }

    private removeFromEmployeeSelection(employee: Employee) {
        let index: number = this.selectedEmployees.indexOf(employee);
        this.selectedEmployees.splice(index, 1);

        this.checkForRefresh();
    }

    private clearEmployeeSelection() {
        this.selectedEmployees = new Array<Employee>();

        this.checkForRefresh();
    }

    private updateEmployeeSelection() {
        this.requestEmployeeSelectionEvent.emit(null);
        // this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
        this.employeeListModal.hide();
    }
    /*end employee*/


    /* begin location */
    private selectLocation() {
        this.locationList.refresh(null);
        this.locationListModal.show();
    }

    private setSelectedLocation() {
        let items: Array<Location> = this.locationList.selectedItems;
        this.selectedLocation = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.locationListModal.hide();
    }
    /*end location */

    /*begin room*/
    private selectRooms() {
        this.requestRoomRefreshEvent.emit(null);
        this.updateRoomSelectionEvent.emit(this.selectedRooms);
        this.viewMode = InvCompOpInvDetailManageViewMode.RoomList;
    }

    private roomSelectionCanceled() {
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }

    private addToRoomSelection(rooms: Array<Room>) {
        if (rooms != null) {
            rooms.forEach((room) => {
                let index: number = this.selectedRooms.indexOf(room);
                if (index < 0) this.selectedRooms.push(room);
            });

            this.checkForRefresh();
        }
    }

    private removeFromRoomSelection(room: Room) {
        let index: number = this.selectedRooms.indexOf(room);
        this.selectedRooms.splice(index, 1);

        this.checkForRefresh();
    }

    private clearRoomSelection() {
        this.selectedRooms = new Array<Room>();

        this.checkForRefresh();
    }

    private updateRoomSelection() {
        this.requestRoomSelectionEvent.emit(null);
        this.viewMode = InvCompOpInvDetailManageViewMode.InvCompOpInvDetailList;
    }
    /*end room*/

    private checkForRefresh() {
        this.refreshInvCompOps();
    }

    private refreshInvCompOps() {
        let params: Array<Param> = this.getFilters();
        this.requestInvCompOpRefreshEvent.emit(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();

        let departmentIds: Array<number> = new Array<number>();
        let employeeIds: Array<number> = new Array<number>();
        let locationIds: Array<number> = new Array<number>();
        let roomIds: Array<number> = new Array<number>();

        // if (this.selectedDepartments != null) {
        //     this.selectedDepartments.forEach((department) => {
        //         departmentIds.push(department.id);
        //     });
        // }

        if (this.selectedEmployees != null) {
            this.selectedEmployees.forEach((employee) => {
                employeeIds.push(employee.id);
            });
        }

        if (this.selectedLocations != null) {
            this.selectedLocations.forEach((location) => {
                locationIds.push(location.id);
            });
        }

        if (this.selectedRooms != null) {
            this.selectedRooms.forEach((room) => {
                roomIds.push(room.id);
            });
        }

        params.push(new Param('departmentIds', JSON.stringify(departmentIds)));
        params.push(new Param('employeeIds', JSON.stringify(employeeIds)));
        params.push(new Param('locationIds', JSON.stringify(locationIds)));
        params.push(new Param('roomIds', JSON.stringify(roomIds)));
        params.push(new Param('filter', this.filter));
        params.push(new Param('reportType', this.reportType));

        return params;
    }

    private refreshNotIdentified() {
        let params: Array<Param> = this.getNotIdentifiedFilters();
        this.requestInvCompDetailRefreshEvent.emit(params);
    }

    private getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
        let result: Array<string> = new Array<string>();
        let filters: string[] = null;

        filter = filter.replace('-', ' ').replace('+', ' ')
        .replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ');
        while (filter.includes('  ')) filter = filter.replace('  ', ' ');
        filters = filter.split(' ');

        // console.log('filters: ' + JSON.stringify(filters));

        filters.forEach((f) => {
            if ((f.length >= wordMinLength) && ((wordCount <= 0) || (result.length < wordCount))) {
                result.push(letterCount > 0 ? (f.length <= letterCount ? f : f.substring(0, letterCount)) : f);
            }
        });

        return result;
    }

    private getNotIdentifiedFilters(): Array<Param> {
        let params = new Array<Param>();
        let filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount,
        this.letterCount, this.wordMinLength);
        //console.log(JSON.stringify(filters));

        params.push(new Param('inventoryId', JSON.stringify(1)));
        //  params.push(new Param("filter", this.notIdentifiedFilter.replace("-", " ")
        // .replace("+", " ").replace(".", " ").replace(",", " ").replace("/", " ").replace("\\", " ")));
        params.push(new Param('filters', JSON.stringify(filters)));
        // params.push(new Param("wordCount", JSON.stringify(this.wordCount)));
	    // params.push(new Param("letterCount", JSON.stringify(this.letterCount)));
        params.push(new Param('conditionType', this.conditionType));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = this.getFilters();

        this.inventoryInvCompDetailHttpService.get(1, 1000000, 'id', 'asc', params, null).subscribe(
            (assetInvDetails) => {

                let options = {
                    sheetid: 'inventariere',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                // locationNameIni as [Cladire initiala],
                // roomNameIni as [Camera initiala],
                // internalCodeIni as [Marca initiala],
                // firstNameIni as [Prenume initial],
                // lastNameIni as [Nume initial],
                // locationNameFin as [Cladire finala],

                // locationNameFin as [Locatie finala],

                // locationNameFin as [Cladir finala],

                // roomNameFin as [Camera finala],
                // internalCodeFin as [Marca finala],
                // firstNameFin as [Prenume final],
                // lastNameFin as [Nume final]

                alasql.promise(`SELECT top 10 id as [Id], 
                                    code as [Numar inventar], 
                                    name as [Denumire], 
                                    locationNameFin as [Cladire],
                                    roomNameFin as [Camera],
                                    internalCodeFin as [Marca],
                                    firstNameFin as [Prenume],
                                    lastNameFin as [Nume]
                                    INTO XLSX("inventariere.xlsx",?) FROM ?`, [ options, assetInvDetails ]);

            });
    }
}

    // id: number;
    // code: string;
    // name: string;

    // locationNameFin: string;
    // roomNameFin: string;
    // internalCodeFin: string;
    // firstNameFin: string;
    // lastNameFin: string;

    // sN: string;
    // producer: string;
    // model: string;


enum InvCompOpInvDetailManageViewMode {
    InvCompOpInvDetailList = 1,
    DepartmentList = 2,
    EmployeeList = 3,
    LocationList = 4,
    RoomList = 6
}

enum OperationType {
    NotSet = 1,
    Reconciliation = 2
}
