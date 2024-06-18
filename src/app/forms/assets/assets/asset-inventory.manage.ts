import { AssetNiTransferSave } from './../../../model/api/assets/asset-ni-transfer-save';
import { TranslateService } from '@ngx-translate/core';
import { CostCenterHttpService } from './../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { CostCenterList } from './../../administration/cost-centers/cost-center.list';
import { AppConfig } from './../../../config';
import { DepartmentList } from './../../administration/departments/department.list';
import { RoomList } from './../../administration/rooms/room.list';
import { LocationList } from './../../administration/locations/location.list';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { EmployeeList } from './../../administration/employees/employee.list';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetInvFullDetailList } from 'app/forms/assets/assets/asset-inv-full-detail.list';
import { AdmCenterList } from 'app/forms/administration/adm-centers/adm-center.list';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { AppUtils } from 'app/common/app.utils';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { Inventory } from 'app/model/api/inventory/inventory';
import { InventoryList } from 'app/forms/inventory/inventory.list';
import { Region } from 'app/model/api/administration/region';
import { RegionList } from 'app/forms/administration/regions/region.list';
import { AssetNiHttpService } from 'app/services/http/assets/asset-ni.http.service';
import { AssetNiList } from 'app/forms/assets/assets/asset-ni.list';
import { AssetInvFullDetail } from 'app/model/api/assets/asset-inv-full-detail';
import { AssetNiRecoSave } from 'app/model/api/assets/asset-ni-reco-save';
import { AssetNi } from 'app/model/api/assets/asset-ni';
import { Router, NavigationEnd } from '@angular/router';
import { PagedResult } from 'app/model/common/paged-result';
import { saveAs as fileSaveAs } from 'file-saver';
import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AdministrationList } from 'app/forms/administration/administrations/administration.list';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { DivisionList } from 'app/forms/administration/divisions/division.list';
import { DivisionHttpService } from '../../../services/http/administration/division.http.service';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetTypeList } from 'app/forms/assets/asset-types/asset-type.list';
import { AssetTypeHttpService } from 'app/services/http/assets/asset-type.http.service';
import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
import { AssetCategoryHttpService } from 'app/services/http/assets/asset-category.http.service';
import { EntityFile, AssetImage } from 'app/model/api/common/entity-file';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { Uom } from 'app/model/api/assets/uom';
import { UomList } from '../uoms/uom.list';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';
import { AssetInvTempDetailList } from './asset-inv-temp-detail.list';
import { AssetInvTempDetail } from 'app/model/api/assets/asset-inv-temp-detail-list';
import { AssetTempRecoSave } from 'app/model/api/assets/asset-temp-reco-save';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { ApplicationUser } from 'app/model/api/identity/inventory-user';
import { UserList } from 'app/forms/auth/user.list';
import { IdentityService } from 'app/services/http/identity/identity.service';

@Component({
    selector: 'asset-inventory-manage',
    templateUrl: 'asset-inventory.manage.html',
    styleUrls: ['asset-inventory.manage.scss'],
    providers: [
        AdmCenterHttpService,
        AssetNiHttpService,
        AssetHttpService,
        DepartmentHttpService,
        InventoryHttpService,
        UomHttpService,
        AdministrationHttpService,
        DivisionHttpService,
        AssetTypeHttpService,
        AssetCategoryHttpService,
        EntityFileHttpService,
        LocationHttpService,
        RegionHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        InvStateHttpService,
        IdentityService,
        CostCenterHttpService ]
})
export class AssetInventoryManage {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailList;
    @ViewChild('assetInvFullDetailListTemp') public assetInvTempDetailListTemp: AssetInvTempDetailList;
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

    @ViewChild('assetNiList') public assetNiList: AssetNiList;
    @ViewChild('imageListModal') public imageListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationList;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionList;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeList;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('uomList') public uomList: UomList;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('invStateListNi') public invStateListNi: InvStateList;
    @ViewChild('invStateListNiModal') public invStateListNiModal: ModalDirective;

    @ViewChild('userList') public userList: UserList;
    @ViewChild('userListModal') public userListModal: ModalDirective;

    @ViewChild('userTempList') public userTempList: UserList;
    @ViewChild('userTempListModal') public userTempListModal: ModalDirective;


    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @Output() protected uploadFinished = new EventEmitter<void>();
    protected operationType: number = OperationType.NotSet;

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    private selectedEmployee: Employee = null;
    private selectedLocation: Location = null;
    private selectedRoom: Room = null;

    private confirmationMessage: string = '';

    private filter: string = '';
    private smallPageSize: number = 5;
    private largePageSize: number = 10;

    private notIdentifiedFilter: string = '';
    private conditionType: string = 'AND';
    private wordCount: number = 0;
    private wordMinLength: number = 3;
    private letterCount: number = 0;
    private reportTypeCode: string = 'ALL';
    private assetStateCode: string = 'ALL';
    private reportTypeName: string = 'All';
    private assetStateName: string = 'States';
    private custody: string = '-';
    private isReconcile: string = '-';
    private assetInvNos: Array<string> = new Array<string>();
    private showFilters: boolean = true;
    private showSearchButtoIconClass: string = 'fa fa-search-minus';

    private pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    // private requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    // private requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private selectedUsers: Array<ApplicationUser> = new Array<ApplicationUser>();
    private selectedUserTemps: Array<ApplicationUser> = new Array<ApplicationUser>();
    private selectedInventory: Inventory = null;
    private selectedDepartmentsFin: Array<Department> = new Array<Department>();
    private selectedEmployeesFin: Array<Employee> = new Array<Employee>();
    private selectedCostCentersFin: Array<CostCenter> = new Array<CostCenter>();
    private selectedAdmCentersFin: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedRegionsFin: Array<Region> = new Array<Region>();
    private selectedLocationsFin: Array<Location> = new Array<Location>();
    private selectedRoomsFin: Array<Room> = new Array<Room>();
    private selectedDivisionsFin: Array<Division> = new Array<Division>();
    private selectedAdministrationsFin: Array<Administration> = new Array<Administration>();
    private selectedEmployeesAll: Array<Employee> = new Array<Employee>();
    private selectedRegionsAll: Array<Region> = new Array<Region>();
    private selectedAdmCentersAll: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedLocationsAll: Array<Location> = new Array<Location>();
    private selectedRoomsAll: Array<Room> = new Array<Room>();
    private selectedDivisionsAll: Array<Division> = new Array<Division>();
    private selectedAdministrationsAll: Array<Administration> = new Array<Administration>();
    private selectedDepartmentsIni: Array<Department> = new Array<Department>();
    private selectedEmployeesIni: Array<Employee> = new Array<Employee>();
    private selectedCostCentersIni: Array<CostCenter> = new Array<CostCenter>();
    private selectedAdmCentersIni: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedRegionsIni: Array<Region> = new Array<Region>();
    private selectedLocationsIni: Array<Location> = new Array<Location>();
    private selectedRoomsIni: Array<Room> = new Array<Room>();
    private selectedDivisionsIni: Array<Division> = new Array<Division>();
    private selectedAdministrationsIni: Array<Administration> = new Array<Administration>();
    private selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    private selectedUoms: Array<Uom> = new Array<Uom>();
    private selectedDepartmentsNi: Array<Department> = new Array<Department>();
    private selectedEmployeesNi: Array<Employee> = new Array<Employee>();
    private selectedCostCentersNi: Array<CostCenter> = new Array<CostCenter>();
    private selectedAdmCentersNi: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedRegionsNi: Array<Region> = new Array<Region>();
    private selectedLocationsNi: Array<Location> = new Array<Location>();
    private selectedRoomsNi: Array<Room> = new Array<Room>();

    private selectedInvStatesIni: Array<InvState> = new Array<InvState>();
    private selectedInvStatesAll: Array<InvState> = new Array<InvState>();
    private selectedInvStatesFin: Array<InvState> = new Array<InvState>();
    private selectedInvStatesNi: Array<InvState> = new Array<InvState>();
    // private selectedDivisionsNi: Array<Division> = new Array<Division>();
    private selectedAsset: AssetInvFullDetail = null;
    private selectedAssetTemp: AssetInvTempDetail = null;
    private selectedAssetNi: AssetNi = null;

