import { TranslateService } from '@ngx-translate/core';
import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { AppUtils } from 'app/common/app.utils';
import { saveAs as fileSaveAs } from 'file-saver';
import { CountryHttpService } from 'app/services/http/administration/contry.http.service';
import { CountyHttpService } from 'app/services/http/administration/county.http.service';
import { County } from 'app/model/api/administration/county';
import { Country } from 'app/model/api/administration/country';
import { CountyList } from './county.list';
import { CountyDetail } from './county.detail';
import { CountryList } from '../countries/country.list';

@Component({
    selector: 'county-manage',
    templateUrl: 'county.manage.html',
    styleUrls: ['county.manage.scss'],
    providers: [ CountyHttpService, CountryHttpService ]
})
export class CountyManage extends GenericManage<County, number> {

    @ViewChild('countyDetailModal') countyDetailModal: ModalDirective;
    @ViewChild('countyList') countyList: CountyList;
    @ViewChild('countyDetail') countyDetail: CountyDetail;
    @ViewChild('countryListModal') countryListModal: ModalDirective;
    @ViewChild('countryList') countryList: CountryList;

    private filter: string = '';
    private selectedCountry: Country = null;

    constructor(
        private countyHttpService: CountyHttpService,
        private countryHttpService: CountryHttpService,
        private translate: TranslateService) {
        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.countyDetail.country = null;
    }

    protected editItem() {
        super.editItem();

        let county: County = this.selectedItem as County;

        this.countyDetail.country = null;
        if ((county != null) && (county.countryId != null)) {
            this.countryHttpService
                .getById(county.countryId)
                .subscribe((country: Country) => {
                    this.countyDetail.country = country;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.countyDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.countyDetailModal.hide();
    }

    private onCountyDetailCountryNeeded() {
        this.countyDetailModal.hide();
        this.selectCountry();
    }

    private onCountryListCancel() {
        this.countryListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.countyDetailModal.show();
        }
    }


    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param('countryIds', AppUtils.getIdsList<Country, number>([ this.selectedCountry ])));
        this.countyList.refresh(params);
    }

    private selectCountry() {
        this.countryListModal.show();
        this.countryList.refresh(null);
    }

    private setSelectedCountry() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedCountry = this.countryList.selectedItem;
                this.countryListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.countyDetail.country = this.countryList.selectedItem;
                this.countryListModal.hide();
                this.countyDetailModal.show();
                break;
            default:
                break;
        }
    }

    private unselectCountry() {
        this.selectedCountry = null;
        this.refresh();
    }


    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('countryIds', AppUtils.getIdsList<Country, number>([this.selectedCountry])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.countyHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Judete.xlsx');
            });
    }
}
