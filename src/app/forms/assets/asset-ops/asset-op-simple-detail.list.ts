// import { ColumnHeader } from './../../../model/common/column-header';
// import { ColumnDefinition } from './../../../model/common/column-definition';
// import { Component } from '@angular/core';
// import { GenericTableList } from '../../generic/generic.table.list';

// import { AppConfig } from "app/config";
// import { AssetOpSd } from "app/model/api/assets/asset-op-sd";
// import { AppData } from "app/app-data";
// import { Param } from "app/model/common/param";
// import { TranslateService } from "@ngx-translate/core";

// @Component({
//     selector: 'asset-op-simple-detail-list',
//     // templateUrl: 'asset-op-simple-detail.list.html'
//     templateUrl: '../../generic/generic.table.list.html'
// })
// export class AssetOpSimpleDetailList extends GenericTableList<any, number> {

//     private showEmployeeDetails: boolean = AppConfig.SHOW_EMPLOYEE_DETAILS;

//     constructor(private translate: TranslateService) {
//         super('modifiedAt', 'desc', 'details');
//         this.columns = AppData.ColumnDefinitions['ASSETOP'];
//         console.log(this.columns);
//         translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
//     }

//     public refresh(filters: Array<Param>) {
//         this.columns = AppData.ColumnDefinitions['ASSETOP'];
//         super.refresh(filters);
//     }
// }