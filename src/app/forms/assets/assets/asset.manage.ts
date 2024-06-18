import { RegionHttpService } from './../../../services/http/administration/region.http.service';
import { AssetState } from './../../../model/api/assets/asset-state';
import { ConfigValuesHttpService } from './../../../services/http/common/config-values.service';
import { AssetInvDetail } from './../../../model/api/assets/asset-inv-detail';
import { PagedResult } from './../../../model/common/paged-result';
import { TranslateService } from '@ngx-translate/core';

import { CostCenterHttpService } from '../../../services/http/administration/cost-center.http.service';
import { CostCenter } from './../../../model/api/administration/cost-center';
import { CostCenterList } from './../../administration/cost-centers/cost-center.list';
import { AssetSimpleDetail } from './../../../model/api/assets/asset-simple-detail';
import { AssetCategoryList } from './../asset-categories/asset-category.list';
import { PartnerList } from './../../documents/partners/partner.list';
import { RoomList } from './../../administration/rooms/room.list';
import { LocationList } from './../../administration/locations/location.list';
import { EmployeeList } from './../../administration/employees/employee.list';
import { DepartmentList } from './../../administration/departments/department.list';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import * as jsPDF from 'jspdf';
import * as jsbarcode from 'jsbarcode';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';
import { SelectionResult } from '../../../model/common/selection-result';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { Partner } from '../../../model/api/documents/partner';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { DocumentType } from '../../../model/api/documents/document-type';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { DepartmentHttpService } from '../../../services/http/administration/department.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetImportV1 } from "app/model/common/import/asset-import-v1";
import { AssetImportV2 } from "app/model/common/import/asset-import-v2";
import { AssetFilter } from "app/model/api/assets/asset.filter";
import { AssetList } from "app/forms/assets/assets/asset.list";
import { AssetHttpService } from "app/services/http/assets/asset.http.service";
import { AssetStateHttpService } from 'app/services/http/assets/asset-state.http.service';
import { AssetClassList } from 'app/forms/assets/asset-classes/asset-class.list';
import { Region } from 'app/model/api/administration/region';
import { RegionList } from 'app/forms/administration/regions/region.list';
import { AssetTypeHttpService } from 'app/services/http/assets/asset-type.http.service';
import { AssetType } from 'app/model/api/assets/asset-type';
import { AssetTypeList } from 'app/forms/assets/asset-types/asset-type.list';
import { saveAs as fileSaveAs } from "file-saver";
import { AppUtils } from 'app/common/app.utils';
import { DivisionHttpService } from 'app/services/http/administration/division.http.service';
import { DivisionList } from 'app/forms/administration/divisions/division.list';
import { Division } from 'app/model/api/administration/division';
import { AdministrationDetailHttpService } from 'app/services/http/administration/administration-detail.http.service';
import { AdministrationList } from 'app/forms/administration/administrations/administration.list';
import { Administration } from 'app/model/api/administration/administration';
import { AdmCenter } from '../../../model/api/administration/adm-center';
import { Uom } from 'app/model/api/assets/uom';
import { UomList } from '../uoms/uom.list';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { AdmCenterList } from 'app/forms/administration/adm-centers/adm-center.list';
import { DatePickerOptions, DateModel } from 'ng2-datepicker';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { InvState } from 'app/model/api/inventory/inv-state';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AssetRecoList } from './asset-reco.list';
import { AssetRecoHttpService } from 'app/services/http/assets/asset-reco.http.service';
import { DocumentTypeHttpService } from 'app/services/http/documents/document-type.http.service';
import { PrintLabel } from 'app/model/common/print-label';
import { Company } from 'app/model/api/assets/company';
import { CompanyList } from '../companies/company.list';
import { CompanyHttpService } from 'app/services/http/assets/company.http.service';
import * as decode from 'jwt-decode';
import { SubType } from 'app/model/api/administration/sub-type';
import { SubTypeList } from 'app/forms/administration/sub-types/sub-type.list';
import { SubTypeHttpService } from 'app/services/http/administration/sub-type.http.service';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { AssetImportIT } from 'app/model/common/import/asset-import-it';
import { ZoneState } from 'app/model/api/assets/zone-state';
import { ZoneStateList } from '../zone-states/zone-state.list';
import { ZoneStateHttpService } from 'app/services/http/assets/zone-state.http.service';
import { AssetImportOS } from 'app/model/common/import/asset-import-os';
import { AssetImportSN } from 'app/model/common/import/asset-import-sn';

@Component({
    selector: 'asset-manage',
    templateUrl: 'asset.manage.html',
    styleUrls: ['asset.manage.scss'],
    providers: [
        AccMonthHttpService,
        AssetCategoryHttpService,
        AssetClassHttpService,
        AssetStateHttpService,
        InvStateHttpService,
        AdministrationDetailHttpService,
        UomHttpService,
        DepartmentHttpService,
        EmployeeHttpService,
        LocationHttpService,
        RegionHttpService,
        AssetTypeHttpService,
        DivisionHttpService,
        RoomDetailHttpService,
        PartnerHttpService,
        CostCenterHttpService,
        ConfigValuesHttpService,
        AssetRecoHttpService,
        DocumentTypeHttpService,
        CompanyHttpService,
        AdmCenterHttpService]
})
export class AssetManage { // extends GenericManage<AssetInvDetail> {


    // @ViewChild('assetRecoList') public assetRecoList: AssetRecoList;

    @ViewChild('assetList') public assetList: AssetList;

    @ViewChild('departmentList') public departmentList: DepartmentList;

    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyList;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('zoneStateList') public zoneStateList: ZoneStateList;
    @ViewChild('zoneStateListModal') public zoneStateListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('partnerList') public partnerList: PartnerList;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterList;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('uomList') public uomList: UomList;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;

    @ViewChild('assetClassList') public assetClassList: AssetClassList;
    @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeList;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('subTypeList') public subTypeList: SubTypeList;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionList;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationList;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('importDataModal') private importDataModal: ModalDirective;
    @ViewChild('uploadModal') public uploadModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('importDataSupplierModal') public importDataSupplierModal: ModalDirective;
    @ViewChild('importDataOSModal') public importDataOSModal: ModalDirective;
    @ViewChild('importDataSNModal') public importDataSNModal: ModalDirective;

     // SVG //


     // SVG //


    private companyName: string = AppConfig.COMPANY_NAME;
    private showSupplierDetails: boolean= AppConfig.SHOW_SUPPLIER_DETAILS;
    private showCostCentersDetails: boolean= AppConfig.SHOW_COSTCENTER_DETAILS;
    private showEmployeesDetails: boolean= AppConfig.SHOW_EMPLOYEE_DETAILS;
    private showDepartmentDetails: boolean= AppConfig.SHOW_DEPARTMENT_DETAILS;
    private showAssetCategoryDetails: boolean= AppConfig.SHOW_ASSETCATEGORY_DETAILS;
    private showRegionDetails: boolean= AppConfig.SHOW_REGION_DETAILS;
    private showLocationDetails: boolean= AppConfig.SHOW_LOCATION_DETAILS;
    private showRoomsDetails: boolean= AppConfig.SHOW_ROOMS_DETAILS;
    private useAssetCategory: boolean= AppConfig.USE_ASSET_CATEGORY;
    private useAssetClasses: boolean= AppConfig.USE_ASSET_CLASS;
    private useAssetTypes: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS;
    private useDivisions: boolean = AppConfig.SHOW_DIVISION_DETAILS;
    private useAdministrations: boolean = AppConfig.SHOW_ADMINISTRATION_DETAILS;
    private useDepartment: boolean= AppConfig.USE_DEPARTMENT;
    private useCustody: boolean= AppConfig.SHOW_CUSTODY_DETAILS;
    private useAssetStates: boolean= AppConfig.USE_ASSET_STATE;
    private useExportIn: boolean= AppConfig.USE_EXPORT_IN;
    private useExportPIF: boolean= AppConfig.USE_EXPORT_PIF;
    private useExportPV: boolean= AppConfig.USE_EXPORT_PV;
    private useExportOTP: boolean= AppConfig.USE_EXPORT_OTP;
    private useAssetAddButton: boolean= AppConfig.USE_ASSET_ADD_BUTTON;
    private useExportOut: boolean= AppConfig.USE_EXPORT_OUT;
    // private useDepartment: Boolean= this.configValue.;

    private assetStates: Array<AssetState> = new Array<AssetState>();
    private invStates: Array<InvState> = new Array<InvState>();
    private documentTypes: Array<DocumentType> = new Array<DocumentType>();
    private assetStateId: number;
    private invStateId: number;
    private documentTypeId: number;

