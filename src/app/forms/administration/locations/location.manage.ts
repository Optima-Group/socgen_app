import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Location } from '../../../model/api/administration/location';

import { LocationHttpService } from '../../../services/http/administration/location.http.service';
import { RegionHttpService } from "app/services/http/administration/region.http.service";
import { LocationDetail } from "app/forms/administration/locations/location.detail";
import { Region } from "app/model/api/administration/region";
import { AppUtils } from "app/common/app.utils";
import { LocationList } from "app/forms/administration/locations/location.list";
import { RegionList } from '../regions/region.list';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { AdmCenterList } from '../adm-centers/adm-center.list';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { saveAs as fileSaveAs } from "file-saver";
import { CityHttpService } from 'app/services/http/administration/city.http.service';
import { CityList } from '../cities/city.list';
import { City } from 'app/model/api/administration/city';

@Component({
    selector: 'location-manage',
    templateUrl: 'location.manage.html',
    styleUrls: ['location.manage.scss'],
    providers: [ LocationHttpService, RegionHttpService, AdmCenterHttpService, CityHttpService ]
})
export class LocationManage extends GenericManage<Location, number> {

    @ViewChild('locationDetailModal') locationDetailModal: ModalDirective;
    @ViewChild('locationList') locationList: LocationList;
    @ViewChild('locationDetail') locationDetail: LocationDetail;
    @ViewChild('regionListModal') regionListModal: ModalDirective;
    @ViewChild('regionList') regionList: RegionList;
    @ViewChild('admCenterListModal') admCenterListModal: ModalDirective;
    @ViewChild('admCenterList') admCenterList: AdmCenterList;
    @ViewChild('cityListModal') cityListModal: ModalDirective;
    @ViewChild('cityList') cityList: CityList;

    private filter: string = '';
    private selectedRegion: Region = null;
    private selectedAdmCenter: AdmCenter = null;
    private selectedCity: City = null;

    constructor(
        private locationHttpService: LocationHttpService,
        private regionHttpService: RegionHttpService,
        private admCenterHttpService: AdmCenterHttpService,
        private cityHttpService: CityHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.locationDetail.region = null;
        this.locationDetail.admCenter = null;
        this.locationDetail.city = null;
    }

    protected editItem() {
        super.editItem();

        let location: Location = this.selectedItem as Location;

        this.locationDetail.region = null;
        this.locationDetail.admCenter = null;
        this.locationDetail.city = null;

        if ((location != null) && (location.regionId != null)) {
            this.regionHttpService
                .getById(location.regionId)
                .subscribe((region: Region) => {
                    this.locationDetail.region = region;
                });
        }

        if ((location != null) && (location.admCenterId != null)) {
            this.admCenterHttpService
                .getById(location.admCenterId)
                .subscribe((admCenter: AdmCenter) => {
                    this.locationDetail.admCenter = admCenter;
                });
        }

        if ((location != null) && (location.cityId != null)) {
            this.cityHttpService
                .getById(location.cityId)
                .subscribe((city: City) => {
                    this.locationDetail.city = city;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.locationDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.locationDetailModal.hide();
    }

    private onLocationDetailCityNeeded() {
        this.locationDetailModal.hide();
        this.selectCity();
    }

    private onCityListCancel() {
        this.cityListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }

    private onLocationDetailRegionNeeded() {
        this.locationDetailModal.hide();
        this.selectRegion();
    }

    private onRegionListCancel() {
        this.regionListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }

    private onLocationDetailAdmCenterNeeded() {
        this.locationDetailModal.hide();
        this.selectAdmCenter();
    }

    private onAdmCenterListCancel() {
        this.admCenterListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.locationDetailModal.show();
        }
    }


    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("regionIds", AppUtils.getIdsList<Region, number>([ this.selectedRegion ])));
        params.push(new Param("admCenterIds", AppUtils.getIdsList<AdmCenter, number>([ this.selectedAdmCenter ])));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>([ this.selectedCity ])));

        this.locationList.refresh(params);
    }

    private selectCity() {
        this.cityListModal.show();
        this.cityList.refresh(null);
    }

    private setSelectedCity() {
        switch (this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCity = this.cityList.selectedItem;
                this.cityListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.city = this.cityList.selectedItem;
                this.cityListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectCity() {
        this.selectedCity = null;
        this.refresh();
    }

    private selectRegion() {
        this.regionListModal.show();
        this.regionList.refresh(null);
    }

    private setSelectedRegion() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedRegion = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.region = this.regionList.selectedItem;
                this.regionListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectRegion() {
        this.selectedRegion = null;
        this.refresh();
    }


    private selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    private setSelectedAdmCenter() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedAdmCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.locationDetail.admCenter = this.admCenterList.selectedItem;
                this.admCenterListModal.hide();
                this.locationDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectAdmCenter() {
        this.selectedAdmCenter = null;
        this.refresh();
    }

    // private exportToExcel(){

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.locationHttpService.get(1, 10000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Location>) => {

    //             let options = {
    //                 sheetid: 'Buildings',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             alasql(`SELECT id as [Id],
    //                 code as [Cod],
    //                 name as [Denumire],
    //                 region->name as [Judet],
    //                 admCenter->name as [Regiune]
    //                 INTO XLSX("Buildings.xlsx",?) FROM ?`, [ options, data.items ]);

    //         });

    // }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('admCenterIds', AppUtils.getIdsList<AdmCenter, number>([this.selectedAdmCenter])));
        params.push(new Param('regionIds', AppUtils.getIdsList<Region, number>([this.selectedRegion])));
        params.push(new Param('cityIds', AppUtils.getIdsList<City, number>([this.selectedCity])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.locationHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Buildings.xlsx');
            });
    }
}
