import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { MasterType } from 'app/model/api/assets/master-type';

@Component({
    selector: 'master-type-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class MasterTypeDropDownList extends GenericDropDownList<MasterType, number> {
    constructor() {
        super('name', 'asc');
    }
}