    private filtersType: string = '';

    private get notScannedViewMode(): boolean { return (this.reportTypeCode === 'NOT_SCANNED'); }
    // private get notScannedViewMode(): boolean { return false; }
    private get allowReconciliation(): boolean { return ((this.reportTypeCode === 'NOT_SCANNED') && (this.selectedAsset != null) && (this.selectedAssetTemp != null)); }
    // private get allowReconciliation(): boolean { return false; }
    private get showFinalFilters(): boolean { return (this.reportTypeCode !== 'NOT_SCANNED'); }

    // private showDepartmentDetails: boolean = AppConfig.SHOW_DEPARTMENT_DETAILS;
    private get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    private get useCostCenter(): boolean { return AppConfig.USE_COST_CENTER; }
    private get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    private get useRegion(): boolean { return AppConfig.USE_REGION; }
    private get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    private get useRoom(): boolean { return AppConfig.USE_ROOM; }
    private get useAdministration(): boolean { return AppConfig.USE_ADMINISTRATION; }
    private get useAssetType(): boolean { return AppConfig.USE_ASSETTYPE; }
    private get useAssetCategory(): boolean { return AppConfig.USE_ASSETCATEGORY; }
    private useAssetStates: boolean= AppConfig.USE_ASSET_STATE;
    private fileEvent: any = null;



