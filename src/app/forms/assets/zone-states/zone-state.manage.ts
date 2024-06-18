import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { GenericManage } from "../../generic/generic.manage";
import { Param } from "../../../model/common/param";
import { PagedResult } from "../../../model/common/paged-result";
import { ZoneStateHttpService } from 'app/services/http/assets/zone-state.http.service';
import { ZoneState } from 'app/model/api/assets/zone-state';

@Component({
    selector: 'zone-state-manage',
    templateUrl: 'zone-state.manage.html',
    providers: [ ZoneStateHttpService ]
})
export class ZoneStateManage extends GenericManage<ZoneState, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private zoneStateHttpService: ZoneStateHttpService) {
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

        this.zoneStateHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<ZoneState>) => {

                let options = {
                    sheetid: 'asset_states',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                    code as [Code],
                    name as [Description]
                    INTO XLSX("zone_states.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
