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
import { ModalDirective } from 'ng2-bootstrap/modal';
import { EmployeeHttpService } from "app/services/http/administration/employee.http.service";
import { HighlightPipe } from "../common/pipes/highlight-pipe ";


@Component({
    selector: 'user-list',
    templateUrl: 'user.list.html',
    styleUrls: ['user.list.scss'],
    providers: [ AdmCenterHttpService, EmployeeHttpService, HighlightPipe ]
})
export class UserList extends GenericTableList<any, string> {

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;


    private selectedModalData:any={user: '', admCenter: ''};
    private selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    private model: any = {};
    private errorMessages: string[] = [];
    private errorMessage: string = '';


      constructor(public router: Router,
        private admCenterHttpService: AdmCenterHttpService,
        private employeeHttpService: EmployeeHttpService,
        private translate: TranslateService,
        private highlightPipe: HighlightPipe,
        private identityService: IdentityService) {
        super('username', 'asc', 'users');
        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
    }

    ngAfterViewInit() {
    }

    changePassword(user: string) {
        this.router.navigate(['/passwordreset', user]);
    }

    deleteUser(user: string) {
        if (confirm('Stergeti utilizatorul selectat?')) {
            this.identityService.Delete(user)
                .subscribe(() => {
                    this.refresh(null);
                    alert('Utilizatorul a fost sters.');
                });
        }
    }

    /* begin admCenter */
    private selectAdmCenters(user, admCenter) {
        this.selectedModalData.user = user;
        this.selectedModalData.admCenter = admCenter;

        this.admCenterListModal.show();
        $('.modal-backdrop').remove();
        this.admCenterList.selectedItems = this.selectedAdmCenters;
        this.admCenterList.refresh(null);
    }

    private setSelectedAdmCenters() {
        this.selectedAdmCenters['user']=this.selectedModalData.user;
        this.selectedAdmCenters = this.admCenterList.selectedItems;
        this.model.id=this.selectedAdmCenters['user'];
        this.model.admCenterId=this.selectedAdmCenters[0].id;

        this.identityService.UpdateUserAdmCenter(this.model)
            .subscribe(
            (res: any) => {
                // IdentityResult.
                if (res.succeeded) {
                    // Signs in the user.
                    this.router.navigate(['/identity']);
                } else {
                    this.errorMessages = res.errors;
                }

            },
            (error: any) => {

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                this.errorMessage = "Server error. Try later.";

            });

        this.admCenterListModal.hide();
    }

    /* end admCenter */

}