    constructor(
        private router: Router,
        private assetHttpService: AssetHttpService,
        private assetNiHttpService: AssetNiHttpService,
        private administrationDetailHttpService: AdministrationHttpService,
        private assetTypeHttpService: AssetTypeHttpService,
        private assetCategoryHttpService: AssetCategoryHttpService,
        private entityFileHttpService: EntityFileHttpService,
        private uomHttpService: UomHttpService,
        private admCenterHttpService: AdmCenterHttpService,
        private departmentHttpService: DepartmentHttpService,
        private inventoryHttpService: InventoryHttpService,
        private divisionHttpService: DivisionHttpService,
        private locationHttpService: LocationHttpService,
        private regionHttpService: RegionHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private employeeHttpService: EmployeeHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private invStateHttpService: InvStateHttpService,
        private identityHttpService: IdentityService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private translate: TranslateService) {
             translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
             // console.log('constructor');

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                if (evt.urlAfterRedirects === '/inventory/filter') {
                    this.refreshAssets();
                }
            }
        });
    }

    ngAfterViewInit() {
        // this.refreshAssets();
        // console.log('ngAfterViewInit');
    }

    ngOnInit() {
        // console.log('ngOnInit');
    }

    // private onAllMode() {
    //     this.reportType = 'ALL';
    //     this.pageSizeUpdatedEvent.emit(this.largePageSize);
    //     this.refreshAssets();
    // }

    private onReconcileUpdate(reco: string) {
        this.isReconcile = reco;
        this.checkForRefresh();
    }

    private showAssetDetail($event, selectedItem: any){
        selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.id])
        : alert('Va rugam selectati cel putin un numar de inventar!'); return;
     }

    private uploadAssetInv() {
        this.uploadModal.show();
    }

    private loadFile(ev) {
        this.fileEvent = ev;
    }

    private upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.assetHttpService
                .importInventory(fileToUpload)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                });
        }
    }

    private recoverTemp() {
        let inventoryId: number = this.selectedInventory.id;
        this.assetNiHttpService.recoverAssetNi(this.assetInvFullDetailList.selectedItem.id, inventoryId).subscribe((res) => {});
        this.checkForRefresh();
    }

    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.Reconciliation:
                this.reconcile();
                break;
            case OperationType.Transfer:
                this.transfer();
            break;
            case OperationType.CancelScanned:
                this.assetHttpService.deleteAssetOp(this.selectedAsset.id,
                this.inventoryList.selectedItem.id).subscribe((res) => { });
                this.checkForRefresh();
             break;
             case OperationType.RecoverTemp:
                this.recoverTemp();
                this.refreshNotIdentified();
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

    private onAssetInvFullDetailSelectionChanged(assets: Array<AssetInvFullDetail>) {
        this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;

        this.notIdentifiedFilter = this.selectedAsset != null ? this.selectedAsset.name : '';
        this.refreshNotIdentified();
    }

    private onAssetInvTempDetailTempSelectionChanged(assets: Array<AssetInvTempDetail>) {
        this.selectedAssetTemp = ((assets != null) && (assets.length === 1)) ? assets[0] : null;

        // this.notIdentifiedFilter = this.selectedAssetTemp != null ? this.selectedAssetTemp.name : '';
        // this.refreshNotIdentified();
    }

    private onAssetNiListSelectionChanged(assetsNi: Array<AssetNi>) {
        this.selectedAssetNi = ((assetsNi != null) && (assetsNi.length === 1)) ? assetsNi[0] : null;
    }

    // private onNotScannedMode() {
    //     this.reportType = 'NOT_SCANNED';
    //     this.pageSizeUpdatedEvent.emit(this.smallPageSize);
    //     this.refreshAssets();
    // }

    // private onScannedMode() {
    //     this.reportType = 'SCANNED';
    //     this.pageSizeUpdatedEvent.emit(this.largePageSize);
    //     this.refreshAssets();
    // }

    private onReconcile() {
        this.assetInvNos = new Array<string>();
        this.assetInvNos.push(this.selectedAsset.invNo + '-->'  + this.selectedAssetTemp.invNo);
        this.operationType = OperationType.Reconciliation;
        this.confirmationMessage = 'Reconciliati inregistrarile selectate?';
        this.confirmationModal.show();
    }

    private onAssetNiTransform() {
        this.operationType = OperationType.Transfer;
        this.confirmationMessage = 'Transferati temporarele selectate?';
        this.confirmationModal.show();
    }

    private onReportTypeUpdate(reportTypeCode: string) {
        this.reportTypeCode = reportTypeCode;

        switch (this.reportTypeCode) {
            case 'ALL':
                this.reportTypeName = 'All';
                break;
            case 'SCANNED':
                this.reportTypeName = 'Scanned';
                break;
            case 'NOT_SCANNED':
                this.reportTypeName = 'NotScanned';
                break;
            case 'TRANSFER_ROOM':
                this.reportTypeName = 'Transfers between Rooms';
                break;
            case 'TRANSFER_ROOM_SAME_LOCATION':
                this.reportTypeName = 'Transferuri in aceeasi Gestiune';
                break;
            case 'TRANSFER_ROOM_DIFF_LOCATION':
                this.reportTypeName = 'Transfers between Buildings';
                break;
            case 'TRANSFER_ROOM_SAME_REGION':
                this.reportTypeName = 'Transferuri in acelasi Judet';
                break;
            case 'TRANSFER_ROOM_DIFF_REGION':
                this.reportTypeName = 'Transferuri intre Company';
                break;
            case 'TRANSFER_EMPLOYEE':
                this.reportTypeName = 'Transfers between Employees';
                break;
            case 'TRANSFER_COSTCENTER':
                this.reportTypeName = 'Transferuri intre CostCenters';
                break;
            case 'TRANSFER_SAME_ADMCENTER':
                this.reportTypeName = 'Transferuri in aceasi Locatie';
                break;
            case 'TRANSFER_DIFF_ADMCENTER':
                this.reportTypeName = 'Transferuri intre AssetTypes';
                break;
            default :
                break;
        }

        this.checkForRefresh();
    }

    private onAssetStateUpdate(assetStateCode: string) {
        this.assetStateCode = assetStateCode;

        switch(this.assetStateCode) {
            // case 'ALL':
            //     this.assetStateName = 'Stare gestiune';
            //     break;
            // case 'SALE':
            //     this.assetStateName = 'Vanzare';
            //     break;
            // case 'CASSATION':
            //     this.assetStateName = 'Casare';
            //     break;
            // case 'DONATION':
            //     this.assetStateName = 'Donatie';
            //     break;
            // case 'OTHERS':
            //     this.assetStateName = 'Altele';
            //     break;


            case 'FUNC':
                this.assetStateName = 'Functional';
                break;
            case 'CASSATION_PROPOSAL':
                this.assetStateName = 'Propunere casare';
                break;
            case 'SCRIPTIC':
                this.assetStateName = 'Scriptic';
                break;
            case 'UNDEFINED':
                this.assetStateName = 'Neidentificate';
                break;
            case 'RECONCILIATION':
                this.assetStateName = 'Reconciliate';
                break; 
            case 'DELETED_UNDEFINED':
                this.assetStateName = 'Neidentificate - sterse';
                break;
            case 'NEW_OPERATION':
                this.assetStateName = 'Operatie noua';
                break;
            case 'VALIDATED_OPERATION':
                this.assetStateName = 'Operatie validata';
                break;
            case 'DELETED_OPERATION':
                this.assetStateName = 'Operatie stearsa';
                break;
            case 'ASSET':
                this.assetStateName = 'Mijloc fix';
                break;
            case 'OB':
                this.assetStateName = 'Obiect de inventar';
                break;  
            case 'CASSATION':
                this.assetStateName = 'Casate';
                break;
            case 'SALE':
                this.assetStateName = 'Vandute';
                break;
            case 'SALE_PROPOSAL':
                this.assetStateName = 'Propunere vanzare';
                break;
            case 'DONATION':
                this.assetStateName = 'Donatie';
                break;
            case 'DONATION_PROPOSAL':
                this.assetStateName = 'Propunere donare';
                break;
            case 'OUT_DAMAGE':
                this.assetStateName = 'Defect';
                break;
            case 'OUT_EOL':
                this.assetStateName = 'Uzat';
                break;
            default:
            break;
        }

        this.checkForRefresh();
    }




    private reconcile() {
        let assetTempRecoSave: AssetTempRecoSave = new AssetTempRecoSave();
        assetTempRecoSave.inventoryId = this.selectedInventory.id;
        assetTempRecoSave.assetTempId = this.selectedAssetTemp.id;
        assetTempRecoSave.assetId = this.selectedAsset.id;
        this.assetHttpService.saveReco(assetTempRecoSave).subscribe((res) => {

            if (res.statusCode === 200){
                this.toastr.success('Reconciliere finalizata cu success!');
            }else{
                this.toastr.error('Eroare reconciliere!');
            }

            this.selectedAssetTemp = null;
            this.selectedAsset = null;
            this.assetInvNos = null;

            this.checkForRefresh();
            this.refreshNotIdentified();
        }, (error) => {
            this.toastr.error('Eroare server!');
        });
    }
    private transfer() {
        let assetNiTransferSave: AssetNiTransferSave = new AssetNiTransferSave();
        assetNiTransferSave.inventoryId = this.selectedInventory.id;
        assetNiTransferSave.assetNiId = this.selectedAssetNi.id;
        this.assetNiHttpService.transfer(assetNiTransferSave).subscribe(() => {
            this.selectedAssetNi = null;
            this.selectedAsset = null;

            this.checkForRefresh();
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
    private selectCostCenters(filtersType: string) {
        this.filtersType = filtersType;

        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedCostCenters: Array<CostCenter> = null;

        if (this.filtersType === 'INI') {
            selectedCostCenters = this.selectedCostCentersIni;
            selectedAdmCenters = this.selectedAdmCentersIni;
        }
        else {
            selectedCostCenters = this.selectedCostCentersFin;
            selectedAdmCenters = this.selectedAdmCentersFin;
        }

        let params = new Array<Param>();
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));

        this.costCenterListModal.show();
        // this.costCenterList.selectedItems = this.filtersType === 'INI' ? this.selectedCostCentersIni : this.selectedCostCentersFin;
        this.costCenterList.selectedItems = selectedCostCenters;
        this.costCenterList.refresh(params);

    }

    private removeFromCostCenterSelection(filtersType: string, costCenter: CostCenter) {
        let list: Array<CostCenter> = filtersType === 'INI' ? this.selectedCostCentersIni : this.selectedCostCentersFin;
        let index: number = list.indexOf(costCenter);
        list.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearCostCenterSelection(filtersType: string) {
        if (filtersType === 'INI')
            this.selectedCostCentersIni = new Array<CostCenter>();
        else
            this.selectedCostCentersFin = new Array<CostCenter>();
        this.checkForRefresh(filtersType);
    }

    private setSelectedCostCenters() {
        if (this.filtersType === 'INI')
            this.selectedCostCentersIni = this.costCenterList.selectedItems;
        else
            this.selectedCostCentersFin = this.costCenterList.selectedItems;

        this.costCenterListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /*end costcenter*/

//     /*begin department*/
//     private selectDepartments() {
//         this.departmentListModal.show();
//         this.departmentList.selectedItems = this.selectedDepartments;
//         this.departmentList.refresh(null);
//     }

//     private removeFromDepartmentSelection(department: Department) {
//         let index: number = this.selectedDepartments.indexOf(department);
//         this.selectedDepartments.splice(index, 1);
//         this.checkForRefresh();
//     }

//     private clearDepartmentSelection() {
//         this.selectedDepartments = new Array<Department>();
//         this.checkForRefresh();
//     }

//     private setSelectedDepartments() {
//         this.selectedDepartments = this.departmentList.selectedItems;
//         this.departmentListModal.hide();
//         this.checkForRefresh();
//     }
//     /*end department*/

     /* begin employee */
     private selectEmployees(filtersType: string) {
        this.filtersType = filtersType;
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.filtersType === 'INI' ? this.selectedEmployeesIni : this.filtersType === 'ALL' ? this.selectedEmployeesAll : this.selectedEmployeesFin;
        this.employeeList.refresh(null);
    }

    private removeFromEmployeeSelection(filtersType: string, employee: Employee) {
        let list: Array<Employee> = filtersType === 'INI' ? this.selectedEmployeesIni : filtersType === 'ALL' ? this.selectedEmployeesAll : this.selectedEmployeesFin;
        let index: number = list.indexOf(employee);
        list.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearEmployeeSelection(filtersType: string) {
        if (filtersType === 'INI')
            this.selectedEmployeesIni = new Array<Employee>();
        else if  (filtersType === 'ALL')
             this.selectedEmployeesAll = new Array<Employee>();
        else
            this.selectedEmployeesFin = new Array<Employee>();
        this.checkForRefresh(filtersType);
    }

    private setSelectedEmployees() {
        if (this.filtersType === 'INI')
            this.selectedEmployeesIni = this.employeeList.selectedItems;
        else if  (this.filtersType === 'ALL')
            this.selectedEmployeesAll = this.employeeList.selectedItems;
        else
            this.selectedEmployeesFin = this.employeeList.selectedItems;

        this.employeeListModal.hide();
        this.checkForRefresh(this.filtersType);
    }

    /*end employee*/

  /* begin admcenter */
  private selectAdmCenters(filtersType: string) {
    this.filtersType = filtersType;

    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedAdmCenters = this.selectedAdmCentersIni;
            break;
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            break;
        case 'ALL':
            selectedAdmCenters = this.selectedAdmCentersAll;
            break;
        case 'NI':
            selectedAdmCenters = this.selectedAdmCentersNi;
            break;
        default:
            break;
    }


    this.admCenterListModal.show();
    this.admCenterList.selectedItems = selectedAdmCenters;
    this.admCenterList.refresh(null);
}

private removeFromAdmCenterSelection(filtersType: string, admCenter: AdmCenter) {
    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (filtersType) {
        case 'INI':
            selectedAdmCenters = this.selectedAdmCentersIni;
            break;
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            break;
        case 'ALL':
            selectedAdmCenters = this.selectedAdmCentersAll;
                break;
        case 'NI':
            selectedAdmCenters = this.selectedAdmCentersNi;
            break;
        default:
            break;
    }
    let index: number = selectedAdmCenters.indexOf(admCenter);
    selectedAdmCenters.splice(index, 1);
    this.checkForRefresh(filtersType);
}

private clearAdmCenterSelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedAdmCentersIni = new Array<AdmCenter>();
            break;
        case 'FIN':
            this.selectedAdmCentersFin = new Array<AdmCenter>();
            break;
        case 'ALL':
            this.selectedAdmCentersAll = new Array<AdmCenter>();
        break;
        case 'NI':
            this.selectedAdmCentersNi = new Array<AdmCenter>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedAdmCenters() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedAdmCentersIni = this.admCenterList.selectedItems;
            break;
        case 'FIN':
            this.selectedAdmCentersFin = this.admCenterList.selectedItems;
            break;
        case 'ALL':
        this.selectedAdmCentersAll = this.admCenterList.selectedItems;
            break;
        case 'NI':
            this.selectedAdmCentersNi = this.admCenterList.selectedItems;
            break;
        default:
            break;
    }

    this.admCenterListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* end admcenter */

  /* begin region */
  private selectRegions(filtersType: string) {
    this.filtersType = filtersType;

    let selectedRegions: Array<Region> = null;

    switch (this.filtersType) {
        case 'INI':
            selectedRegions = this.selectedRegionsIni;
            break;
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            break;
        case 'ALL':
            selectedRegions = this.selectedRegionsAll;
            break;
        case 'NI':
            selectedRegions = this.selectedRegionsNi;
            break;
        default:
            break;
    }


    this.regionListModal.show();
    this.regionList.selectedItems = selectedRegions;
    this.locationList.refresh(null);
}

private removeFromRegionSelection(filtersType: string, region: Region) {
    let selectedRegions: Array<Region> = null;

    switch (filtersType) {
        case 'INI':
            selectedRegions = this.selectedRegionsIni;
            break;
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            break;
        case 'ALL':
            selectedRegions = this.selectedRegionsAll;
                break;
        case 'NI':
            selectedRegions = this.selectedRegionsNi;
            break;
        default:
            break;
    }
    let index: number = selectedRegions.indexOf(region);
    selectedRegions.splice(index, 1);
    this.checkForRefresh(filtersType);
}

private clearRegionSelection(filtersType: string) {
    switch (filtersType) {
        case 'INI':
            this.selectedRegionsIni = new Array<Region>();
            break;
        case 'FIN':
            this.selectedRegionsFin = new Array<Region>();
            break;
        case 'ALL':
        this.selectedRegionsAll = new Array<Region>();
        break;
        case 'NI':
            this.selectedRegionsNi = new Array<Region>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedRegions() {
    switch (this.filtersType) {
        case 'INI':
            this.selectedRegionsIni = this.regionList.selectedItems;
            break;
        case 'FIN':
            this.selectedRegionsFin = this.regionList.selectedItems;
            break;
        case 'ALL':
        this.selectedRegionsAll = this.regionList.selectedItems;
            break;
        case 'NI':
            this.selectedRegionsNi = this.regionList.selectedItems;
            break;
        default:
            break;
    }

    this.regionListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* end REGION */


    /* begin location */
    private selectLocations(filtersType: string) {
        this.filtersType = filtersType;

        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedLocations: Array<Location> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedLocations = this.selectedLocationsIni;
                selectedRegions = this.selectedRegionsIni;
                selectedAdmCenters = this.selectedAdmCentersIni;
                break;
            case 'FIN':
                selectedLocations = this.selectedLocationsFin;
                selectedRegions = this.selectedRegionsFin;
                selectedAdmCenters = this.selectedAdmCentersFin;
                break;
            case 'ALL':
                selectedLocations = this.selectedLocationsAll;
                selectedRegions = this.selectedRegionsAll;
                selectedAdmCenters = this.selectedAdmCentersAll;
                break;
            case 'NI':
                selectedLocations = this.selectedLocationsNi;
                selectedRegions = this.selectedRegionsNi;
                selectedAdmCenters = this.selectedAdmCentersNi;
                break;
            default:
                break;
        }

        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));


        this.locationListModal.show();
        this.locationList.selectedItems = selectedLocations;
        this.locationList.refresh(params);
    }

    private removeFromLocationSelection(filtersType: string, location: Location) {
        let selectedLocations: Array<Location> = null;

        switch (filtersType) {
            case 'INI':
                selectedLocations = this.selectedLocationsIni;
                break;
            case 'FIN':
                selectedLocations = this.selectedLocationsFin;
                break;
            case 'ALL':
            selectedLocations = this.selectedLocationsAll;
                    break;
            case 'NI':
                selectedLocations = this.selectedLocationsNi;
                break;
            default:
                break;
        }
        let index: number = selectedLocations.indexOf(location);
        selectedLocations.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearLocationSelection(filtersType: string) {
        switch (filtersType) {
            case 'INI':
                this.selectedLocationsIni = new Array<Location>();
                break;
            case 'FIN':
                this.selectedLocationsFin = new Array<Location>();
                break;
            case 'ALL':
            this.selectedLocationsAll = new Array<Location>();
            break;
            case 'NI':
                this.selectedLocationsNi = new Array<Location>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedLocations() {
        switch (this.filtersType) {
            case 'INI':
                this.selectedLocationsIni = this.locationList.selectedItems;
                break;
            case 'FIN':
                this.selectedLocationsFin = this.locationList.selectedItems;
                break;
            case 'ALL':
            this.selectedLocationsAll = this.locationList.selectedItems;
                break;
            case 'NI':
                this.selectedLocationsNi = this.locationList.selectedItems;
                break;
            default:
                break;
        }

        this.locationListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /* end location */


    /* begin Division */
    private selectDivisions(filtersType: string) {
        this.filtersType = filtersType;

       // let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
            //    selectedRegions = this.selectedRegionsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
             //   selectedRegions = this.selectedRegionsFin;
                break;
            case 'ALL':
            selectedDivisions = this.selectedDivisionsAll;
            //   selectedRegions = this.selectedRegionsFin;
            break;
           default:
                break;
        }

        let params = new Array<Param>();
      //  params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));

        this.divisionListModal.show();
        this.divisionList.selectedItems = selectedDivisions;
        this.divisionList.refresh(params);
    }

    private removeFromDivisionSelection(filtersType: string, division: Division) {
        let selectedDivisions: Array<Division> = null;

        switch (filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
                break;
            case 'ALL':
                selectedDivisions = this.selectedDivisionsAll;
                break;
            default:
                break;
        }
        let index: number = selectedDivisions.indexOf(division);
        selectedDivisions.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearDivisionSelection(filtersType: string) {
        switch (filtersType) {
            case 'INI':
                this.selectedDivisionsIni = new Array<Division>();
                break;
            case 'FIN':
                this.selectedDivisionsFin = new Array<Division>();
                break;
            case 'ALL':
                this.selectedDivisionsAll = new Array<Division>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedDivisions() {
        switch (this.filtersType) {
            case 'INI':
                this.selectedDivisionsIni = this.divisionList.selectedItems;
                break;
            case 'FIN':
                this.selectedDivisionsFin = this.divisionList.selectedItems;
                break;
            case 'ALL':
                this.selectedDivisionsAll = this.divisionList.selectedItems;
                break;
            default:
                break;
        }

        this.divisionListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /* end division */

    /* begin room */
    private selectRooms(filtersType: string) {
        this.filtersType = filtersType;

        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        let selectedLocations: Array<Location> = null;
        let selectedRooms: Array<Room> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedRooms = this.selectedRoomsIni;
                selectedRegions = this.selectedRegionsIni;
                selectedAdmCenters = this.selectedAdmCentersIni;
                selectedLocations = this.selectedLocationsIni;
                break;
            case 'FIN':
                selectedRooms = this.selectedRoomsFin;
                selectedRegions = this.selectedRegionsFin;
                selectedAdmCenters = this.selectedAdmCentersFin;
                selectedLocations = this.selectedLocationsFin;
                break;
            case 'ALL':
                selectedRooms = this.selectedRoomsAll;
                selectedRegions = this.selectedRegionsAll;
                selectedAdmCenters = this.selectedAdmCentersAll;
                selectedLocations = this.selectedLocationsAll;
                break;
            case 'NI':
                selectedRooms = this.selectedRoomsNi;
                selectedRegions = this.selectedRegionsNi;
                selectedAdmCenters = this.selectedAdmCentersNi;
                selectedLocations = this.selectedLocationsNi;
                break;
            default:
                break;
        }

        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = selectedRooms;
        this.roomList.refresh(params);
    }

    private removeFromRoomSelection(filtersType: string, room: Room) {

        let selectedRooms: Array<Room> = null;
        // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
        // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

        switch (filtersType) {
            case 'INI':
            selectedRooms = this.selectedRoomsIni;
                break;
            case 'FIN':
            selectedRooms = this.selectedRoomsFin;
                break;
            case 'ALL':
            selectedRooms = this.selectedRoomsAll;
                    break;
            case 'NI':
            selectedRooms = this.selectedRoomsNi;
                break;
            default:
                break;
        }
        let index: number = selectedRooms.indexOf(room);
        selectedRooms.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearRoomSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedRoomsIni = new Array<Room>();
                break;
            case 'FIN':
                this.selectedRoomsFin = new Array<Room>();
                break;
            case 'ALL':
            this.selectedRoomsAll = new Array<Room>();
            break;
            case 'NI':
                this.selectedRoomsNi = new Array<Room>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedRooms() {

            switch (this.filtersType) {
                case 'INI':
                    this.selectedRoomsIni = this.roomList.selectedItems;
                    break;
                case 'FIN':
                    this.selectedRoomsFin = this.roomList.selectedItems;
                    break;
                case 'ALL':
                this.selectedRoomsAll = this.roomList.selectedItems;
                    break;
                case 'NI':
                    this.selectedRoomsNi = this.roomList.selectedItems;
                    break;
                default:
                    break;
            }

        this.roomListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
    /* end room */

     /* begin Administration */
     private selectAdministrations(filtersType: string) {
        this.filtersType = filtersType;

      //  let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;
        let selectedAdministrations: Array<Administration> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedDivisions = this.selectedDivisionsIni;
             //   selectedRegions = this.selectedRegionsIni;
                selectedAdministrations = this.selectedAdministrationsIni;
                break;
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
               // selectedRegions = this.selectedRegionsFin;
                selectedAdministrations = this.selectedAdministrationsFin;
                break;
            case 'ALL':
            selectedDivisions = this.selectedDivisionsAll;
            // selectedRegions = this.selectedRegionsFin;
            selectedAdministrations = this.selectedAdministrationsAll;
                break;
          default:
               break;
        }

        let params = new Array<Param>();
      //  params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('divisionIds', AppUtils.getIdsList<Division, number>(selectedDivisions)));

        this.administrationListModal.show();
        this.administrationList.selectedItems = selectedAdministrations;
        this.administrationList.refresh(params);
    }

    private removeFromAdministrationSelection(filtersType: string, administration: Administration) {

        let selectedAdministrations: Array<Administration> = null;

        switch (filtersType) {
            case 'INI':
            selectedAdministrations = this.selectedAdministrationsIni;
                break;
            case 'FIN':
            selectedAdministrations = this.selectedAdministrationsFin;
                break;
            case 'ALL':
            selectedAdministrations = this.selectedAdministrationsAll;
                break;
           default:
                break;
        }
        let index: number = selectedAdministrations.indexOf(administration);
        selectedAdministrations.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearAdministrationSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedAdministrationsIni = new Array<Administration>();
                break;
            case 'FIN':
                this.selectedAdministrationsFin = new Array<Administration>();
                break;
            case 'ALL':
            this.selectedAdministrationsAll = new Array<Administration>();
            break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedAdministrations() {

        switch (this.filtersType) {
            case 'INI':
                this.selectedAdministrationsIni = this.administrationList.selectedItems;
                break;
            case 'FIN':
                this.selectedAdministrationsFin = this.administrationList.selectedItems;
                break;
            case 'ALL':
            this.selectedAdministrationsAll = this.administrationList.selectedItems;
                break;
            default:
                break;
        }

        this.administrationListModal.hide();
        this.checkForRefresh(this.filtersType);
    }
          /* end Administration */


         /* begin AssetType */
         private selectAssetTypes() {

            let selectedAssetTypes: Array<AssetType> = null;

            selectedAssetTypes = this.selectedAssetTypes;

            let params = new Array<Param>();

            this.assetTypeListModal.show();

            this.assetTypeList.selectedItems = selectedAssetTypes;
            this.assetTypeList.refresh(params);
        }

        private removeFromAssetTypeSelection(assetType: AssetType) {
            let list: Array<AssetType> = this.selectedAssetTypes;
            let index: number = list.indexOf(assetType);
            list.splice(index, 1);
            this.checkForRefresh();
        }

        private clearAssetTypeSelection() {

            this.selectedAssetTypes = new Array<AssetType>();
            this.checkForRefresh();
        }

        private setSelectedAssetTypes() {

            this.selectedAssetTypes = this.assetTypeList.selectedItems;

            this.assetTypeListModal.hide();
            this.checkForRefresh(this.filtersType);
        }
        /* end AssetType */

            /* begin AssetCategory */
            private selectAssetCategories() {
            let selectedAssetCategories: Array<AssetCategory> = null;
            selectedAssetCategories = this.selectedAssetCategories;

            this.assetCategoryListModal.show();
            this.assetCategoryList.selectedItems = selectedAssetCategories;
            this.assetCategoryList.refresh(null);
        }

        private removeFromAssetCategorySelection(assetCategory: AssetCategory) {
            let list: Array<AssetCategory> = this.selectedAssetCategories;
            let index: number = list.indexOf(assetCategory);
            list.splice(index, 1);
            this.checkForRefresh();
        }
        private clearAssetCategorySelection() {

                this.selectedAssetCategories = new Array<AssetCategory>();
            this.checkForRefresh();
        }

        private setSelectedAssetCategories() {
            this.selectedAssetCategories = this.assetCategoryList.selectedItems;
            this.assetCategoryListModal.hide();
            this.checkForRefresh();
        }
        /* end AssetCategory */

         /*begin uom*/
         private selectUoms() {
            let selectedUoms: Array<Uom> = null;
            selectedUoms = this.selectedUoms;
            this.uomListModal.show();
            this.uomList.selectedItems = this.selectedUoms;
            this.uomList.refresh(null);
        }

        private removeFromUomSelection(uom: Uom) {
            let index: number = this.selectedUoms.indexOf(uom);
            this.selectedUoms.splice(index, 1);
            this.checkForRefresh();
        }

        private clearUomSelection() {
            this.selectedUoms = new Array<Uom>();
            this.checkForRefresh();
        }

        private setSelectedUoms() {
            this.selectedUoms = this.uomList.selectedItems;
            this.uomListModal.hide();
            this.checkForRefresh();
        }


        /*end asset category*/


    private onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    private onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    private checkForRefresh(filtersType?: string) {
        if ((filtersType) && (filtersType === 'NI')) {
            this.refreshNotIdentified();
        }
        else {
            this.refreshAssets();
        }
    }

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();
        this.assetInvFullDetailList.refresh(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '0'));

        params.push(new Param('regionIdsIni', AppUtils.getIdsList<Region, number>(this.selectedRegionsIni)));
        params.push(new Param('costCenterIdsIni', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersIni)));
        params.push(new Param('departmentIdsIni', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsIni)));
        params.push(new Param('employeeIdsIni', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesIni)));
        params.push(new Param('admCenterIdsIni', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersIni)));
        params.push(new Param('locationIdsIni', AppUtils.getIdsList<Location, number>(this.selectedLocationsIni)));
        params.push(new Param('roomIdsIni', AppUtils.getIdsList<Room, number>(this.selectedRoomsIni)));
        params.push(new Param('administrationIdsIni', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsIni)));
        params.push(new Param('divisionIdsIni', AppUtils.getIdsList<Division, number>(this.selectedDivisionsIni)));
        params.push(new Param('assetTypeIds', AppUtils.getIdsList<AssetType, number>(this.selectedAssetTypes)));
        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(this.selectedAssetCategories)));
        params.push(new Param('regionIdsFin', AppUtils.getIdsList<Region, number>(this.selectedRegionsFin)));
        params.push(new Param('costCenterIdsFin', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersFin)));
        params.push(new Param('departmentIdsFin', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsFin)));
        params.push(new Param('employeeIdsFin', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesFin)));
        params.push(new Param('admCenterIdsFin', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersFin)));
        params.push(new Param('locationIdsFin', AppUtils.getIdsList<Location, number>(this.selectedLocationsFin)));
        params.push(new Param('roomIdsFin', AppUtils.getIdsList<Room, number>(this.selectedRoomsFin)));
        params.push(new Param('administrationIdsFin', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsFin)));
        params.push(new Param('divisionIdsFin', AppUtils.getIdsList<Division, number>(this.selectedDivisionsFin)));
        params.push(new Param('employeeIdsAll', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesAll)));
        params.push(new Param('locationIdsAll', AppUtils.getIdsList<Location, number>(this.selectedLocationsAll)));
        params.push(new Param('regionIdsAll', AppUtils.getIdsList<Region, number>(this.selectedRegionsAll)));
        params.push(new Param('admCenterIdsAll', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersAll)));
        params.push(new Param('divisionIdsAll', AppUtils.getIdsList<Division, number>(this.selectedDivisionsAll)));
        params.push(new Param('administrationIdsAll', AppUtils.getIdsList<Administration, number>(this.selectedAdministrationsAll)));
        params.push(new Param('roomIdsAll', AppUtils.getIdsList<Room, number>(this.selectedRoomsAll)));
        params.push(new Param('invStateIdsIni', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesIni)));
        params.push(new Param('invStateIdsFin', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesFin)));
        params.push(new Param('invStateIdsAll', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesAll)));
        params.push(new Param('userIds', AppUtils.getIdsList<ApplicationUser, number>(this.selectedUsers)));
        params.push(new Param('filter', this.filter));
        params.push(new Param('reportType', this.reportTypeCode));
        params.push(new Param('assetState', this.assetStateCode));
        params.push(new Param('custody', ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));
        params.push(new Param('reconcile', ((this.isReconcile === '-') ? 'null' : (this.isReconcile === 'YES' ? 'true' : 'false'))));

        return params;
    }

    private refreshNotIdentified() {
        let params: Array<Param> = this.getNotIdentifiedFilters();
        // this.assetNiList.refresh(params);
        this.assetInvTempDetailListTemp.refresh(params);
    }

    private showPhoto(type: string){

        this.imageListModal.show();
            switch (type) {
                case 'ASSET':
                this.refreshEntityFiles(this.assetInvFullDetailList.selectedItem.id, true);
                    break;
                case 'ASSETNI':
                this.refreshEntityFiles(this.assetInvTempDetailListTemp.selectedItem.id, true);
                    break;
                default:
                    break;
            }
    }

     /* begin AssetState */
     private selectInvStates(filtersType: string) {
        this.filtersType = filtersType;

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (this.filtersType) {
            case 'INI':
                selectedInvStates = this.selectedInvStatesIni;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'ALL':
                selectedInvStates = this.selectedInvStatesAll;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
            case 'NI':
               selectedInvStatesNi = this.selectedInvStatesNi;
                this.invStateListNiModal.show();
                this.invStateListNi.selectedItems = selectedInvStatesNi;
                this.invStateListNi.refresh(null);
                break;
          default:
               break;
        }

    }

    private removeFromInvStateSelection(filtersType: string, assetState: InvState) {

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (filtersType) {
            case 'INI':
                selectedInvStates = this.selectedInvStatesIni;
                let indexIni: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexIni, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                let indexFin: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexFin, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'ALL':
                selectedInvStates = this.selectedInvStatesAll;
                let indexAll: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexAll, 1);
                this.checkForRefresh(filtersType);
                break;
            case 'NI':
                selectedInvStatesNi = this.selectedInvStatesNi;
                let indexNi: number = selectedInvStatesNi.indexOf(assetState);
                this.selectedInvStatesNi.splice(indexNi, 1);
                this.checkForRefresh(filtersType);
                break;
           default:
                break;
        }

    }

    private clearInvStateSelection(filtersType: string) {

        switch (filtersType) {
            case 'INI':
                this.selectedInvStatesIni = new Array<InvState>();
                break;
            case 'FIN':
                this.selectedInvStatesFin = new Array<InvState>();
                break;
            case 'ALL':
                this.selectedInvStatesAll = new Array<InvState>();
                break;
            case 'NI':
                this.selectedInvStatesNi = new Array<InvState>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedInvStates() {

        switch (this.filtersType) {
            case 'INI':
                this.selectedInvStatesIni = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'FIN':
                this.selectedInvStatesFin = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'ALL':
                this.selectedInvStatesAll = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            case 'NI':
                this.selectedInvStatesNi = this.invStateList.selectedItems;
                this.invStateListNiModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            default:
                break;
        }

    }
          /* end Administration */

          /* begin USER */
  private selectUsers() {
    let params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('role', 'user'));

    let selectedUsers: Array<ApplicationUser> = null;
    selectedUsers = this.selectedUsers;

    this.userListModal.show();
    this.userList.selectedItems = selectedUsers;
    this.userList.refresh(params);
}

private removeFromUserSelection(user: ApplicationUser) {
    let list: Array<ApplicationUser> = this.selectedUsers;
    let index: number = list.indexOf(user);
    list.splice(index, 1);
    this.checkForRefresh();
}
private clearUserSelection() {

    this.selectedUsers = new Array<ApplicationUser>();
    this.checkForRefresh();
}

private setSelectedUsers() {
    this.selectedUsers = this.userList.selectedItems;
    this.userListModal.hide();
    this.checkForRefresh();
}
/* end USER */


  /* begin USER */
  private selectUserTemps() {
    let params: Array<Param> = new Array<Param>();
    params.push(new Param('filter', this.filter));
    params.push(new Param('role', 'user'));

    let selectedUserTemps: Array<ApplicationUser> = null;
    selectedUserTemps = this.selectedUserTemps;

    this.userTempListModal.show();
    this.userTempList.selectedItems = selectedUserTemps;
    this.userTempList.refresh(params);
}

private removeFromUserTempSelection(user: ApplicationUser) {
    let list: Array<ApplicationUser> = this.selectedUserTemps;
    let index: number = list.indexOf(user);
    list.splice(index, 1);
    this.refreshNotIdentified();
}
private clearUserTempSelection() {

    this.selectedUserTemps = new Array<ApplicationUser>();
    this.refreshNotIdentified();
}

private setSelectedUserTemps() {
    this.selectedUserTemps = this.userTempList.selectedItems;
    this.userTempListModal.hide();
    this.refreshNotIdentified();
}
/* end USER */


    private clearFilters() {
        this.selectedAdmCentersIni = new Array<AdmCenter>();
        this.selectedCostCentersIni = new Array<CostCenter>();
        this.selectedDepartmentsIni = new Array<Department>();
        this.selectedEmployeesIni = new Array<Employee>();
        this.selectedRegionsIni = new Array<Region>();
        this.selectedLocationsIni = new Array<Location>();
        this.selectedRoomsIni = new Array<Room>();
        this.selectedDivisionsIni = new Array<Division>();
        this.selectedAdministrationsIni = new Array<Administration>();
        this.selectedInvStatesIni = new Array<InvState>();
        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedAssetCategories = new Array<AssetCategory>();

        this.selectedAdmCentersFin = new Array<AdmCenter>();
        this.selectedCostCentersFin = new Array<CostCenter>();
        this.selectedDepartmentsFin = new Array<Department>();
        this.selectedEmployeesFin = new Array<Employee>();
        this.selectedRegionsFin = new Array<Region>();
        this.selectedLocationsFin = new Array<Location>();
        this.selectedRoomsFin = new Array<Room>();
        this.selectedDivisionsFin = new Array<Division>();
        this.selectedAdministrationsFin = new Array<Administration>();
        this.selectedInvStatesFin = new Array<InvState>();
        this.selectedRegionsAll = new Array<Region>();
        this.selectedAdmCentersAll = new Array<AdmCenter>();
        this.selectedLocationsAll = new Array<Location>();
        this.selectedDivisionsAll = new Array<Division>();
        this.selectedAdministrationsAll = new Array<Administration>();
        this.selectedEmployeesAll = new Array<Employee>();
        this.selectedRoomsAll = new Array<Room>();
        this.selectedInvStatesAll = new Array<InvState>();
        this.selectedUsers = new Array<ApplicationUser>();
        this.selectedUserTemps = new Array<ApplicationUser>();
        this.filter = '';

        this.checkForRefresh();
    }

    // private deleteOperation(){

    //         this.assetHttpService.deleteAssetOp(this.selectedAsset.id, this.inventoryList.selectedItem.id).subscribe((res) => { console.log('REZULTAT: ', res)});
    //         console.log('INVENTAR', this.inventoryList.selectedItem.id);

    // }

    private recoverAssetNi(){

        this.operationType = OperationType.RecoverTemp;
        this.confirmationMessage = 'Anulati reconcilierea selectata?';
        this.confirmationModal.show();

    }

    private deleteOperation(){
        this.operationType = OperationType.CancelScanned;
        this.confirmationMessage = 'Anulati scanarea selectata?';
        this.confirmationModal.show();
 }

    private getSearchFilters(filter: string, wordCount: number, letterCount: number, wordMinLength: number): string[] {
        let result: Array<string> = new Array<string>();
        let filters: string[] = null;

        filter = filter.replace('-', ' ').replace('+', ' ').replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ');
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
        let filters: string[] = this.getSearchFilters(this.notIdentifiedFilter, this.wordCount, this.letterCount, this.wordMinLength);
        // console.log(JSON.stringify(filters));

        params.push(new Param('inventoryId', JSON.stringify(this.selectedInventory != null ? this.selectedInventory.id : 4)));
        // params.push(new Param('filter', this.notIdentifiedFilter.replace('-', ' ').replace('+', ' ').replace('.', ' ').replace(',', ' ').replace('/', ' ').replace('\\', ' ')));
        params.push(new Param('filters', JSON.stringify(filters)));
        // params.push(new Param('wordCount', JSON.stringify(this.wordCount)));
        // params.push(new Param('letterCount', JSON.stringify(this.letterCount)));
        params.push(new Param('userIds', AppUtils.getIdsList<ApplicationUser, number>(this.selectedUserTemps)));
        params.push(new Param('invStateIds', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesNi)));
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(this.selectedRegionsNi)));
        params.push(new Param('costCenterIds', AppUtils.getIdsList<CostCenter, number>(this.selectedCostCentersNi)));
        params.push(new Param('departmentIds', AppUtils.getIdsList<Department, number>(this.selectedDepartmentsNi)));
        params.push(new Param('employeeIds', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesNi)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(this.selectedAdmCentersNi)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(this.selectedLocationsNi)));
        params.push(new Param('roomIds', AppUtils.getIdsList<Room, number>(this.selectedRoomsNi)));
        params.push(new Param('conditionType', this.conditionType));

        return params;
    }

    private reportInventoryList() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            let reportType: string = 'inventorylistv2PRB';
            let inventoryId: number = this.selectedInventory.id;
            let regionId: number = this.selectedRegionsFin[0].id;
            let custody: boolean = ((this.custody === '-') ? null : (this.custody === 'YES' ? true : false));
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

            if ((this.selectedEmployeesFin != null) && (this.selectedEmployeesFin.length > 0)) {
                let reportTypeV3: string = 'inventorylistv3';
                let employeeId: number = this.selectedEmployeesFin[0].id;

                url = `${AppConfig.reportingServer}Report.aspx/?report=${reportTypeV3}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

                url += `&employeeId=${employeeId}`;
            }

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)){
                let locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            if (custody != null)
            {
                url += `&custody=${custody}`;
            }


            // console.log(url);
            window.open(url);
        }
        else {
            alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        }
    }

    private reportTransferIn() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            let reportType: string = 'transferinv1';
            let inventoryId: number = this.selectedInventory.id;
            let regionId: number = this.selectedRegionsFin[0].id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}&reportType=${this.reportTypeCode}`;

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)){
                let locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            window.open(url);
        }
        else {
            alert('Verificati data ati selectat cel putin un inventar si o regiune!');
        }
    }

    private reportTransferOut() {
        if ((this.selectedInventory != null) && (this.selectedRegionsFin != null) && (this.selectedRegionsFin.length > 0)) {
            let reportType: string = 'transferoutv1';
            let inventoryId: number = this.selectedInventory.id;
            let regionId: number = this.selectedRegionsFin[0].id;
            let url: string = '';

            url = `${AppConfig.reportingServer}Report.aspx/?report=${reportType}&inventoryId=${inventoryId}&regionId=${regionId}`;

            if (this.selectedLocationsFin != null && (this.selectedLocationsFin.length > 0)){
                let locationId: number = this.selectedLocationsFin[0].id;
                url += `&locationId=${locationId}`;
            }

            window.open(url);
        }
        else {
            alert('Verificati data ati selectat un inventar si o regiune!');
        }
    }

    private exportSocGen() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetHttpService
            .exportSocGen(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Inventory Result.xlsx');
    });
    }

    private exportToExcel() {
                let params: Array<Param> = this.getFilters();
                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
                        // console.log(JSON.stringify(assetInvDetails));
                        let options = {
                            sheetid: 'mijloace fixe',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };
                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                name as [Denumire],
                                assetCategory->name as [Categorie]
                                INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }

            //

            // locationInitial->code as [Cladire initiala],
            // costCenterInitial->code as [Centru de cost initial],
            // costCenterInitial->name as [Denumire centru de cost initial],
            // employeeInitial->internalCode as [Marca],
            // employeeInitial->firstName as [Prenume],
            // employeeInitial->lastName as [Nume],
            // qIntial as [Cantitate initiala],
            // locationFinal->code as [Cladire finala],
            // costCenterFinal->code as [Centru de cost finala],
            // costCenterFinal->name as [Denumire centru de cost finala],
            // employeeIFinal->internalCode as [Marca finala],
            // employeeFinal->firstName as [Prenume final],
            // employeeFinal->lastName as [Nume final],
            // qFinal as [Cantitate finala]

            //

            private exportToExcelAZ() {

                let params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {


                        alasql.fn.datetime = function(dateStr) {
                                        let date = new Date(dateStr);
                                        date.toISOString().substring(0, 10);
                                        return date.toLocaleDateString();
                        };

                        let options = {
                            sheetid: 'Raport',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        alasql(`SELECT id as [Id],
                                datetime(modifiedAt) as [Data scanare],
                                name as [Denumire],
                                invNo as [Cod de bare],
                                erpCode as [Numar inventar],
                                case when allowLabel = true then 'Etichetabil' else 'Neetichetabil' end as [Etichetabil?],
                                regionInitial->name as [Judet Initial],
                                locationInitial->name as [Localitate Initial],
                                roomInitial->code as [Cod Shop Initial],
                                roomInitial->name as [Adresa Initial],
                                employeeInitial->firstName as [Nume Gestionar Initial],
                                employeeInitial->lastName as [Prenume Gestionar Initial],
                                invStateInitial->name as [Stare Initial],
                                qIntial as [Cantitate initiala],
                                regionFinal->name as [Judet Inventar],
                                locationFinal->name as [Localitate Inventar],
                                roomFinal->code as [Cod Shop Inventar],
                                roomFinal->name as [Adresa Inventar],
                                employeeFinal->firstName as [Nume Gestionar Inventar],
                                employeeFinal->lastName as [Prenume Gestionar Inventar],
                                invStateFinal->name as [Stare Inventar],
                                qFinal as [Cantitate Inventar],
                                assetCategory->name as [Categorie Inventar],
                                assetType->name as [Tip / Producator Inventar],
                                serialNumberFinal AS [SN inventar],
                                info as [Observatii Inventar],
                                producer as [Dimensiuni],
                                CAST([valueInv] AS NUMBER) as [Valoare achizitie]
                                INTO XLSX('Raport Inventar.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }
//   CAST([valueDep] AS NUMBER) as [Valoare neta],
// datetime(purchaseDate) as [Data achizitie],
// employeeInitial->internalCode as [Detinator initial],
// regionInitial->name as [Judet initial],
// locationInitial->name as [Gestiune initiala],

// roomInitial->code as [Adresa initial],
// invStateFinal->code as [Stare inventar],
// CAST([valueInv] AS NUMBER) as [Valoare achizitie],
// regionFinal->name as [Judet inventar],
// locationFinal->name as [Gestiune inventar],

// roomFinal->code as [Adresa inventar],
// assetCategory->name as [Clasa],
// invStateInitial->code as [Stare initial],
// qFinal as [Cantitate inventar],
// serialNumber as [SN Inventar],
            private exportToExcelOtp() {

                let params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {

                        // console.log(JSON.stringify(assetInvDetails));

                        let options = {
                            sheetid: 'Lista inventar',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                name as [Denumire],
                                serialNumber as [Numar serie],
                                locationInitial->code as [Cod cladire initiala],
                                locationInitial->name as [Cladire initiala],
                                roomInitial->code as [Cod centru de cost initial],
                                roomInitial->name as [Centru de cost initial],
                                locationFinal->code as [Cod cladire finala],
                                locationFinal->name as [Cladire finala],
                                roomFinal->code as [Cod centru de cost final],
                                roomFinal->name as [Centru de cost final],
                                info as [Info]
                                INTO XLSX('Lista inventar.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

                    });
            }

            private exportToExcelGeneralOtp() {

                let params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
                        console.log(JSON.stringify(assetInvDetails));
                        let options = {
                            sheetid: 'Centralizator',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };
                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                name as [Denumire],
                                serialNumber as [Numar serie],
                                locationInitial->code as [Cod cladire initiala],
                                locationInitial->name as [Denumire cladire initiala],
                                roomInitial->code as [Cod centru de cost initial],
                                roomInitial->name as [Centru de cost initial],
                                CASE WHEN locationFinal = null THEN locationInitial->code ELSE locationFinal->code END as [Cod locatie finala],
                                locationFinal->name as [Denumire locatie finala],
                                roomFinal->code as [Cod camera finala],
                                roomFinal->name as [Denumire camera finala],
                                info as [Info]
                                INTO XLSX('Raport general.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);

                    });
            }

            private exportToExcelAssetNiOtp() {

                let params: Array<Param> = null;

                params = this.getFilters();
                this.assetNiHttpService
                    .exportAssetNiOtp(params)
                    .subscribe((blob) => {
                fileSaveAs(blob, 'Temporare.xlsx');
            });
            }

    private exportToExcelATZ() {

                let params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
                    (assetInvDetails: PagedResult<AssetInvFullDetail>) => {

                        // console.log(JSON.stringify(assetInvDetails));

                        let options = {
                            sheetid: 'mijloace fixe',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                name as [Denumire],
                                locationInitial->name as [Locatie initiala],
                                costCenterInitial->code as [Centru de cost initial],
                                employeeInitial->firstName as [Gestiune initiala],
                                qIntial as [Cantitate initiala],
                                locationFinal->name as [Locatie finala],
                                costCenterFinal->code as [Centru de cost final],
                                employeeFinal->firstName as [Gestiune finala],
                                qFinal as [Cantitate finala]
                                INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }

            // private exportToExcel() {
            //             let params: Array<Param> = this.getFilters();
            //             this.assetHttpService.get(1, 1000000, 'asset.invNo', 'asc', params, null, 'inventory').subscribe(
            //                 (assetInvDetails: PagedResult<AssetInvFullDetail>) => {
            //                     //console.log(JSON.stringify(assetInvDetails));
            //                     let options = {
            //                         sheetid: 'mijloace fixe',
            //                         headers: true,
            //                         column: { style: { Font: { Bold: '1' } } },
            //                         rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
            //                         cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
            //                     };
            //                     alasql(`SELECT id as [Id],
            //                             invNo as [Numar inventar],
            //                             name as [Denumire],
            //                             locationInitial->code as [Cladire initiala],
            //                             costCenterInitial->code as [Centru de cost initial],
            //                             costCenterInitial->name as [Denumire centru de cost initial],
            //                             employeeInitial->internalCode as [Marca],
            //                             employeeInitial->firstName as [Prenume],
            //                             employeeInitial->lastName as [Nume],
            //                             qIntial as [Cantitate initiala],
            //                             locationFinal->code as [Cladire finala],
            //                             costCenterFinal->code as [Centru de cost finala],
            //                             costCenterFinal->name as [Denumire centru de cost finala],
            //                             employeeIFinal->internalCode as [Marca finala],
            //                             employeeFinal->firstName as [Prenume final],
            //                             employeeFinal->lastName as [Nume final],
            //                             qFinal as [Cantitate finala]
            //                             INTO XLSX('mijloace_fixe.xlsx',?) FROM ?`, [ options, assetInvDetails.items ]);
            //                 });
            //         }
            // public imageCount: number = 0;
            // public imageIndex: number = 0;
            // public imageLoading: boolean = false;
            // public entityFileMemoryDataSource: MemoryDataSource<EntityFile> = new MemoryDataSource();

    private refreshEntityFiles(assetId: number, loadAssetImages: boolean) {
                this.entityFileHttpService.getByEntity('ASSET2', assetId)
                .subscribe((entityFiles: Array<EntityFile>) => {
                    this.existingAssetImages.splice(0, this.existingAssetImages.length);
                    this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                    this.assetImages.splice(0, this.assetImages.length);
                    this.assetFiles.splice(0, this.assetFiles.length);
                    // this.entityFileMemoryDataSource.clear();
                    entityFiles.forEach((entityFile: EntityFile) => {
                        if (entityFile.fileType.startsWith('image/')) {
                            let fileContent: any = null;
                            this.existingAssetImages.forEach((assetImage: AssetImage) => {
                                if (assetImage.entityFile.id === entityFile.id) {
                                    fileContent = assetImage.fileContent;
                                }
                            });
                            this.assetImages.push(new AssetImage(entityFile, fileContent));
                        }
                        else {
                            this.assetFiles.push(entityFile);
                            // this.entityFileMemoryDataSource.addItem(entityFile);
                        }
                    });
                   // this.fileList.refresh(null);
                    if (loadAssetImages) this.loadAssetImages();
                });
            }

    private loadAssetImages() {
                if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                    this.imageCount = this.assetImages.length;
                    this.imageIndex = 0;
                    this.imageLoading = true;
                    this.loadAssetImageLoop();
                }
            }

    private loadAssetImageLoop() {
                if (this.assetImages.length > this.imageIndex) {
                    let assetImage: AssetImage = this.assetImages[this.imageIndex];
                    if (assetImage.fileContent === null) {
                        this.entityFileHttpService.download(assetImage.entityFile.id).subscribe((image) => {
                            this.createImageFromBlob(assetImage, image);
                            this.loadNextAssetImage();
                        });
                    }
                    else {
                        this.loadNextAssetImage();
                    }
                }
            }

    private createImageFromBlob(assetImage: AssetImage, image: Blob) {
                let reader = new FileReader();
                reader.addEventListener('load', () => {
                   // this.images.push(reader.result);
                   assetImage.fileContent = reader.result;
                   console.log(assetImage);
                }, false);
                if (image) {
                   reader.readAsDataURL(image);
                }
            }

    private loadNextAssetImage() {
                if (this.imageIndex < (this.assetImages.length - 1)) {
                    this.imageIndex++;
                    this.loadAssetImageLoop();
                }
                else {
                    this.imageLoading = false;
                }
            }
}



enum OperationType {
    NotSet = 1,
    Reconciliation = 2,
    Transfer = 3,
    CancelScanned = 4,
    RecoverTemp = 5
}
