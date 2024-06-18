
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { ColumnDefinition } from "app/model/common/column-definition";

@Injectable()
export class ColumnDefinitionHttpService extends GenericHttpService<ColumnDefinition, number> {
    constructor(public http: Http) {
        super(http, "", "columndefinitions");
    }
}