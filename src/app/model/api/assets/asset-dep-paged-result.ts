import { PagedResult } from 'app/model/common/paged-result';
import { PagingInfo } from 'app/model/common/paging-info';
import { AssetDepDetail } from 'app/model/api/assets/asset-dep-detail';
import { AssetDepTotal } from 'app/model/api/assets/asset-dep-total';
import { AssetCategoryTotal } from './asset-category-total';

export class AssetDepPagedResult extends PagedResult<AssetDepDetail> {
    totals: AssetDepTotal;
    assetCategoryTotals: AssetCategoryTotal;

    constructor(items: Array<AssetDepDetail>, pagingInfo: PagingInfo, totals: AssetDepTotal, assetCategoryTotals: AssetCategoryTotal) {
        super(items, pagingInfo);
        this.totals = totals;
        this.assetCategoryTotals = assetCategoryTotals;
    }
}
