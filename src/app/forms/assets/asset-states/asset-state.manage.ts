import { AssetStateHttpService } from '../../../services/http/assets/asset-state.http.service';
import { AssetState } from '../../../model/api/assets/asset-state';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { GenericManage } from "../../generic/generic.manage";
import { Param } from "../../../model/common/param";
import { PagedResult } from "../../../model/common/paged-result";

@Component({
    selector: 'asset-state-manage',
    templateUrl: 'asset-state.manage.html',
    providers: [ AssetStateHttpService ]
})
export class AssetStateManage extends GenericManage<AssetState, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

    private filter: string = '';

    constructor(private assetStateHttpService: AssetStateHttpService) {
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

        this.assetStateHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<AssetState>) => {

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
                    INTO XLSX("asset_states.xlsx",?) FROM ?`, [ options, data.items ]);

            });
    }
}
