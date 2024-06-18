import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { InvStateList } from './../../inventory/inv-state/inv-state.list';
import { InvStateDetail } from './../../inventory/inv-state/inv-state.detail';
import { LocationHttpService } from './../../../services/http/administration/location.http.service';
import { EmployeeDetail } from './../../administration/employees/employee.detail';
import { RoomDetail as RoomUIDetail } from './../../administration/rooms/room.detail';
import { DepartmentHttpService } from './../../../services/http/administration/department.http.service';
import { Component, EventEmitter, ViewChild, ViewContainerRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { Observable } from 'rxjs/Observable';

import { ModalDirective } from 'ng2-bootstrap/modal';
import * as jsbarcode from 'jsbarcode';

import { Param } from '../../../model/common/param';

import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AssetType } from '../../../model/api/assets/asset-type';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { Partner } from '../../../model/api/documents/partner';
import { SelectionResult } from '../../../model/common/selection-result';
import { Department } from '../../../model/api/administration/department';
import { Location as NgLocation } from '@angular/common';
import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';
import { AssetCategoryDetail } from 'app/forms/assets/asset-categories/asset-category.detail';
import { PartnerDetail } from 'app/forms/documents/partners/partner.detail';
import { PartnerList } from 'app/forms/documents/partners/partner.list';
import { RoomList } from 'app/forms/administration/rooms/room.list';
import { LocationDetail } from 'app/forms/administration/locations/location.detail';
import { LocationList } from 'app/forms/administration/locations/location.list';
import { DepartmentDetail as DepartmentUIDetail } from 'app/forms/administration/departments/department.detail';
import { DepartmentList } from 'app/forms/administration/departments/department.list';
import { AppConfig } from 'app/config';
import { AppData } from 'app/app-data';
import { AssetSimpleDetail } from 'app/model/api/assets/asset-simple-detail';
import { DocumentTypeHttpService } from 'app/services/http/documents/document-type.http.service';
import { DocumentTypeDropDownList } from 'app/forms/documents/document-types/document-type.drop-down.list';
import { DocumentType as AppDocumentType } from 'app/model/api/documents/document-type';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { EntityFileList } from 'app/forms/common/entity-file.list';
// import { AssetOpSimpleDetailMemoryService } from 'app/services/memory/asset-op-simple-detail.memory.service';
import { AssetOpHttpService } from 'app/services/http/assets/asset-op.http.service';
import { AssetOpSd } from 'app/model/api/assets/asset-op-sd';
import { Document } from 'app/model/api/documents/document';
import { AssetTypeDropDownList } from 'app/forms/assets/asset-types/asset-type.drop-down.list';
import { EntityFile } from 'app/model/api/common/entity-file';
import { DocumentUpload } from 'app/model/api/documents/document-upload';
import { AssetOpDetailList } from 'app/forms/assets/asset-ops/asset-op.detail.list';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { EmployeeResource } from 'app/model/api/administration/employee-resource';
import { AssetSave } from 'app/model/api/assets/asset-save';
import { AssetTypeDetail } from '../asset-types/asset-type.detail';
import { AssetTypeList } from '../asset-types/asset-type.list';
import { CostCenter } from 'app/model/api/administration/cost-center';
import { CostCenterDetail } from 'app/forms/administration/cost-centers/cost-center.detail';
import { CostCenterList } from 'app/forms/administration/cost-centers/cost-center.list';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';
import { UomList } from '../uoms/uom.list';
import { UomDetail } from '../uoms/uom.detail';
import { Uom } from 'app/model/api/assets/uom';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';
import { CodePartnerEntity } from 'app/model/api/common/code-partner-entity';
import { DictionaryItemDetail } from 'app/forms/administration/dictionary-item/dictionary-item.detail';
import { DictionaryItemList } from 'app/forms/administration/dictionary-item/dictionary-item.list';
import { DictionaryItemHttpService } from 'app/services/http/administration/dictionary-item.http.service';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { AppUtils } from 'app/common/app.utils';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { AdmCenterDetail } from 'app/forms/administration/adm-centers/adm-center.detail';
import { AdmCenterList } from 'app/forms/administration/adm-centers/adm-center.list';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { MasterTypeHttpService } from 'app/services/http/assets/master-type.http.service';
import { TypeHttpService } from 'app/services/http/administration/type.http.service';
import { SubTypeHttpService } from 'app/services/http/administration/sub-type.http.service';
import { MasterTypeDetail } from '../master-types/master-type.detail';
import { MasterTypeList } from '../master-types/master-type.list';
import { TypeDetail } from 'app/forms/administration/types/type.detail';
import { TypeList } from 'app/forms/administration/types/type.list';
import { SubTypeDetail } from 'app/forms/administration/sub-types/sub-type.detail';
import { SubTypeList } from 'app/forms/administration/sub-types/sub-type.list';
import { MasterType } from 'app/model/api/assets/master-type';
import { Type } from 'app/model/api/administration/type';
import { SubType } from 'app/model/api/administration/sub-type';
import { InsuranceCategoryHttpService } from 'app/services/http/assets/insurance-category.http.service';
import { ModelHttpService } from 'app/services/http/assets/model.http.service';
import { BrandHttpService } from 'app/services/http/assets/brand.http.service';
import { InsuranceCategoryList } from '../insurance-categories/insurance-category.list';
import { InsuranceCategoryDetail } from '../insurance-categories/insurance-category.detail';
import { ModelDetail } from '../models/model.detail';
import { ModelList } from '../models/model.list';
import { BrandDetail } from '../brands/brand.detail';
import { BrandList } from '../brands/brand.list';
import { InsuranceCategory } from 'app/model/api/assets/insurance-category';
import { Model } from 'app/model/api/assets/model';
import { Brand } from 'app/model/api/assets/brand';
import { BudgetManagerHttpService } from 'app/services/http/assets/budget-manager.http.service';
import { AssetNatureHttpService } from 'app/services/http/assets/asset-nature.http.service';
import { AssetNatureDetail } from '../asset-natures/asset-nature.detail';
import { AssetNatureList } from '../asset-natures/asset-nature.list';
import { BudgetManagerList } from '../budget-manager/budget-manager.list';
import { BudgetManagerDetail } from '../budget-manager/budget-manager.detail';
import { AssetNature } from 'app/model/api/assets/asset-nature';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { InterCompanyDetail } from '../inter-companies/inter-company.detail';
import { InterCompanyList } from '../inter-companies/inter-company.list';
import { ProjectList } from '../projects/project.list';
import { ProjectDetail } from '../projects/project.detail';
import { CompanyDetail } from '../companies/company.detail';
import { CompanyList } from '../companies/company.list';
import { InterCompanyHttpService } from 'app/services/http/assets/inter-company.http.service';
import { ProjectHttpService } from 'app/services/http/assets/project.http.service';
import { CompanyHttpService } from 'app/services/http/assets/company.http.service';
import { Company } from 'app/model/api/assets/company';
import { Project } from 'app/model/api/assets/project';
import { InterCompany } from 'app/model/api/assets/inter-company';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DimensionDetail } from '../dimensions/dimension.detail';
import { DimensionList } from '../dimensions/dimension.list';
import { Dimension } from 'app/model/api/administration/dimension';
import { DimensionHttpService } from 'app/services/http/administration/dimension.http.service';
import { Administration } from 'app/model/api/administration/administration';
import { AdministrationHttpService } from 'app/services/http/administration/administration.http.service';
import { AdministrationList } from 'app/forms/administration/administrations/administration.list';
import { AdministrationDetail } from 'app/forms/administration/administrations/administration.detail';


@Component({
    selector: 'asset-detail-ui',
    templateUrl: 'asset.detail.ui.html',
    styleUrls: ['asset.detail.ui.scss'],
    providers: [
        AssetCategoryHttpService,
        AssetClassHttpService,
        AdministrationHttpService,
        CostCenterHttpService,
        UomHttpService,
        AssetTypeHttpService,
        MasterTypeHttpService,
        TypeHttpService,
        SubTypeHttpService,
        AssetNatureHttpService,
        BudgetManagerHttpService,
        InsuranceCategoryHttpService,
        ModelHttpService,
        BrandHttpService,
        EntityFileHttpService,
        EmployeeHttpService,
        PartnerHttpService,
        RoomDetailHttpService,
        DocumentTypeHttpService,
        LocationHttpService,
        AdmCenterHttpService,
        DictionaryItemHttpService ]
})
export class AssetDetailUI  {

    @ViewChild('assetCategoryDetail') public assetCategoryDetail: AssetCategoryDetail;
    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;

    @ViewChild('assetCategoryDetailModal') public assetCategoryDetailModal: ModalDirective;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('dictionaryItemDetail') public dictionaryItemDetail: DictionaryItemDetail;
    @ViewChild('dictionaryItemList') public dictionaryItemList: DictionaryItemList;

    @ViewChild('dictionaryItemDetailModal') public dictionaryItemDetailModal: ModalDirective;
    @ViewChild('dictionaryItemListModal') public dictionaryItemListModal: ModalDirective;

    @ViewChild('assetTypeDetail') public assetTypeDetail: AssetTypeDetail;
    @ViewChild('assetTypeList') public assetTypeList: AssetTypeList;

    @ViewChild('assetTypeDetailModal') public assetTypeDetailModal: ModalDirective;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;


    @ViewChild('masterTypeDetail') public masterTypeDetail: MasterTypeDetail;
    @ViewChild('masterTypeList') public masterTypeList: MasterTypeList;

    @ViewChild('masterTypeDetailModal') public masterTypeDetailModal: ModalDirective;
    @ViewChild('masterTypeListModal') public masterTypeListModal: ModalDirective;

    @ViewChild('typeDetail') public typeDetail: TypeDetail;
    @ViewChild('typeList') public typeList: TypeList;

    @ViewChild('typeDetailModal') public typeDetailModal: ModalDirective;
    @ViewChild('typeListModal') public typeListModal: ModalDirective;


    @ViewChild('subTypeDetail') public subTypeDetail: SubTypeDetail;
    @ViewChild('subTypeList') public subTypeList: SubTypeList;

