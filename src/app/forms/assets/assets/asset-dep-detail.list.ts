import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";
import { AssetDepTotal } from "app/model/api/assets/asset-dep-total";

@Component({
    selector: 'asset-dep-detail-list',
    templateUrl: 'asset-dep-detail.list.html'
})
export class AssetDepDetailList extends GenericTableList<AssetDepDetail, number> {

    private totals: AssetDepTotal = new AssetDepTotal();

    constructor() {
        super('invNo', 'asc');
    }

    public setCurrentPageData(pageData: AssetDepPagedResult) {
        super.setCurrentPageData(pageData);
        this.totals = pageData.totals;
    }

    // public setTotals(totals: AssetDepTotal) {
    //     this.totals = totals;
    // }
}