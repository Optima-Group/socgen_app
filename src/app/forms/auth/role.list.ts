import { IdentityService } from "app/services/http/identity/identity.service";
import { LocationList } from './../administration/locations/location.list';
import { Param } from './../../model/common/param';
import { AppConfig } from './../../config';
import { TranslateService } from '@ngx-translate/core';
import { AdmCenterHttpService } from './../../services/http/administration/adm-center.http.service';
import { AdmCenter } from './../../model/api/administration/adm-center';
import { AdmCenterList } from './../administration/adm-centers/adm-center.list';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { GenericTableList } from "app/forms/generic/generic.table.list";
import { Router } from "@angular/router";


@Component({
    selector: 'role-list',
    templateUrl: 'role.list.html',
    styleUrls: ['role.list.scss']
})
export class RoleList extends GenericTableList<any, string> {

      constructor(public router: Router) {
        super('name', 'asc', 'roles');
    }

    ngAfterViewInit() {
    }
}
