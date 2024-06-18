import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { GenericManage } from "app/forms/generic/generic.manage";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { Param } from "app/model/common/param";
import { PagedResult } from "app/model/common/paged-result";
import { Region } from 'app/model/api/administration/region';
import { RegionHttpService } from 'app/services/http/administration/region.http.service';

@Component({
    selector: 'region-manage',
    templateUrl: 'region.manage.html',
    providers: [ RegionHttpService ]
})
export class RegionManage extends GenericManage<Region, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private regionHttpService: RegionHttpService) {
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

        this.regionHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<Region>) => {

                let options = {
                    sheetid: 'location',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Code],
                    name as [Description] 
                    INTO XLSX("locations.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
