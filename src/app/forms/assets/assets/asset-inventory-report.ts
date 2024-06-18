import { AccMonthHttpService } from './../../../services/http/accounting/acc-month.http.service';
import { AccMonth } from './../../../model/api/accounting/acc-month';
import { TranslateService } from '@ngx-translate/core';
import { AssetClass } from './../../../model/api/assets/asset-class';
import { CostCenterHttpService } from './../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { CostCenterList } from './../../administration/cost-centers/cost-center.list';
import { AppConfig } from './../../../config';
import { DepartmentList } from './../../administration/departments/department.list';
import { RoomList } from './../../administration/rooms/room.list';
import { LocationList } from './../../administration/locations/location.list';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { EmployeeList } from './../../administration/employees/employee.list';
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

import { AssetHttpService } from "app/services/http/assets/asset.http.service";
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetInvFullDetailList } from "app/forms/assets/assets/asset-inv-full-detail.list";
import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { AppUtils } from "app/common/app.utils";
import { InventoryHttpService } from "app/services/http/inventory/inventory.http.service";
import { Inventory } from "app/model/api/inventory/inventory";
import { InventoryList } from "app/forms/inventory/inventory.list";
import { Region } from "app/model/api/administration/region";
import { RegionList } from "app/forms/administration/regions/region.list";
import { saveAs as fileSaveAs } from "file-saver";
import { DivisionList } from 'app/forms/administration/divisions/division.list';
import { Division } from 'app/model/api/administration/division';
import { DivisionHttpService } from 'app/services/http/administration/division.http.service';
import { UserReportHttpService } from 'app/services/http/common/user-reports.http.service';

@Component({
    selector: 'asset-inventory-report',
    templateUrl: 'asset-inventory-report.html',
    styleUrls: ['asset-inventory-report.scss'],
    providers: [ AdmCenterHttpService, AssetHttpService, DepartmentHttpService, InventoryHttpService, DivisionHttpService,
        LocationHttpService, RegionHttpService, RoomDetailHttpService, EmployeeHttpService, CostCenterHttpService, AccMonthHttpService ]
})
export class AssetInventoryReport {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailList;
    @ViewChild('departmentsModal') public departmentsModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('departmentList') public departmentList: DepartmentList;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterList;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionList;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    private selectedEmployee: Employee = null;
    private selectedLocation: Location = null;
    private selectedRoom: Room = null;

    private confirmationMessage: string = "";
    protected operationType: number = OperationType.NotSet;

    private filter: string = "";
    private smallPageSize: number = 5;
    private largePageSize: number = 10;

    private notIdentifiedFilter: string = "";
    private conditionType: string = "AND";
    private wordCount: number = 0;
    private wordMinLength: number = 3;
    private letterCount: number = 0;
    private reportTypeCode: string = 'ALL';
    private reportTypeName: string = 'Toate';
    private custody: string = '-';
    private showFilters: boolean = true;
    private showSearchButtoIconClass: string = 'fa fa-search-minus';
    private transferStartDate: Date;
    private transferEndDate: Date;
    private filterPurchaseDate: string;
    public isLoading: boolean = false;

    private pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    private requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();


    private selectedInventory: Inventory = null;
    private selectedDepartments: Array<Department> = new Array<Department>();
    private selectedEmployees: Array<Employee> = new Array<Employee>();
    private selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    private selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedDivisions: Array<Division> = new Array<Division>();
    private selectedRegions: Array<Region> = new Array<Region>();
    private selectedLocations: Array<Location> = new Array<Location>();
    private selectedRooms: Array<Room> = new Array<Room>();
    private months: Array<string> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    private selectedMonth: number = 0;
    private selectedYear: number = 0;
    private selectedAccMonth: AccMonth = null;

    // private get notScannedViewMode(): boolean { return (this.reportType === 'NOT_SCANNED'); }
    private get notScannedViewMode(): boolean { return false; }

    // private showDepartmentDetails: boolean = AppConfig.SHOW_DEPARTMENT_DETAILS;
    private get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    private get useCostCenter(): boolean { return AppConfig.USE_COST_CENTER; }
    private get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    private get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    private get useRegion(): boolean { return AppConfig.USE_REGION; }


