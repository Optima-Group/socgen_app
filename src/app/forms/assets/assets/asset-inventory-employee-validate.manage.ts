import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './../../../config';
import { RoomList } from './../../administration/rooms/room.list';
import { LocationList } from './../../administration/locations/location.list';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { EmployeeList } from './../../administration/employees/employee.list';
import { Component, EventEmitter, ViewChild, ElementRef, Output, ViewContainerRef, OnInit } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Param } from '../../../model/common/param';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
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
import { AssetInvFullDetail } from 'app/model/api/assets/asset-inv-full-detail';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
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
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { AppData } from 'app/app-data';
import { CompanyList } from '../companies/company.list';
import { Company } from 'app/model/api/assets/company';
import { CompanyHttpService } from 'app/services/http/assets/company.http.service';
import { CountyHttpService } from 'app/services/http/administration/county.http.service';
import { CityHttpService } from 'app/services/http/administration/city.http.service';
import { CountyList } from 'app/forms/administration/counties/county.list';
import { CityList } from 'app/forms/administration/cities/city.list';
import { City } from 'app/model/api/administration/city';
import { County } from 'app/model/api/administration/county';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { IdentityService } from 'app/services/http/identity/identity.service';
import { DocumentType } from '../../../model/api/documents/document-type';
import { DocumentTypeHttpService } from 'app/services/http/documents/document-type.http.service';
import { EmployeeValidate } from 'app/model/common/import/employee-validate';
import { AssetEntityList } from './asset-entity.list';
import { TableItem } from 'app/model/common/table-item';
import { EmployeeUpdate } from 'app/model/common/import/employee-update';

@Component({
    selector: 'asset-inventory-employee-validate-manage',
    templateUrl: 'asset-inventory-employee-validate.manage.html',
    styleUrls: ['asset-inventory-employee-validate.manage.scss'],
    providers: [
        AdmCenterHttpService,
        AssetHttpService,
        InventoryHttpService,
        AdministrationHttpService,
        DivisionHttpService,
        AssetTypeHttpService,
        AssetCategoryHttpService,
        EntityFileHttpService,
        LocationHttpService,
        RegionHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        CompanyHttpService,
        CountyHttpService,
        CityHttpService,
        InvStateHttpService,
        IdentityService,
        DocumentTypeHttpService ]
})
export class AssetInventoryEmployeeValidateManage implements OnInit  {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailList;

    @ViewChild('departmentsModal') public departmentsModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;


    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('countyList') public countyList: CountyList;
    @ViewChild('countyListModal') public countyListModal: ModalDirective;

    @ViewChild('cityList') public cityList: CityList;
    @ViewChild('cityListModal') public cityListModal: ModalDirective;


    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;


    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('administrationList') public administrationList: AdministrationList;
    @ViewChild('administrationListModal') public administrationListModal: ModalDirective;

    @ViewChild('divisionList') public divisionList: DivisionList;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeList;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyList;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
    @ViewChild('assetEntityList') assetEntityList: AssetEntityList;

    @ViewChild('fileInput') fileInput: ElementRef;
    @ViewChild('uploadModal') public uploadModal: ModalDirective;

    @ViewChild('imageListModal') public imageListModal: ModalDirective;


    @Output() protected uploadFinished = new EventEmitter<void>();
    protected operationType: number = OperationType.NotSet;
    private documentTypes: Array<DocumentType> = new Array<DocumentType>();
    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetToUpdate = new Array<EmployeeValidate>();
    public assetToAllUpdate = new Array<EmployeeValidate>();
    private selectedEmployee: Employee = null;
    private selectedLocation: Location = null;
    private selectedRoom: Room = null;

    private confirmationMessage: string = 'Confirmati intreaga lista ?';

    private filter: string = '';
    private smallPageSize: number = 5;
    private largePageSize: number = 10;

    private reportTypeCode: string = 'ALL';
    private reportChangeTypeCode: string = 'ALL';
    private assetStateCode: string = 'ALL';
    private reportTypeName: string = 'Toate';
    private reportChangeTypeName: string = 'Toate';
    private assetStateName: string = 'Stari gestiune';
    private custody: string = '-';
    private isPrinted: string = '-';
    private isDuplicate: string = '-';
    private isPrintedTemp: string = '-';
    private isDuplicateTemp: string = '-';
    private documentType: string = 'Transferuri';
    private showFilters: boolean = true;
    private showSearchButtoIconClass: string = 'fa fa-search-minus';

