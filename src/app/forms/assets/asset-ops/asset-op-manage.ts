import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';
import { RoomDetailHttpService } from './../../../services/http/administration/room-detail.http.service';
import { LocationHttpService } from 'app/services/http/administration/location.http.service';
import { RoomList } from 'app/forms/administration/rooms/room.list';
import { LocationList } from 'app/forms/administration/locations/location.list';
import { AssetFilter } from 'app/model/api/assets/asset.filter';
import { RegionHttpService } from './../../../services/http/administration/region.http.service';
import { RegionList } from './../../administration/regions/region.list';
import { Region } from './../../../model/api/administration/region';
import { AssetOpDetailList } from './asset-op.detail.list';
import { AssetOpHttpService } from './../../../services/http/assets/asset-op.http.service';
import { Component, EventEmitter, ViewChild, ElementRef, Output } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Param } from '../../../model/common/param';
import { SelectionResult } from '../../../model/common/selection-result';
import { AppConfig } from 'app/config';
import { AppData } from 'app/app-data';
import { AssetSimpleDetail } from 'app/model/api/assets/asset-simple-detail';
import { AssetOpSimpleDetailMemoryService } from 'app/services/memory/asset-op-simple-detail.memory.service';
import { AssetOpSd } from 'app/model/api/assets/asset-op-sd';
import { AssetInvDetailHttpService } from 'app/services/http/assets/asset-inv-detail.http.service';
import { PagedResult } from 'app/model/common/paged-result';
import { AssetInvDetail } from 'app/model/api/assets/asset-inv-detail';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetClass } from 'app/model/api/assets/asset-class';
import { Partner } from 'app/model/api/documents/partner';
import { CostCenter } from 'app/model/api/administration/cost-center';
import { Department } from 'app/model/api/administration/department';
import { Employee } from 'app/model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from 'app/model/api/administration/room';
import { AccMonth } from 'app/model/api/accounting/acc-month';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { DocumentUpload } from 'app/model/api/documents/document-upload';
import { DocumentHttpService } from 'app/services/http/documents/document.http.service';
import { Document } from 'app/model/api/documents/document';
import { AssetOp } from 'app/model/api/assets/asset-op';
import { AssetOpConf } from 'app/model/common/import/asset-op-conf';
import { AssetOpExport } from 'app/model/api/assets/asset-op-export';
import { AssetOpConfirm } from 'app/model/api/assets/asset-op-confirm';
import { AssetDepDetail } from 'app/model/api/assets/asset-dep-detail';
import { saveAs as fileSaveAs } from 'file-saver';
import { AssetOpExportOtp } from 'app/model/api/assets/asset-op-exportOtp';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { AdmCenterList } from 'app/forms/administration/adm-centers/adm-center.list';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import * as decode from 'jwt-decode';

@Component({
    selector: 'asset-op-manage',
    templateUrl: 'asset-op-manage.html',
    styleUrls: ['asset-op-manage.scss'],
    providers: [
        AssetOpSimpleDetailMemoryService,
        AssetOpHttpService,
        AssetInvDetailHttpService,
        RegionHttpService,
        LocationHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        AdmCenterHttpService ]
})
export class AssetOpManage  {

    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('importDataModal') private importDataModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @Output() protected uploadFinished = new EventEmitter<void>();
    @ViewChild('fileInput') fileInput: ElementRef;

    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    private selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    private selectedPartners: Array<Partner> = new Array<Partner>();
    private selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    private selectedDepartments: Array<Department> = new Array<Department>();
    private selectedEmployees: Array<Employee> = new Array<Employee>();
    private selectedLocations: Array<Location> = new Array<Location>();
    private selectedRooms: Array<Room> = new Array<Room>();
    private selectedAccMonth: AccMonth = null;
    private selectedAssetOps: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    private selectedRegions: Array<Region> = new Array<Region>();
    private selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();