    protected mainViewMode: number = AssetManageViewMode.AssetList;
    protected viewMode: number = AssetManageViewMode.AssetList;

    private filter: string;
    private filterDoc: string;
    private filterPO: string;
    private filterName: string;
    private filterInv: string;
    private filterPurchaseDate: string;
    private filterReceptionToDate = '';
    private custody: string = '-';
    private smallPageSize: number = 5;
    private largePageSize: number = 10;
    private transferStartDate: Date;
    private transferEndDate: Date;
    private pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    private noOfItems: number = 0;
    private months: Array<string> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    private selectedMonth: number = 0;
    private selectedYear: number = 0;
    private selectedAccMonth: AccMonth = null;
    @ViewChild('fileInputOS') fileInputOS: ElementRef;
    @ViewChild('fileInputSN') fileInputSN: ElementRef;
    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('fileInputCassation') fileInputCassation: ElementRef;
    @Output() protected uploadFinished = new EventEmitter<void>();

    private assetStateName: string = 'Stari gestiune';
    private assetStateCode: string = 'ALL';
    private showExportBtn = true;
    private showExportITBtn = true;

    private requestOperationDetailRefreshEvent: EventEmitter<void> = new EventEmitter<void>();

    private requestAssetDepDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private updateAssetDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
    private updateAssetRecoDepDetailSelectionEvent: EventEmitter<Array<AssetDepDetail>> = new EventEmitter<Array<AssetDepDetail>>();
    private requestAssetInvDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private updateAssetInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();
    private updateAssetRecoInvDetailSelectionEvent: EventEmitter<Array<AssetInvDetail>> = new EventEmitter<Array<AssetInvDetail>>();
    private addNewAssetEvent: EventEmitter<void> = new EventEmitter<void>();
    public importMarkScanAdmLines: Array<AssetImportIT> = new Array<AssetImportIT>();
    public importOSLines: Array<AssetImportOS> = new Array<AssetImportOS>();
    public importSNLines: Array<AssetImportSN> = new Array<AssetImportSN>();
    private assetDetailEntitySelectedEvent: EventEmitter<SelectionResult<IEntity<number>>> = new EventEmitter<SelectionResult<IEntity<number>>>();
    private operationDetailEntitySelectedEvent: EventEmitter<SelectionResult<IEntity<number>>> = new EventEmitter<SelectionResult<IEntity<number>>>();

    private assetCategoryRowSelection: string = "single";
    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    private selectedUoms: Array<Uom> = new Array<Uom>();

    private assetClassRowSelection: string = "single";
    private selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    private selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    private selectedSubTypes: Array<SubType> = new Array<SubType>();
    private selectedDivisions: Array<Division> = new Array<Division>();
    private selectedInvStates: Array<InvState> = new Array<InvState>();
    private selectedZoneStates: Array<ZoneState> = new Array<ZoneState>();
    private requestAssetClassRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestAssetClassSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    private updateAssetClassSelectionEvent: EventEmitter<Array<AssetClass>> = new EventEmitter<Array<AssetClass>>();

    private partnerRowSelection: string = "single";
    private selectedPartners: Array<Partner> = new Array<Partner>();
    private requestPartnerRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private requestPartnerSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    private updatePartnerSelectionEvent: EventEmitter<Array<Partner>> = new EventEmitter<Array<Partner>>();


    private selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();

    private selectedDepartments: Array<Department> = new Array<Department>();

    private employeeRowSelection: string = "single";
    private selectedEmployees: Array<Employee> = new Array<Employee>();

    private selectedRegions: Array<Region> = new Array<Region>();

    private selectedLocations: Array<Location> = new Array<Location>();

    private roomRowSelection: string = "single";
    private selectedRooms: Array<Room> = new Array<Room>();
    private selectedAdministrations: Array<Administration> = new Array<Administration>();
    private selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedCompanies: Array<Company> = new Array<Company>();
    private get isAdmin(): boolean { return AppData.UserIsAdmin; }

    private data;
    private importLinesV1: Array<AssetImportV1> = new Array<AssetImportV1>();
    private importLinesV2: Array<AssetImportV2> = new Array<AssetImportV2>();
    private importIndex: number = 0;
    private params: Array<Param> = null;

    private title = 'Testing ng2-datepicker';

    private fromdate: DateModel;
    private from = '';
    private todate: DateModel;
    private to = '';
    private fromReceptiondate: DateModel;
    private fromReception = '';
    private toReceptiondate: DateModel;
    private toReception = '';
    // private showReco: boolean = false;
    // private get showRecoLists(): boolean { return (this.showReco === true); }
    // private get allowReconciliation(): boolean { return ((this.assetList.selectedItem != null) && (this.assetRecoList.selectedItem != null)); }
    protected operationType: number = OperationType.NotSet;
    private confirmationMessage: string = '';
    private erpCode: string = '-';
    private isMonitor: boolean = false;
    private isMonitorMetal: boolean = false;

    public fileEventSupplier: any = null;

    private options: DatePickerOptions = {
    format: 'DD-MM-YYYY',
    todayText: 'Oggi',
    style: 'big'
  };