    constructor(
        private assetHttpService: AssetHttpService,
        private admCenterHttpService: AdmCenterHttpService,
        private departmentHttpService: DepartmentHttpService,
        private inventoryHttpService: InventoryHttpService,
        private divisionHttpService: DivisionHttpService,
        private locationHttpService: LocationHttpService,
        private regionHttpService: RegionHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private employeeHttpService: EmployeeHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private accMonthHttpService: AccMonthHttpService,
        private userReportHttpService: UserReportHttpService,
        private translate: TranslateService) {
             translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    ngAfterViewInit() {

        let currentDate: Date = new Date();
        this.selectedMonth = currentDate.getMonth();
        this.selectedYear = currentDate.getFullYear();

        this.updateSelectedAccMonth();
        this.refreshAssets();
    }

    private reportTransferOutMultiple() {
        // if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = 'transferoutv1multiple';
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat un inventar si o regiune!');
        // }
    }

    private exportToExcelDemo() {

        let inventoryId: number = this.selectedInventory.id;
       // let location: Location = this.selectedLocations[0];
        let region: Region = this.selectedRegions.length > 0 ? this.selectedRegions[0] : this.selectedRegions[0].id = null;
        let location: Location = this.selectedLocations.length > 0 ? this.selectedLocations[0] : this.selectedLocations[0].id = null;
        let room: Room = this.selectedRooms.length > 0 ? this.selectedRooms[0] : this.selectedRooms[0].id = null;

        if (confirm(`Descarcati datele pentru Punctul de lucru:  ${region.name}?`)) {
            this.isLoading = true;

            this.assetHttpService
                .exportDemo(inventoryId , region.id, location.id, room.id)
                .subscribe((blob) => {
                    fileSaveAs(blob, this.selectedRegions[0].code + '.zip');
                    this.isLoading = false;
                });
        }
    }


    private reportInventoryListMultiple(reportTypeCode: string) {

            if(reportTypeCode === 'MINUS/PLUS' && this.selectedEmployees.length === 0)
            {
                alert('Va rugam selectati cel putin un inventar , un centru logistic, o cladire si un angajat!!');
            }else{

            let reportType: string = '';
            let inventoryId: number = this.selectedInventory.id;
            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            let url: string = '';

            if ((this.selectedEmployees != null) && (this.selectedEmployees.length > 0)) {
                reportType = 'inventorylistv3';
                let employeeId: number = this.selectedEmployees[0].id;

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
                url += `&employeeId=${employeeId}`;
            }else if (reportTypeCode === 'GROUPEMP' && this.selectedEmployees.length == 0){
                reportType = 'inventorylistv3GROUP';

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
            }
            else{
                reportType = 'inventorylistv2multiple';

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
            }

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }
            window.open(url);
            }
        return;
    }


    private reportTransferInMultiple(reportTypeCode: string) {
        // if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = 'transferinv1GROUP';
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        // }
    }

