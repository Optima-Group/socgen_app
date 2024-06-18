import { AssetCategoryHttpService } from './../../../services/http/assets/asset-category.http.service';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';
import { RoomDetailHttpService } from './../../../services/http/administration/room-detail.http.service';
import { AssetTypeHttpService } from 'app/services/http/assets/asset-type.http.service';
import { RegionHttpService } from 'app/services/http/administration/region.http.service';
import { LocationHttpService } from 'app/services/http/administration/location.http.service';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
import { AssetType } from 'app/model/api/assets/asset-type';
import { AssetTypeList } from 'app/forms/assets/asset-types/asset-type.list';
import { Employee } from 'app/model/api/administration/employee';
import { EmployeeList } from 'app/forms/administration/employees/employee.list';
import { Room } from 'app/model/api/administration/room';
import { RoomList } from 'app/forms/administration/rooms/room.list';
import { Location } from '../../../model/api/administration/location';
import { LocationList } from 'app/forms/administration/locations/location.list';
import { CostCenterList } from 'app/forms/administration/cost-centers/cost-center.list';
import { CostCenter } from 'app/model/api/administration/cost-center';
import { Region } from 'app/model/api/administration/region';
import { RegionList } from 'app/forms/administration/regions/region.list';
import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap';
import * as jsPDF from 'jspdf';
import * as jsbarcode from 'jsbarcode';

import { AppConfig } from '../../../config';
import { AssetDepManageFormState } from './asset.manage.form.state';

import { Param } from '../../../model/common/param';
import { AppData } from '../../../app-data';
import { AccMonth } from '../../../model/api/accounting/acc-month';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { Partner } from '../../../model/api/documents/partner';

import { PartnerHttpService } from '../../../services/http/documents/partner.http.service';
import { AccMonthHttpService } from '../../../services/http/accounting/acc-month.http.service';
import { AssetClassHttpService } from '../../../services/http/assets/asset-class.http.service';
import { AssetDepDetailHttpService } from '../../../services/http/assets/asset-dep-detail.http.service';

import { AssetDepDetailList } from './asset-dep-detail.list';
import { PagedResult } from "app/model/common/paged-result";
import { PartnerList } from "app/forms/documents/partners/partner.list";
import { AssetClassList } from "app/forms/assets/asset-classes/asset-class.list";
import { AccountActivity } from "app/model/api/accounting/account-activity";
import { AssetHttpService } from "app/services/http/assets/asset.http.service";
import { AssetList } from "app/forms/assets/assets/asset.list";
import { AssetFilter } from "app/model/api/assets/asset.filter";

@Component({
    selector: 'asset-dep-manage',
    templateUrl: 'asset-dep.manage.html',
    providers: [ AccMonthHttpService, AssetClassHttpService, AssetDepDetailHttpService, PartnerHttpService, EmployeeHttpService, LocationHttpService, RegionHttpService, AssetTypeHttpService,
        RoomDetailHttpService, CostCenterHttpService, AssetCategoryHttpService ]
})
export class AssetDepManage {

    @ViewChild('assetClassList') public assetClassList: AssetClassList;
    @ViewChild('assetClassListModal') public assetClassListModal: ModalDirective;
    //@ViewChild('assetDepDetailList') public assetDepDetailList: AssetDepDetailList;
    @ViewChild('partnerList') public partnerList: PartnerList;
    @ViewChild('partnerListModal') public partnerListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('costCenterList') public costCenterList: CostCenterList;
    @ViewChild('costCenterListModal') public costCenterListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('assetTypeList') public assetTypeList: AssetTypeList;
    @ViewChild('assetTypeListModal') public assetTypeListModal: ModalDirective;

    @ViewChild('assetCategoryList') public assetCategoryList: AssetCategoryList;
    @ViewChild('assetCategoryListModal') public assetCategoryListModal: ModalDirective;

    @ViewChild('assetList') public assetList: AssetList;

    private filter: string;

    private selectedAssetClasses: Array<AssetClass> = new Array<AssetClass>();
    private selectedPartners: Array<Partner> = new Array<Partner>();

