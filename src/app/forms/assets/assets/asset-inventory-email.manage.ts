import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './../../../config';
import { RoomList } from './../../administration/rooms/room.list';
import { LocationList } from './../../administration/locations/location.list';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { EmployeeList } from './../../administration/employees/employee.list';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { Param } from '../../../model/common/param';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { RegionHttpService } from '../../../services/http/administration/region.http.service';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { AssetInvFullDetailList } from 'app/forms/assets/assets/asset-inv-full-detail.list';
import { AppUtils } from 'app/common/app.utils';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { Inventory } from 'app/model/api/inventory/inventory';
import { InventoryList } from 'app/forms/inventory/inventory.list';
import { Region } from 'app/model/api/administration/region';
import { RegionList } from 'app/forms/administration/regions/region.list';
import { AssetInvFullDetail } from 'app/model/api/assets/asset-inv-full-detail';
import { Router, NavigationEnd } from '@angular/router';
import { PagedResult } from 'app/model/common/paged-result';
import { saveAs as fileSaveAs } from 'file-saver';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { AppState } from 'app/model/api/common/app-state';
import { AppStateHttpService } from 'app/services/http/common/app-state.http.service';
import { EmployeeValidate } from 'app/model/common/import/employee-validate';
import { CompanyList } from '../companies/company.list';
import { Company } from 'app/model/api/assets/company';
import { CompanyHttpService } from 'app/services/http/assets/company.http.service';

@Component({
    selector: 'asset-inventory-email-manage',
    templateUrl: 'asset-inventory-email.manage.html',
    styleUrls: ['asset-inventory-email.manage.scss'],
    providers: [
        AssetHttpService,
        InventoryHttpService,
        LocationHttpService,
        RegionHttpService,
        RoomDetailHttpService,
        EmployeeHttpService,
        AppStateHttpService,
        InvStateHttpService ]
})
export class AssetInventoryEmailManage {

    @ViewChild('assetInvFullDetailList') public assetInvFullDetailList: AssetInvFullDetailList;

    @ViewChild('inventoryList') public inventoryList: InventoryList;
    @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    @ViewChild('employeeValidateList') public employeeValidateList: EmployeeList;
    @ViewChild('employeeValidateListModal') public employeeValidateListModal: ModalDirective;

    @ViewChild('regionList') public regionList: RegionList;
    @ViewChild('regionListModal') public regionListModal: ModalDirective;

    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;

    @ViewChild('roomList') public roomList: RoomList;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;

    @ViewChild('invStateList') public invStateList: InvStateList;
    @ViewChild('invStateListModal') public invStateListModal: ModalDirective;

    @ViewChild('companyList') public companyList: CompanyList;
    @ViewChild('companyListModal') public companyListModal: ModalDirective;

    protected operationType: number = OperationType.NotSet;

    private filter: string = '';
    private selectedInventory: Inventory = null;
    private selectedEmployeesAll: Array<Employee> = new Array<Employee>();
    private selectedValidateEmployees: Array<Employee> = new Array<Employee>();
    private selectedRegionsAll: Array<Region> = new Array<Region>();
    private selectedLocationsAll: Array<Location> = new Array<Location>();
    private selectedRoomsAll: Array<Room> = new Array<Room>();
    private selectedCompanies: Array<Company> = new Array<Company>();
    private selectedAppState: AppState = null;
    private appState: string = 'Status';
    private appStateId: number = 0;
    private appStates: Array<AppState> = new Array<AppState>();
    private selectedInvStatesAll: Array<InvState> = new Array<InvState>();
    private selectedAsset: AssetInvFullDetail = null;
    public assetToUpdate = new Array<EmployeeValidate>();

