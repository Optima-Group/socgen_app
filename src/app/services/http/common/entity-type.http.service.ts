import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { EntityFile } from "app/model/api/common/entity-file";
import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class EntityTypeHttpService extends GenericHttpService<EntityFile, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "entitytypes");
    }
}