import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { AssetType } from '../../../model/api/assets/asset-type';

@Component({
    selector: 'asset-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class AssetTypeDropDownList extends GenericDropDownList<AssetType, number> {
    constructor() {
        super('name', 'asc');
    }
}