    constructor(private route: ActivatedRoute,
                private router: Router,
                private accMonthHttpService: AccMonthHttpService,
                private administrationDetailHttpService: AdministrationDetailHttpService,
                private assetCategoryHttpService: AssetCategoryHttpService,
                private uomHttpService: UomHttpService,
                private assetClassHttpService: AssetClassHttpService,
                private assetHttpService: AssetHttpService,
                private assetRecoHttpService: AssetRecoHttpService,
                private assetStateHttpService: AssetStateHttpService,
                private invStateHttpService: InvStateHttpService,
                private zoneStateHttpService: ZoneStateHttpService,
                private documentTypeHttpService: DocumentTypeHttpService,
                private employeeHttpService: EmployeeHttpService,
                private departmentHttpService: DepartmentHttpService,
                private regionHttpService: RegionHttpService,
                private admCenterHttpService: AdmCenterHttpService,
                private assetTypeHttpService: AssetTypeHttpService,
                private subTypeHttpService: SubTypeHttpService,
                private divisionHttpService: DivisionHttpService,
                private locationHttpService: LocationHttpService,
                private roomDetailHttpService: RoomDetailHttpService,
                private partnerHttpService: PartnerHttpService,
                private costCenterHttpService: CostCenterHttpService,
                private companyHttpService: CompanyHttpService,
                private translate: TranslateService,
                private toastr: ToastsManager,
                private vcr: ViewContainerRef,
                private configValuesHttpService: ConfigValuesHttpService) {
             translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
             this.options = new DatePickerOptions();
             this.toastr.setRootViewContainerRef(vcr);

             this.router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                    if (evt.urlAfterRedirects === '/assetinvdetails') {
                        // console.log('refreshing asset inv details');
                        // console.log(JSON.stringify(evt));
                      //  this.refreshAssets();
                    }
                }
            });
    }

    private view: string;
    // private selectedAssetId: number = 0;
    private assetRowSelection: string = 'single';
    private assetRecoRowSelection: string = 'single';
    private selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    private selectedAssetRecos: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    private selectedAssetInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();
    private selectedAssetRecoInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();
    private mainTitle: string = '';
    private barcodeDateTime: Date = new Date();
    private invState: string = 'Asset States';
    private documentType: string = 'Document Type';
    private assetState: string = 'Operation Types';


    ngOnInit() {
    }

    ngAfterViewInit() {

        this.checkForRefresh();

        // let currentDate: Date = new Date();
        // this.selectedMonth = currentDate.getMonth() - 3;
        // this.selectedYear = currentDate.getFullYear();

        // this.updateSelectedAccMonth();

        // this.assetStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.assetStates = res; });
        // this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });
        // this.documentTypeHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.documentTypes = res; });

       // this.removeItemsWithName(this.documentTypes, 'ACQUISITION');

       // this.refreshAssets();
    }

    removeItemsWithName(items: Array<DocumentType>, name: string): void {
        let j = 0;
        for (let i = 0; i < items.length; i++) {
          const item = items[i];
          if (item.parentCode !== name) {
              items[j] = item;
              j++;
          }
        }

        items.length = j;
      }

    private onErpCodeUpdate(erpCode: string) {
        this.erpCode = erpCode;
        this.checkForRefresh();
    }


    private reconcile() {
        // let assetRecoSave: AssetRecoSave = new AssetRecoSave();
        // assetRecoSave.assetId = this.assetList.selectedItem.Id;
        // assetRecoSave.assetRecoId = this.assetRecoList.selectedItem.id;
        // this.assetHttpService.saveReco(assetRecoSave).subscribe(() => {
        //     this.assetList = null;
        //     this.assetRecoList = null;

        //     this.checkForRefresh();
        //     this.refreshAssetRecoList();
        // });
    }

    private onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
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

    private clearSelection() {
       // this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        this.assetList.selectedItems = this.selectedAssetInvDetails;
        // this.assetRecoList.selectedItems = this.selectedAssetRecoInvDetails;
       // this.selectedAssets = new Array<AssetSimpleDetail>();
    }

    private clearFilters() {

        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedCostCenters = new Array<CostCenter>();
        this.selectedDepartments = new Array<Department>();
        this.selectedEmployees = new Array<Employee>();
        this.selectedLocations = new Array<Location>();
        this.selectedRooms = new Array<Room>();
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.selectedUoms = new Array<Uom>();
        this.selectedAssetClasses = new Array<AssetClass>();
        this.selectedRegions = new Array<Region>();
        this.selectedAdmCenters = new Array<AdmCenter>();
        this.selectedInvStates = new Array<InvState>();
        this.selectedZoneStates = new Array<ZoneState>();
        this.selectedCompanies = new Array<Company>();
        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedSubTypes = new Array<SubType>();
        this.selectedDivisions = new Array<Division>();
        this.selectedAdministrations = new Array<Administration>();
        this.selectedPartners = new Array<Partner>();
        this.filter = '';
        this.filterDoc = '';
        this.filterPO = '';
        this.to =  '';
        this.from = '';
        this.toReception =  '';
        this.fromReception = '';
        this.filterPurchaseDate = '';
        this.filterReceptionToDate = '';
        this.options.clearText;

        this.selectedAssetInvDetails = new Array<AssetInvDetail>();
        this.selectedAssets = new Array<AssetSimpleDetail>();
        // this.filterInv='';
        // this.filterName= '';
        // this.filterPurchaseDate='';
        this.checkForRefresh();
    }

    private onReconcile() {
        this.operationType = OperationType.Reconciliation;
        this.confirmationMessage = 'Reconciliati inregistrarile selectate?';
        this.confirmationModal.show();
    }

    private addNewAsset() {
        this.router.navigate(['/newasset']);
    }

    private addNewOperation() {
        AppData.AssetList = this.selectedAssets;
        // let isInTransfer: number = 0;
        // this.selectedAssets.forEach(asset => {
        //     if (asset.isInTransfer){
        //         this.toastr.warning('Inventory number ' + asset.invNo + ' awaiting validation!');
        //         isInTransfer++;
        //     }
        // });

        // if (isInTransfer > 0){
        //     return;
        // }else{
        //     this.router.navigate(['/newoperation']);
        // }

        this.router.navigate(['/newoperation']);
    }

    private changeRowSelection() {
        if (this.assetRowSelection === "single") {
            this.assetRowSelection = "multiple";
        }
        else {
            this.selectedAssets = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRowSelection = "single";
            this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
            this.updateAssetInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
        }
    }

    private changeRecoRowSelection() {
        if (this.assetRecoRowSelection === "single") {
            this.assetRecoRowSelection = "multiple";
        }
        else {
            this.selectedAssetRecos = new Array<AssetSimpleDetail>();
            // this.selectedAssetId = 0;
            this.assetRecoRowSelection = "single";
            this.updateAssetRecoDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
            this.updateAssetRecoInvDetailSelectionEvent.emit(new Array<AssetInvDetail>());
        }
    }

    private editAsset() {
        let selectedAssetId = this.selectedAssets.length > 0 ? this.selectedAssets[0].id : 0;
        if (selectedAssetId > 0) {
            this.router.navigate(['/asset', selectedAssetId]);
        }
    }

    private editAssetMultiple() {
        let selectedAssetId = this.selectedAssets.length > 0 ? this.selectedAssets[0].id : 0;
        if (selectedAssetId > 0) {
            AppData.AssetList = this.selectedAssets;
            this.router.navigate(['/asset/multiple', selectedAssetId]);
        }
    }

    private onAssetDepDetailSelectionChanged(assets: Array<AssetDepDetail>) {
        // this.selectedAssetId = assets.length === 1 ? assets[0].id : 0;
        this.selectedAssets = new Array<AssetSimpleDetail>();
        assets.forEach((asset: AssetDepDetail) => {
            this.selectedAssets.push(new AssetSimpleDetail(asset.id, asset.invNo, asset.name, '', null,
            asset.partner, asset.sapCode, asset.assetType, asset.assetState, asset.usageStartDate, '', '', 0, null, false, null, null));
        });
    }

    private onAssetSelectionChanged(assets: Array<any>) {
        this.selectedAssetInvDetails = assets;
        this.selectedAssets = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedAssets.push(asset);
        });

        // this.refreshAssetRecoList();
    }

    private onAssetRecoSelectionChanged(assetRecos: Array<any>) {
        this.selectedAssetRecoInvDetails = assetRecos;
        this.selectedAssetRecos = new Array<any>();
        assetRecos.forEach((assetReco: any) => {
            this.selectedAssetRecos.push(assetReco);
        });
    }

    // private refreshAssetRecoList() {
    //     let params: Array<Param> = this.getFilters();
    //     this.assetRecoList.refresh(params);
    // }

    private onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    // private onAssetStateUpdate(assetStateCode: string) {
    //     this.assetStateCode = assetStateCode;

    //     switch(this.assetStateCode) {
    //         case 'ALL':
    //             this.assetStateName = 'Stare gestiune';
    //             break;
    //         case 'SALE':
    //             this.assetStateName = 'Vanzare';
    //             break;
    //         case 'CASSATION':
    //             this.assetStateName = 'Casare';
    //             break;
    //         case 'DONATION':
    //             this.assetStateName = 'Donatie';
    //             break;
    //         case 'OTHERS':
    //             this.assetStateName = 'Altele';
    //             break;

    //     }

    //     this.checkForRefresh();
    // }

    private onAssetStateUpdate(assetStateId: number, assetStatename: string) {
        this.assetStateId = assetStateId;
        this.assetState = assetStatename ;
        this.checkForRefresh();
    }

    private onInvStateUpdate(invStateId: number, invStateName: string) {
        this.invStateId = invStateId;
        this.invState = invStateName ;
        this.checkForRefresh();
    }

    private onDocumentTypeUpdate(documentTypeId: number, documentTypeName: string) {
        this.documentTypeId = documentTypeId;
        this.documentType = documentTypeName ;
        this.checkForRefresh();
    }

    /*begin asset*/
    private assetDetailGoBack() {
        this.mainViewMode = AssetManageMainViewMode.AssetList;
        this.viewMode = AssetManageViewMode.AssetList;
    }

    private assetDetailChangesCanceled() {
        this.assetDetailGoBack();
    }
    /*end asset*/

    private operationDetailGoBack() {
        this.mainViewMode = AssetManageMainViewMode.AssetList;
        this.viewMode = AssetManageViewMode.AssetList;
    }

    private onOperationCanceled() {
        this.operationDetailGoBack();
    }

    private onOperationSaved() {
        this.operationDetailGoBack();
        this.refreshAssets();
    }

    /*begin asset category*/
    private selectAssetCategories() {
        this.assetCategoryListModal.show();
        this.assetCategoryList.selectedItems = this.selectedAssetCategories;
        this.assetCategoryList.refresh(null);
    }

    private removeFromAssetCategorySelection(assetCategory: AssetCategory) {
        let index: number = this.selectedAssetCategories.indexOf(assetCategory);
        this.selectedAssetCategories.splice(index, 1);
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


    /*end asset category*/

        /*begin uom*/
        private selectUoms() {
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


    /*begin asset type*/
    private selectAssetTypes() {
        this.assetTypeListModal.show();
        this.assetTypeList.selectedItems = this.selectedAssetTypes;
        //console.log('ASSETCLASS: ', this.assetTypeList.selectedItems);
        this.assetTypeList.refresh(null);
    }

    private removeFromAssetTypeSelection(assetType: AssetType) {
        let index: number = this.selectedAssetTypes.indexOf(assetType);
        this.selectedAssetTypes.splice(index, 1);
        this.checkForRefresh();
    }

    private clearAssetTypeSelection() {
        this.selectedAssetTypes = new Array<AssetType>();
        this.checkForRefresh();
    }

    private setSelectedAssetTypes() {
        this.selectedAssetTypes = this.assetTypeList.selectedItems;
        this.assetTypeListModal.hide();
        this.checkForRefresh();
    }

    /* end ASSET TYPE */


     /*begin SUB type*/
     private selectSubTypes() {
      this.subTypeListModal.show();
      this.subTypeList.selectedItems = this.selectedSubTypes;
      //console.log('ASSETCLASS: ', this.assetTypeList.selectedItems);
      this.subTypeList.refresh(null);
  }

  private removeFromSubTypeSelection(subType: SubType) {
      let index: number = this.selectedSubTypes.indexOf(subType);
      this.selectedSubTypes.splice(index, 1);
      this.checkForRefresh();
  }

  private clearSubTypeSelection() {
      this.selectedSubTypes = new Array<SubType>();
      this.checkForRefresh();
  }

  private setSelectedSubTypes() {
      this.selectedSubTypes = this.subTypeList.selectedItems;
      this.subTypeListModal.hide();
      this.checkForRefresh();
  }

  /* end SUB TYPE */

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

    /*begin asset class*/
    private selectAssetClasses() {
        this.assetClassListModal.show();
        this.assetClassList.selectedItems = this.selectedAssetClasses;
        // console.log('ASSETCLASS: ', this.assetClassList.selectedItems);
        this.assetClassList.refresh(null);
    }

    private removeFromAssetClassSelection(assetClass: AssetClass) {
        let index: number = this.selectedAssetClasses.indexOf(assetClass);
        this.selectedAssetClasses.splice(index, 1);
        this.checkForRefresh();
    }

    private clearAssetClassSelection() {
        this.selectedAssetClasses = new Array<AssetClass>();
        this.checkForRefresh();
    }

    private setSelectedAssetClasses() {
        this.selectedAssetClasses = this.assetClassList.selectedItems;
        this.assetClassListModal.hide();
        this.checkForRefresh();
    }

    // private assetClassListGoBack() {
    //     this.viewMode = this.mainViewMode;
    // }

    // private assetClassSelectionCanceled() {
    //     this.assetClassListGoBack();
    // }

    // private onAssetClassSelectionChanged(assetClasses: Array<AssetClass>) {
    //     if (assetClasses != null) {
    //         switch(this.mainViewMode) {
    //             case AssetManageMainViewMode.AssetList:
    //                 assetClasses.forEach((assetClass) => {
    //                     let index: number = this.selectedAssetClasses.indexOf(assetClass);
    //                     if (index < 0) this.selectedAssetClasses.push(assetClass);
    //                 });

    //                 this.checkForRefresh();
    //                 break;
    //             case AssetManageMainViewMode.AssetDetail:
    //                 this.assetDetailEntitySelectedEvent.emit(new SelectionResult((assetClasses.length > 0 ? assetClasses[0] : null), "ASSET-CLASS"));
    //                 break;
    //         }
    //     }
    // }

    // private removeFromAssetClassSelection(assetClass: AssetClass) {
    //     var index: number = this.selectedAssetClasses.indexOf(assetClass);
    //     this.selectedAssetClasses.splice(index, 1);

    //     this.checkForRefresh();
    // }

    // private clearAssetClassSelection() {
    //     this.selectedAssetClasses = new Array<AssetClass>();

    //     this.checkForRefresh();
    // }

    // private updateAssetClassSelection() {
    //     this.requestAssetClassSelectionEvent.emit(null);
    //     this.assetClassListGoBack();
    // }

    // private assetClassNeeded() {
    //     this.assetClassRowSelection = "single";
    //     let selectedAssetClass: Array<AssetClass> = new Array<AssetClass>();
    //     //selectedAssetClass.push(new AssetClass());
    //     this.requestAssetClassRefreshEvent.emit(null);
    //     this.updateAssetClassSelectionEvent.emit(selectedAssetClass);
    //     this.viewMode = AssetManageViewMode.AssetClassList;
    // }
    /*end asset class*/

     /*begin costcenter*/
    private selectCostCenters() {
        this.costCenterListModal.show();
        this.costCenterList.selectedItems = this.selectedCostCenters;
        this.costCenterList.refresh(null);
    }

    private removeFromCostCenterSelection(costCenter: CostCenter) {
        var index: number = this.selectedCostCenters.indexOf(costCenter);
        this.selectedCostCenters.splice(index, 1);
        this.checkForRefresh();
    }

    private clearCostCenterSelection() {
        this.selectedCostCenters = new Array<CostCenter>();
        this.checkForRefresh();
    }

    private setSelectedCostCenters() {
        this.selectedCostCenters = this.costCenterList.selectedItems;
        this.costCenterListModal.hide();
        this.checkForRefresh();
    }
    /*end costcenter*/

    /*begin partner*/
    private selectPartners() {
        this.partnerListModal.show();
        this.partnerList.selectedItems = this.selectedPartners;
        this.partnerList.refresh(null);
    }

    private removeFromPartnerSelection(partner: Partner) {
        var index: number = this.selectedPartners.indexOf(partner);
        this.selectedPartners.splice(index, 1);
        this.checkForRefresh();
    }

    private clearPartnerSelection() {
        this.selectedPartners = new Array<Partner>();
        this.checkForRefresh();
    }

    private setSelectedPartners() {
        this.selectedPartners = this.partnerList.selectedItems;
        this.partnerListModal.hide();
        this.checkForRefresh();
    }
    /*end partner*/

    /*begin department*/
    private selectDepartments() {
        this.departmentListModal.show();
        this.departmentList.selectedItems = this.selectedDepartments;
        this.departmentList.refresh(null);
    }

    private removeFromDepartmentSelection(department: Department) {
        let index: number = this.selectedDepartments.indexOf(department);
        this.selectedDepartments.splice(index, 1);
        this.checkForRefresh();
    }

    private clearDepartmentSelection() {
        this.selectedDepartments = new Array<Department>();
        this.checkForRefresh();
    }

    private setSelectedDepartments() {
        this.selectedDepartments = this.departmentList.selectedItems;
        this.departmentListModal.hide();
        this.checkForRefresh();
    }
    /*end department*/

     /* begin employee */

    private selectEmployees() {

        let selectedDivisions: Array<Division> = null;
        let selectedCostCenters: Array<CostCenter> = null;
        selectedDivisions = this.selectedDivisions;
        selectedCostCenters = this.selectedCostCenters;
        let params = new Array<Param>();
        params.push(new Param("divisionIds", AppUtils.getIdsList<Division, number>(selectedDivisions)));
        params.push(new Param("costCenterIds", AppUtils.getIdsList<CostCenter, number>(selectedCostCenters)));
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployees;
        this.employeeList.refresh(params);
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


     /* begin Company */

     private selectCompanies() {
        this.companyListModal.show();
        this.companyList.selectedItems = this.selectedCompanies;
        this.companyList.refresh(null);
    }

    private removeFromCompanySelection(company: Company) {
        let index: number = this.selectedCompanies.indexOf(company);
        this.selectedCompanies.splice(index, 1);
        this.checkForRefresh();
    }

    private clearCompanySelection() {
        this.selectedCompanies = new Array<Company>();
        this.checkForRefresh();
    }

    private setSelectedCompanies() {
        this.selectedCompanies = this.companyList.selectedItems;
        this.companyListModal.hide();
        this.checkForRefresh();
    }

    /* enf Company */


     /* begin InvState */

     private selectInvStates() {
        this.invStateListModal.show();
        this.invStateList.selectedItems = this.selectedInvStates;
        this.invStateList.refresh(null);
    }

    private removeFromInvStateSelection(invState: InvState) {
        let index: number = this.selectedInvStates.indexOf(invState);
        this.selectedInvStates.splice(index, 1);
        this.checkForRefresh();
    }

    private clearInvStateSelection() {
        this.selectedInvStates = new Array<InvState>();
        this.checkForRefresh();
    }

    private setSelectedInvStates() {
        this.selectedInvStates = this.invStateList.selectedItems;
        this.invStateListModal.hide();
        this.checkForRefresh();
    }

    /* enf InvState */


    /* begin ZoneState */

    private selectZoneStates() {
        this.zoneStateListModal.show();
        this.zoneStateList.selectedItems = this.selectedZoneStates;
        this.zoneStateList.refresh(null);
    }

    private removeFromZoneStateSelection(zoneState: ZoneState) {
        let index: number = this.selectedZoneStates.indexOf(zoneState);
        this.selectedZoneStates.splice(index, 1);
        this.checkForRefresh();
    }

    private clearZoneStateSelection() {
        this.selectedZoneStates = new Array<ZoneState>();
        this.checkForRefresh();
    }

    private setSelectedZoneStates() {
        this.selectedZoneStates = this.zoneStateList.selectedItems;
        this.zoneStateListModal.hide();
        this.checkForRefresh();
    }

    /* enf InvState */

   /* begin location */

    private selectLocations() {
        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        selectedRegions = this.selectedRegions;
        selectedAdmCenters = this.selectedAdmCenters;
       // console.log(this.selectedAdmCenters);
        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));

        this.locationListModal.show();
        this.locationList.selectedItems = this.selectedLocations;
        this.locationList.refresh(params);
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
        let selectedLocations: Array<Location> = null;
        let selectedRegions: Array<Region> = null;
        let selectedAdmCenters: Array<AdmCenter> = null;
        selectedLocations = this.selectedLocations;
        selectedRegions = this.selectedRegions;
        selectedAdmCenters = this.selectedAdmCenters;


        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = this.selectedRooms;
        this.roomList.refresh(params);
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

    /* begin administrTION */

    private selectAdministrations() {
        let selectedAdministrations: Array<Administration> = null;
        let selectedDivisions: Array<Division> = null;
        selectedDivisions = this.selectedDivisions;


        let params = new Array<Param>();
        params.push(new Param("divisionIds", AppUtils.getIdsList<Division, number>(selectedDivisions)));

        this.administrationListModal.show();
        this.administrationList.selectedItems = this.selectedAdministrations;
        this.administrationList.refresh(params);
    }

    private removeFromAdministrationSelection(administration: Administration) {
        let index: number = this.selectedAdministrations.indexOf(administration);
        this.selectedAdministrations.splice(index, 1);
        this.checkForRefresh();
    }

    private clearAdministrationSelection() {
        this.selectedAdministrations = new Array<Administration>();
        this.checkForRefresh();
    }

    private setSelectedAdministrations() {
        this.selectedAdministrations = this.administrationList.selectedItems;
        this.administrationListModal.hide();
        this.checkForRefresh();
    }

    /* enf room */

    private checkForRefresh() {
        this.clearSelection();
        this.refreshAssets();
        // this.refreshAssetRecoList();
    }

    private deleteAsset(){
        if(confirm('Esti sigur ca vrei sa stergi acest obiect?')){
            this.assetHttpService.deleteAsset(this.selectedAssets[0].id).subscribe((res) => {});
        }

        this.checkForRefresh();
}

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();

       // if (this.depView) this.requestAssetDepDetailRefreshEvent.emit(params);
        // if (this.invView) this.requestAssetInvDetailRefreshEvent.emit(params);
        this.assetList.refresh(params);
        // this.assetRecoList.refresh(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: AssetFilter = new AssetFilter();

        // let assetCategoryIds: Array<number> = new Array<number>();
        // let assetClassIds: Array<number> = new Array<number>();
        // let partnerIds: Array<number> = new Array<number>();
        // let departmentIds: Array<number> = new Array<number>();
    	// let employeeIds: Array<number> = new Array<number>();
        // let locationIds: Array<number> = new Array<number>();
	    // let roomIds: Array<number> = new Array<number>();
        // let costCenterIds: Array<number> = new Array<number>();

        if (this.selectedAssetCategories != null) {
            assetFilter.assetCategoryIds = new Array<number>();
            this.selectedAssetCategories.forEach((assetCategory) => {
                assetFilter.assetCategoryIds.push(assetCategory.id);
            });
        }

        if (this.selectedUoms != null) {
            assetFilter.uomIds = new Array<number>();
            this.selectedUoms.forEach((uom) => {
                assetFilter.uomIds.push(uom.id);
            });
        }

        if (this.selectedAssetClasses != null) {
            assetFilter.assetClassIds = new Array<number>();
            this.selectedAssetClasses.forEach((assetClass) => {
                assetFilter.assetClassIds.push(assetClass.id);
            });
        }


        if (this.selectedAssetTypes != null) {
            assetFilter.assetTypeIds = new Array<number>();
            this.selectedAssetTypes.forEach((assetType) => {
                assetFilter.assetTypeIds.push(assetType.id);
            });
        }

        if (this.selectedSubTypes != null) {
          assetFilter.subTypeIds = new Array<number>();
          this.selectedSubTypes.forEach((subType) => {
              assetFilter.subTypeIds.push(subType.id);
          });
      }

        if (this.selectedDivisions != null) {
            assetFilter.divisionIds = new Array<number>();
            this.selectedDivisions.forEach((division) => {
                assetFilter.divisionIds.push(division.id);
            });
        }

        if (this.selectedAdministrations != null) {
            assetFilter.administrationIds = new Array<number>();
            this.selectedAdministrations.forEach((administration) => {
                assetFilter.administrationIds.push(administration.id);
            });
        }

        if (this.selectedPartners != null) {
            assetFilter.partnerIds = new Array<number>();
            this.selectedPartners.forEach((partner) => {
                assetFilter.partnerIds.push(partner.id);
            });
        }

        if (this.selectedDepartments != null) {
            assetFilter.departmentIds = new Array<number>();
            this.selectedDepartments.forEach((department) => {
                assetFilter.departmentIds.push(department.id);
            });
        }

        if (this.selectedCostCenters != null) {
            assetFilter.costCenterIds = new Array<number>();
            this.selectedCostCenters.forEach((costcenter) => {
                assetFilter.costCenterIds.push(costcenter.id);
            });
        }

        if (this.selectedEmployees != null) {
            assetFilter.employeeIds = new Array<number>();
            this.selectedEmployees.forEach((employee) => {
                assetFilter.employeeIds.push(employee.id);
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

        if (this.selectedCompanies != null) {
            assetFilter.companyIds = new Array<number>();
            this.selectedCompanies.forEach((company) => {
                assetFilter.companyIds.push(company.id);
            });
        }

        if (this.selectedInvStates != null) {
            assetFilter.invStateIds = new Array<number>();
            this.selectedInvStates.forEach((invState) => {
                assetFilter.invStateIds.push(invState.id);
            });
        }


        if (this.selectedZoneStates != null) {
            assetFilter.zoneStateIds = new Array<number>();
            this.selectedZoneStates.forEach((zoneState) => {
                assetFilter.zoneStateIds.push(zoneState.id);
            });
        }


        // params.push(new Param("assetCategoryIds", JSON.stringify(assetCategoryIds)));
        // params.push(new Param("assetClassIds", JSON.stringify(assetClassIds)));
        // params.push(new Param("partnerIds", JSON.stringify(partnerIds)));
        // params.push(new Param("departmentIds", JSON.stringify(departmentIds)));
	    // params.push(new Param("employeeIds", JSON.stringify(employeeIds)));
	    // params.push(new Param("locationIds", JSON.stringify(locationIds)));
        // params.push(new Param("roomIds", JSON.stringify(roomIds)));
        // params.push(new Param("costCenterIds", JSON.stringify(costCenterIds)));
        // params.push(new Param("filter", this.filter));
        // params.push(new Param("custody", ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));

        // if (this.assetStateId > 0)
        // {
        //     assetFilter.assetStateIds = new Array<number>();
        //     assetFilter.assetStateIds.push(this.assetStateId);
        // }
        // else
        // {
        //     assetFilter.assetStateIds = null;
        // }

        // if (this.invStateId > 0)
        // {
        //     assetFilter.invStateIds = new Array<number>();
        //     assetFilter.invStateIds.push(this.invStateId);
        // }
        // else
        // {
        //     assetFilter.invStateIds = null;
        // }

        if (this.documentTypeId > 0)
        {
            assetFilter.documentTypeIds = new Array<number>();
            assetFilter.documentTypeIds.push(this.documentTypeId);
        }
        else
        {
            assetFilter.documentTypeIds = null;
        }
        assetFilter.filter = this.filter;
        assetFilter.filterDoc = this.filterDoc;
        assetFilter.filterPO = this.filterPO;
        assetFilter.accMonthId = this.selectedAccMonth != null ? this.selectedAccMonth.id : null;
        assetFilter.custody = ((this.custody === '-') ? null : (this.custody === 'YES' ? 'true' : 'false'));
        assetFilter.filterName = this.filterName;
        assetFilter.filterInv = this.filterInv;
        assetFilter.filterPurchaseDate = this.filterPurchaseDate ? this.filterPurchaseDate : 'false' ;
        assetFilter.filterReceptionToDate = this.filterReceptionToDate ? this.filterReceptionToDate : 'false' ;
        assetFilter.fromDate = new Date(this.from);
        assetFilter.toDate = new Date(this.to);
        assetFilter.fromReceptionDate = new Date(this.fromReception);
        assetFilter.toReceptionDate = new Date(this.toReception);
        // assetFilter.showReco = this.showReco;
        assetFilter.erpCode = ((this.erpCode === '-') ? null : (this.erpCode === 'DA' ? true : false));
        params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));
       // console.log(assetFilter);
        return params;
    }

    private onChangeFrom(event) {
        this.from = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }

    private onChangeTo(event) {
        this.to = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }


    private onChangeReceptionFrom(event) {
        this.fromReception = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }

    private onChangeReceptionTo(event) {
        this.toReception = JSON.stringify(event.formatted);
        this.checkForRefresh();
    }

    private showInvNoRegistryReport() {
        window.open(AppConfig.reportingServer +  'Report.aspx/?report=invnoregistry');
    }

    private doImportV1() {
        if (this.importIndex < this.importLinesV1.length) {
          //  console.log(JSON.stringify(this.importLinesV1));
            this.assetHttpService.uploadV1(this.importLinesV1[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportV1();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLinesV1 = new Array<AssetImportV1>();
        }
    }

    private doImportV2() {
        if (this.importIndex < this.importLinesV2.length) {
            this.assetHttpService.uploadV2(this.importLinesV2[this.importIndex]).subscribe((data) => {
                this.importIndex = this.importIndex + 1;
                this.doImportV2();
            });
        }
        else {
            this.fileEvent = null;
            this.importDataModal.hide();
            this.importIndex = 0;
            this.importLinesV2 = new Array<AssetImportV2>();
        }
    }

    private fileEvent: any = null;
    private fileEventOS: any = null;
    private fileEventSN: any = null;

    private loadFile(ev) {
        this.fileEvent = ev;
    }

    private loadFileOS(ev) {
        this.fileEventOS = ev;
    }

    private loadFileSN(ev) {
        this.fileEventSN = ev;
    }

    private loadFileCassation(ev) {
        this.fileEvent = ev;
    }

    private parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    private parseStartDate(dateString: string): Date {
        if (dateString) {
            this.transferStartDate = new Date(dateString);
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

    private importData() {
      //  console.log('import type: ' + AppConfig.IMPORT_TYPE);
        switch (AppConfig.IMPORT_TYPE) {
            case "V1":
                this.importDataV1();
                break;
            case "V2":
                this.importDataV2();
                break;
            default:
                break;
        }
    }

    private upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.assetHttpService
                .import(fileToUpload)
                .subscribe(res => {
                     // alert(res);
                     if(res.statusCode === 200){
                        this.toastr.success('Importul a fost finalizat cu success'!);
                        this.uploadFinished.emit(null);
                     } else{
                        this.toastr.error('Eroare import'!);
                        this.uploadFinished.emit(null);
                     }
                }, (error) => {
                    this.toastr.error('Eroare: ' + error);
                });
        }
    }

    private uploadCassation() {
        let fi = this.fileInputCassation.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.assetHttpService
                .importCassation(fileToUpload)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                });
        }
    }

    private showPifList(): void {
        let url: string = '';
        const token = localStorage.getItem('id_token');
        const tokenPayload = decode(token);
        const userId = tokenPayload.sub;
        console.log(this.assetList.selectedItem.pifNumber + ' ' + this.assetList.selectedItem);
        console.log(this.selectedAssets[0].pifNumber);
        url = `${AppConfig.reportingServer}Report.aspx/?report=pifReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}`;
        window.open(url);
      }

    private showPifITList(): void {
        let url: string = '';
        const token = localStorage.getItem('id_token');
        const tokenPayload = decode(token);
        const userId = tokenPayload.sub;
        url = `${AppConfig.reportingServer}Report.aspx/?report=pifitReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}`;
        window.open(url);
      }

      private showNIRList(): void {
        let url: string = '';
        const token = localStorage.getItem('id_token');
        const tokenPayload = decode(token);
        const userId = tokenPayload.sub;

        url = `${AppConfig.reportingServer}Report.aspx/?report=nirReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}`;
        window.open(url);
      }

      private showPvList(): void {

        if (this.isMonitor) {
            if(confirm('Esti sigur ca este monitor?')){

              if (this.isMonitorMetal) {
                if(confirm('Esti sigur ca este monitor cu brat metalic?')){
                  let url: string = '';
                  const token = localStorage.getItem('id_token');
                  const tokenPayload = decode(token);
                  const userId = tokenPayload.sub;
                  url = `${AppConfig.reportingServer}Report.aspx/?report=pvReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}&isMonitor=${this.isMonitor}&isMonitorMetal=${this.isMonitorMetal}`;
                  window.open(url);
              }
              } else {
                let url: string = '';
                const token = localStorage.getItem('id_token');
                const tokenPayload = decode(token);
                const userId = tokenPayload.sub;
                url = `${AppConfig.reportingServer}Report.aspx/?report=pvReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}&isMonitor=${this.isMonitor}&isMonitorMetal=${this.isMonitorMetal}`;
                window.open(url);
              }

            }
        } else {
            let url: string = '';
            const token = localStorage.getItem('id_token');
            const tokenPayload = decode(token);
            const userId = tokenPayload.sub;
            url = `${AppConfig.reportingServer}Report.aspx/?report=pvReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}&isMonitor=${this.isMonitor}&isMonitorMetal=${this.isMonitorMetal}`;
            window.open(url);
        }


      }


      private showITPvList(): void {

        if (this.isMonitor) {
            if(confirm('Esti sigur ca este monitor?')){
                let url: string = '';
                const token = localStorage.getItem('id_token');
                const tokenPayload = decode(token);
                const userId = tokenPayload.sub;
                url = `${AppConfig.reportingServer}Report.aspx/?report=pvitReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}&isMonitor=${this.isMonitor}`;
                window.open(url);
            }
        } else {
            let url: string = '';
            const token = localStorage.getItem('id_token');
            const tokenPayload = decode(token);
            const userId = tokenPayload.sub;
            url = `${AppConfig.reportingServer}Report.aspx/?report=pvitReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}&isMonitor=${this.isMonitor}`;
            window.open(url);
        }


      }

    private importDataV1() {

        if (this.fileEvent === null) return;

        alasql.promise(`select [ASSET SEQ NO-A] as InvNo1,
                            [ASSET SEQ NO] as InvNo2,
                            [ASSET COMPONENT] as InvNo3,
                            [GENERAL CATEGORY] as AssetCategoryCode,
                            [FA ACCOUNT DESCRIPTION] as AssetCategoryName,
                            [QUANTITY] as Quantity,
                            [BRANCH CODE] as LocationCode,
                            [COST CENTER] as CostCenterCode,
                            [ASSET DESCRIPTION] as AssetName,
                            [ACQUISITION DATE] as PurchaseDate,
                            CAST([ORIGINAL COST] AS NUMBER) as [ValueInv],
                            [SUPPLIER] as PartnerName,
                            [TAX NUMBER] as FiscalCode,
                            [DOCUMENT NUMBER] as DocNo1,
                            [SERIAL NUMBER] as SerialNumber,
                            [DISPOSITION DATE] as AssetState,
                            [FA ACCOUNT] as AssetType,
                            CAST([NET BOOK VALUE] AS NUMBER) as [ValueRem]
                            from FILE(?, {headers: true})`, [this.fileEvent])
        .then((importLines: Array<AssetImportV1>) => {

                this.importDataModal.show();

                this.importIndex = 0;
                this.importLinesV1 = importLines;
                this.noOfItems = importLines.length;
           //  console.log(importLines);
                this.doImportV1();
        });

    }

    private importDataV2() {

        if (this.fileEvent === null) return;

        alasql.promise(`select
                            [Numar inventar] as [InvNo],
                            [Descriere mijloc fix] as [Name],
                            [Nr serie mijloc fix] as [SerialNumber],
                            [Centru de cost] as [CostCenterCode],
                            [Judet] as [AdmCenterName],
                            [Camera] as [RoomName],
                            [Data capitalizare] as [PurchaseDate],
                            [Valoare mijloc fix] as [ValueInv],
                            [Amortizarea acumulata] as [ValueDep],
                            [UM] as [Uom],
                            [Scriptic] as [Quantity],
                            [Custodie] as [Custody],
                            [Marca personal] as [InternalCode],
                            [Nume salariat] as [EmployeeFullName]
                            from FILE(?, {headers: true})`, [this.fileEvent])
            .then((importLines: Array<AssetImportV2>) => {

                //console.log(JSON.stringify(importLines));

                this.importDataModal.show();

                this.importIndex = 0;
                this.importLinesV2 = importLines;
                this.noOfItems = importLines.length;

                this.doImportV2();
        });

    }

      private exportToExcel() {

        let params: Array<Param> = this.getFilters();

        this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
            (assetInvDetails: PagedResult<AssetInvDetail>) => {

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
                        adm->employee->internalCode as [Marca],
                        adm->employee->firstName as [Prenume],
                        adm->employee->lastName as [Nume],
                        adm->location->name as [Cladire],
                        adm->costCenter->code as [Centru de cost],
                        adm->costCenter->name as [Denumire entru de cost]
                        INTO XLSX("mijloace_fixe.xlsx",?) FROM ?`, [ options, assetInvDetails.items ]);

            });
    }

    private exportToExcelInOtp() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetHttpService
            .exportOtp(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Export.xlsx');
    });

}

private exportSocgen() {

    let params: Array<Param> = null;

    params = this.getFilters();
    this.assetHttpService
        .export(params)
        .subscribe((blob) => {
    fileSaveAs(blob, 'Export.xlsx');
});
}


private exportSocgenMarley() {
  this.showExportBtn = false;
  let params: Array<Param> = null;

  params = this.getFilters();
  this.assetHttpService
      .exportMarley(params)
      .subscribe((blob) => {
  fileSaveAs(blob, 'Marley.xlsx');
  this.showExportBtn = true;
});
}

private exportSocgenIT() {
    this.showExportITBtn = false;
    let params: Array<Param> = null;

    params = this.getFilters();
    this.assetHttpService
        .exportIT(params)
        .subscribe((blob) => {
    fileSaveAs(blob, 'Export IT.xlsx');
    this.showExportITBtn = true;
  });
  }



    private exportToExcelInBnr() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetHttpService
            .exportIn(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Intrari.xlsx');
    });


                // let params: Array<Param> = this.getFilters();

                // this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
                //     (assetInvDetails: PagedResult<AssetInvDetail>) => {

                //         //console.log(JSON.stringify(assetInvDetails));

                //         let options = {
                //             sheetid: 'Intrari',
                //             headers: true,
                //             column: { style: { Font: { Bold: '1' } } },
                //             rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                //             cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                //         };

                //         alasql.fn.datetime = function(dateStr) {
                //             var date = new Date(dateStr);
                //             date.toISOString().substring(0, 10);
                //             return date.toLocaleDateString();
                //         };

                //         alasql(`SELECT id as [Id],
                //                 invNo as [Numar inventar],
                //                 serialNumber as [Serie],
                //                 name as [Denumire],
                //                 quantity as [Cantitate],
                //                 CAST([valueInv] AS NUMBER) as [Valoare intrare],
                //                 CAST([valueRem] AS NUMBER) as [Valoare inventar],
                //                 datetime(purchaseDate) as [Data intrare],
                //                 adm->location->code as [Cod Cladire],
                //                 adm->location->name as [Denumire Cladire],
                //                 adm->room->name as [Camera],
                //                 adm->assetType->name as [Tip MF/OI],
                //                 adm->employee->internalCode as [Marca],
                //                 adm->employee->lastName as [Nume],
                //                 adm->employee->firstName as [Prenume],
                //                 adm->assetCategory->code as [Cod categorie],
                //                 adm->assetCategory->name as [Denumire categorie],
                //                 adm->costCenter->code as [Cod centru de cost],
                //                 adm->costCenter->name as [Denumire centru de cost]
                //                 INTO XLSX("mijloace_fixe.xlsx",?) FROM ?`, [ options, assetInvDetails.items ]);

                //     });
            }

            private exportToExcelOutBnr() {



                // let params: Array<Param> = this.getFilters();

                // this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
                //     (assetInvDetails: PagedResult<AssetInvDetail>) => {

                //         //console.log(JSON.stringify(assetInvDetails));

                //         let options = {
                //             sheetid: 'Intrari',
                //             headers: true,
                //             column: { style: { Font: { Bold: '1' } } },
                //             rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                //             cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                //         };

                //         alasql.fn.datetime = function(dateStr) {
                //             let date = new Date(dateStr);
                //             //date.toISOString().substring(0, 10);
                //             return date.toLocaleDateString();
                //         };

                //         alasql(`SELECT  [Nr. crt],
                //                 'iesire' as [Tip op],
                //                 datetime(document->documentDate) as [Luna],
                //                 adm->assetType->name as [Cat Cont],
                //                 invNo as [Nr. inv],
                //                 name as [Descriere],
                //                 adm->region->code + '.' + adm->location->code + '.' + adm->room->code as [Locatie],
                //                 adm->region->name as [Gestiune responsabila (1)],
                //                 adm->location->name as [Gestiune responsabila (2)],
                //                 adm->costCenter->code as [Centrul Cost],
                //                 adm->employee->lastName + ' ' + adm->employee->firstName as [Responsabil],
                //                 adm->employee->internalCode as [Numar marca],
                //                 datetime(purchaseDate) as [Data punere in functiune],
                //                 datetime(document->documentDate) as [Data scoatere din functiune],
                //                 quantity as [Unitati],
                //                 CAST([valueInv] AS NUMBER) as [Valoare],
                //                 CAST(dep->[valueDepYTD] AS NUMBER) as [Amortizare cumulata],
                //                 CAST([valueInv] AS NUMBER) - CAST(dep->[valueDepYTD] AS NUMBER) AS  [Profit/Pierdere]
                //                 INTO XLSX("Iesiri.xlsx",?) FROM ?`, [ options, assetInvDetails.items ]);

                //                 console.log(JSON.stringify(assetInvDetails.items));
                //     });


                let params: Array<Param> = null;

                params = this.getFilters();
                this.assetHttpService
                    .exportOut(params)
                    .subscribe((blob) => {
                fileSaveAs(blob, 'Iesiri.xlsx');
            });
            }

            private exportToExcelOtp() {

                let params: Array<Param> = this.getFilters();

                this.assetHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
                    (assetInvDetails: PagedResult<AssetInvDetail>) => {

                        // console.log(JSON.stringify(assetInvDetails));

                        let options = {
                            sheetid: 'Intrari',
                            headers: true,
                            column: { style: { Font: { Bold: '1' } } },
                            rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                            cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                        };

                        alasql.fn.datetime = function(dateStr) {
                            var date = new Date(dateStr);
                            date.toISOString().substring(0, 10);
                            return date.toLocaleDateString();
                        };

                        alasql(`SELECT id as [Id],
                                invNo as [Numar inventar],
                                serialNumber as [Serie],
                                name as [Denumire],
                                quantity as [Cantitate],
                                adm->location->code as [Cod Cladire],
                                adm->location->name as [Denumire Cladire],
                                adm->assetType->name as [Tip MF/OI]
                                INTO XLSX("mijloace_fixe.xlsx",?) FROM ?`, [ options, assetInvDetails.items ]);
                    });
            }

    // private exportTransfersCCToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetInvDetailHttpService.get(1, 1000000, 'invNo', 'asc', params, null).subscribe(
    //         (assetInvDetails: PagedResult<AssetInvDetail>) => {

    //             //console.log(JSON.stringify(assetInvDetails));

    //             let options = {
    //                 sheetid: 'Template transf centru de cost',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    // alasql("SELECT  3 as [Property Type],[Asset Seq A],invNo as [Asset Seq No N],0 as [Asset Component],costCenterName as [Cost Center],[General Category],[Category],[Sub Category],costCenterName as [Branch],1 as [Quantity] INTO XLSX('template Transfer1.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
    //                           this.transferStartDate + "') AND DATE(modifiedAt) < DATE('"
    //                         + this.transferEndDate + "')"
    //                         , [ options, assetInvDetails.items ]);

    //         });
    // }

    // private trackByCode(index: number, tableItem: any): string {
    //             return tableItem.code;
    //     }

    // private exportTransfersCategToExcel() {

    //     // let params: Array<Param> = this.getFilters();

    //     this.assetInvDetailHttpService.get(1, 1000000, 'invNo', 'asc', [], null).subscribe(
    //         (assetInvDetails: PagedResult<AssetInvDetail>) => {
    //             console.log(this.transferStartDate);
    //             console.log(this.transferEndDate);
    //             //console.log(JSON.stringify(assetInvDetails));

    //             let options = {
    //                 sheetid: 'Template transf categorie',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql("SELECT 3 as [Property Type],[Asset Seq A],invNo as [Asset Seq No N],0 as [Asset Component],[Cost Center],33 as [General Category],assetCategoryId as [Category],1 as [Sub Category],[Branch],1 as [Quantity]INTO XLSX('template Transfer2.xlsx',?) FROM ?   WHERE DATE(modifiedAt) > DATE('" +
    //                         this.transferStartDate +"') AND DATE(modifiedAt) < DATE('"
    //                         + this.transferEndDate + "')"
    //                         , [ options, assetInvDetails.items ]);

    //         });
    // }

    // private generateBarcodes() {
    //     $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //             format: 'CODE128',
    //             displayValue: false,
    //             marginTop: -1,
    //             marginRight: 0,
    //             marginBottom: -1,
    //             marginLeft: 0,
    //             width: 1,
    //             height: 48,
    //             font: 'arial'
    //             });
    //         });
    // }

    private generateBarcodes() {
        $('.barcode').each((index) => {
            jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
                format: 'CODE128',
                displayValue: false,
                marginTop: -1,
                marginRight: 0,
                marginBottom: -1,
                marginLeft: 0,
                width: 2,
                height: 70,
                font: 'arial'
                });
            });
    }

    // private generateBarcodes() {
    //     $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //             format: 'CODE128',
    //             displayValue: false,
    //             marginTop: -1,
    //             marginRight: 0,
    //             marginBottom: -1,
    //             marginLeft: 0,
    //             width: 2,
    //             height: 60,
    //             font: 'arial'
    //             });
    //         });
    // }  // ORIGINAL

    // private generateBarcode() {
    //     console.log(JSON.stringify(this.selectedAssets));
    //       $('.barcode').each((index) => {
    //         jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
    //         format: 'CODE128',
    //         displayValue: true,
    //         marginTop: 40,
    //         marginRight: 5,
    //         marginBottom: 40,
    //         fontSize: 44,
    //         width: 4,
    //         height: 110,
    //         font: 'arial',
    //         textAlign: 'center'
    //     });
    // });
    // }

    private printLabel (){
        let label = new Array<PrintLabel>();
        this.selectedAssets.forEach(asset => {
            let labelPush = new PrintLabel();
            labelPush.invNo = asset.invNo;
            labelPush.description = asset.name;
            labelPush.purchaseDate = asset.purchaseDate;
            labelPush.sapCode = asset.sapCode;
            labelPush.serialNumber = asset.serialNumber
            label.push(labelPush);
        });

        this.assetHttpService.printLabel(label).subscribe();
    }

    private printBarcodeLabels() {
        // let controlId: string = '#assetBarcodeLabel';
        // jsbarcode($(controlId)[0], this.assetFullDetail.invNo, {
        //     format: 'CODE128',
        //     displayValue: true,
        //     marginTop: 0,
        //     marginRight: 5,
        //     fontSize: 16,
        //     width: 2,
        //     height: 70,
        //     font: 'arial',
        //     textAlign: 'center'
        // });

        this.generateBarcodes();
      //  console.log('SELECTED ASSETS', this.selectedAssets);
        let popupWinindow: any = null;

        let innerContents = document.getElementById('barcodes').innerHTML;
        // let innerContents = '^XA^PW400^LL200^FO20,20^A0N,30,30^FDThis is a TEST^FS^XZ';
        // console.log(innerContents);
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        // popupWinindow.document.write('<html><head><link rel="stylesheet" /></head><body onload="window.print()">' +'<div style="text-align: center">' + innerContents + '</div>' + '</html>');
        popupWinindow.document.write('<html><head><link rel="stylesheet" /></head><body onload="window.print()">' + innerContents + '</html>');
        popupWinindow.document.close();
    }

    private createBarcodeLabelsPdf() {

        $('.barcode').each((index) => {
            jsbarcode($('.barcode')[index], this.selectedAssets[index].invNo, {
                format: "CODE128",
                displayValue: true,
                 margin: 10,
                 fontSize: 30,
                 width: 2,
                 height:90,
                 font: "fantasy"
              });
        });

        var pdf = new jsPDF('l', 'mm', 'a0');

        // console.log(JSON.stringify($('#barcodeLabels')));

          let source = $('#barcodes')[0];

          let specialElementHandlers = {
            // element with id of "bypass" - jQuery style selector
            '#bypassme': function(element, renderer) {
              // true = "handled elsewhere, bypass text extraction"
              return true
            }
          };
          let margins = {
            top: 10,
            bottom: 400,
            left: 20,
            width: 150
          };
          // all coords and widths are in jsPDF instance's declared units
          // 'inches' in this case
          pdf.fromHTML(
            source, // HTML string or DOM elem ref.

            margins.left, // x coord
            margins.top, { // y coord
              'width': margins.width, // max width of content on PDF
              'elementHandlers': specialElementHandlers
            },

            function(dispose) {
              // dispose: object with X, Y of the last line add to the PDF
              //          this allow the insertion of new lines after html


              pdf.save('barcodes.pdf');

            }, margins);

    }

    // private updateCheckMinus(checked: boolean) {
    //     if (checked) this.showReco = true; else this.showReco = false;
    //     this.checkForRefresh();
    // }

    private isMonitors(state: boolean) {
        this.isMonitor = state;
    }

    private isMetalicMonitors(state: boolean) {
      this.isMonitorMetal = state;
  }

  private uploadAsset() {

    this.uploadModal.show();
}