    constructor(

        private route: ActivatedRoute, 
        private router: Router, 
        private accMonthHttpService: AccMonthHttpService, 
        private assetClassHttpService: AssetClassHttpService, 
        private assetDepDetailHttpService: AssetDepDetailHttpService, 
        private assetHttpService: AssetHttpService,
        private partnerHttpService: PartnerHttpService, 
        private regionHttpService: RegionHttpService,
        private locationHttpService: LocationHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private employeeHttpService: EmployeeHttpService,
        private assetTypeHttpService: AssetTypeHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private assetCategoryHttpService: AssetCategoryHttpService,
        private translate: TranslateService) {
            translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);

            this.router.events.subscribe((evt) => {
                if (evt instanceof NavigationEnd) {
                    if (evt.urlAfterRedirects === '/assetdepdetails') {
                        this.refreshAssets();
                    }
                }
            });
    }

    private assetRowSelection: string = "single";
    private selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    private selectedAssetDepDetails: Array<AssetDepDetail> = new Array<AssetDepDetail>();
    private mainTitle: string = "";

    private months: Array<string> = ['Ianuarie', 'Februarie', 'Martie', 'Aprilie', 'Mai', 'Iunie', 'Iulie', 'August', 'Septembrie', 'Octombrie', 'Noiembrie', 'Decembrie'];
    private selectedMonth: number = 0;
    private selectedYear: number = 0;
    private selectedAccMonth: AccMonth = null;
    private selectedRegions: Array<Region> = new Array<Region>();
    private selectedCostCenters: Array<CostCenter> = new Array<CostCenter>();
    private selectedLocations: Array<Location> = new Array<Location>();
    private selectedRooms: Array<Room> = new Array<Room>();
    private selectedEmployees: Array<Employee> = new Array<Employee>();
    private selectedAssetTypes: Array<AssetType> = new Array<AssetType>();
    private selectedAssetCategories: Array<AssetCategory> = new Array<AssetCategory>();

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
    private useDepartment: boolean= AppConfig.USE_DEPARTMENT;
    private useCustody: boolean= AppConfig.SHOW_CUSTODY_DETAILS;
    private useAssetStates: boolean= AppConfig.USE_ASSET_STATE;



    ngAfterViewInit() {
        // this.selectedPartners = AssetDepManageFormState.PartnerSelection;
        // this.filter = AssetDepManageFormState.Filter;
        // this.selectedAssets = AssetDepManageFormState.SelectedAssets;
        // this.selectedAssetDepDetails = AssetDepManageFormState.SelectedAssetDepDetails;
        // if (AssetDepManageFormState.AssetRowSelection.length > 0)
        //     this.assetRowSelection = AssetDepManageFormState.AssetRowSelection;

        // if (AssetDepManageFormState.CurrentPageData != null) {
        //     this.assetDepDetailList.sortingColumn = AssetDepManageFormState.SortingColumn;
        //     this.assetDepDetailList.sortingDirection = AssetDepManageFormState.SortingDirection;
        //     this.assetDepDetailList.searchParams = AssetDepManageFormState.Params;
        //     this.assetDepDetailList.setCurrentPageData(AssetDepManageFormState.CurrentPageData);
        //     this.assetDepDetailList.selectedItems = AssetDepManageFormState.SelectedAssetDepDetails;
        // }
        // else {
        //     //this.refreshAssets();
        //     this.checkForRefresh();
        // }

        let currentDate: Date = new Date();
        this.selectedMonth = currentDate.getMonth();
        this.selectedYear = currentDate.getFullYear();

        this.updateSelectedAccMonth();
    }

    // private saveCurrentFilters() {
    //     AssetDepManageFormState.PartnerSelection = this.selectedPartners;
    //     AssetDepManageFormState.AssetClassSelection = this.selectedAssetClasses;
    //     AssetDepManageFormState.Filter = this.filter;
    //     AssetDepManageFormState.Params = this.assetDepDetailList.searchParams;
    //     AssetDepManageFormState.AssetRowSelection = this.assetRowSelection;

    //     AssetDepManageFormState.SortingColumn = this.assetDepDetailList.sortingColumn;
    //     AssetDepManageFormState.SortingDirection = this.assetDepDetailList.sortingDirection;
    //     AssetDepManageFormState.SelectedAssets = this.selectedAssets;
    //     AssetDepManageFormState.SelectedAssetDepDetails = this.selectedAssetDepDetails;

    //     AssetDepManageFormState.CurrentPageData = this.assetDepDetailList.CurrentPageData;
    // }

    private setSelectedMonth(month: number) {
        this.selectedMonth = month;

        this.updateSelectedAccMonth();
    }

    private setSelectedYear(year: number) {
        this.selectedYear = year;

        this.updateSelectedAccMonth();
    }

    private updateSelectedAccMonth() {
        this.accMonthHttpService.getAccMonth(this.selectedMonth, this.selectedYear).subscribe((accMonth: AccMonth) => {
            this.selectedAccMonth = accMonth;
            this.checkForRefresh();
        });
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

    private addNewAsset() {
        //this.saveCurrentFilters();
        this.router.navigate(['/newasset']);
    }

    private addNewOperation() {
        AppData.AssetList = this.selectedAssets;
        //this.saveCurrentFilters();
        this.router.navigate(['/newoperation']);
    }

    private changeRowSelection() {
        if (this.assetRowSelection === "single") {
            this.assetRowSelection = "multiple";
        }
        else {
            this.selectedAssets = new Array<AssetSimpleDetail>();
            //this.selectedAssetId = 0;
            this.assetRowSelection = "single";
            //this.updateAssetDepDetailSelectionEvent.emit(new Array<AssetDepDetail>());
        }
    }

    private editAsset() {
        let selectedAssetId = this.selectedAssets.length > 0 ? this.selectedAssets[0].id : 0;
        if (selectedAssetId > 0) {
            // this.saveCurrentFilters();
            this.router.navigate(['/asset', selectedAssetId]);
        }
    }

    private onAssetDepDetailSelectionChanged(assets: Array<AssetDepDetail>) {
        this.selectedAssets = new Array<AssetSimpleDetail>();
        assets.forEach((asset: AssetDepDetail) => {
            this.selectedAssets.push(new AssetSimpleDetail(asset.id, asset.invNo, asset.name, '', null, asset.partner, '', asset.assetType, asset.assetState, asset.usageStartDate, '', '', 0, null, false, null));
        });
    }

    /*begin asset class*/
    private selectAssetClasses() {
        this.assetClassListModal.show();
        this.assetClassList.selectedItems = this.selectedAssetClasses;
        this.assetClassList.refresh(null);
    }

    private removeFromAssetClassSelection(assetClass: AssetClass) {
        var index: number = this.selectedAssetClasses.indexOf(assetClass);
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
    /*end asset class*/

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

    private checkForRefresh() {
        this.assetList.selectedItems = new Array<AssetDepDetail>();
        this.refreshAssets();
    }

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();
        this.assetList.refresh(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();
        let assetFilter: AssetFilter = new AssetFilter();

        let assetClassIds: Array<number> = new Array<number>();
        let partnerIds: Array<number> = new Array<number>();

        // if (this.selectedAssetClasses != null) {
        //     this.selectedAssetClasses.forEach((assetClass) => {
        //         assetClassIds.push(assetClass.id);
        //     });
        // }

        if (this.selectedPartners != null) {
            assetFilter.partnerIds = new Array<number>();
            this.selectedPartners.forEach((partner) => {
                assetFilter.partnerIds.push(partner.id);
            });
        }

        if (this.selectedAssetCategories != null) {
            assetFilter.assetCategoryIds = new Array<number>();
            this.selectedAssetCategories.forEach((assetCategory) => {
                assetFilter.assetCategoryIds.push(assetCategory.id);
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

        // params.push(new Param("accMonthId", this.selectedAccMonth != null ? this.selectedAccMonth.id.toString(): '0'));
        // params.push(new Param("assetClassIds", JSON.stringify(assetClassIds)));
        // params.push(new Param("partnerIds", JSON.stringify(partnerIds)));
        // params.push(new Param("filter", this.filter));

        assetFilter.accMonthId = this.selectedAccMonth != null ? this.selectedAccMonth.id : null;
        assetFilter.filter = this.filter;
        params.push(new Param("jsonFilter", JSON.stringify(assetFilter)));

        return params;
    }

    private showInvNoRegistryReport() {
        window.open(AppConfig.reportingServer +  "Report.aspx/?report=invnoregistry");
    }

	// private exportToExcel() {

    //     let params: Array<Param> = this.getFilters();

    //     this.assetDepDetailHttpService.get(1, 1000000, "invNo", "asc", params, null).subscribe(
    //         (data: PagedResult<AssetDepDetail>) => {

    //             let options = {
    //                 sheetid: 'amortizare',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id], 
    //                     invNo as [Numar inventar], 
    //                     assetName as [Denumire], 
    //                     assetClassCode as [Clasificare],
    //                     partner as [Furnizor],
    //                     docNo1 as [Factura],
    //                     SUBSTRING(usageStartDate, 1, 10) as [Data achizitie],
    //                     [valueInv] as [Valoare inventar],
    //                     [valueRem] as [Valoare ramasa],
    //                     [valueDep] as [Amortizare lunara],
    //                     [valueDepYTD] as [Amortizare an],
    //                     [depPeriod] as [Durata amortizare],
    //                     [depPeriodRem] as [Durata ramasa]
    //                     INTO XLSX("mijloace_fixe.xlsx",?) FROM ?`,[ options, data.items ]);

    //         });
    // }

	// private exportAccountActivityToExcel() {

    //     let accountActivity: Array<AccountActivity> = new Array<AccountActivity>();
    //     let params: Array<Param> = new Array<Param>();

    //     let acc1: number = 0;
    //     let acc2: number = 0;

    //     params.push(new Param("accMonthId", this.selectedAccMonth != null ? this.selectedAccMonth.id.toString(): '0'));

    //     this.assetDepDetailHttpService.getPaged(1, 1000000, "invNo", "asc", params, null).subscribe(
    //         (data: PagedResult<AssetDepDetail>) => {

    //             data.items.forEach((assetDepDetail: AssetDepDetail) => {
    //                 if (assetDepDetail.assetClassCode === '2.2.9.') {
    //                     acc1 = acc1 + assetDepDetail.valueDep;
    //                 }
    //                 else {
    //                     acc2 = acc2 + assetDepDetail.valueDep;
    //                 }
    //             });

    //             accountActivity.push(new AccountActivity('6811.04', '2813.02', acc2, 'amortizare'));
    //             accountActivity.push(new AccountActivity('6811.08', '2813.01', acc1, 'amortizare'));

    //             accountActivity.push(new AccountActivity('7325.800', '1825.800', acc2, 'amortizare'));
    //             accountActivity.push(new AccountActivity('7330.300', '1830.300', acc1, 'amortizare'));

    //             let options = {
    //                 sheetid: 'note_contabile',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT [debit] as [Debit], 
    //                     [credit] as [Credit], 
    //                     [accValue] as [Valoare], 
    //                     [description] as [Detalii]
    //                     INTO XLSX("note_contabile.xlsx",?) FROM ?`, [options, accountActivity]);

    //         //     let accountActivity1: Array<AccountActivity> = new Array<AccountActivity>();
    //         //     accountActivity1.push(new AccountActivity('6811.04', '2813.02', acc2, 'amortizare'));
    //         //     accountActivity1.push(new AccountActivity('6811.08', '2813.01', acc1, 'amortizare'));

    //         //     let options = [{
    //         //         sheetid: 'statutar',
    //         //         headers: true,
    //         //         column: { style: { Font: { Bold: '1' } } },
    //         //         rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //         //         cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //         //     },
    //         //     {
    //         //         sheetid: 'contabilitate',
    //         //         headers: true,
    //         //         column: { style: { Font: { Bold: '1' } } },
    //         //         rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //         //         cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //         //     }];

    //         //     let accountActivity2: Array<AccountActivity> = new Array<AccountActivity>();
    //         //     accountActivity2.push(new AccountActivity('7325.800', '1825.800', acc2, 'amortizare'));
    //         //     accountActivity2.push(new AccountActivity('7330.300', '1830.300', acc1, 'amortizare'));

    //         //     alasql(`SELECT [debit] as [Debit], 
    //         //             [credit] as [Credit], 
    //         //             [accValue] as [Valoare], 
    //         //             [description] as [Detalii]
    //         //             INTO XLSX("note_contabile.xlsx",?) FROM ?`,[ options, [accountActivity1, accountActivity2]]);
    //         // });
    //     });
    // }
}