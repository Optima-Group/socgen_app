import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { Brand } from 'app/model/api/assets/brand';

@Injectable()
export class BrandHttpService extends GenericHttpService<Brand, number> {
    constructor(public http: Http) {
        super(http, '', 'brands');
    }
}
