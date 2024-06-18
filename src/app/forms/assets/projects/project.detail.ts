import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Project } from 'app/model/api/assets/project';


@Component({
    selector: 'project-detail',
    templateUrl: 'project.detail.html'
})
export class ProjectDetail extends GenericDetail<Project, number> {

    @ViewChild('detailForm') detailForm: FormGroup;

    setItemDefaultValues() {
        this.item = new Project();
    }

    protected resetForm() {
        this.detailForm.reset();
    }
}