public loadFileAdm(ev) {
    this.fileEventSupplier = ev;
}

public uploadAdm() {
    this.uploadModal.hide();
    this.importDataAdm();
}


public importDataAdm() {

    if (this.fileEventSupplier === null) return;

    alasql.promise(`select
                        [RO] as [InvNo],
                        CASE WHEN [SERIALNUMBER] = 'null' THEN '' ELSE [SERIALNUMBER] END as [SerialNumber],
                        [BRAND] as [Brand],
                        [MODEL] as [Model],
                        [ZONE] as [Zone],
                        CAST([IGG] AS NVARCHAR) as [InternalCode],
                        [STATUS] as [InvState],
                        [OS] as [Os]
                        from FILE(?, {headers: true})`, [this.fileEventSupplier])
        .then((importLines: Array<AssetImportIT>) => {

            this.importDataSupplierModal.show();

            this.importIndex = 0;
            this.importMarkScanAdmLines = importLines;
            this.noOfItems = importLines.length;

            this.doImportMarkScanAdm();
    });

}

public doImportMarkScanAdm() {
    if (this.importIndex < this.importMarkScanAdmLines.length) {
        this.assetHttpService.uploadMarkScanAdm(this.importMarkScanAdmLines[this.importIndex]).subscribe((data) => {
            this.importIndex = this.importIndex + 1;
            this.doImportMarkScanAdm();
        });
    }
    else {
        this.fileEventSupplier = null;
        this.importDataSupplierModal.hide();
        this.importIndex = 0;
        this.importMarkScanAdmLines = new Array<AssetImportIT>();
        this.checkForRefresh();
    }
}