    @ViewChild('subTypeDetailModal') public subTypeDetailModal: ModalDirective;
    @ViewChild('subTypeListModal') public subTypeListModal: ModalDirective;


    @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;

    @ViewChild('invStateDetail') public invStateDetail: InvStateDetail;
    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateDetailModal') public invStateDetailModal: ModalDirective;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('employeeDetail') public employeeDetail: EmployeeDetail;
    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeDetailModal') public employeeDetailModal: ModalDirective;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('partnerDetail') public partnerDetail: PartnerDetail;
    @ViewChild('partnerList') public partnerList: PartnerList;
    @ViewChild('partnerDetailModal') public partnerDetailModal: ModalDirective;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('locationDetail') public locationDetail: LocationDetail;
    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationDetailModal') public locationDetailModal: ModalDirective;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('costCenterDetail') public costCenterDetail: CostCenterDetail;
    @ViewChild('costCenterList') public costCenterList: CostCenterList;
    @ViewChild('costCenterDetailModal') public costCenterDetailModal: ModalDirective;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('uomDetail') public uomDetail: UomDetail;
    @ViewChild('uomList') public uomList: UomList;
    @ViewChild('uomDetailModal') public uomDetailModal: ModalDirective;
    @ViewChild('uomListModal') public uomListModal: ModalDirective;


    @ViewChild('dimensionDetail') public dimensionDetail: DimensionDetail;
    @ViewChild('dimensionList') public dimensionList: DimensionList;

    @ViewChild('dimensionDetailModal') public dimensionDetailModal: ModalDirective;
    @ViewChild('dimensionListModal') public dimensionListModal: ModalDirective;

    // @ViewChild('regionDetail') public regionDetail: RegionDetail;
    // @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionDetailModal') public regionDetailModal: ModalDirective;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('roomDetail') public roomDetail: RoomUIDetail;
    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomDetailModal') public roomDetailModal: ModalDirective;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;
    @ViewChild('departmentDetail') public departmentDetail: DepartmentUIDetail;
    @ViewChild('departmentList') public departmentList: DepartmentList;
    @ViewChild('departmentDetailModal') public departmentDetailModal: ModalDirective;
    @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

    @ViewChild('admCenterDetail') public admCenterDetail: AdmCenterDetail;
    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterDetailModal') public admCenterDetailModal: ModalDirective;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;

    @ViewChild('insuranceCategoryDetail') public insuranceCategoryDetail: InsuranceCategoryDetail;
    @ViewChild('insuranceCategoryList') public insuranceCategoryList: InsuranceCategoryList;

    @ViewChild('insuranceCategoryDetailModal') public insuranceCategoryDetailModal: ModalDirective;
    @ViewChild('insuranceCategoryListModal') public insuranceCategoryListModal: ModalDirective;

    @ViewChild('modelDetail') public modelDetail: ModelDetail;
    @ViewChild('modelList') public modelList: ModelList;

    @ViewChild('modelDetailModal') public modelDetailModal: ModalDirective;
    @ViewChild('modelListModal') public modelListModal: ModalDirective;

    @ViewChild('brandDetail') public brandDetail: BrandDetail;
    @ViewChild('brandList') public brandList: BrandList;

    @ViewChild('brandDetailModal') public brandDetailModal: ModalDirective;
    @ViewChild('brandListModal') public brandListModal: ModalDirective;

    @ViewChild('assetNatureDetail') public assetNatureDetail: AssetNatureDetail;
    @ViewChild('assetNatureList') public assetNatureList: AssetNatureList;

    @ViewChild('assetNatureDetailModal') public assetNatureDetailModal: ModalDirective;
    @ViewChild('assetNatureListModal') public assetNatureListModal: ModalDirective;


    @ViewChild('administrationDetail') public administrationDetail: AdministrationDetail;
    @ViewChild('administrationList') public administrationList: AdministrationList;

    @ViewChild('administrationDetailModal') public administrationDetailModal: ModalDirective;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('budgetManagerDetail') public budgetManagerDetail: BudgetManagerDetail;
    @ViewChild('budgetManagerList') public budgetManagerList: BudgetManagerList;

    @ViewChild('budgetManagerDetailModal') public budgetManagerDetailModal: ModalDirective;
    @ViewChild('budgetManagerListModal') public budgetManagerListModal: ModalDirective;



    @ViewChild('companyDetail') public companyDetail: CompanyDetail;
    @ViewChild('companyList') public companyList: CompanyList;

    @ViewChild('companyDetailModal') public companyDetailModal: ModalDirective;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;


    @ViewChild('projectDetail') public projectDetail: ProjectDetail;
    @ViewChild('projectList') public projectList: ProjectList;

    @ViewChild('projectDetailModal') public projectDetailModal: ModalDirective;
    @ViewChild('projectListModal') public projectListModal: ModalDirective;


    @ViewChild('interCompanyDetail') public interCompanyDetail: InterCompanyDetail;
    @ViewChild('interCompanyList') public interCompanyList: InterCompanyList;

    @ViewChild('interCompanyDetailModal') public interCompanyDetailModal: ModalDirective;
    @ViewChild('interCompanyListModal') public interCompanyListModal: ModalDirective;


    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownList;
    @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownList;
    @ViewChild('fileInput') fileInput;

    private entityTypeCode: string = 'ASSET';
    private entityFile: EntityFile = null;
    private companyName: string = AppConfig.COMPANY_NAME;
    private confirmationMessage: string = '';
    private operationType: OperationType = OperationType.NotSet;
    private assetErpCode: boolean = AppConfig.SHOW_ASSET_DETAILS_ERPCODE;
    private documentModel: boolean = AppConfig.SHOW_DOCUMENT_MODEL_DETAILS_;
    private assetAddCategory: boolean = AppConfig.SHOW_ASSET_DETAILS_ADD_CATEGORY;
    private assetSearchCategory: boolean = AppConfig.SHOW_ASSET_DETAILS_SEARCH_CATEGORY;
    private assetDocumentType: boolean = AppConfig.SHOW_ASSET_DETAILS_DOCUMENTTYPE;
    private assetEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;
    private assetTypeDetails: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS;
    private assetTypeDetailsButton: boolean = AppConfig.SHOW_ASSETTYPE_DETAILS_BUTTON;
    private assetEmployeeDetailsButton: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS_BUTTON;
    private assetRoomDetails: boolean = AppConfig.SHOW_ROOMS_DETAILS;
    private assetRoomDetailsButton: boolean = AppConfig.SHOW_ROOMS_DETAILS_BUTTON;
    private assetRegionDetails: boolean = AppConfig.SHOW_REGIONS_DETAILS;
    private assetRegionDetailsButton: boolean = AppConfig.SHOW_REGIONS_DETAILS_BUTTON;
    private assetCostCenterDetails: boolean = AppConfig.SHOW_COSTCENTER_DETAILS;
    private assetCostCenterDetailsButton: boolean = AppConfig.SHOW_COSTCENTER_DETAILS_BUTTON;
    private assetLocationDetails: boolean = AppConfig.SHOW_LOCATION_DETAILS;
    private assetLocationDetailsButton: boolean = AppConfig.SHOW_LOCATION_DETAILS_BUTTON;
    private assetRoomAdd: boolean = AppConfig.SHOW_ASSET_DETAILS_ROOM_DETAILS;
    private assetSupplierDetails: boolean = AppConfig.SHOW_ASSET_DETAILS_SUPPLIER;
    private assetSuppliersDetailsAdd: boolean = AppConfig.SHOW_ASSET_DETAILS_SUPPLIER_ADD;
    private assetSerieDetailsDoc1: boolean = AppConfig.SHOW_ASSET_DETAILS_SERIE_DOC1;
    private assetSerieDetailsDoc2: boolean = AppConfig.SHOW_ASSET_DETAILS_SERIE_DOC2;
    private showAssetClass: boolean = AppConfig.SHOW_ASSET_CLASS;
    private assetState: boolean = AppConfig.SHOW_ASSET_STATES;
    private readOnly: boolean = AppConfig.READ_ONLY;
    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    private selectedLocations: Array<Location> = new Array<Location>();


    private assetId: number = 0;
    private asset: AssetSave = new AssetSave();
    private filesToUpload: Array<File>;
    private selectedAssetOp: any;
    private isSaved: boolean = true;

    private get allowSaving(): boolean {
        // return this.assetCategory != null && this.assetType != null
        // && this.employee != null && this.documentType != null
        //     && this.room != null && this.partner != null && this.asset.documentDate != null;
        // return true;
        if (this.asset.name != null){
            return this.asset.name != null && this.assetType != null && this.company != null && this.invState != null && this.room != null && this.asset != null && this.asset.quantity > 0;
        }
        else{
            return this.dictionaryItem != null && this.assetType != null && this.company != null  && this.invState != null && this.room != null && this.asset != null && this.asset.quantity > 0;
        }
    }
    private invState: CodeNameEntity = null;
    private assetCategory: CodeNameEntity = null;
    private dictionaryItem: CodeNameEntity = null;
    private assetSystem: CodeNameEntity = null;
    private costCenter: CodeNameEntity = null;
    private uom: CodeNameEntity = null;
    private assetClass: CodeNameEntity = null;
    private employee: EmployeeResource = null;
    private department: CodeNameEntity = null;
    private company: CodeNameEntity = null;
    private location: CodeNameEntity = null;
    private partner: CodePartnerEntity = null;
    private room: CodeNameEntity = null;
    private assetType: CodeNameEntity = null;
    private masterType: CodeNameEntity = null;
    private insuranceCategory: CodeNameEntity = null;
    private model: CodeNameEntity = null;
    private brand: CodeNameEntity = null;
    private project: CodeNameEntity = null;
    private interCompany: CodeNameEntity = null;
    private assetNature: CodeNameEntity = null;
    private budgetManager: CodeNameEntity = null;
    private type: CodeNameEntity = null;
    private subType: CodeNameEntity = null;
    private documentType: CodeNameEntity = null;
    private administration: CodeNameEntity = null;
    private admCenter: CodeNameEntity = null;
    private region: CodeNameEntity = null;
    private valueInvIn: number = null;
    private valueDepYTD: number = null;
    private valueDepPU: number = null;
    private valueDep: number = null;
    private valueInv: number = null;
    private depPeriodMonth: number = null;
    private dimension: Dimension = null;

