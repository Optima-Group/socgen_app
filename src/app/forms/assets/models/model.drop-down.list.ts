import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { Model } from 'app/model/api/assets/model';

@Component({
    selector: 'model-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ModelDropDownList extends GenericDropDownList<Model, number> {
    constructor() {
        super('name', 'asc');
    }
}