    private companyName: string = AppConfig.COMPANY_NAME;
    private assetId: number = 0;
    private selectedAssetOp: any;
    private transferStartDate: Date;
    private transferEndDate: Date;
    filterStartDate = '';
    filterEndDate = '';
    private filter: string;
    private filterPO: string = '';;
    // private assetOpState: string = '-';
    private assetOpState: string = 'All';
    private custody: string = '-';


    private importLines: Array<AssetOpConf> = new Array<AssetOpConf>();
    private selectedAssetOpIds: Array<number> = new Array<number>();
    private importIndex: number = 0;
    private fileEvent: any = null;

    private operationType: OperationType = OperationType.NotSet;
    private confirmationMessage: string = '';
    private documentTypeCode: string = 'TRANSFER';
    private assetRowSelection: string = 'multiple';
    private showRegionDetails: boolean= AppConfig.SHOW_REGION_DETAILS;
    private showLocationDetails: boolean= AppConfig.SHOW_LOCATION_DETAILS;
    private showRoomsDetails: boolean= AppConfig.SHOW_ROOMS_DETAILS;
    private showEmployeesDetails: boolean= AppConfig.SHOW_EMPLOYEE_DETAILS;
    private useExportOTP: boolean= AppConfig.USE_EXPORT_OTP;
    private get isAdmin(): boolean { return AppData.UserIsAdmin; }

    private fromdate: DateModel;
    private from = '';
    private todate: DateModel;
    private to = '';

    private options: DatePickerOptions = {
    format: 'MM-DD-YYYY',
    todayText: 'Oggi',
    style: 'big'
  };


    constructor(private route: ActivatedRoute,
                private router: Router,
                private assetOpHttpService: AssetOpHttpService,
                private assetInvDetailHttpService: AssetInvDetailHttpService,
                private regionHttpService: RegionHttpService,
                private admCenterHttpService: AdmCenterHttpService,
                private locationHttpService: LocationHttpService,
                private roomDetailHttpService: RoomDetailHttpService,
                private employeeHttpService: EmployeeHttpService,
                private documentHttpService: DocumentHttpService)
                { this.options = new DatePickerOptions(); }

    ngAfterViewInit() {
        this.clearFilters();
        this.refreshAssetOperations();
    }

