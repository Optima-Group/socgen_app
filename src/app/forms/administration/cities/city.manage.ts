import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AppUtils } from 'app/common/app.utils';
import { saveAs as fileSaveAs } from 'file-saver';
import { CountyHttpService } from 'app/services/http/administration/county.http.service';
import { County } from 'app/model/api/administration/county';
import { CityHttpService } from 'app/services/http/administration/city.http.service';
import { City } from 'app/model/api/administration/city';
import { CityList } from './city.list';
import { CityDetail } from './city.detail';
import { CountyList } from '../counties/county.list';

@Component({
    selector: 'city-manage',
    templateUrl: 'city.manage.html',
    styleUrls: ['city.manage.scss'],
    providers: [ CityHttpService, CountyHttpService ]
})
export class CityManage extends GenericManage<City, number> {

    @ViewChild('cityDetailModal') cityDetailModal: ModalDirective;
    @ViewChild('cityList') cityList: CityList;
    @ViewChild('cityDetail') cityDetail: CityDetail;
    @ViewChild('countyListModal') countyListModal: ModalDirective;
    @ViewChild('countyList') countyList: CountyList;

    private filter: string = '';
    private selectedCounty: County = null;

    constructor(
        private cityHttpService: CityHttpService,
        private countyHttpService: CountyHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.cityDetail.county = null;
    }

    protected editItem() {
        super.editItem();

        let city: City = this.selectedItem as City;

        this.cityDetail.county = null;
        if ((city != null) && (city.countyId != null)) {
            this.countyHttpService
                .getById(city.countyId)
                .subscribe((county: County) => {
                    this.cityDetail.county = county;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.cityDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.cityDetailModal.hide();
    }

    private onCityDetailCountyNeeded() {
        this.cityDetailModal.hide();
        this.selectCounty();
    }

    private onCountyListCancel() {
        this.countyListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.cityDetailModal.show();
        }
    }


    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('countyIds', AppUtils.getIdsList<County, number>([ this.selectedCounty ])));
        this.cityList.refresh(params);
    }

    private selectCounty() {
        this.countyListModal.show();
        this.countyList.refresh(null);
    }

    private setSelectedCounty() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCounty = this.countyList.selectedItem;
                this.countyListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.cityDetail.county = this.countyList.selectedItem;
                this.countyListModal.hide();
                this.cityDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectCounty() {
        this.selectedCounty = null;
        this.refresh();
    }


    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('countyIds', AppUtils.getIdsList<County, number>([this.selectedCounty])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.cityHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Orase.xlsx');
            });
    }
}
