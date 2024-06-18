import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { Brand } from 'app/model/api/assets/brand';

@Component({
    selector: 'brand-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class BrandDropDownList extends GenericDropDownList<Brand, number> {
    constructor() {
        super('name', 'asc');
    }
}