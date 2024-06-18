import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { InvStateHttpService } from "app/services/http/inventory/inv-state.http.service";
import { GenericManage } from "app/forms/generic/generic.manage";
import { InvState } from "app/model/api/inventory/inv-state";
import { Param } from "app/model/common/param";
import { PagedResult } from "app/model/common/paged-result";

@Component({
    selector: 'inv-state-manage',
    templateUrl: 'inv-state.manage.html',
    providers: [ InvStateHttpService ]
})
export class InvStateManage extends GenericManage<InvState, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private invStateHttpService: InvStateHttpService) {
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

        this.invStateHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<InvState>) => {

                let options = {
                    sheetid: 'asset-states',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id], 
                    code as [Code],
                    name as [Description] 
                    INTO XLSX("asset-states.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
