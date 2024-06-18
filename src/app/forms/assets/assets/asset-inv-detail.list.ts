import { AppConfig } from 'app/config';
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';

@Component({
    selector: 'asset-inv-detail-list',
    templateUrl: 'asset-inv-detail.list.html'
})
export class AssetInvDetailList extends GenericTableList<AssetInvDetail, number> {
    constructor() {
        super('name', 'asc');
    }

       private showSupplierDetails: boolean= AppConfig.SHOW_SUPPLIER_DETAILS;
       private showDepartmentDetails: boolean= AppConfig.SHOW_DEPARTMENT_DETAILS;
       private showAssetCategoryDetails: boolean= AppConfig.SHOW_ASSETCATEGORY_DETAILS;
       private showAssetTypeDetails: boolean= AppConfig.SHOW_ASSETTYPE_DETAILS;
}