    constructor(
        private router: Router,
        private assetHttpService: AssetHttpService,
        private inventoryHttpService: InventoryHttpService,
        private locationHttpService: LocationHttpService,
        private regionHttpService: RegionHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private employeeHttpService: EmployeeHttpService,
        private invStateHttpService: InvStateHttpService,
        private appStateHttpService: AppStateHttpService,
        private companyHttpService: CompanyHttpService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        private translate: TranslateService) {
             translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                if (evt.urlAfterRedirects === '/emailmanagers') {
                    this.appStateHttpService.getDetailByParentCode('EMAILMANAGER').subscribe((res: any) => { this.appStates = res; });
                     this.refreshAssets();
                }
            }
        });
    }

    ngAfterViewInit() {
    }

    ngOnInit() {
    }

    private saveValidated(){

        this.assetToUpdate = new Array<EmployeeValidate>();

        this.assetInvFullDetailList.selectedItems.forEach(element => {
            this.assetToUpdate.push(new EmployeeValidate(element.id, element.isMinus, element.infoMinus, this.selectedValidateEmployees[0].id.toString()));
        });
        this.assetHttpService.employeeValidate(this.assetToUpdate).subscribe((res) => {

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

    private onAppStateUpdate(appStateId: number, appStateName: string) {
        if (appStateId !== -1) {
            this.selectedAppState = new AppState(appStateId, appStateName, appStateName, 'EMAILMANAGER');
        } else {
            this.selectedAppState = null;
        }
        this.appStateId = appStateId;
        this.appState = appStateName ;
        this.refreshAssets();
    }

    private clearSelection() {
         this.assetInvFullDetailList.selectedItems = new Array<AssetInvFullDetail>();
     }


    private showAssetDetail($event, selectedItem: any){
        selectedItem  != null  ?  this.router.navigate(['/asset/', selectedItem.id])
        : alert('Va rugam selectati cel putin un numar de inventar!'); return;
     }

    private onAssetInvFullDetailSelectionChanged(assets: Array<AssetInvFullDetail>) {
        this.selectedAsset = ((assets != null) && (assets.length === 1)) ? assets[0] : null;
    }

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
     private selectEmployees() {
        this.employeeListModal.show();
        this.employeeList.selectedItems = this.selectedEmployeesAll;
        this.employeeList.refresh(null);
    }

    private removeFromEmployeeSelection(employee: Employee) {
        let list: Array<Employee> = this.selectedEmployeesAll;
        let index: number = list.indexOf(employee);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearEmployeeSelection() {
        this.selectedEmployeesAll = new Array<Employee>();
        this.checkForRefresh();
    }

    private setSelectedEmployees() {
        this.selectedEmployeesAll = this.employeeList.selectedItems;
        this.employeeListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/


       /* begin employee validate */
       private selectValidateEmployees() {
        this.employeeValidateListModal.show();
        this.employeeValidateList.selectedItems = this.selectedValidateEmployees;
        this.employeeValidateList.refresh(null);
    }

    private removeFromValidateEmployeeSelection(employee: Employee) {
        let list: Array<Employee> = this.selectedValidateEmployees;
        let index: number = list.indexOf(employee);
        list.splice(index, 1);
        this.checkForRefresh();
    }

    private clearValidateEmployeeSelection() {
        this.selectedValidateEmployees = new Array<Employee>();
        this.checkForRefresh();
    }

    private setSelectedValidateEmployees() {
        this.selectedValidateEmployees = this.employeeValidateList.selectedItems;
        this.employeeValidateListModal.hide();
        this.checkForRefresh();
    }

    /*end employee*/

  /* begin region */
  private selectRegions() {
    let selectedRegions: Array<Region> = null;
    selectedRegions = this.selectedRegionsAll;

    this.regionListModal.show();
    this.regionList.selectedItems = selectedRegions;
    this.regionList.refresh(null);
}

private removeFromRegionSelection(region: Region) {
    let selectedRegions: Array<Region> = null;

    selectedRegions = this.selectedRegionsAll;
    let index: number = selectedRegions.indexOf(region);
    selectedRegions.splice(index, 1);
    this.checkForRefresh();
}

private clearRegionSelection() {
    this.selectedRegionsAll = new Array<Region>();
    this.checkForRefresh();
}

private setSelectedRegions() {
    this.selectedRegionsAll = this.regionList.selectedItems;
    this.regionListModal.hide();
    this.checkForRefresh();
}
/* end REGION */


    /* begin location */
    private selectLocations() {

        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;

        selectedLocations = this.selectedLocationsAll;
        selectedRegions = this.selectedRegionsAll;

        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));


        this.locationListModal.show();
        this.locationList.selectedItems = selectedLocations;
        this.locationList.refresh(params);
    }

    private removeFromLocationSelection(location: Location) {
        let selectedLocations: Array<Location> = null;

        selectedLocations = this.selectedLocationsAll;
        let index: number = selectedLocations.indexOf(location);
        selectedLocations.splice(index, 1);
        this.checkForRefresh();
    }

    private clearLocationSelection() {
        this.selectedLocationsAll = new Array<Location>();
        this.checkForRefresh();
    }

    private setSelectedLocations() {
        this.selectedLocationsAll = this.locationList.selectedItems
        this.locationListModal.hide();
        this.checkForRefresh();
    }
    /* end location */

    /* begin room */
    private selectRooms() {

        let selectedRegions: Array<Region> = null;
        let selectedLocations: Array<Location> = null;
        let selectedRooms: Array<Room> = null;

        selectedRooms = this.selectedRoomsAll;
        selectedRegions = this.selectedRegionsAll;
        selectedLocations = this.selectedLocationsAll;

        let params = new Array<Param>();
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>(selectedRegions)));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>(selectedLocations)));

        this.roomListModal.show();
        this.roomList.selectedItems = selectedRooms;
        this.roomList.refresh(params);
    }

    private removeFromRoomSelection(room: Room) {

        let selectedRooms: Array<Room> = null;

        selectedRooms = this.selectedRoomsAll;
        let index: number = selectedRooms.indexOf(room);
        selectedRooms.splice(index, 1);
        this.checkForRefresh();
    }

    private clearRoomSelection() {

        this.selectedRoomsAll = new Array<Room>();
        this.checkForRefresh();
    }

    private setSelectedRooms() {

        this.selectedRoomsAll = this.roomList.selectedItems;
        this.roomListModal.hide();
        this.checkForRefresh();
    }
    /* end room */

    private checkForRefresh() {
        this.refreshAssets();
    }

    private refreshAssets() {
        let params: Array<Param> = this.getFilters();
        this.assetInvFullDetailList.refresh(params);
    }

    private getFilters(): Array<Param> {
        let params = new Array<Param>();

        params.push(new Param('inventoryId', this.selectedInventory != null ? this.selectedInventory.id.toString() : '7'));
        params.push(new Param('appStateId', this.appStateId > 0  ? this.appStateId.toString() : ''));
        params.push(new Param('employeeIdsAll', AppUtils.getIdsList<Employee, number>(this.selectedEmployeesAll)));
        params.push(new Param('companyIds', AppUtils.getIdsList<Company, number>(this.selectedCompanies)));
        params.push(new Param('locationIdsAll', AppUtils.getIdsList<Location, number>(this.selectedLocationsAll)));
        params.push(new Param('regionIdsAll', AppUtils.getIdsList<Region, number>(this.selectedRegionsAll)));
        params.push(new Param('roomIdsAll', AppUtils.getIdsList<Room, number>(this.selectedRoomsAll)));
        params.push(new Param('invStateIdsAll', AppUtils.getIdsList<InvState, number>(this.selectedInvStatesAll)));
        params.push(new Param('filter', this.filter));

        return params;
    }

     /* begin AssetState */
     private selectInvStates() {
        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        selectedInvStates = this.selectedInvStatesAll;
        this.invStateListModal.show();
        this.invStateList.selectedItems = selectedInvStates;
        this.invStateList.refresh(null);

    }

    private removeFromInvStateSelection(assetState: InvState) {

        let selectedInvStates: Array<InvState> = null;
        let selectedInvStatesNi: Array<InvState> = null;

        selectedInvStates = this.selectedInvStatesAll;
        let indexAll: number = selectedInvStates.indexOf(assetState);
        selectedInvStates.splice(indexAll, 1);
        this.checkForRefresh();

    }

    private clearInvStateSelection() {

        this.selectedInvStatesAll = new Array<InvState>();

        this.checkForRefresh();
    }

    private setSelectedInvStates() {

        this.selectedInvStatesAll = this.invStateList.selectedItems;
        this.invStateListModal.hide();
        this.checkForRefresh();

    }
          /* end Administration */


    private clearFilters() {
        this.selectedRegionsAll = new Array<Region>();
        this.selectedLocationsAll = new Array<Location>();
        this.selectedEmployeesAll = new Array<Employee>();
        this.selectedRoomsAll = new Array<Room>();
        this.selectedInvStatesAll = new Array<InvState>();
        this.selectedCompanies = new Array<Company>();
        this.filter = '';
        this.clearSelection();
        this.checkForRefresh();
    }

    private exportSocGen() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.assetHttpService
            .exportSocGenEmail(params)
            .subscribe((blob) => {
        fileSaveAs(blob, 'Email Result.xlsx');
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
}

enum OperationType {
    NotSet = 1
}
