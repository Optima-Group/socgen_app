import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Model } from 'app/model/api/assets/model';

@Injectable()
export class ModelHttpService extends GenericHttpService<Model, number> {
    constructor(public http: Http) {
        super(http, '', 'models');
    }
}