    private auditReport() {
        let params = new Array<Param>();

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '0'));
        params.push(new Param('admCenterId', this.selectedAdmCenters.length > 0  ? this.selectedAdmCenters[0].id.toString() : '0'));

        this.inventoryHttpService
            .audit(params)
            .subscribe((blob) => {
                fileSaveAs(blob, this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].name
                     + '--' + this.selectedInventory.description + '.xlsx'
                : 'AUDIT--' + this.selectedInventory.description + '.xlsx');
            });
    }

    private employeesReport(): void {
        let inventoryId: number = this.selectedInventory.id;
        let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
           let url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylistemployees&inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=INVENTORYLISTEMPLOYEES`;
            window.open(url);
          }

    private reconciliationsReport(reportFormat: string): void {
            let inventoryId: number = this.selectedInventory.id;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
            let url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylistreconciliations&inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=INVENTORYLISTRECONCILIATIONS&reportFormat=${reportFormat}`;
             window.open(url);
           }

    private userScansReport(): void {
            let inventoryId: number = this.selectedInventory.id;
            let employeeId: number = this.selectedEmployees.length > 0 ? this.selectedEmployees[0].id : null;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
            let regionId: number = this.selectedRegions.length > 0 ? this.selectedRegions[0].id : null;
            let url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylistuserscans&inventoryId=${inventoryId}&employeeId=${employeeId}&admCenterId=${regionId}&reportType=INVENTORYLISTUSERSCANS`;
             window.open(url);
           }
    
        private userBuildingScansReport(): void {
        let inventoryId: number = this.selectedInventory.id;
     //   let employeeId: number = this.selectedEmployees[0].id;
        let url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylistuserbuildingscans&inventoryId=${inventoryId}&reportType=INVENTORYLISTUSERBUILDINGSCANS`;
            window.open(url);
        }

        private inventoryReportByAdmCenter(): void {
            let inventoryId: number = this.selectedInventory.id;
            let url = `${AppConfig.urlPrefix}reporting/inventoryReportByAdmCenter?inventoryId=${inventoryId}`;
             window.open(url);
           }
    
        private sapReportCassation(): void {
            let inventoryId: number = this.selectedInventory.id;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
            let reportType: number = ReportType.Cassation;
            let url = `${AppConfig.urlPrefix}reporting/exportSAP?inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=${reportType}`;
             window.open(url);
           }
    
        private sapReportMinus(): void {
            let reportType: number = ReportType.Minus;
            let inventoryId: number = this.selectedInventory.id;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
        let url = `${AppConfig.urlPrefix}reporting/exportSAP?inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=${reportType}`;
            window.open(url);
        }
    
        private sapReportTransferAdmCenter(): void {
            let reportType: number = ReportType.AdmCenterTransfer;
            let inventoryId: number = this.selectedInventory.id;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
            let url = `${AppConfig.urlPrefix}reporting/exportSAP?inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=${reportType}`;
                window.open(url);
            }
    
        private sapReportTransfer(): void {
            let reportType: number = ReportType.Transfer;
            let inventoryId: number = this.selectedInventory.id;
            let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
            let url = `${AppConfig.urlPrefix}reporting/exportSAP?inventoryId=${inventoryId}&admCenterId=${admCenterId}&reportType=${reportType}`;
                window.open(url);
            }
    
            private sapReportTransferSN(): void {
                let inventoryId: number = this.selectedInventory.id;
                let admCenterId: number = this.selectedAdmCenters.length > 0 ? this.selectedAdmCenters[0].id : null;
                let url = `${AppConfig.urlPrefix}reporting/exportSAPSN?inventoryId=${inventoryId}&admCenterId=${admCenterId}`;
                    window.open(url);
                }

                private totalsReport(): void {
                    let inventoryId: number = this.selectedInventory.id;
               //     let url = `${AppConfig.reportingServer}Report.aspx/?report=inventorylisttotals&inventoryId=${inventoryId}&reportType=INVENTORYLISTTOTALS`;
                    let url = `${AppConfig.urlPrefix}reporting/inventorylisttotals?inventoryId=${inventoryId}`;
                     window.open(url);
                   }

    private onReportTypeUpdate(reportTypeCode: string) {
        this.reportTypeCode = reportTypeCode;

        switch(this.reportTypeCode) {
            case 'ALL':
                this.reportTypeName = 'Toate';
                break;
            case 'PLUS':
                this.reportTypeName = 'Plusuri';
                break;
            case 'MINUS':
                this.reportTypeName = 'Minusuri';
                break;
            case 'NOT_IDENTIFIED':
                this.reportTypeName = 'Plusuri etichete temporare';
                break;
            case 'TRANSFER_ROOM_SAME_LOCATION':
                this.reportTypeName = 'Transferuri in Cladire';
                break;
            case 'TRANSFER_LOCATION_SAME_ADMCENTER':
                this.reportTypeName = 'Transferuri in Regiune';
                break;
            case 'TRANSFER_LOCATION_DIFF_ADMCENTER':
                this.reportTypeName = 'Transferuri intre AssetTypes';
                break;
        }

        this.checkForRefresh();
    }

   /* begin inventory */
    private selectInventory() {
        this.inventoryListModal.show();
        this.inventoryList.selectedItems = new Array<Inventory>();
        this.inventoryList.refresh(null);
    }

    private setSelectedInventory() {
        this.selectedInventory = this.inventoryList.selectedItems != null && this.inventoryList.selectedItems.length > 0 ? this.inventoryList.selectedItems[0] : null;
        this.inventoryListModal.hide();
        this.checkForRefresh();
    }
    /* end inventory */

     /*begin costcenter*/
    private selectCostCenters() {

        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedCostCenters: Array<CostCenter> = null;

        selectedCostCenters = this.selectedCostCenters;
        selectedAdmCenters = this.selectedAdmCenters;

        let params = new Array<Param>();
        params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));

        this.costCenterListModal.show();
        this.costCenterList.selectedItems = selectedCostCenters;
        this.costCenterList.refresh(params);

    }

    private removeFromCostCenterSelection(costCenter: CostCenter) {
        let list: Array<CostCenter> = this.selectedCostCenters;
        let index: number = list.indexOf(costCenter);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearCostCenterSelection(filtersType: string) {

        this.selectedCostCenters = new Array<CostCenter>();
        this.checkForRefresh();
    }

    private setSelectedCostCenters() {
        this.selectedCostCenters = this.costCenterList.selectedItems;
        this.costCenterListModal.hide();
        this.checkForRefresh();
    }
    /*end costcenter*/

     /*begin asset type*/
     private selectDivisions() {
        this.divisionListModal.show();
        this.divisionList.selectedItems = this.selectedDivisions;
        //console.log('ASSETCLASS: ', this.assetTypeList.selectedItems);
        this.divisionList.refresh(null);
    }

    private removeFromDivisionSelection(division: Division) {
        let index: number = this.selectedDivisions.indexOf(division);
        this.selectedDivisions.splice(index, 1);
        this.checkForRefresh();
    }

    private clearDivisionSelection() {
        this.selectedDivisions = new Array<Division>();
        this.checkForRefresh();
    }

    private setSelectedDivisions() {
        this.selectedDivisions = this.divisionList.selectedItems;
        this.divisionListModal.hide();
        this.checkForRefresh();
    }

    /* end ASSET TYPE */

     /* begin employee */
    private selectEmployees() {

        let selectedCostCenters: Array<CostCenter> = null;
        let selectedEmployees: Array<Employee> = null;

        selectedCostCenters = this.selectedCostCenters;
        selectedEmployees = this.selectedEmployees;

        let params = new Array<Param>();
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)));

        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(params);
    }

    private removeFromEmployeeSelection(employee: Employee) {
        let list: Array<Employee> = this.selectedEmployees;
        let index: number = list.indexOf(employee);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearEmployeeSelection(filtersType: string) {
        this.selectedEmployees = new Array<Employee>();
        this.checkForRefresh();
    }

    private setSelectedEmployees() {

        this.selectedEmployees = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

   /* begin admCenter */
    private selectAdmCenters() {

        this.admCenterListModal.show();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    private removeFromAdmCenterSelection(admCenter: AdmCenter) {
        let list: Array<AdmCenter> = this.selectedAdmCenters;
        let index: number = list.indexOf(admCenter);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearAdmCenterSelection() {

        this.selectedAdmCenters = new Array<AdmCenter>();
        this.checkForRefresh();
    }

    private setSelectedAdmCenters() {

        this.selectedAdmCenters = this.admCenterList.selectedItems;
        this.admCenterListModal.hide();
        this.checkForRefresh();
    }
    /* end admCenter */

   /* begin region */
    private selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    private removeFromRegionSelection(region: Region) {
        let list: Array<Region> = this.selectedRegions;
        var index: number = list.indexOf(region);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearRegionSelection() {
        this.selectedRegions = new Array<Region>();
        this.checkForRefresh();
    }

    private setSelectedRegions() {

        this.selectedRegions = this.regionList.selectedItems;
        this.regionListModal.hide();
        this.checkForRefresh();
    }
    /* end region */

    /* begin location */
    private selectLocations() {

        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        let params = new Array<Param>();
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));

        this.locationListModal.show();
        this.locationList.selectedItems = selectedLocations;
        this.locationList.refresh(params);
    }

    private removeFromLocationSelection(location: Location) {
        let list: Array<Location> = this.selectedLocations;
        var index: number = list.indexOf(location);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearLocationSelection() {

        this.selectedLocations = new Array<Location>();
        this.checkForRefresh();
    }

    private setSelectedLocations() {

        this.selectedLocations = this.locationList.selectedItems;
        this.locationListModal.hide();
        this.checkForRefresh();
    }
    /* end location */

    /* begin room */
    private selectRooms() {
        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;
        let selectedRooms: Array<Room> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        selectedRooms = this.selectedRooms;

        let params = new Array<Param>();
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param("locationIds", AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = selectedRooms;
        this.roomList.refresh(params);
    }

    private removeFromRoomSelection(room: Room) {
        let list: Array<Room> = this.selectedRooms;
        var index: number = list.indexOf(room);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearRoomSelection() {
        this.selectedRooms = new Array<Room>();
        this.checkForRefresh();
    }

    private setSelectedRooms() {
        this.selectedRooms = this.roomList.selectedItems;
        this.roomListModal.hide();
        this.checkForRefresh();
    }
    /* end room */

    private onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    private onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    private checkForRefresh() {
        this.refreshAssets();
    }

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '0'));

        params.push(new Param("regionIdsFin", AppUtils.getIdsList<Region, number>(this.selectedRegions)));
        params.push(new Param("costCenterIdsFin", AppUtils.getIdsList<CostCenter, number>(this.selectedCostCenters)));
        params.push(new Param("departmentIdsFin", AppUtils.getIdsList<Department, number>(this.selectedDepartments)));
	    params.push(new Param("employeeIdsFin", AppUtils.getIdsList<Employee, number>(this.selectedEmployees)));
        params.push(new Param("admCenterIdsFin", AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCenters)));
        params.push(new Param("locationIdsFin", AppUtils.getIdsList<Location, number>(this.selectedLocations)));
        params.push(new Param("divisionIdsFin", AppUtils.getIdsList<Division, number>(this.selectedDivisions)));
        params.push(new Param("roomIdsFin", AppUtils.getIdsList<Room, number>(this.selectedRooms)));

        params.push(new Param("filter", this.filter));
        params.push(new Param("reportType", this.reportTypeCode));
        params.push(new Param("custody", ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));
        params.push(new Param("filterPurchaseDate", this.filterPurchaseDate ? this.filterPurchaseDate : 'false' ));

        return params;
    }

    private refreshNotIdentified() {
        let params: Array<Param> = this.getNotIdentifieFilters();
        this.requestInvCompDetailRefreshEvent.emit(params);
    }

    private clearFilters() {
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters= new Array<AdmCenter>();
        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedDivisions = new Array<Division>();
        this.filter = '';

        this.checkForRefresh();
    }

    private parseStartDate(dateString: string): Date {
        if (dateString) {
            this.transferStartDate = new Date(dateString);
            this.transferEndDate = new Date();
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }
    private parseEndDate(dateString: string): Date {
        if (dateString) {
            this.transferEndDate = new Date(dateString);
            this.checkForRefresh();
            return new Date(dateString);
        } else {
            return null;
        }
    }

    private exportToExcelApaNova() {

        let inventoryId: number = this.selectedInventory.id;
        let location: Location = this.selectedLocations[0];

        if (confirm(`Descarcati datele pentru Gestiune ${location.code}?`)) {
            this.isLoading = true;

            this.assetHttpService
                .exportDemo(inventoryId , location.id, null, null)
                .subscribe((blob) => {
                    fileSaveAs(blob, this.selectedLocations[0].code + '.zip');
                    this.isLoading = false;
                });
        }
    }

    private getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
        let result: Array<string> = new Array<string>();
        let filters: string[] = null;

        filter = filter.replace("-", " ").replace("+", " ").replace(".", " ").replace(",", " ").replace("/", " ").replace("\\", " ");
        while (filter.includes("  ")) filter = filter.replace("  ", " ");
        filters = filter.split(" ");

        //console.log('filters: ' + JSON.stringify(filters));

        filters.forEach((f) => {
            if ((f.length >= wordMinLength) && ((wordCount <= 0) || (result.length < wordCount))) {
                result.push(letterCount > 0 ? (f.length <= letterCount ? f : f.substring(0, letterCount)) : f);
            }
        });

        return result;
    }

    private getNotIdentifieFilters(): Array<Param> {
        let params = new Array<Param>();
        let filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount, this.letterCount, this.wordMinLength);
        //console.log(JSON.stringify(filters));

        params.push(new Param("inventoryId", JSON.stringify(1)));
        params.push(new Param("filters", JSON.stringify(filters)));
	    params.push(new Param("conditionType", this.conditionType));

        return params;
    }


    private setSelectedMonth(month: number) {
        this.selectedMonth = month;

        this.updateSelectedAccMonth();
    }

    private setSelectedYear(year: number) {
        this.selectedYear = year;

        this.updateSelectedAccMonth();
    }

    private nextMonth() {
        if (this.selectedMonth == 12) {
            this.selectedMonth = 1;
            this.selectedYear = this.selectedYear + 1;
        }
        else
        {
            this.selectedMonth = this.selectedMonth + 1;
        }

        this.updateSelectedAccMonth();
    }

    private previousMonth() {
        if (this.selectedMonth == 1) {
            this.selectedMonth = 12;
            this.selectedYear = this.selectedYear - 1;
        }
        else {
            this.selectedMonth = this.selectedMonth - 1;
        }

        this.updateSelectedAccMonth();
    }

    private updateSelectedAccMonth() {
        this.accMonthHttpService.getAccMonth(this.selectedMonth, this.selectedYear).subscribe((accMonth: AccMonth) => {
            this.selectedAccMonth = accMonth;
            this.checkForRefresh();
        });
    }


    private reportInventoryList(reportTypeCode: string) {

        // if(((this.selectedInventory != null) && (this.selectedAdmCenters.length > 0) && (this.selectedLocations.length > 0) && (this.selectedEmployees.length > 0))){
        // if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
        // if ((this.selectedInventory != null) && (this.selectedLocations != null) && (this.selectedLocations.length > 0)) {

        // if ((this.selectedInventory != null)
        //     && (
        //             ((this.selectedAdmCenters != null) && (this.selectedAdmCenters.length > 0))
        //             || ((this.selectedCostCenters != null) && (this.selectedCostCenters.length > 0))
        //             || ((this.selectedRegions != null) && (this.selectedRegions.length > 0))
        //             || ((this.selectedLocations != null) && (this.selectedLocations.length > 0))
        //     )) {


            if(reportTypeCode === 'MINUS/PLUS' && this.selectedEmployees.length === 0)
            {
                alert('Va rugam selectati cel putin un inventar , un centru logistic, o cladire si un angajat!!');
            }else{

            let reportType: string = '';
            let inventoryId: number = this.selectedInventory.id;
            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            let url: string = '';

            // url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=
            // ${regionId}&reportType=${reportTypeCode}`;

            if ((this.selectedEmployees != null) && (this.selectedEmployees.length > 0)) {
                reportType = 'inventorylistv3';
                let employeeId: number = this.selectedEmployees[0].id;

                // url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=
                // ${inventoryId}&regionId=${regionId}&reportType=${reportTypeCode}`;
                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
                url += `&employeeId=${employeeId}`;
            }else if (reportTypeCode === 'GROUPEMP'){
                reportType = 'inventorylistv3GROUP';
              //  let employeeId: number = this.selectedEmployees[0].id;

                // url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=
                // ${inventoryId}&regionId=${regionId}&reportType=${reportTypeCode}`;
                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
               // url += `&employeeId=${employeeId}`;
            }
            else{
                reportType = 'inventorylistv2';

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`;
            }

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            console.log(url);
            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si centru logistic/centru de cost/regiune/cladire!');
        //     //alert('Verificati corectitudinea filtrelor!');
        // }
        // }else{
        //     alert('Va rugam selectati cel putin un inventar , un centru logistic, o cladire si un angajat!!');
        // }

            }

        return;
    }

    private reportTransferIn(reportTypeCode: string) {
        //if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "transferinv1";
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        // }
    }

    private reportGeneral(reportTypeCode: string) {
        //if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "general";
            let inventoryId: number = this.selectedInventory.id;
            let accMonthId: number = this.selectedAccMonth.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&accMonthId=${accMonthId}&inventoryId=${inventoryId}&reportType=${reportTypeCode}`

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        // }
    }

    private reportTransferOut() {
        // if ((this.selectedInventory != null) && (this.selectedRegions != null) && (this.selectedRegions.length > 0)) {
            let reportType: string = "transferoutv1";
            let inventoryId: number = this.selectedInventory.id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}`;

            if (this.selectedAdmCenters != null && (this.selectedAdmCenters.length > 0)){
                let admCenterId: number = this.selectedAdmCenters[0].id;
                url += `&admCenterId=${admCenterId}`;
            }

            if (this.selectedCostCenters != null && (this.selectedCostCenters.length > 0)){
                let costCenterId: number = this.selectedCostCenters[0].id;
                url += `&costCenterId=${costCenterId}`;
            }

            if (this.selectedRegions != null && (this.selectedRegions.length > 0)){
                let regionId: number = this.selectedRegions[0].id;
                url += `&regionId=${regionId}`;
            }

            if (this.selectedLocations != null && (this.selectedLocations.length > 0)){
                let locationId: number = this.selectedLocations[0].id;
                url += `&locationId=${locationId}`;
            }

            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            if (custody != null)
            {
                url += `&custody=${custody}`;
            }

            window.open(url);
        // }
        // else {
        //     alert('Verificati data ati selectat un inventar si o regiune!');
        // }
    }

}

enum OperationType {
    NotSet = 1,
    Reconciliation = 2
}

enum ReportType {
    Cassation = 1,
    Minus = 2,
    Transfer = 3,
    AdmCenterTransfer = 4
}