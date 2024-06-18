import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { AssetType } from '../../../model/api/assets/asset-type';
import { AssetNature } from 'app/model/api/assets/asset-nature';

@Component({
    selector: 'asset-nature-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class AssetNatureDropDownList extends GenericDropDownList<AssetNature, number> {
    constructor() {
        super('name', 'asc');
    }
}