    private pageSizeUpdatedEvent: EventEmitter<number> = new EventEmitter<number>();
    // private requestInvCompOpRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    // private requestInvCompDetailRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    private selectedInventory: Inventory = null;
    private selectedEmployeesFin: Array<Employee> = new Array<Employee>();
    private selectedAdmCentersFin: Array<AdmCenter> = new Array<AdmCenter>();
    private selectedRegionsFin: Array<Region> = new Array<Region>();
    private selectedLocationsFin: Array<Location> = new Array<Location>();
    private selectedCitiesFin: Array<City> = new Array<City>();
    private selectedCountiesFin: Array<County> = new Array<County>();
    private selectedRoomsFin: Array<Room> = new Array<Room>();
    private selectedDivisionsFin: Array<Division> = new Array<Division>();
    private selectedAdministrationsFin: Array<Administration> = new Array<Administration>();
    private selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();
    private selectedAssets: Array<AssetInvFullDetail> = new Array<AssetInvFullDetail>();
    private selectedCompanies: Array<Company> = new Array<Company>();

    private selectedInvStatesFin: Array<InvState> = new Array<InvState>();
    private selectedAsset: AssetInvFullDetail = null;
    private isReconcile: string = '-';
    private filtersType: string = '';
    private allowLabel: string = '-';
    private get isAdmin(): boolean { return AppData.UserIsAdmin; }

    private get notScannedViewMode(): boolean { return (this.reportTypeCode === 'NOT_SCANNED'); }
    private get showFinalFilters(): boolean { return (this.reportTypeCode !== 'NOT_SCANNED'); }

    // private showDepartmentDetails: boolean = AppConfig.SHOW_DEPARTMENT_DETAILS;
    private get useAdmCenter(): boolean { return AppConfig.USE_ADM_CENTER; }
    private get useDepartment(): boolean { return AppConfig.USE_DEPARTMENT; }
    private get useRegion(): boolean { return AppConfig.USE_REGION; }
    private get useEmployee(): boolean { return AppConfig.USE_EMPLOYEE; }
    private get useRoom(): boolean { return AppConfig.USE_ROOM; }
    private get useAdministration(): boolean { return AppConfig.USE_ADMINISTRATION; }
    private get useAssetType(): boolean { return AppConfig.USE_ASSETTYPE; }
    private get useAssetCategory(): boolean { return AppConfig.USE_ASSETCATEGORY; }
    private useAssetStates: boolean= AppConfig.USE_ASSET_STATE;
    private fileEvent: any = null;
    private selectedDocumentType: DocumentType = null;
    guid: string = '';
    public chartPies: Array<Object>;
    public headPhones = '-';
    public headInfo = '';
    employee: Employee;

    constructor(
        private router: Router,
        private assetHttpService: AssetHttpService,
        private administrationDetailHttpService: AdministrationHttpService,
        private assetTypeHttpService: AssetTypeHttpService,
        private assetCategoryHttpService: AssetCategoryHttpService,
        private entityFileHttpService: EntityFileHttpService,
        private admCenterHttpService: AdmCenterHttpService,
        private inventoryHttpService: InventoryHttpService,
        private divisionHttpService: DivisionHttpService,
        private locationHttpService: LocationHttpService,
        private regionHttpService: RegionHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private employeeHttpService: EmployeeHttpService,
        private companyHttpService: CompanyHttpService,
        private countyHttpService: CountyHttpService,
        private cityHttpService: CityHttpService,
        private invStateHttpService: InvStateHttpService,
        private identityHttpService: IdentityService,
        private documentTypeHttpService: DocumentTypeHttpService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private route: ActivatedRoute,
        private translate: TranslateService) {
             translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
            this.toastr.setRootViewContainerRef(vcr);
             // console.log('constructor');
             this.route.params.subscribe((params: Params) => {
                if (params['id']) {
                    this.guid = params['id'];

                    // this.refreshAssets();
                }
            });

            // this.router.events.subscribe((evt) => {
            //     if (evt instanceof NavigationEnd) {
            //         if (evt.urlAfterRedirects === '/employeevalidates/' + this.guid) {
            //             this.refreshAssets();
            //         }
            //     }
            // });


    }

