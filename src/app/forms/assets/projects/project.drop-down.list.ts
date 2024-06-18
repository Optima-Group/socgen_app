import { Component } from '@angular/core';
import { GenericDropDownList } from '../../generic/generic.drop-down.list';
import { Project } from 'app/model/api/assets/project';

@Component({
    selector: 'project-drop-down-list',
    templateUrl: '../../generic/generic.drop-down.list.html'
})
export class ProjectDropDownList extends GenericDropDownList<Project, number> {
    constructor() {
        super('name', 'asc');
    }
}