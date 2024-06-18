
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { TableDefinition } from "app/model/common/table-definition";

@Injectable()
export class TableDefinitionHttpService extends GenericHttpService<TableDefinition, number> {
    constructor(public http: Http) {
        super(http, "", "tabledefinitions");
    }
}