    ngAfterViewInit() {
            // this.documentTypeHttpService.getDetailByParentCode('INVENTORYASSET').subscribe((res: any) => { this.documentTypes = res; });
            // this.checkForRefresh();
            // this.clearFilters();
            setTimeout(() => {
                 this.clearFilters();
                 this.updateData();
            }, 3000);

    }


    ngOnInit() {
      this.employeeHttpService.getByGUID(this.guid).subscribe( (res) => {
        this.employee = res;
        if(this.employee != null){
          this.headInfo = this.employee.headInfo;
        this.headPhones = this.employee.headPhones;
        }
      });
    }

    private selectAsset() {
        this.assetEntityListModal.show();
        this.assetEntityList.refresh(null);
    }

    private setSelectedAsset() {
        // this.selectedAsset = this.assetEntityList.selectedItem;
        if (this.assetEntityList.selectedItems.length > 0) {

            if (this.assetInvFullDetailList.TableItems.length > 0) {
                const result = this.assetInvFullDetailList.TableItems.filter(a => a.item.id == this.assetEntityList.selectedItems[0].id);

                if (result.length === 0) {
                   this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
                }
            } else {
                this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
            }



        }
        this.assetEntityListModal.hide();
    }


    private onAssetListCancel() {
        this.assetEntityListModal.hide();
    }

    private clearSelectedAsset() {
        this.assetInvFullDetailList.TableItems.push(new TableItem(this.assetEntityList.selectedItem, true));
    }

    private onAllowLabelUpdate(allowLabel: string) {
        this.allowLabel = allowLabel;
        this.checkForRefresh();
    }

    private onDocumentTypeUpdate(documentTypeId: number, documentTypeName: string) {

        if (documentTypeId !== -1) {
            this.selectedDocumentType = new DocumentType(documentTypeId, documentTypeName, documentTypeName, 'INVENTORYASSET', '', true, '', '');
        } else {
            this.selectedDocumentType = null;
        }

        this.documentType = documentTypeName;
        this.checkForRefresh();
    }


    private saveValidated(){

        this.assetToUpdate = new Array<EmployeeValidate>();
        //this.assetToUpdate.asetIds = new Array<number>();
        //this.assetToUpdate.accepted = new Array<boolean>();
        //this.assetToUpdate.reason = new Array<string>();

        this.assetInvFullDetailList.TableItems.forEach(element => {
            this.assetToUpdate.push(new EmployeeValidate(element.item.id, element.item.isMinus, element.item.infoMinus, this.guid));
        });

        // this.assetInvFullDetailList.selectedItems.forEach(element => {

        //     // let index = this.assetToUpdate.filter(a => a.assetId == element.assetId);

        //     // if (index.length < 1) {
        //     //     this.assetToUpdate.push(element.id, element.isMinus, element.infoMinus);
        //     //     // this.assetToUpdate.accepted.push(element.isMinus);
        //     //     // this.assetToUpdate.reason.push(element.infoMinus);
        //     // }

        //     console.log(JSON.stringify(element.invNo));

        //     this.assetToUpdate.push(new EmployeeValidate(element.id, element.isMinus, element.infoMinus));


        // });
        // console.log(JSON.stringify(this.assetToUpdate));
        this.assetHttpService.employeeValidate(this.assetToUpdate).subscribe((res) => {

            if (res.statusCode === 200){
                this.toastr.success('Validation completed successfully!');
            }else{
                this.toastr.error('Validation error!');
            }

            this.checkForRefresh();
            this.updateData();
        }, (error) => {
            this.toastr.error('Server error!');
        });

        // alert(JSON.stringify(this.assetToUpdate));
    }


    private saveValidatedAll(){

        this.operationType = OperationType.EmployeeValidateAll;
        this.confirmationModal.show();




        // alert(JSON.stringify(this.assetToUpdate));
    }

    validateAll() {
        this.assetHttpService.employeeValidateAll(this.guid).subscribe((res) => {

            if (res.statusCode === 200){
                this.toastr.success('Validarea a fost finalizata cu success!');
            }else{
                this.toastr.error('Eroare validare!');
            }

            this.checkForRefresh();
        }, (error) => {
            this.toastr.error('Eroare server!');
        });
    }


    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.EmployeeValidate:
                this.saveValidated();
                break;
            case OperationType.EmployeeValidateAll:
                this.validateAll();
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

