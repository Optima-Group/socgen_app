import { AppConfig } from 'app/config';
import { Component } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';
import { AssetNi } from "app/model/api/assets/asset-ni";

@Component({
    selector: 'asset-ni-list',
    templateUrl: 'asset-ni.list.html'
})
export class AssetNiList extends GenericTableList<AssetNi, number> {
    constructor() {
        super('code1', 'asc', 'filters');
    }
}