public uploadOS() {
    this.uploadModal.hide();
    this.importDataOS();
}


public importDataOS() {

    if (this.fileEventOS === null) return;

    alasql.promise(`select
                        [RO] as [InvNo],
                        [OS] as [OS]
                        from FILE(?, {headers: true})`, [this.fileEventOS])
        .then((importLines: Array<AssetImportOS>) => {

            this.importDataOSModal.show();

            this.importIndex = 0;
            this.importOSLines = importLines;
            this.noOfItems = importLines.length;

            this.doImportOS();
    });

}

public doImportOS() {
    if (this.importIndex < this.importOSLines.length) {
        this.assetHttpService.uploadOS(this.importOSLines[this.importIndex]).subscribe((data) => {
            this.importIndex = this.importIndex + 1;
            this.doImportOS();
        });
    }
    else {
        this.fileEventOS = null;
        this.importDataOSModal.hide();
        this.importIndex = 0;
        this.importOSLines = new Array<AssetImportOS>();
        this.checkForRefresh();
    }
}


public uploadSN() {
    this.uploadModal.hide();
    this.importDataSN();
}


public importDataSN() {

    if (this.fileEventSN === null) return;

    alasql.promise(`select
                        [RO] as [InvNo],
                        [SERIALNUMBER] as [SerialNumber]
                        from FILE(?, {headers: true})`, [this.fileEventSN])
        .then((importLines: Array<AssetImportSN>) => {

            this.importDataSNModal.show();

            this.importIndex = 0;
            this.importSNLines = importLines;
            this.noOfItems = importLines.length;

            this.doImportSN();
    });

}

public doImportSN() {
    if (this.importIndex < this.importSNLines.length) {
        this.assetHttpService.uploadSN(this.importSNLines[this.importIndex]).subscribe((data) => {
            this.importIndex = this.importIndex + 1;
            this.doImportSN();
        });
    }
    else {
        this.fileEventSN = null;
        this.importDataSNModal.hide();
        this.importIndex = 0;
        this.importSNLines = new Array<AssetImportSN>();
        this.checkForRefresh();
    }
}


}

enum AssetManageMainViewMode {
    AssetList = 1,
    AssetDetail = 2,
    OperationDetail = 3,
    AssetRecoList = 4,
}

enum AssetManageViewMode {
    AssetList = 1,
    AssetDetail = 2,
    OperationDetail = 3,
    AssetCategoryList = 4,
    PartnerList = 5,
    DepartmentList = 6,
    EmployeeList = 7,
    LocationList = 8,
    RoomList = 9,
    AssetClassList = 10,
    CostCenterList = 11,
    AssetRecoList = 12,
}

enum OperationType {
    NotSet = 1,
    Reconciliation = 2,
    Transfer = 3,
    CancelScanned = 4,
    RecoverTemp = 5
}