    private onAssetInvFullDetailSelectionChanged(assets: Array<AssetInvFullDetail>) {

        this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;
    }

    onAssetEmployeeValidateListAfterViewInit() {
        // setTimeout(() => {
        //     this.refreshAssets();
        // }, 100);
    }

    private clearSelection() {
        this.selectedAssets = new Array<AssetInvFullDetail>();
        this.assetInvFullDetailList.selectedItems = this.selectedAssets;
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

      /* begin employee */
      private selectEmployees(filtersType: string) {
        this.filtersType = filtersType;
        let selectedEmployees: Array<Employee> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                this.employeeListModal.show();
                this.employeeList.selectedItems = selectedEmployees;
                this.employeeList.refresh(null);
                break;
            default:
                break;
        }
    }

    private removeFromEmployeeSelection(filtersType: string, employee: Employee) {
        let selectedEmployees: Array<Employee> = null;

        switch (filtersType) {
            case 'FIN':
                selectedEmployees = this.selectedEmployeesFin;
                break;
            default:
                 break;
        }
        let index: number = selectedEmployees.indexOf(employee);
        selectedEmployees.splice(index, 1);
        this.checkForRefresh(filtersType);
    }

    private clearEmployeeSelection(filtersType: string) {
        switch (filtersType) {
            case 'FIN':
                this.selectedEmployeesFin = new Array<Employee>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedEmployees(filtersType: string) {
        switch (this.filtersType) {
            case 'FIN':
                this.selectedEmployeesFin = this.employeeList.selectedItems;
                this.employeeListModal.hide();
                break;
            default:
                break;
        }

        this.checkForRefresh(this.filtersType);
    }

    /*end employee*/

  /* begin admcenter */
  private selectAdmCenters(filtersType: string) {
    this.filtersType = filtersType;

    let selectedAdmCenters: Array<AdmCenter> = null;

    let selectedRegions: Array<Region> = null;
    selectedRegions = this.selectedRegionsFin;
    let params = new Array<Param>();
    params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>(selectedRegions)));

    switch (this.filtersType) {
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            this.admCenterListModal.show();
            this.admCenterList.selectedItems = selectedAdmCenters;
            this.admCenterList.refresh(null);
            break;
        default:
            break;
    }
}

private removeFromAdmCenterSelection(filtersType: string, admCenter: AdmCenter) {
    let selectedAdmCenters: Array<AdmCenter> = null;

    switch (filtersType) {
        case 'FIN':
            selectedAdmCenters = this.selectedAdmCentersFin;
            break
        default:
            break;
    }

    let index: number = selectedAdmCenters.indexOf(admCenter);
    selectedAdmCenters.splice(index, 1);
    this.checkForRefresh(filtersType);
}

private clearAdmCenterSelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedAdmCentersFin = new Array<AdmCenter>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedAdmCenters() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedAdmCentersFin = this.admCenterList.selectedItems;
            this.admCenterListModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
/* end admcenter */


   /* begin region */
   private selectRegions(filtersType: string) {
    this.filtersType = filtersType;

    let selectedRegions: Array<Region> = null;


    switch (this.filtersType) {
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
            this.regionListModal.show();
            this.regionList.selectedItems = selectedRegions;
            this.regionList.refresh(null);
            break;
        default:
            break;
    }

}

private removeFromRegionSelection(filtersType: string, region: Region) {
    let selectedRegions: Array<Region> = null;

    switch (filtersType) {
        case 'FIN':
            selectedRegions = this.selectedRegionsFin;
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
        case 'FIN':
            this.selectedRegionsFin = new Array<Region>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedRegions() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedRegionsFin = this.regionList.selectedItems;
            this.regionListModal.hide();
            break;
        default:
            break;
    }

    this.checkForRefresh(this.filtersType);
}
    /* end region */

