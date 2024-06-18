import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { GenericManage } from 'app/forms/generic/generic.manage';
import { Param } from 'app/model/common/param';
import { PagedResult } from 'app/model/common/paged-result';
import { Country } from 'app/model/api/administration/country';
import { CountryHttpService } from 'app/services/http/administration/contry.http.service';

@Component({
    selector: 'country-manage',
    templateUrl: 'country.manage.html',
    providers: [ CountryHttpService ]
})
export class CountryManage extends GenericManage<Country, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private countryHttpService: CountryHttpService) {
        super();
    }

     protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.countryHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<Country>) => {

                let options = {
                    sheetid: 'Tari',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                    name as [Denumire]
                    INTO XLSX('tari.xlsx',?) FROM ?`, [ options, data.items ]);

            });
    }
}
