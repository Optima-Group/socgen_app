import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Project } from 'app/model/api/assets/project';

@Injectable()
export class ProjectHttpService extends GenericHttpService<Project, number> {
    constructor(public http: Http) {
        super(http, '', 'projects');
    }
}