    /* COUNTIES */
  private selectCounties(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;

    switch (this.filtersType) {
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }


    this.countyListModal.show();
    this.countyList.selectedItems = selectedCounties;
    this.locationList.refresh(null);
}

private removeFromCountySelection(filtersType: string, county: County) {
    let selectedCounties: Array<County> = null;

    switch (filtersType) {
        case 'FIN':
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }
    let index: number = selectedCounties.indexOf(county);
    selectedCounties.splice(index, 1);
    this.checkForRefresh(filtersType);
}

private clearCountySelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedCountiesFin = new Array<County>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedCounties() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedCountiesFin = this.countyList.selectedItems;
            break;
        default:
            break;
    }

    this.countyListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* COUNTIES */

  /* CITY */
  private selectCities(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCounties: Array<County> = null;
    let selectedCities: Array<City> = null;

    switch (this.filtersType) {
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            selectedCounties = this.selectedCountiesFin;
            break;
        default:
            break;
    }

    let params = new Array<Param>();
    params.push(new Param('countyIds', AppUtils.getIdsList<County, number>(selectedCounties)));


    this.cityListModal.show();
    this.cityList.selectedItems = selectedCities;
    this.cityList.refresh(params);
}

private removeFromCitySelection(filtersType: string, city: City) {
    let selectedCities: Array<City> = null;

    switch (filtersType) {
        case 'FIN':
            selectedCities = this.selectedCitiesFin;
            break;
        default:
            break;
    }
    let index: number = selectedCities.indexOf(city);
    selectedCities.splice(index, 1);
    this.checkForRefresh(filtersType);
}

private clearCitySelection(filtersType: string) {
    switch (filtersType) {
        case 'FIN':
            this.selectedCitiesFin = new Array<City>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedCities() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedCitiesFin = this.cityList.selectedItems;
            break;
        default:
            break;
    }

    this.cityListModal.hide();
    this.checkForRefresh(this.filtersType);
}
/* CITY */

/* begin location */
private selectLocations(filtersType: string) {
    this.filtersType = filtersType;

    let selectedCities: Array<City> = null;
    let selectedLocations: Array<Location> = null;
    let selectedAdmCenters: Array<AdmCenter> = null;

    let params = new Array<Param>();

    switch (this.filtersType) {
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
            selectedCities = this.selectedCitiesFin;
            selectedAdmCenters = this.selectedAdmCentersFin;
            params.push(new Param('cityIds', AppUtils.getIdsList<City, number>(selectedCities)));
            // params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegionsFin)));
            params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>(selectedAdmCenters)));
            // params.push(new Param("companyIds", AppUtils.getIdsList<Company, number>(selectedCompaniesFin)));

            this.locationListModal.show();
            this.locationList.selectedItems = selectedLocations;
            this.locationList.refresh(params);
            break;
        default:
            break;
    }

}

private removeFromLocationSelection(filtersType: string, location: Location) {
    let selectedLocations: Array<Location> = null;

    switch (filtersType) {
        case 'FIN':
            selectedLocations = this.selectedLocationsFin;
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
        case 'FIN':
            this.selectedLocationsFin = new Array<Location>();
            break;
        default:
            break;
    }

    this.checkForRefresh(filtersType);
}