    private readOnlyForm: boolean = false;
    private get isAdmin(): boolean { return AppData.UserIsAdmin; }

    // private invNo: string = '';
    // private name: string = '';
    // private serialNumber: string = '';
    // private erpCode: string = '';
     private modelInv: string = '';
     private producerInv: string = '';
    // private documentDate: Date;
    // private validated: boolean = false;

    constructor(
        private ngLocation: NgLocation,
        private route: ActivatedRoute,
        private router: Router,
        private assetHttpService: AssetHttpService,
        private assetCategoryHttpService: AssetCategoryHttpService,
        private dictionaryItemHttpService: DictionaryItemHttpService,
        private invStateHttpService: InvStateHttpService,
        private assetClassHttpService: AssetClassHttpService,
        private assetTypeHttpService: AssetTypeHttpService,
        private insuranceCategoryHttpService: InsuranceCategoryHttpService,
        private modelHttpService: ModelHttpService,
        private brandHttpService: BrandHttpService,
        private assetNatureHttpService: AssetNatureHttpService,
        private budgetManagerHttpService: BudgetManagerHttpService,
        private masterTypeHttpService: MasterTypeHttpService,
        private typeHttpService: TypeHttpService,
        private subTypeHttpService: SubTypeHttpService,
        private employeeHttpService: EmployeeHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private uomHttpService: UomHttpService,
        private projectHttpService: ProjectHttpService,
        private companyHttpService: CompanyHttpService,
        private interCompanyHttpService: InterCompanyHttpService,
        private assetOpHttpService: AssetOpHttpService,
        private partnerHttpService: PartnerHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private departmentHttpService: DepartmentHttpService,
        private documentTypeHttpService: DocumentTypeHttpService,
        private locationHttpService: LocationHttpService,
        private admCenterHttpService: AdmCenterHttpService,
        private dimensionHttpService: DimensionHttpService,
        private administrationHttpService: AdministrationHttpService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private entityFileHttpService: EntityFileHttpService) {
        this.toastr.setRootViewContainerRef(vcr);
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                // let id: number = +params['id'];
                this.assetId = +params['id'];
            }
            else {
                // this.asset = new AssetSave();
                // this.asset.depPeriod = 0;
                this.valueInv = 0;
                this.asset.quantity = 1;
                this.valueDep = 0;
                this.valueDepPU = 0;
                this.depPeriodMonth = 0;
            }
        });
    }

    ngAfterViewInit() {
        // if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
        if (this.assetId > 0) {
            this.assetHttpService.getDetailById(this.assetId)
                .subscribe((asset: any) => {
                    // this.asset = asset;
                       this.updateDetails(asset);
                      // this.refreshAssetTypes();
                       this.refreshDocumentTypes();

                    if (asset.validated) {
                        this.refreshAssetOperations();
                        this.refreshEntityFiles();
                    }
                    else {
                       // this.refreshAssetTypes();
                       // this.refreshDocumentTypes();
                    }

                    this.generateBarcode();
                });
        }
        else {
            this.invStateHttpService.getById(24).subscribe((res: InvState) => {
                if (res != null) {
                    this.invState = res;
                }
            });
            // this.refreshAssetTypes();
               this.refreshDocumentTypes();
        }
    }

    private refreshEntityFiles(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'ASSET'));
        params.push(new Param('entityId', this.asset.id.toString()));

        this.entityFileList.refresh(params);
    }

    private refreshAssetOperations(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('assetId', this.assetId.toString()));
        this.assetOpList.refresh(params);

        // this.assetOpSimpleDetailMemoryService.setDataSource(new Array<AssetOpSd>());

        // this.assetOpHttpService.getSimpleDetailByAsset(this.assetId).subscribe((assetOps: Array<AssetOpSd>) => {
        //     assetOps.sort((i1, i2) => i2.id - i1.id)
        //     this.assetOpSimpleDetailMemoryService.setDataSource(assetOps);
        //     this.assetOpList.refresh(null);
        // });
    }

    private refreshAssetTypes() {
       // this.assetTypeDropDownList.refresh(null);  // ORIGINAL
        // this.documentTypeDropDownList.refresh(null);  // OTP
    }

    private refreshDocumentTypes() {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('parentCode', 'ACQUISITION'));
        this.documentTypeDropDownList.refresh(params);  // RINGIER  // OTP
    }

    private updateDetails(asset: any) {
        this.asset.id = asset.id;
        this.asset.invNo = asset.invNo;
        this.asset.name = asset.name;
        this.asset.serialNumber = asset.serialNumber;
        this.asset.erpCode = asset.erpCode;
        this.asset.validated = asset.validated;
        this.asset.valueInv = asset.valueInv;
        this.asset.quantity = asset.quantity;
        this.asset.purchaseDate = asset.purchaseDate;
        this.asset.receptionDate = asset.receptionDate;
        this.asset.invoiceDate = asset.invoiceDate;
        this.asset.poDate = asset.poDate;
        this.asset.startDate = asset.startDate;
        this.asset.endDate = asset.endDate;
        this.asset.removalDate = asset.removalDate;
        this.asset.partner = asset.document != null ? asset.document.partnerId != null ? asset.document.partner.name : '' : '';
        this.asset.valueRem = asset.valueRem;
        this.asset.companyId = asset.companyId;
        this.asset.departmentId = asset.departmentId;
        this.asset.info = asset.info;
        this.invState = asset.invState;
        this.uom = asset.uom;
        this.dictionaryItem = asset.dictionaryItem;
        this.assetSystem = asset.assetSystem
        this.dimension = asset.dimension;
        this.asset.isAccepted = asset.isAccepted;

        if (asset.document != null) {
            this.asset.docNo1 = asset.document.docNo1;
            this.asset.docNo2 = asset.document.docNo2;
            this.asset.details = asset.document.details;
            this.asset.documentDate = asset.invoiceDate;
            this.asset.model = asset.document.model;
            this.documentType = asset.document.documentType;
            this.partner = asset.document.partner;
            this.asset.partnerDate = asset.document.creationDate;
            this.documentTypeDropDownList.selectedItems[0] = asset.document.documentType;

        }

        if (asset.adm != null) {
            this.assetCategory = asset.adm.assetCategory;
            // this.invState = asset.adm.invState;
            // this.assetClass = asset.dep.assetClass;
            this.assetType = asset.adm.assetType;
            this.department = asset.adm.department;
            this.employee = asset.adm.employee;
            this.location = asset.adm.location;
            this.room = asset.adm.room;
            this.assetCategory = asset.adm.assetCategory;
            // this.invState = asset.adm.invState;
            this.costCenter = asset.adm.costCenter;
            this.admCenter = asset.adm.admCenter;
            this.administration = asset.adm.administration;
            this.insuranceCategory = asset.adm.insuranceCategory;
            this.model = asset.adm.model;
            this.brand = asset.adm.brand;
            this.masterType = asset.adm.masterType;
            this.type = asset.adm.type;
            this.assetNature = asset.adm.assetNature;
            this.budgetManager = asset.adm.budgetManager;
            this.project = asset.adm.project;
            this.interCompany = asset.adm.interCompany;
            this.subType = asset.adm.subType;
            this.region = asset.adm.region;
            this.department = asset.adm.department;
            this.company = asset.adm.company;
            // this.uom = asset.uom;
        }

        if (asset.dep != null) {

            this.valueInvIn = asset.dep.valueInvIn;
            this.valueDepYTD = asset.dep.valueDepYTD;
            this.valueDepPU = asset.dep.valueDepPU;
            this.valueDep = asset.dep.valueDep;
            this.valueInv = asset.dep.valueInv;
            this.depPeriodMonth = asset.dep.depPeriodMonth;
        }

        if (asset.inv != null) {

            this.modelInv = asset.inv.model;
            this.producerInv = asset.inv.producer;
        }



        // this.documentType = asset.document != null ? asset.document.documentType : null;
        // this.partner = asset.document != null ? asset.document.partner : null;
    }

    // private setSelectedAssetType(assetTypes: Array<AssetType>) {
    //     this.assetType = ((assetTypes != null) && (assetTypes.length > 0)) ? assetTypes[0] : null;
    // }

     private setSelectedDocumentType(documentTypes: Array<AppDocumentType>) {
        this.documentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
    }

    /*begin asset category*/
    private selectAssetCategory() {
        // let selectedAssetCategories: Array<AssetCategory> = null;

        // if (this.selectedAssetCategory !== null) {
        //     selectedAssetCategories = new Array<AssetCategory>();
        //     selectedAssetCategories.push(this.selectedAssetCategory);
        //     this.assetCategoryList.selectedItems = selectedAssetCategories;
        // }

        this.assetCategoryList.refresh(null);
        this.assetCategoryListModal.show();
    }

    private setSelectedAssetCategory() {
        let items: Array<AssetCategory> = this.assetCategoryList.selectedItems;
        this.assetCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetCategoryListModal.hide();
    }

    private addAssetCategory() {
        this.assetCategoryDetail.addNew();
        this.assetCategoryDetailModal.show();
    }

    private assetCategoryAdded(assetCategory: AssetCategory) {
        this.assetCategory = assetCategory;
        this.assetCategoryDetailModal.hide();
    }

    private assetCategoryAddCanceled() {
        this.assetCategoryDetailModal.hide();
    }
    /*end asset category*/

       /* begin AdmCenter */
       private selectAdmCenter() {
        this.admCenterList.refresh(null);
        this.admCenterListModal.show();
    }

    private setSelectedAdmCenter() {
        let items: Array<AdmCenter> = this.admCenterList.selectedItems;
        this.admCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.admCenterListModal.hide();
        this.costCenter = null;
    }

    private addAdmCenter() {
        this.admCenterDetail.addNew();
        this.admCenterDetailModal.show();
    }

    private admCenterAdded(admCenter: AdmCenter) {
        this.admCenter = admCenter;
        this.admCenterDetailModal.hide();
    }

    private admCenterAddCanceled() {
        this.admCenterDetailModal.hide();
    }
    /*end location */



     /*begin dictionary Item*/
     private selectDictionaryItem() {
        // let selectedAssetCategories: Array<AssetCategory> = null;

        if (this.assetCategory !== null) {
            this.selectedAssetCategories = new Array<AssetCategory>();
            this.selectedAssetCategories.push(this.assetCategory);
            // this.assetCategoryList.selectedItems = this.selectedAssetCategories;
        }

        let params = new Array<Param>();

        params.push(new Param('assetCategoryIds', AppUtils.getIdsList<AssetCategory, number>(this.selectedAssetCategories)));

        this.dictionaryItemList.refresh(params);
        this.dictionaryItemListModal.show();
    }

    private setSelectedDictionaryItem() {
        let items: Array<DictionaryItem> = this.dictionaryItemList.selectedItems;
        this.dictionaryItem = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.dictionaryItemListModal.hide();
    }

    private addDictionaryItem() {
        this.dictionaryItemDetail.addNew();
        this.dictionaryItemDetailModal.show();
    }

    private dictionaryItemAdded(dictionaryItem: DictionaryItem) {
        this.dictionaryItem = dictionaryItem;
        this.dictionaryItemDetailModal.hide();
    }

    private dictionaryItemAddCanceled() {
        this.dictionaryItemDetailModal.hide();
    }
    /*end asset category*/


        /*begin asset type*/
        private selectAssetType() {
            // let selectedAssetCategories: Array<AssetCategory> = null;
            // if (this.selectedAssetCategory !== null) {
            //     selectedAssetCategories = new Array<AssetCategory>();
            //     selectedAssetCategories.push(this.selectedAssetCategory);
            //     this.assetCategoryList.selectedItems = selectedAssetCategories;
            // }
            this.assetTypeList.refresh(null);
            this.assetTypeListModal.show();
        }
        private setSelectedAssetType() {
            let items: Array<AssetType> = this.assetTypeList.selectedItems;
            this.assetType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.assetTypeListModal.hide();
        }
        private addAssetType() {
            this.assetTypeDetail.addNew();
            this.assetTypeDetailModal.show();
        }
        private assetTypeAdded(assetType: AssetType) {
            this.assetType = assetType;
            this.assetTypeDetailModal.hide();
        }
        private assetTypeAddCanceled() {
            this.assetTypeDetailModal.hide();
        }
        /*end asset type*/
        

          /*begin INSURANCECATEGORY */
          private selectInsuranceCategory() {

            this.insuranceCategoryList.refresh(null);
            this.insuranceCategoryListModal.show();
        }
        private setSelectedInsuranceCategory() {
            let items: Array<InsuranceCategory> = this.insuranceCategoryList.selectedItems;
            this.insuranceCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.insuranceCategoryListModal.hide();
        }
        private addInsuranceCategory() {
            this.insuranceCategoryDetail.addNew();
            this.insuranceCategoryDetailModal.show();
        }
        private insuranceCategoryAdded(insuranceCategory: InsuranceCategory) {
            this.insuranceCategory = insuranceCategory;
            this.insuranceCategoryDetailModal.hide();
        }
        private insuranceCategoryAddCanceled() {
            this.insuranceCategoryDetailModal.hide();
        }
        /*end INSURANCECATEGORY */

           /*begin MODEL */
           private selectModel() {

            this.modelList.refresh(null);
            this.modelListModal.show();
        }
        private setSelectedModel() {
            let items: Array<Model> = this.modelList.selectedItems;
            this.model = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.modelListModal.hide();
        }
        private addModel() {
            this.modelDetail.addNew();
            this.modelDetailModal.show();
        }
        private modelAdded(model: Model) {
            this.model = model;
            this.modelDetailModal.hide();
        }
        private modelAddCanceled() {
            this.modelDetailModal.hide();
        }
        /*end MODEL */

           /*begin BRAND */
           private selectBrand() {

            this.brandList.refresh(null);
            this.brandListModal.show();
        }
        private setSelectedBrand() {
            let items: Array<Brand> = this.brandList.selectedItems;
            this.brand = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.brandListModal.hide();
        }
        private addBrand() {
            this.brandDetail.addNew();
            this.brandDetailModal.show();
        }
        private brandAdded(brand: Brand) {
            this.brand = brand;
            this.brandDetailModal.hide();
        }
        private brandAddCanceled() {
            this.brandDetailModal.hide();
        }
        /*end BRAND */

           /*begin MASTERTYPE */
           private selectMasterType() {

            this.masterTypeList.refresh(null);
            this.masterTypeListModal.show();
        }
        private setSelectedMasterType() {
            let items: Array<MasterType> = this.masterTypeList.selectedItems;
            this.masterType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.masterTypeListModal.hide();
        }
        private addMasterType() {
            this.masterTypeDetail.addNew();
            this.masterTypeDetailModal.show();
        }
        private masterTypeAdded(masterType: MasterType) {
            this.masterType = masterType;
            this.masterTypeDetailModal.hide();
        }
        private masterTypeAddCanceled() {
            this.masterTypeDetailModal.hide();
        }
        /*end MASTERTYPE */

          /*begin TYPE */
          private selectType() {

            let params = new Array<Param>();

            params.push(new Param('masterTypeIds', this.masterType != null ? this.masterType.id.toString() : null));

            this.typeList.refresh(params);
            this.typeListModal.show();
        }
        private setSelectedType() {
            let items: Array<Type> = this.typeList.selectedItems;
            this.type = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.typeListModal.hide();
        }
        private addType() {
            this.typeDetail.addNew();
            this.typeDetailModal.show();
        }
        private typeAdded(type: Type) {
            this.type = type;
            this.typeDetailModal.hide();
        }
        private typeAddCanceled() {
            this.typeDetailModal.hide();
        }
        /*end TYPE */

          /*begin SUBTYPE */
          private selectSubType() {

            let params = new Array<Param>();

            params.push(new Param('typeIds', this.type != null ? this.type.id.toString() : null));
    

            this.subTypeList.refresh(params);
            this.subTypeListModal.show();
        }
        private setSelectedSubType() {
            let items: Array<SubType> = this.subTypeList.selectedItems;
            this.subType = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.subTypeListModal.hide();
        }
        private addSubType() {
            this.subTypeDetail.addNew();
            this.subTypeDetailModal.show();
        }
        private subTypeAdded(subType: SubType) {
            this.subType = subType;
            this.subTypeDetailModal.hide();
        }
        private subTypeAddCanceled() {
            this.subTypeDetailModal.hide();
        }
        /*end asset type*/

             /*begin ASSETNATURE */
             private selectAssetNature() {

                let params = new Array<Param>();

                params.push(new Param('assetTypeIds', this.assetType != null ? this.assetType.id.toString() : null));

                this.assetNatureList.refresh(params);
                this.assetNatureListModal.show();
            }
            private setSelectedAssetNature() {
                let items: Array<AssetNature> = this.assetNatureList.selectedItems;
                this.assetNature = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.assetNatureListModal.hide();
            }
            private addAssetNature() {
                this.assetNatureDetail.addNew();
                this.assetNatureDetailModal.show();
            }
            private assetNatureAdded(assetNature: AssetNature) {
                this.assetNature = assetNature;
                this.assetNatureDetailModal.hide();
            }
            private assetNatureAddCanceled() {
                this.assetNatureDetailModal.hide();
            }
            /*end ASSETNATURE */

               /*begin ADMINISTRATION */
               private selectAdministration() {

                let params = new Array<Param>();

                params.push(new Param('assetTypeIds', this.assetType != null ? this.assetType.id.toString() : null));

                this.administrationList.refresh(params);
                this.administrationListModal.show();
            }
            private setSelectedAdministration() {
                let items: Array<Administration> = this.administrationList.selectedItems;
                this.administration = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.administrationListModal.hide();
            }
            private addAdministration() {
                this.administrationDetail.addNew();
                this.administrationDetailModal.show();
            }
            private administrationAdded(administration: Administration) {
                this.administration = administration;
                this.administrationDetailModal.hide();
            }
            private administrationAddCanceled() {
                this.administrationDetailModal.hide();
            }
            /*end ASSETNATURE */


               /*begin BUDGETMANAGER */
               private selectBudgetManager() {

                let params = new Array<Param>();

                params.push(new Param('uomIds', this.uom != null ? this.uom.id.toString() : null));

                this.budgetManagerList.refresh(null);
                this.budgetManagerListModal.show();
            }
            private setSelectedBudgetManager() {
                let items: Array<BudgetManager> = this.budgetManagerList.selectedItems;
                this.budgetManager = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.budgetManagerListModal.hide();
            }
            private addBudgetManager() {
                this.budgetManagerDetail.addNew();
                this.budgetManagerDetailModal.show();
            }
            private budgetManagerAdded(budgetManager: BudgetManager) {
                this.budgetManager = budgetManager;
                this.budgetManagerDetailModal.hide();
            }
            private budgetManagerAddCanceled() {
                this.budgetManagerDetailModal.hide();
            }
            /*end BUDGETMANAGER */


               /*begin COMPANY */
               private selectCompany() {

                this.companyList.refresh(null);
                this.companyListModal.show();
            }
            private setSelectedCompany() {
                let items: Array<Company> = this.companyList.selectedItems;
                this.company = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.companyListModal.hide();
            }
            private addCompany() {
                this.companyDetail.addNew();
                this.companyDetailModal.show();
            }
            private companyAdded(company: Company) {
                this.company = company;
                this.companyDetailModal.hide();
            }
            private companyAddCanceled() {
                this.companyDetailModal.hide();
            }
            /*end COMPANY */

               /*begin PROJECT */
               private selectProject() {

                this.projectList.refresh(null);
                this.projectListModal.show();
            }
            private setSelectedProject() {
                let items: Array<Project> = this.projectList.selectedItems;
                this.project = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.projectListModal.hide();
            }
            private addProject() {
                this.projectDetail.addNew();
                this.projectDetailModal.show();
            }
            private projectAdded(project: Project) {
                this.project = project;
                this.projectDetailModal.hide();
            }
            private projectAddCanceled() {
                this.projectDetailModal.hide();
            }
            /*end PROJECT */

               /*begin INTERCOMPANY */
               private selectInterCompany() {

                let params = new Array<Param>();

                params.push(new Param('partnerIds', this.partner != null ? this.partner.id.toString() : null));

                this.interCompanyList.refresh(null);
                this.interCompanyListModal.show();
            }
            private setSelectedInterCompany() {
                let items: Array<InterCompany> = this.interCompanyList.selectedItems;
                this.interCompany = ((items != null) && (items.length === 1)) ? items[0] : null;
                this.interCompanyListModal.hide();
            }
            private addInterCompany() {
                this.interCompanyDetail.addNew();
                this.interCompanyDetailModal.show();
            }
            private interCompanyAdded(interCompany: InterCompany) {
                this.interCompany = interCompany;
                this.interCompanyDetailModal.hide();
            }
            private interCompanyAddCanceled() {
                this.interCompanyDetailModal.hide();
            }
            /*end INTERCOMPANY */


    /*begin invState*/
    private selectInvState() {
        // let selectedAssetCategories: Array<AssetCategory> = null;
        // if (this.selectedAssetCategory !== null) {
        //     selectedAssetCategories = new Array<AssetCategory>();
        //     selectedAssetCategories.push(this.selectedAssetCategory);
        //     this.assetCategoryList.selectedItems = selectedAssetCategories;
        // }
        this.invStateList.refresh(null);
        this.invStateListModal.show();
    }
    private setSelectedInvState() {
        let items: Array<InvState> = this.invStateList.selectedItems;
        this.invState = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.invStateListModal.hide();
    }
    private addInvState() {
        this.invStateDetail.addNew();
        this.invStateDetailModal.show();
    }
    private invStateAdded(invState: InvState) {
        this.invState = invState;
        this.invStateDetailModal.hide();
    }
    private invStateAddCanceled() {
        this.invStateDetailModal.hide();
    }
        /*end invState*/

    /*begin employee*/
    private selectEmployee() {
        this.employeeList.refresh(null);
        this.employeeListModal.show();
    }

    private setSelectedEmployee() {
        let items: Array<Employee> = this.employeeList.selectedItems;
        this.employee = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.employeeListModal.hide();
    }

    private addEmployee() {
        this.employeeDetail.addNew();
        // this.employeeDetail.department = this.department;
        this.employeeDetailModal.show();
    }

    private employeeAdded(employee: Employee) {
        this.employee = employee;
        this.employeeDetailModal.hide();
    }

    private employeeAddCanceled() {
        this.employeeDetailModal.hide();
    }
    /*end employee*/

    /* begin department */
    private selectDepartment() {
        this.departmentList.refresh(null);
        this.departmentListModal.show();
    }

    private setSelectedDepartment() {
        let items: Array<Department> = this.departmentList.selectedItems;
        this.department = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.departmentListModal.hide();
    }

    private addDepartment() {
        this.departmentDetail.addNew();
        this.departmentDetailModal.show();
    }

    private departmentAdded(department: Department) {
        this.department = department;
        this.departmentDetailModal.hide();
    }

    private departmentAddCanceled() {
        this.departmentDetailModal.hide();
    }
    /*end department */

    /* begin location */
    private selectLocation() {
        this.locationList.refresh(null);
        this.locationListModal.show();
    }

    private setSelectedLocation() {
        let items: Array<Location> = this.locationList.selectedItems;
        this.location = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.locationListModal.hide();
        this.room = null;
    }

    private addLocation() {
        this.locationDetail.addNew();
        this.locationDetailModal.show();
    }

    private locationAdded(location: Location) {
        this.location = location;
        this.locationDetailModal.hide();
    }

    private locationAddCanceled() {
        this.locationDetailModal.hide();
    }
    /*end location */

        /* begin costcenter */
        private selectCostCenter() {

            let params = new Array<Param>();

            params.push(new Param('admCenterIds', this.admCenter != null ? this.admCenter.id.toString() : null));

            this.costCenterList.refresh(params);
            this.costCenterListModal.show();
        }
        private setSelectedCostCenter() {
            let items: Array<CostCenter> = this.costCenterList.selectedItems;
            this.costCenter = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.costCenterListModal.hide();
        }
        private addCostCenter() {
            this.costCenterDetail.addNew();
            this.costCenterDetailModal.show();
        }
        private costCenterAdded(costCenter: CostCenter) {
            this.costCenter = costCenter;
            this.costCenterDetailModal.hide();
        }

        private costCenterAddCanceled() {
            this.costCenterDetailModal.hide();
        }
        /*end costcenter */


           /*begin DIMENSION*/
           private selectDimension() {

            this.dimensionList.refresh(null);
            this.dimensionListModal.show();
        }

        private setSelectedDimension() {
            let items: Array<Dimension> = this.dimensionList.selectedItems;
            this.dimension = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.dimensionListModal.hide();
        }

        private addDimension() {
            this.dimensionDetail.addNew();
            this.dimensionDetailModal.show();
        }

        private assetDimensionAdded(dimension: Dimension) {
            this.dimension = dimension;
            this.dimensionDetailModal.hide();
        }

        private dimensionAddCanceled() {
            this.dimensionDetailModal.hide();
        }
        /*end DIMENSION*/

          /* begin UOM */
          private selectUom() {
            this.uomList.refresh(null);
            this.uomListModal.show();
        }
        private setSelectedUom() {
            let items: Array<Uom> = this.uomList.selectedItems;
            this.uom = ((items != null) && (items.length === 1)) ? items[0] : null;
            this.uomListModal.hide();
        }
        private addUom() {
            this.uomDetail.addNew();
            this.uomDetailModal.show();
        }
        private costUomAdded(uom: Uom) {
            this.uom = uom;
            this.uomDetailModal.hide();
        }

        private uomAddCanceled() {
            this.uomDetailModal.hide();
        }
        /*end UOM */



        /* begin region */
        // private selectRegion() {
        //     this.regionList.refresh(null);
        //     this.regionListModal.show();
        // }
        // private setSelectedRegion() {
        //     let items: Array<Region> = this.regionList.selectedItems;
        //     this.region = ((items != null) && (items.length === 1)) ? items[0] : null;
        //     this.regionListModal.hide();
        // }
        // private addRegion() {
        //     this.regionDetail.addNew();
        //     this.regionDetailModal.show();
        // }
        // private regionAdded(location: Location) {
        //     this.region = region;
        //     this.regionDetailModal.hide();
        // }
        // private regionAddCanceled() {
        //     this.regionDetailModal.hide();
        // }
        /*end region */

    /*begin partner*/
    private selectPartner() {
        this.partnerList.refresh(null);
        this.partnerListModal.show();
    }

    private setSelectedPartner() {
        let items: Array<Partner> = this.partnerList.selectedItems;
         this.partner = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.partnerListModal.hide();
    }

    private addPartner() {
        this.partnerDetail.addNew();
        this.partnerDetailModal.show();
    }

    private partnerAdded(partner: Partner) {
        // this.partner = partner;
        this.partnerDetailModal.hide();
    }

    private partnerAddCanceled() {
        this.partnerDetailModal.hide();
    }
    /*end partner*/

    /*begin room*/
    private selectRoom() {

        let params = new Array<Param>();

        params.push(new Param('locationIds', this.location != null ? this.location.id.toString() : null));


        this.roomList.refresh(params);
        this.roomListModal.show();
    }

    private setSelectedRoom() {
        let items: Array<Room> = this.roomList.selectedItems;
        this.room = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.roomListModal.hide();
    }

    private addRoom() {
        this.roomDetail.addNew();
        // this.roomDetail.location = this.location;
        this.roomDetailModal.show();
    }

    private roomAdded(room: Room) {
        this.room = room;
        this.roomDetailModal.hide();
    }

    private roomAddCanceled() {
        this.roomDetailModal.hide();
    }
    /*end room*/

     private cancelChanges() {
        // this.ngLocation.back();
        this.router.navigate(['/assetinvdetails'])
    }

    private onDeleteAsset() {
        this.operationType = OperationType.Delete;
        this.confirmationMessage = 'Stergeti inregistrarea curenta?';
        this.confirmationModal.show();
    }

    private deleteAsset() {
        this.assetHttpService.delete(this.asset.id)
            .subscribe(() => this.router.navigate(['/assetdepdetails']));
    }

    private onValidateAsset() {
        this.operationType = OperationType.AssetValidation;
        this.confirmationMessage = 'Validati inregistrarea curenta?';
        this.confirmationModal.show();
    }

    private validateAsset() {
        this.asset.validated = true;
        this.saveAsset();
    }

    private addNewOperation() {
        // let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
        // assets.push(new AssetSimpleDetail(this.asset.id, this.asset.invNo, this.asset.assetName,
        //     '', this.asset.partner, this.asset.assetType, this.asset.accState, this.asset.usageStartDate, '', ''));
        // AppData.AssetList = assets;
        // this.router.navigate(['/newoperation']);
    }


    private saveAsset() {
        this.isSaved = false;
        this.asset.assetTypeId = this.assetType != null ? this.assetType.id : null;
        this.asset.documentTypeId = this.documentType != null ? this.documentType.id : null;

        this.asset.administrationId = this.administration != null ? this.administration.id : null;
        this.asset.dictionaryItemId = this.dictionaryItem != null ? this.dictionaryItem.id : null;
        this.asset.assetCategoryId = this.assetCategory != null ? this.assetCategory.id : null;
        this.asset.invStateId = this.invState != null ? this.invState.id : null;
        this.asset.employeeId = this.employee != null ? this.employee.id : null;
        this.asset.costCenterId = this.costCenter != null ? this.costCenter.id : null;
        this.asset.roomId = this.room != null ? this.room.id : null;
        this.asset.departmentId = this.department != null ? this.department.id : null;
        this.asset.partnerId = this.partner != null ? this.partner.id : null;
        this.asset.uomId = this.uom != null ? this.uom.id : null;
        this.asset.documentDate = this.asset.invoiceDate;
        this.asset.name = this.dictionaryItem != null ? this.dictionaryItem.name : this.asset.name;
        this.asset.subTypeId = this.subType != null ? this.subType.id : null;
        this.asset.insuranceCategoryId = this.insuranceCategory != null ? this.insuranceCategory.id : null;
        this.asset.modelId = this.model != null ? this.model.id : null;
        this.asset.brandId = this.brand != null ? this.brand.id : null;
        this.asset.assetNatureId = this.assetNature != null ? this.assetNature.id : null;
        this.asset.budgetManagerId = this.budgetManager != null ? this.budgetManager.id : null;
        this.asset.companyId = this.company != null ? this.company.id : null;
        this.asset.projectId = this.project != null ? this.project.id : null;
        this.asset.interCompanyId = this.interCompany != null ? this.interCompany.id : null;
        this.asset.dimensionId = this.dimension != null ? this.dimension.id : null;
        this.asset.valueInv = this.valueInv;
        this.asset.valueDep = this.valueDep;
        this.asset.valueDepPU = this.valueDepPU;
        this.asset.depPeriodMonth = this.depPeriodMonth;
        this.asset.valueRem = this.valueDep;
        this.asset.modelInv = this.modelInv;
        this.asset.producerInv = this.producerInv;
        this.asset.info = this.asset.info;
      
        // this.assetFullDetail.assetClassId = this.selectedAssetClass.id;
        // this.asset.assetClassId = 1;

        this.asset.validated = true; // this.asset.validated;

        if (this.asset.id > 0) {
             this.assetHttpService.updateAsset(this.asset)
            .subscribe(() => {
                this.assetHttpService.getDetailById(this.asset.id)
                    .subscribe((asset: any) => {
                        if (asset != null){
                            this.toastr.success('Datele au fost modificate cu succes!');
                            this.isSaved = true;
                            this.updateDetails(asset);
                        }
                    }, (error) => {
                        this.toastr.error('Erosre la salvarea datelor!');
                    });
            }, (error) => {
                this.toastr.error('Eroare server!');
            });
        }
        else {

            this.assetHttpService.getLastInvNo()
            .subscribe((res: any) => {
                 // alert(res);
                if (res != null){
                    this.asset.invNo = res;
                    this.assetHttpService.addNewAsset(this.asset)
                    .subscribe((assetId: number) => {
                        // this.updateDetails(assetFullDetail)
                        if (assetId > 0){
                            this.toastr.success('Datele au fost salvate!');
                            this.router.navigate(['/asset', assetId]);
                        }
                    });

                }else{
                    this.toastr.error('Eroare!');
                    this.isSaved = true;
                    return;
                }
            }, (error) => {
                this.toastr.error('Eroare server!');
                this.isSaved = true;
            });
        }
    }

    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.AssetValidation:
                this.validateAsset();
                break;
            case OperationType.Delete:
                this.deleteAsset();
                break;
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

    private onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
        this.selectedAssetOp = this.assetOpList.selectedItem;
    }

    private onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
        this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
    }

    private showReport() {
        let reportType: string = '';
        let validReport: boolean = false;

        if (this.selectedAssetOp != null) {
           console.log('TIP DOCUMENT: ', this.selectedAssetOp.documentType.code);
            // switch(this.selectedAssetOp.documentTypeCode) {
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

    private parseDate(dateString: string): Date {
        if (dateString) {
            return new Date(dateString);
        } else {
            return null;
        }
    }

    private onProcessAssetOp() {
        this.operationType = OperationType.ProcessAssetOp;
        this.confirmationMessage = 'Procesati operatia selectata?';
        this.confirmationModal.show();
    }

    private processAssetOp() {
        this.assetOpHttpService.process(this.assetOpList.selectedItem.id).subscribe((data) => {
            this.refreshAssetOperations();
        });
    }

    private generateBarcode() {
        let controlId: string = '#assetBarcodeLabel';
        jsbarcode($(controlId)[0], this.asset.invNo, {
            format: 'CODE128',
            displayValue: true,
            marginTop: 0,
            marginRight: 5,
            fontSize: 16,
            width: 2,
            height: 70,
            font: 'arial',
            textAlign: 'center'
        });
    }

    private printBarcodeLabel() {
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
        let popupWinindow: any = null;
        let innerContents = document.getElementById('barcodes').innerHTML;
        popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
        popupWinindow.document.open();
        popupWinindow.document.write('<html><head><link rel="stylesheet" /></head><body onload="window.print()">' +'<div>' + innerContents + '</div>' + '</html>');
        popupWinindow.document.close();
    }

}

enum OperationType {
    NotSet = 1,
    AssetValidation = 2,
    Delete = 3,
    ProcessAssetOp = 4
}


// import { LocationHttpService } from './../../../services/http/administration/location.http.service';
// import { EmployeeDetail } from './../../administration/employees/employee.detail';
// import { RoomDetail as RoomUIDetail } from './../../administration/rooms/room.detail';
// import { DepartmentHttpService } from './../../../services/http/administration/department.http.service';
// import { Component, EventEmitter, ViewChild } from '@angular/core';
// import { FormGroup } from '@angular/forms';
// import { ActivatedRoute, Router, Params } from '@angular/router';

// import { Observable } from 'rxjs/Observable';

// import { ModalDirective } from 'ng2-bootstrap/modal';
// import * as jsbarcode from 'jsbarcode';

// import { Param } from '../../../model/common/param';

// import { AssetFullDetailHttpService } from '../../../services/http/assets/asset-full-detail.http.service';
// import { AssetTypeHttpService } from '../../../services/http/assets/asset-type.http.service';
// import { AssetCategoryHttpService } from '../../../services/http/assets/asset-category.http.service';
// import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
// import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
// import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
// import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';

// import { AssetFullDetail } from '../../../model/api/assets/asset-full-detail';
// import { AssetCategory } from '../../../model/api/assets/asset-category';
// import { AssetClass } from '../../../model/api/assets/asset-class';
// import { AssetType } from '../../../model/api/assets/asset-type';
// import { Employee } from '../../../model/api/administration/employee';
// import { Location } from '../../../model/api/administration/location';
// import { Room } from '../../../model/api/administration/room';
// import { Partner } from '../../../model/api/documents/partner';
// import { SelectionResult } from '../../../model/common/selection-result';
// import { Department } from '../../../model/api/administration/department';
// import { Location as NgLocation } from '@angular/common';
// import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
// import { EmployeeList } from 'app/forms/administration/employees/employee.list';
// import { AssetCategoryDetail } from 'app/forms/assets/asset-categories/asset-category.detail';
// import { PartnerDetail } from 'app/forms/documents/partners/partner.detail';
// import { PartnerList } from 'app/forms/documents/partners/partner.list';
// import { RoomList } from 'app/forms/administration/rooms/room.list';
// import { LocationDetail } from 'app/forms/administration/locations/location.detail';
// import { LocationList } from 'app/forms/administration/locations/location.list';
// import { DepartmentDetail as DepartmentUIDetail } from 'app/forms/administration/departments/department.detail';
// import { DepartmentList } from 'app/forms/administration/departments/department.list';
// import { AppConfig } from 'app/config';
// import { AppData } from 'app/app-data';
// import { AssetSimpleDetail } from 'app/model/api/assets/asset-simple-detail';
// import { DocumentTypeHttpService } from 'app/services/http/documents/document-type.http.service';
// import { DocumentTypeDropDownList } from 'app/forms/documents/document-types/document-type.drop-down.list';
// import { DocumentType as AppDocumentType } from 'app/model/api/documents/document-type';
// import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
// import { EntityFileList } from 'app/forms/common/entity-file.list';
// //import { AssetOpSimpleDetailMemoryService } from 'app/services/memory/asset-op-simple-detail.memory.service';
// import { AssetOpHttpService } from 'app/services/http/assets/asset-op.http.service';
// import { AssetOpSd } from 'app/model/api/assets/asset-op-sd';
// import { Document } from 'app/model/api/documents/document';
// import { AssetTypeDropDownList } from 'app/forms/assets/asset-types/asset-type.drop-down.list';
// import { EntityFile } from 'app/model/api/common/entity-file';
// import { DocumentUpload } from 'app/model/api/documents/document-upload';
// import { AssetOpDetailList } from 'app/forms/assets/asset-ops/asset-op.detail.list';
// import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
// import { AssetUpload } from 'app/model/api/assets/asset-upload';

// @Component({
//     selector: 'asset-detail-ui',
//     templateUrl: 'asset.detail.ui.html',
//     providers: [ AssetFullDetailHttpService, AssetCategoryHttpService, AssetClassHttpService, 
//         AssetTypeHttpService, EntityFileHttpService, EmployeeHttpService, PartnerHttpService, RoomDetailHttpService, 
//         DocumentTypeHttpService, LocationHttpService ]
// })
// export class AssetDetailUI  {

//     @ViewChild('assetCategoryDetail') public assetCategoryDetail: AssetCategoryDetail;
//     @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;
//     @ViewChild('assetCategoryDetailModal') public assetCategoryDetailModal: ModalDirective;
//     @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

//     @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;

//     @ViewChild('employeeDetail') public employeeDetail: EmployeeDetail;
//     @ViewChild('employeeList') public employeeList: EmployeeList;
//     @ViewChild('employeeDetailModal') public employeeDetailModal: ModalDirective;
//     @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

//     @ViewChild('partnerDetail') public partnerDetail: PartnerDetail;
//     @ViewChild('partnerList') public partnerList: PartnerList;
//     @ViewChild('partnerDetailModal') public partnerDetailModal: ModalDirective;
//     @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

//     @ViewChild('locationDetail') public locationDetail: LocationDetail;
//     @ViewChild('locationList') public locationList: LocationList;
//     @ViewChild('locationDetailModal') public locationDetailModal: ModalDirective;
//     @ViewChild('locationListModal') public locationListModal: ModalDirective;

//     @ViewChild('roomDetail') public roomDetail: RoomUIDetail;
//     @ViewChild('roomList') public roomList: RoomList;
//     @ViewChild('roomDetailModal') public roomDetailModal: ModalDirective;
//     @ViewChild('roomListModal') public roomListModal: ModalDirective;
    
//     @ViewChild('departmentDetail') public departmentDetail: DepartmentUIDetail;
//     @ViewChild('departmentList') public departmentList: DepartmentList;
//     @ViewChild('departmentDetailModal') public departmentDetailModal: ModalDirective;
//     @ViewChild('departmentListModal') public departmentListModal: ModalDirective;

//     @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailList;
//     @ViewChild('entityFileList') public entityFileList: EntityFileList;

//     @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
//     @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownList;
//     @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownList;
//     @ViewChild('fileInput') fileInput;

//     private entityTypeCode: string = 'ASSET';
//     private entityFile: EntityFile = null;
//     private companyName: string = AppConfig.COMPANY_NAME;
//     private confirmationMessage: string = '';
//     private operationType: OperationType = OperationType.NotSet;

//     private assetId: number = 0;
//     private assetFullDetail: AssetFullDetail = new AssetFullDetail();
//     private filesToUpload: Array<File>;
//     private selectedAssetOp: any;

//     private get allowSaving(): boolean {
//         return this.selectedAssetCategory != null && this.selectedAssetType != null && this.selectedEmployee != null && this.selectedDocumentType != null
//             && this.selectedRoom != null && this.selectedPartner != null && this.assetFullDetail.documentDate != null;
//     }

//     private selectedAssetCategory: AssetCategory = null;
//     private selectedAssetClass: AssetClass = null;
//     private selectedEmployee: Employee = null;
//     private selectedDepartment: Department = null;
//     private selectedLocation: Location = null;
//     private selectedPartner: Partner = null;
//     private selectedRoom: Room = null;
//     private selectedAssetType: AssetType = null;
//     private selectedDocumentType: AppDocumentType = null;
//     private assetValid: boolean = false;

//     constructor(private ngLocation: NgLocation, private route: ActivatedRoute, private router: Router, 
//         private assetHttpService: AssetHttpService, private assetFullDetailHttpService: AssetFullDetailHttpService,
//         private assetCategoryHttpService: AssetCategoryHttpService, private assetClassHttpService: AssetClassHttpService, private assetTypeHttpService: AssetTypeHttpService,
//         private employeeHttpService: EmployeeHttpService, private assetOpHttpService: AssetOpHttpService,
//         private partnerHttpService: PartnerHttpService, private roomDetailHttpService: RoomDetailHttpService, private departmentHttpService: DepartmentHttpService,
//         private documentTypeHttpService: DocumentTypeHttpService, private locationHttpService: LocationHttpService, private entityFileHttpService: EntityFileHttpService) {

//         this.route.params.subscribe((params: Params) => {
//             if (params['id']) {
//                 //let id: number = +params['id'];
//                 this.assetId = +params['id'];
//             }
//             else {
//                 this.assetFullDetail = new AssetFullDetail();
//                 this.assetFullDetail.id = 0;
//                 this.assetFullDetail.depPeriod = 0;
//                 this.assetFullDetail.valueInv = 0;
//             }
//         });
//     }

//     ngAfterViewInit() {
//         //if ((this.assetFullDetail !== null) && (this.assetFullDetail.id === 0)) this.refreshDocumentTypes();
//         if (this.assetId > 0) {
//             this.assetFullDetailHttpService.getById(this.assetId)
//                 .subscribe((asset: AssetFullDetail) => {
//                     this.assetFullDetail = asset;
//                     this.updateDetails(asset);

//                     if (asset.validated) {
//                         this.refreshAssetOperations();
//                         this.refreshEntityFiles();
//                     }
//                     else {
//                         this.refreshAssetTypes();
//                         this.refreshDocumentTypes();
//                     }

//                     this.generateBarcode();
//                 });
//         }
//         else {
//             this.refreshAssetTypes();
//             this.refreshDocumentTypes();
//         }
//     }

//     private refreshEntityFiles(){
//         let params: Array<Param> = new Array<Param>();

//         params.push(new Param('entityTypeCode', 'ASSET'));
//         params.push(new Param('entityId', this.assetFullDetail.id.toString()));

//         this.entityFileList.refresh(params);
//     }

//     private refreshAssetOperations(){
//         let params: Array<Param> = new Array<Param>();

//         params.push(new Param('assetId', this.assetId.toString()));
//         this.assetOpList.refresh(params);

//         // this.assetOpSimpleDetailMemoryService.setDataSource(new Array<AssetOpSd>());

//         // this.assetOpHttpService.getSimpleDetailByAsset(this.assetId).subscribe((assetOps: Array<AssetOpSd>) => {
//         //     assetOps.sort((i1, i2) => i2.id - i1.id)
//         //     this.assetOpSimpleDetailMemoryService.setDataSource(assetOps);
//         //     this.assetOpList.refresh(null);
//         // });
//     }

//     private refreshAssetTypes() {
//         this.assetTypeDropDownList.refresh(null);
//     }

//     private refreshDocumentTypes() {
//         let params: Array<Param> = new Array<Param>();
//         params.push(new Param('parentCode', 'ACQUISITION'));
//         this.documentTypeDropDownList.refresh(params);
//     }

//     private updateDetails(asset: AssetFullDetail) {
//         if (asset.documentTypeId != null) {
//             this.selectedDocumentType = new AppDocumentType(asset.documentTypeId, '', asset.documentType, '', '', true, '', '');
//         }
        
//         if (asset.assetCategoryId != null) {
//             this.selectedAssetCategory = new AssetCategory();
//             this.selectedAssetCategory.id = asset.assetCategoryId;
//             this.selectedAssetCategory.name = asset.assetCategory;
//         }

//         if (asset.assetClassId != null) {
//             this.selectedAssetClass = new AssetClass();
//             this.selectedAssetClass.id = asset.assetClassId;
//             this.selectedAssetClass.name = asset.assetClassName;
//         }

//         if (asset.assetTypeId != null) {
//             this.selectedAssetType = new AssetType();
//             this.selectedAssetType.id = asset.assetTypeId;
//             this.selectedAssetType.name = asset.assetType;
//         }

//         if (asset.departmentId != null) {
//             this.selectedDepartment = new Department(asset.departmentId, '', asset.department, 0);
//         }

//         if (asset.employeeId != null) {
//             this.selectedEmployee = new Employee(asset.employeeId, asset.internalCode, asset.firstName, asset.lastName, asset.departmentId);
//         }

//         if (asset.partnerId != null) {
//             this.selectedPartner = new Partner();
//             this.selectedPartner.id = asset.partnerId;
//             this.selectedPartner.name = asset.partner;
//         }

//         if (asset.locationId != null) {
//             this.selectedLocation = new Location(asset.locationId, asset.locationCode, asset.locationName, 0);
//         }

//         if (asset.roomId != null) {
//             this.selectedRoom = new Room(asset.roomId, asset.roomCode, asset.roomName, asset.locationId);
//         }

//         this.assetValid = this.assetFullDetail.validated;
//     }

//     private setSelectedAssetType(assetTypes: Array<AssetType>) {
//         this.selectedAssetType = ((assetTypes != null) && (assetTypes.length > 0)) ? assetTypes[0] : null;
//     }

//      private setSelectedDocumentType(documentTypes: Array<AppDocumentType>) {
//         this.selectedDocumentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
//     }

//     /*begin asset category*/
//     private selectAssetCategory() {
//         // let selectedAssetCategories: Array<AssetCategory> = null;

//         // if (this.selectedAssetCategory !== null) {
//         //     selectedAssetCategories = new Array<AssetCategory>();
//         //     selectedAssetCategories.push(this.selectedAssetCategory);
//         //     this.assetCategoryList.selectedItems = selectedAssetCategories;
//         // }

//         this.assetCategoryList.refresh(null);
//         this.assetCategoryListModal.show();
//     }

//     private setSelectedAssetCategory() {
//         let items: Array<AssetCategory> = this.assetCategoryList.selectedItems;
//         this.selectedAssetCategory = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.assetCategoryListModal.hide();
//     }

//     private addAssetCategory() {
//         this.assetCategoryDetail.addNew();
//         this.assetCategoryDetailModal.show();
//     }

//     private assetCategoryAdded(assetCategory: AssetCategory) {
//         this.selectedAssetCategory = assetCategory;
//         this.assetCategoryDetailModal.hide();
//     }

//     private assetCategoryAddCanceled() {
//         this.assetCategoryDetailModal.hide();
//     }
//     /*end asset category*/

//     /*begin employee*/
//     private selectEmployee() {
//         this.employeeList.refresh(null);
//         this.employeeListModal.show();
//     }

//     private setSelectedEmployee() {
//         let items: Array<Employee> = this.employeeList.selectedItems;
//         this.selectedEmployee = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.employeeListModal.hide();
//     }

//     private addEmployee() {
//         this.employeeDetail.addNew();
//         this.employeeDetail.department = this.selectedDepartment;
//         this.employeeDetailModal.show();
//     }

//     private employeeAdded(employee: Employee) {
//         this.selectedEmployee = employee;
//         this.employeeDetailModal.hide();
//     }

//     private employeeAddCanceled() {
//         this.employeeDetailModal.hide();
//     }
//     /*end employee*/

//     /* begin department */
//     private selectDepartment() {
//         this.departmentList.refresh(null);
//         this.departmentListModal.show();
//     }

//     private setSelectedDepartment() {
//         let items: Array<Department> = this.departmentList.selectedItems;
//         this.selectedDepartment = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.departmentListModal.hide();
//     }

//     private addDepartment() {
//         this.departmentDetail.addNew();
//         this.departmentDetailModal.show();
//     }

//     private departmentAdded(department: Department) {
//         this.selectedDepartment = department;
//         this.departmentDetailModal.hide();
//     }

//     private departmentAddCanceled() {
//         this.departmentDetailModal.hide();
//     }
//     /*end department */

//     /* begin location */
//     private selectLocation() {
//         this.locationList.refresh(null);
//         this.locationListModal.show();
//     }

//     private setSelectedLocation() {
//         let items: Array<Location> = this.locationList.selectedItems;
//         this.selectedLocation = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.locationListModal.hide();
//     }

//     private addLocation() {
//         this.locationDetail.addNew();
//         this.locationDetailModal.show();
//     }

//     private locationAdded(location: Location) {
//         this.selectedLocation = location;
//         this.locationDetailModal.hide();
//     }

//     private locationAddCanceled() {
//         this.locationDetailModal.hide();
//     }
//     /*end location */

//     /*begin partner*/
//     private selectPartner() {
//         this.partnerList.refresh(null);
//         this.partnerListModal.show();
//     }

//     private setSelectedPartner() {
//         let items: Array<Partner> = this.partnerList.selectedItems;
//         this.selectedPartner = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.partnerListModal.hide();
//     }

//     private addPartner() {
//         this.partnerDetail.addNew();
//         this.partnerDetailModal.show();
//     }

//     private partnerAdded(partner: Partner) {
//         this.selectedPartner = partner;
//         this.partnerDetailModal.hide();
//     }

//     private partnerAddCanceled() {
//         this.partnerDetailModal.hide();
//     }
//     /*end partner*/
	
//     /*begin room*/
//     private selectRoom() {
//         this.roomList.refresh(null);
//         this.roomListModal.show();
//     }

//     private setSelectedRoom() {
//         let items: Array<Room> = this.roomList.selectedItems;
//         this.selectedRoom = ((items != null) && (items.length === 1)) ? items[0] : null;
//         this.roomListModal.hide();
//     }

//     private addRoom() {
//         this.roomDetail.addNew();
//         this.roomDetail.location = this.selectedLocation;
//         this.roomDetailModal.show();
//     }

//     private roomAdded(room: Room) {
//         this.selectedRoom = room;
//         this.roomDetailModal.hide();
//     }

//     private roomAddCanceled() {
//         this.roomDetailModal.hide();
//     }
//     /*end room*/

//      private cancelChanges() {
//         //this.ngLocation.back();
//         this.router.navigate(['/assetinvdetails'])
//     }

//     private onDeleteAsset() {
//         this.operationType = OperationType.Delete;
//         this.confirmationMessage = 'Stergeti inregistrarea curenta?';
//         this.confirmationModal.show();
//     }

//     private deleteAsset() {
//         this.assetFullDetailHttpService.delete(this.assetFullDetail.id)
//             .subscribe(() => this.router.navigate(['/assetdepdetails']));
//     }

//     private onValidateAsset() {
//         this.operationType = OperationType.AssetValidation;
//         this.confirmationMessage = 'Validati inregistrarea curenta?';
//         this.confirmationModal.show();
//     }

//     private validateAsset() {
//         this.assetValid = true;
//         this.saveAsset();
//     }

//     private addNewOperation() {
//         let assets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
//         assets.push(new AssetSimpleDetail(this.assetFullDetail.id, this.assetFullDetail.invNo, this.assetFullDetail.name, 
//             '', this.assetFullDetail.partner, this.assetFullDetail.assetType, this.assetFullDetail.accState, this.assetFullDetail.usageStartDate, '', ''));
//         AppData.AssetList = assets;
//         this.router.navigate(['/newoperation']);
//     }

//     private saveAsset() {

//         let assetUpload: AssetUpload = new AssetUpload();

//         assetUpload.id = this.assetFullDetail.id;
//         assetUpload.invNo = this.assetFullDetail.invNo;
//         assetUpload.invNoOld = this.assetFullDetail.invNoOld;
//         assetUpload.name = this.assetFullDetail.name;
//         assetUpload.serialNumber = this.assetFullDetail.serialNumber;
//         assetUpload.erpCode = this.assetFullDetail.erpCode;
//         //assetUpload.info = this.assetFullDetail.in
        
//         assetUpload.documentTypeId = this.selectedDocumentType.id;
//         assetUpload.documentId = this.assetFullDetail.documentId;
//         assetUpload.docNo1 = this.assetFullDetail.docNo1;
//         assetUpload.docNo2 = this.assetFullDetail.docNo2;
//         assetUpload.documentDate = this.assetFullDetail.documentDate;
//         assetUpload.partnerId
        
//         assetUpload.assetTypeId = this.selectedAssetType.id;
//         assetUpload.valueInv = this.assetFullDetail.valueInv;
        
//         assetUpload.assetCategoryId = this.selectedAssetCategory.id;
//         assetUpload.employeeId = this.selectedEmployee.id;
//         assetUpload.roomId = this.selectedRoom.id;
        
//         assetUpload.validated = this.assetValid;

//         // this.assetFullDetail.accStateId = 1;
//         // this.assetFullDetail.assetTypeId = this.selectedAssetType.id;
//         // this.assetFullDetail.documentTypeId = this.selectedDocumentType.id;

//         // this.assetFullDetail.assetCategoryId = this.selectedAssetCategory.id;
//         // this.assetFullDetail.employeeId = this.selectedEmployee.id;
//         // this.assetFullDetail.roomId = this.selectedRoom.id;
//         // this.assetFullDetail.partnerId = this.selectedPartner.id;

//         // //this.assetFullDetail.assetClassId = this.selectedAssetClass.id;
//         // this.assetFullDetail.assetClassId = 1;

//         // this.assetFullDetail.validated = this.assetValid;

//         if (this.assetFullDetail.id > 0) {
//              this.assetHttpService.update(this.assetFullDetail)
//                 .subscribe(() => {
//                     this.assetFullDetailHttpService.getById(this.assetFullDetail.id)
//                         .subscribe((assetFullDetail: AssetFullDetail) => {
//                             this.updateDetails(assetFullDetail);
//                         })
//             });
//         }
//         else {
//             this.assetHttpService.addNewAsset(assetUpload)
//                 .subscribe((assetId: number) => {
//                     this.router.navigate(['/asset', assetId]);
//                 });
//         }
//     }

//     private onConfirmationApproved() {

//         switch (this.operationType) {
//             case OperationType.AssetValidation:
//                 this.validateAsset();
//                 break;
//             case OperationType.Delete:
//                 this.deleteAsset();
//                 break;
//             case OperationType.ProcessAssetOp:
//                 this.processAssetOp();
//                 break;
//             default:
//                 break;
//         }

//         this.operationType = OperationType.NotSet;
//         this.confirmationModal.hide();
//     }

//     private onConfirmationCanceled() {
//         this.operationType = OperationType.NotSet;
//         this.confirmationModal.hide();
//     }

//     private onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
//         this.selectedAssetOp = this.assetOpList.selectedItem;
//     }

//     private onEntityFileListSelectionChanged(entityFiles: Array<EntityFile>) {
//         this.entityFile = ((entityFiles != null) && (entityFiles.length === 1)) ? entityFiles[0] : null;
//     }

//     private showReport() {
//         let reportType: string = '';
//         let validReport: boolean = false;

//         if (this.selectedAssetOp != null) {
//             //switch(this.selectedAssetOp.documentTypeCode) {
//                 switch(this.selectedAssetOp.documentType.code) {
//                 case AppConfig.DOCUMENT_TYPE_TRANSFER:
//                     reportType = 'movementproviding';
//                     validReport = true;
//                     break;
//                 case AppConfig.DOCUMENT_TYPE_CASS:
//                     reportType = 'annulement';
//                     validReport = true;
//                     break;
//                 default:
//                     break;
//             }

//             if (validReport) {
//                 //window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.documentId}`);
//                 window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${this.selectedAssetOp.document.id}`);
//             }
//         }
//     }

//     private generateBarcode() {
//         let controlId: string = '#assetBarcodeLabel';
//         jsbarcode($(controlId)[0], this.assetFullDetail.invNo, {
//             format: 'CODE128',
//             displayValue: true,
//             marginTop: 0,
//             marginRight: 5,
//             fontSize: 16,
//             width: 2,
//             height: 70,
//             font: 'arial',
//             textAlign: 'center'
//         });
//     }

//     private printBarcodeLabel() {
//         // let controlId: string = '#assetBarcodeLabel';
//         // jsbarcode($(controlId)[0], this.assetFullDetail.invNo, {
//         //     format: 'CODE128',
//         //     displayValue: true,
//         //     marginTop: 0,
//         //     marginRight: 5,
//         //     fontSize: 16,
//         //     width: 2,
//         //     height: 70,
//         //     font: 'arial',
//         //     textAlign: 'center'
//         // });
        
//         let popupWinindow: any = null;
//         let innerContents = document.getElementById('barcodes').innerHTML;
//         popupWinindow = window.open('', '_blank', 'width=600,height=700,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
//         popupWinindow.document.open();
//         popupWinindow.document.write('<html><head><link rel='stylesheet' /></head><body onload='window.print()'>' +'<div>' + innerContents + '</div>' + '</html>');
//         popupWinindow.document.close();
//     }

//     private parseDate(dateString: string): Date {
//         if (dateString) {
//             return new Date(dateString);
//         } else {
//             return null;
//         }
//     }

//     private onProcessAssetOp() {
//         this.operationType = OperationType.ProcessAssetOp;
//         this.confirmationMessage = 'Procesati operatia selectata?';
//         this.confirmationModal.show();
//     }

//     private processAssetOp() {
//         this.assetOpHttpService.process(this.assetOpList.selectedItem.id).subscribe((data) => {
//             this.refreshAssetOperations();
//         });
//     }

//     // private upload() {

//     //     console.log('start upload');

//     //     let fi = this.fileInput.nativeElement;
//     //     if (fi.files && fi.files[0]) {
//     //         let fileToUpload = fi.files[0];

//     //         console.log(JSON.stringify(fileToUpload));

//     //         this.entityFileHttpService
//     //             //.upload(fileToUpload, this.entityId, this.entityType, this.info)
//     //             .upload(fileToUpload, 23, 'ASSET', 'test')
//     //             .subscribe(res => {
//     //                 console.log(res);
//     //             });
//     //     }
//     // }
// }

// enum OperationType {
//     NotSet = 1,
//     AssetValidation = 2,
//     Delete = 3,
//     ProcessAssetOp = 4
// }