    private onChangeFrom(event) {
        this.from = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    private onChangeTo(event) {
        this.to = JSON.stringify(event.formatted);
        this.refreshAssetOperations();
    }

    private onAssetOpDetailListSelectionChanged(assetOpSimpleDetails: Array<AssetOp>) {

        this.selectedAssetOp = assetOpSimpleDetails != null && assetOpSimpleDetails.length === 1
            ? assetOpSimpleDetails[0] : null;
    }

    private refreshAssetOperations() {
        let params: Array<Param> = this.getFilters();
        this.assetOpList.refresh(params);
    }

    private showAssetDetail($event, selectedItem: any){
       selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.asset.id])
       : alert('Va rugam selectati cel putin o operatie!'); return;
    }


    private getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: AssetFilter = new AssetFilter();


        let assetStateOpIds: Array<number> = new Array<number>();

        let startDate: Date;
        let endDate: Date;
        let userId: number;



        if (this.selectedRegions != null) {
            assetFilter.regionIds = new Array<number>();
            this.selectedRegions.forEach((region) => {
                assetFilter.regionIds.push(region.id);
            });
        }

        if (this.selectedAdmCenters != null) {
            assetFilter.admCenterIds = new Array<number>();
            this.selectedAdmCenters.forEach((admCenter) => {
                assetFilter.admCenterIds.push(admCenter.id);
            });
        }

        if (this.selectedLocations != null) {
            assetFilter.locationIds = new Array<number>();
            this.selectedLocations.forEach((location) => {
                assetFilter.locationIds.push(location.id);
            });
        }

        if (this.selectedRooms != null) {
            assetFilter.roomIds = new Array<number>();
            this.selectedRooms.forEach((room) => {
                assetFilter.roomIds.push(room.id);
            });
        }

        if (this.selectedEmployees != null) {
            assetFilter.employeeIds = new Array<number>();
            this.selectedEmployees.forEach((employee) => {
                assetFilter.employeeIds.push(employee.id);
            });
        }



        // params.push(new Param('assetOpState', ((this.assetOpState === '-') ? 'null' :
        // (this.assetOpState === 'DSTCONF' ? 'DSTCONF' : (this.assetOpState === 'REGISTERCONF') ? 'REGISTERCONF' :
        //  (this.assetOpState === 'RELEASECONF') ? 'RELEASECONF' :
        //   (this.assetOpState === 'SRCCONF') ? 'SRCCONF' :  ''))));
        assetFilter.filter = this.filter;
        assetFilter.filterPO = this.filterPO;
        assetFilter.fromDate = new Date(this.from);
        assetFilter.toDate = new Date(this.to);
        params.push(new Param('documentTypeCode', this.documentTypeCode));
        params.push(new Param('assetOpState', this.assetOpState === '-' ? null : this.assetOpState));
        params.push(new Param('startDate', this.transferStartDate ? this.transferStartDate.toDateString() : ''));
        params.push(new Param('endDate', this.transferEndDate ? this.transferEndDate.toDateString() : ''));
        // params.push(new Param('startDate', this.from ? new Date(this.from).toString() : ''));
        // params.push(new Param('endDate', this.to ? new Date(this.from).toString() : ''));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));

        return params;
    }

    private checkForRefresh() {
        this.refreshAssetOperations();
    }

    private onStateUpdate(assetOpState: string) {
        this.assetOpState = assetOpState;
        this.checkForRefresh();
    }

    private onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Validati transferurile selectate?';
        this.confirmationModal.show();
    }

    private processAssetOp() {
        this.assetOpList.selectedItems.forEach( item => {
            if (this.selectedAssetOpIds.indexOf(item)  === -1){
                this.selectedAssetOpIds.push(item.id);
            }
        });

        this.assetOpHttpService.process(this.selectedAssetOpIds).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }
    // private sendEmail() {
    //     this.assetOpHttpService.sendEmail().subscribe((data) => {

    //     });
    // }
    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.ProcessAssetOp:
                this.processAssetOp();
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

    private clearFilters() {

      //  this.assetOpState = '-';
        this.transferStartDate = undefined;
        this.transferEndDate = undefined;

        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.filter = '';
        this.filterPO = '';
        this.options.clearText ;
        this.options.maxDate = null;
        this.selectedAssetOpIds = [];
        this.assetOpList.selectedItems = [];
        this.checkForRefresh();
    }

    private changeRowSelection() {
        if (this.assetRowSelection === 'single') {
            this.assetRowSelection = 'multiple';
        }
        else {
             this.selectedAssetOp = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRowSelection = 'single';
        }
    }

     /* begin region */

     private selectRegions() {
        this.regionListModal.show();
        this.regionList.selectedItems = this.selectedRegions;
        this.regionList.refresh(null);
    }

    private removeFromRegionSelection(region: Region) {
        let index: number = this.selectedRegions.indexOf(region);
        this.selectedRegions.splice(index, 1);
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

    /* enf Region */

      /* begin admCenter */

      private selectAdmCenters() {
        this.admCenterListModal.show();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    private removeFromAdmCenterSelection(admCenter: AdmCenter) {
        let index: number = this.selectedAdmCenters.indexOf(admCenter);
        this.selectedAdmCenters.splice(index, 1);
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

    /* enf Region */

    /* begin location */

    private selectLocations() {
        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(null);
    }

    private removeFromLocationSelection(location: Location) {
        let index: number = this.selectedLocations.indexOf(location);
        this.selectedLocations.splice(index, 1);
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

    /* enf location */

   /* begin room */

    private selectRooms() {
        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(null);
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

    private setSelectedRooms() {
        this.selectedRooms = this.roomList.selectedItems;
        this.roomListModal.hide();
        this.checkForRefresh();
    }

    /* enf room */

     /* begin employee */

     private selectEmployees() {
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(null);
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

    private setSelectedEmployees() {
        this.selectedEmployees = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

    private showReport() {
        let reportType: string = '';
        let validReport: boolean = false;

        const token = localStorage.getItem('id_token');
        const tokenPayload = decode(token);
        const userId = tokenPayload.sub;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch(this.selectedAssetOp.documentType.code) {
                case AppConfig.DOCUMENT_TYPE_TRANSFER:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_CASS:
                    reportType = 'annulement';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_INVENTORY:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                case AppConfig.DOCUMENT_TYPE_ALL:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                //     reportType = 'cassation';
                //     validReport = true;
                //     break;
                case AppConfig.DOCUMENT_TYPE_TRANSFER_EMPLOYEE:
                    reportType = 'movementproviding';
                    validReport = true;
                    break;
                // case AppConfig.DOCUMENT_TYPE_TRANSFER_ROOM:
                //     reportType = 'movementproviding';
                //     validReport = true;
                //     break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}&reportId=${userId}`);
                }else{
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    private showReportCassation() {
        let reportType: string = '';
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            //  switch(this.selectedAssetOp.documentTypeCode) {
                switch (this.selectedAssetOp.documentType.code) {

                case AppConfig.DOCUMENT_TYPE_STATE_CHANGE:
                    reportType = 'scrab';
                    validReport = true;
                    break;
                default:
                    break;
            }

            if (validReport) {
                // window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
               console.log(this.selectedAssetOp);
                if (AppConfig.DOCUMENT_TYPE_INVENTORY) {
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}&assetOpId=${this.selectedAssetOp.id}`);
                }else{
                    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
                }
            }
        }
    }

    private deleteOperation(){
        if(confirm('Esti sigur ca vrei sa anulezi transferul?')){
            this.assetOpHttpService.deleteAssetOp(this.selectedAssetOp.id).subscribe((res) => {});
            this.checkForRefresh();
        }
}

private validateOperationTemp(){
    console.log(this.selectedAssetOp);
    if(this.selectedAssetOp.documentType.id != 11){
        alert('Please select a temporary transfer!');
    }else{
        if(confirm('Are you sure you want to validate the temporary transfer?')){
            this.assetOpHttpService.validateAssetOpTemp(this.selectedAssetOp.id).subscribe(() => {});
            this.checkForRefresh();
        }
    }
}

    private assetOpListExport() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExport> = new Array<AssetOpExport>();

        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'nota_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExport = new AssetOpExport();
                    let index = item.asset.invNo.indexOf('/');
                    assetOpExport.assetinvNo1 = item.asset.invNo.substring(0, index);
                    assetOpExport.assetinvNo2 = item.asset.invNo.substring(index + 1);
                    assetOpExport.costCenterCode = item.roomFinal.code;
                    assetOpExport.costCenterName = item.locationFinal.code.substring(0, 4);
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.modifiedAt = item.modifiedAt;
                    items.push(assetOpExport);

                    this.assetOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                // console.log('Export Atlas', items);

                // alasql('SELECT  3 as [Property Type],[Asset Seq A], asset->invNo  as [Asset Seq No N],0 as [Asset Component], roomFinal->code as [Cost Center],[General Category],[Category],[Sub Category], SUBSTRING(locationFinal->code, 1, 4) as [Branch], asset->quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' + 
                // alasql('SELECT 3 as [Property Type], ' ' as [Asset Seq A], assetinvNo1 as [Asset Seq No N], assetinvNo2 as [Asset Component], costCenterCode as [Cost Center], [General Category], [Category], [Sub Category], costCenterName as [Branch], quantity as [Quantity] INTO XLSX('nota_transfer.xlsx',?) FROM ?   ' ,
                  //               [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql('SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?'
    //                         , [ options, alaData ]);

            });
    }

    private assetOpListExportOtp() {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpExportOtp> = new Array<AssetOpExportOtp>();

        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                // console.log(result.items);

                let options = {
                    sheetid: 'Transferuri',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                result.items.forEach((item: any) => {
                    let assetOpExport: AssetOpExportOtp = new AssetOpExportOtp();

                    assetOpExport.documentType = item.documentType.name;
                    assetOpExport.assetName = item.asset.name;
                    assetOpExport.assetinvNo = item.asset.invNo;
                    assetOpExport.quantity = item.asset.quantity;
                    assetOpExport.assetValueInv = item.asset.valueInv;
                    assetOpExport.costCenterCodeInitial = item.roomInitial.code;
                    assetOpExport.costCenterNameInitial = item.roomInitial.name;
                    assetOpExport.costCenterCodeFinal = item.roomFinal.code;
                    assetOpExport.costCenterNameFinal = item.roomFinal.name;
                    items.push(assetOpExport);

                    this.assetOpHttpService.exportAssetOps(item.id).subscribe((data) => {
                    });
                });

                alasql(`SELECT 
                                documentType as [Tip Operatie], 
                                assetName as [Denumirea mijlocului fix si caracteristici tehnice], 
                                assetinvNo as [Numarul de inventar], 
                                CAST([quantity] AS NUMBER) as [Buc.], 
                                CAST([assetValueInv] AS NUMBER) as [Valoarea de inventar], 
                                costCenterCodeInitial as [Cod Centru de cost predator], 
                                costCenterNameInitial as [Denumire centru de cost predator], 
                                costCenterCodeFinal as [Cod Centru de cost primitor], 
                                costCenterNameFinal as [Centru de cost primitor]
                                INTO XLSX('Transferuri.xlsx',?) FROM ?   ` ,
                                 [ options, items ]);

                this.refreshAssetOperations();

    // console.log(JSON.stringify(assetInvDetails.items));

    // let alaData: Array<any> = new Array<any>();
    // assetInvDetails.items.forEach((item: any) => {
    //     let alaItem: any = {};
    //     alaItem.costCenterName = item.costCenterFinal.name;
    //     alaData.push(alaItem);
    // })

    // alasql('SELECT [costCenterName] as [Cost Center] INTO XLSX('template Transfer1.xlsx',?) FROM ?'
    //                         , [ options, alaData ]);

            });
    }


    private openMail(){
        // var atach= '';
        // document.querySelector('#openMail').addEventListener('change', function(){
        //     var reader = new FileReader();
        //     reader.onload = function(){
        //         var arrayBuffer = this.result;
        //       console.log('BUFFER: ',arrayBuffer);
        //         document.querySelector('#openMail').innerHTML = arrayBuffer + '  '+arrayBuffer.byteLength;
        //         }
        //     this.atach= reader.readAsArrayBuffer(this.files[0]);
        //   }, false);

          var subject = 'Transferuri pentru confirmare';
          var message='';
          var message1 = 'Va rugam sa deschideti fisierul atasat.';
          var message2 = 'Verificati daca ati receptionat toate obiectele trimise si confirmati cu DA / NU.';
          var message3 = ' Salvati fisierul si trimiteti forward catre mijloacefixe@piraeusbank.ro';
          var attach='D:\\demo.xslx';
          // window.open('mailto:someone@somewhere.com?Subject=hello?Body='+ atach,'email');
          if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {
        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    items.push(assetOpConfirm);
                });

                // alasql('SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' + 
                //                 this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
                //             + this.transferEndDate + '')'
                //             , [ options, assetOp.items ]);
                // alasql('SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ', 
                //     [ options, items ]);
                //setTimeout(5000);
              //  this.assetOpHttpService.downloadMailOps(items).subscribe((data) => {  // PIRAEUS
                this.assetOpHttpService.downloadMailOpsBnr(items).subscribe((data) => {  // BNR
                    });
                  //  setTimeout(5000);
                    this.assetOpHttpService
                  //  .download()  PIRAEUS
                    .downloadBnr() // BNR
                    .subscribe((blob) => {
                        // this.downloadFinished.emit(null);
                        // console.log(JSON.stringify(res));
                        // console.log('download finished!');
                        //this.downloadFile(res);
                        fileSaveAs(blob);
                    });
            });

            location.href = 'mailto:?subject=' + subject+'&body='+message1
            + '%0D%0A' + message2 + '%0D%0A' + message3 + '&Attached=' + attach;
        }

    }

    private sendMail(): void{
          if(confirm('Esti sigur ca vrei sa exporti cu operatiile selectate?')) {
            console.log(this.selectedLocations);
            let locationId: number = this.selectedLocations.length > 0 ? this.selectedLocations[0].id : null;
             locationId == null ? locationId = 0 : locationId;
                let url = `${AppConfig.reportingServer}Report.aspx/?report=assetoperations&locationId=${locationId}&reportType=ASSETOPERATIONS`;
                 window.open(url);
        }
    }

    private assetOpListConfirm() {

        if(confirm('Esti sigur ca vrei sa trimiti mail cu operatiile selectate?')) {

        let params: Array<Param> = this.getFilters();
        let items: Array<AssetOpConfirm> = new Array<AssetOpConfirm>();
        console.log(params);
        this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
            (result: PagedResult<any>) => {

                let options = {
                    sheetid: 'aviz_transfer',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let index: number = 0;
                result.items.forEach((item: any) => {
                    let assetOpConfirm: AssetOpConfirm = new AssetOpConfirm();
                    index++;
                    assetOpConfirm.index = index;
                    assetOpConfirm.assetOpId = item.id;
                    assetOpConfirm.invNo = item.asset.invNo;
                    assetOpConfirm.assetName = item.asset.name;
                    assetOpConfirm.roomCodeIni = item.roomInitial.code;
                    assetOpConfirm.locationCodeIni = item.locationInitial.name;
                    assetOpConfirm.roomCodeFin = item.roomFinal.code;
                    assetOpConfirm.locationCodeFin = item.locationFinal.name;
                    assetOpConfirm.assetTypeName = item.assetType.name;
                    assetOpConfirm.purchaseDate = item.asset.purchaseDate;
                    assetOpConfirm.serialNumber = item.asset.serialNumber;
                    assetOpConfirm.quantity = item.asset.quantity;
                    assetOpConfirm.valueInv = item.asset.valueInv;
                    assetOpConfirm.employeeInternalCodeInitial = item.employeeInitial.internalCode;
                    assetOpConfirm.employeeInternalCodeFinal = item.employeeFinal.internalCode;
                    assetOpConfirm.employeeFirstNameInitial = item.employeeInitial.firstName;
                    assetOpConfirm.employeeFirstNameFinal = item.employeeFinal.firstName;
                    assetOpConfirm.employeeLastNameInitial = item.employeeInitial.lastName;
                    assetOpConfirm.employeeLastNameFinal = item.employeeFinal.lastName;
                    items.push(assetOpConfirm);
                });

                // alasql('SELECT id as [Nr. Crt], asset->invNo  as [Numar inventar plecare], asset->name  as [Denumire], roomInitial->code as [Centru de cost plecare], locationInitial->name as [Cladire plecare], roomFinal->code as [Centru de cost destinatie], locationFinal->name as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' + 
                //                 this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
                //             + this.transferEndDate + '')'
                //             , [ options, assetOp.items ]);
                // alasql('SELECT [index] as [Nr. Crt], assetOpId as [OptimaId],  invNo  as [Numar inventar plecare], assetName  as [Denumire], roomCodeIni as [Centru de cost plecare], locationCodeIni as [Cladire plecare], roomCodeFin as [Centru de cost destinatie], locationCodeFin as [Cladire destinatie], [Confirmat], [Numar inventar primit] INTO XLSX('aviz_transfer.xlsx',?) FROM ? ', 
                //     [ options, items ]);

               //     this.assetOpHttpService.sendEmail(items).subscribe((data) => {  // PIRAEUS
                    // this.assetOpHttpService.sendEmailBnr(items).subscribe((data) => {  // BNR
                    this.assetOpHttpService.sendEmailPiraeus(items).subscribe((data) => {  // PIRAEUS

                        });


            });

        }
    }

    private loadFile(ev) {
        this.fileEvent = ev;
    }

    private doImport() {
       
        if (this.importIndex < this.importLines.length) {
            if (this.importLines[this.importIndex].assetOpId < 1) return
            this.assetOpHttpService.upload(this.importLines[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImport();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLines = new Array<AssetOpConf>();

            this.refreshAssetOperations();
        }
    }

    private importMailOperationData() {
                console.log('FILES: ', this.fileEvent);
                if (this.fileEvent === null) return;
                // alasql.promise(`select  
                //                         [OptimaId] as AssetOpId, 
                //                         [Numar inventar plecare] as InvNo, 
                //                         [Denumire] as Name, 
                //                         [Centru de cost plecare] as CostCenterCodeInitial,
                //                         [Cladire plecare] as CostCenterNameInitial,
                //                         [Centru de cost destinatie] as CostCenterCodeFinal,
                //                         [Cladire destinatie] as CostCenterNameFinal,
                //                         [Confirmat] as Confirm

                //                     from FILE (?,  {headers: true})`, [this.fileEvent])

                alasql.promise(`select 
                                        [OptimaId] as AssetOpId, 
                                        [Inventory Number (Barcode if implemented)] as InvNo, 
                                        [Inventory Item ] as Name, 
                                        [Old cost center] as CostCenterCodeInitial,
                                        [Old User] as CostCenterNameInitial,
                                        [New cost center] as CostCenterCodeFinal,
                                        [New User] as CostCenterNameFinal,
                                        [Confirm] as Confirm
            
            from FILE (?,  {headers: true})`, [this.fileEvent])
                .then((importLines: Array<AssetOpConf>) => {

                        this.importDataModal.show();

                        this.importIndex = 0;
                        this.importLines = importLines;

                        this.doImport();
                });

            }

        private upload() {
            let fi = this.fileInput.nativeElement;
            if (fi.files && fi.files[0]) {
                let fileToUpload = fi.files[0];
                this.assetOpHttpService
                    .import(fileToUpload)
                    .subscribe(res => {
                        this.uploadFinished.emit(null);
                    });
            }
        }


    private trackByCode(index: number, tableItem: any): string {
                return tableItem.code;
        }

    // private exportTransfersCategToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetOpHttpService.get(1, 1000000, 'modifiedAt', 'desc', params, null, 'details').subscribe(
    //         (assetOp: PagedResult<any>) => {

    //                 console.log(JSON.stringify(assetOp));

    //             let options = {
    //                 sheetid: 'Template transf categorie',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql('SELECT 3 as [Property Type],[Asset Seq A],asset->invNo  as [Asset Seq No N], 0 as [Asset Component], [Cost Center], 33 as [General Category], 2 as [Category], 1 as [Sub Category], [Branch], 1 as [Quantity] INTO XLSX('template Transfer2.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('' + 
    //                         this.transferStartDate + '') AND DATE(modifiedAt) < DATE(''
    //                         + this.transferEndDate + '')'
    //                         , [ options, assetOp.items ]);

    //         });
    // }

    private exportToExcelBM() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetOpHttpService
            .exportBM(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Registru Operatii.xlsx');
    });
    }
}

enum OperationType {
    NotSet = 1,
    ProcessAssetOp = 2
}