private setSelectedLocations() {
    switch (this.filtersType) {
        case 'FIN':
            this.selectedLocationsFin = this.locationList.selectedItems;
            this.locationListModal.hide();
            break;
        default:
            break;
    }
    this.checkForRefresh(this.filtersType);
}
/* end location */

    /* begin Division */
    private selectDivisions(filtersType: string) {
        this.filtersType = filtersType;

        let selectedDivisions: Array<Division> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
                break;
           default:
                break;
        }

        let params = new Array<Param>();

        this.divisionListModal.show();
        this.divisionList.selectedItems = selectedDivisions;
        this.divisionList.refresh(params);
    }

    private removeFromDivisionSelection(filtersType: string, division: Division) {
        let selectedDivisions: Array<Division> = null;

        switch (filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
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
            case 'FIN':
                this.selectedDivisionsFin = new Array<Division>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedDivisions() {
        switch (this.filtersType) {
            case 'FIN':
                this.selectedDivisionsFin = this.divisionList.selectedItems;
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

        let selectedLocationsIni: Array<Location> = null;
        let selectedLocationsFin: Array<Location> = null;
        let selectedLocationsAll: Array<Location> = null;
        let selectedLocationsNi: Array<Location> = null;
        let selectedRooms: Array<Room> = null;
        let params = new Array<Param>();

        switch (this.filtersType) {
            case 'FIN':
                selectedRooms = this.selectedRoomsFin;
                selectedLocationsFin = this.selectedLocationsFin;
                params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocationsFin)));
                this.roomListModal.show();
                this.roomList.selectedItems = this.selectedRoomsFin;
                this.roomList.refresh(params);
                break;
            default:
                break;
        }

    }

    private removeFromRoomSelection(filtersType: string, room: Room) {

        let selectedRooms: Array<Room> = null;
        // let list: Array<Room> = filtersType === 'INI' ? this.selectedRoomsIni : filtersType === 'NI' ?
        // this.selectedRoomsNi :  filtersType === 'ALL' ? this.selectedRoomsAll : this.selectedRoomsFin;

        switch (filtersType) {
            case 'FIN':
            selectedRooms = this.selectedRoomsFin;
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
            case 'FIN':
                this.selectedRoomsFin = new Array<Room>();
                break;
            default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedRooms() {

            switch (this.filtersType) {
                case 'FIN':
                    this.selectedRoomsFin = this.roomList.selectedItems;
                    this.roomListModal.hide();
                    break;
                default:
                    break;
            }

        this.checkForRefresh(this.filtersType);
    }
    /* end room */

     /* begin AssetState */
     private selectInvStates(filtersType: string) {
        this.filtersType = filtersType;

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                this.invStateListModal.show();
                this.invStateList.selectedItems = selectedInvStates;
                this.invStateList.refresh(null);
                break;
          default:
               break;
        }

    }

    private removeFromInvStateSelection(filtersType: string, assetState: InvState) {

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        switch (filtersType) {
            case 'FIN':
                selectedInvStates = this.selectedInvStatesFin;
                let indexFin: number = selectedInvStates.indexOf(assetState);
                selectedInvStates.splice(indexFin, 1);
                this.checkForRefresh(filtersType);
                break;
           default:
                break;
        }

    }

    private clearInvStateSelection(filtersType: string) {

        switch (filtersType) {
            case 'FIN':
                this.selectedInvStatesFin = new Array<InvState>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedInvStates() {

        switch (this.filtersType) {
            case 'FIN':
                this.selectedInvStatesFin = this.invStateList.selectedItems;
                this.invStateListModal.hide();
                this.checkForRefresh(this.filtersType);
                break;
            default:
                break;
        }

    }
          /* end Administration */

     /* begin Administration */
     private selectAdministrations(filtersType: string) {
        this.filtersType = filtersType;

      //  let selectedRegions: Array<Region> = null;
        let selectedDivisions: Array<Division> = null;
        let selectedAdministrations: Array<Administration> = null;

        switch (this.filtersType) {
            case 'FIN':
                selectedDivisions = this.selectedDivisionsFin;
               // selectedRegions = this.selectedRegionsFin;
                selectedAdministrations = this.selectedAdministrationsFin;
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
            case 'FIN':
            selectedAdministrations = this.selectedAdministrationsFin;
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
            case 'FIN':
                this.selectedAdministrationsFin = new Array<Administration>();
                break;
           default:
                break;
        }

        this.checkForRefresh(filtersType);
    }

    private setSelectedAdministrations() {

        switch (this.filtersType) {
            case 'FIN':
                this.selectedAdministrationsFin = this.administrationList.selectedItems;
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
        /* end AssetCategory *





        /*end ASSET CLASSIFICATION */


    private onCustodyUpdate(custody: string) {
        this.custody = custody;
        this.checkForRefresh();
    }

    private onToolbarButtonClicked(button: string) {
        this.showFilters = !this.showFilters;
        this.showSearchButtoIconClass = this.showFilters ? 'fa fa-search-minus' : 'fa fa-search-plus';
    }

    private checkForRefresh(filtersType?: string) {
        this.refreshAssets();
    }

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();
        this.assetInvFullDetailList.refresh(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();

        // const token = localStorage.getItem('id_token');
        // const tokenPayload = decode(token);
        // const userId = tokenPayload.sub;

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '8'));

        params.push(new Param('documentTypeId', this.selectedDocumentType != null ? this.selectedDocumentType.id.toString() : '0'));
        params.push(new Param('filter', this.filter));
        params.push(new Param('userId', this.guid));
        params.push(new Param('reportType', this.reportTypeCode));
        params.push(new Param('custody', ((this.custody === '-') ? 'null' : (this.custody === 'YES' ? 'true' : 'false'))));
        params.push(new Param('allowLabel', ((this.allowLabel === '-') ? 'null' : (this.allowLabel === 'DA' ? 'true' : 'false'))));
        return params;
    }


    private showPhoto(type: string){

        this.imageListModal.show();
            switch (type) {
                case 'ASSET':
                    this.refreshEntityFiles(this.assetInvFullDetailList.selectedItem.id, true);
                    break;
                default:
                    break;
            }
    }

    private refreshLocationsEntityFiles(assetId: number, loadAssetImages: boolean) {
        this.entityFileHttpService.getByEntity('LOCATION', assetId)
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

    private clearFilters() {

        this.selectedAssetTypes = new Array<AssetType>();
        this.selectedCompanies = new Array<Company>();
        this.selectedAssetCategories = new Array<AssetCategory>();
        this.selectedAdmCentersFin = new Array<AdmCenter>();
        this.selectedEmployeesFin = new Array<Employee>();
        this.selectedRegionsFin = new Array<Region>();
        this.selectedCountiesFin = new Array<County>();
        this.selectedCitiesFin = new Array<City>();
        this.selectedLocationsFin = new Array<Location>();
        this.selectedRoomsFin = new Array<Room>();
        this.selectedDivisionsFin = new Array<Division>();
        this.selectedAdministrationsFin = new Array<Administration>();
        this.selectedInvStatesFin = new Array<InvState>()
        this.filter = '';

        this.updateData();
        this.checkForRefresh();
    }

            private exportAll() {

                let params: Array<Param> = null;

                params = this.getFilters();
                this.assetHttpService
                    .exportAll(params)
                    .subscribe((blob) => {
                fileSaveAs(blob, 'Lista inventar 2020.xlsx');
            });
            }

    private refreshEntityFiles(assetId: number, loadAssetImages: boolean) {
                this.entityFileHttpService.getByEntity('ASSET', assetId)
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

            public showInventoryList() :void {
                let url: string = '';
                let internalCode: string = '';

                // console.log(this.empIntCode);

                internalCode = this.guid;

                url = `${AppConfig.reportingServer}Report.aspx/?report=employeeReport&reportType=employeeReport&internalCode=${internalCode}`;

                window.open(url);
              }

              private updateData() {

                this.employeeHttpService.items().subscribe( (res) => {

                  let employee: number = +res.map(r => r.employee);
                  let pieProcentages: number = +res.map(r => r.procentage);
                  let emailSend: number = +res.map(r => r.emailSend);
                  let isConfirmed: number = +res.map(r => r.isConfirmed);
                  let pieColor = 'rgb(255, 87, 25)';

                  this.chartPies =
              [
                {
                  color: pieColor,
                  description: 'Employees',
                  stats: employee,
                  icon: 'person',
                },
                {
                  color: pieColor,
                  description: 'Emails sent',
                  stats: emailSend,
                  icon: 'face',
                },

                {
                  color: pieColor,
                  description: 'Confirmed',
                  stats: isConfirmed,
                  icon: 'refresh'
                },
                 {
                  color: pieColor,
                  description: 'Procentage confirmed',
                  stats: pieProcentages,
                  icon: 'money',
                },

              ];

              this.employeeHttpService.getByGUID(this.guid).subscribe( (res) => {
                this.employee = res;
                if(this.employee != null){
                  this.headInfo = this.employee.headInfo;
                this.headPhones = this.employee.headPhones;
                }

              });

              });

              }

              private onHeadPhoneUpdate(headphones: string) {
                this.headPhones = headphones;
                this.checkForRefresh();
            }

            private updateEmployees() {
              let updateEmp = new EmployeeUpdate(this.guid, this.headPhones, this.headInfo);
              this.employeeHttpService.updateEmployees(updateEmp).subscribe((count) => {
                this.toastr.success('Update completed successfully!');
             });

          }
}



enum OperationType {
    NotSet = 1,
    EmployeeValidate = 2,
    EmployeeValidateAll = 3
}
