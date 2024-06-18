import { EmployeeList } from '../administration/employees/employee.list';
import { EmployeeHttpService } from '../../services/http/administration/employee.http.service';
import { AdmCenterList } from '../administration/adm-centers/adm-center.list';
import { AppConfig } from 'app/config';
import { TranslateService } from '@ngx-translate/core';
import { Component, ViewChild, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDirective } from 'ng2-bootstrap';
import { IdentityService } from "app/services/http/identity/identity.service";
import { UserList } from "app/forms/auth/user.list";
import { Param } from "app/model/common/param";
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { AdmCenterHttpService } from 'app/services/http/administration/adm-center.http.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
// import { MapTempSelection } from '../common/map-temp/map-temp.selection';
// import { CompanyTypeHttpService } from 'app/services/http/administration/company-type.http.service';
// import { CompanyTypeList } from '../assets/company-types/company-type.list';
import { CompanyHttpService } from 'app/services/http/assets/company.http.service';
import { CompanyList } from '../assets/companies/company.list';
import { LocationHttpService } from 'app/services/http/administration/location.http.service';
import { LocationList } from '../administration/locations/location.list';
// import { LocationTypeHttpService } from 'app/services/http/administration/location-type.http.service';

@Component({
    selector: 'identity-manage',
    templateUrl: 'identity.manage.html',
    styleUrls: ['identity.manage.scss'],
    providers: [ AdmCenterHttpService, EmployeeHttpService, LocationHttpService ]
})
export class IdentityManage {

    @ViewChild('registerModal') registerModal: ModalDirective;
    @ViewChild('userList') userList: UserList;


    public role: string = 'all';
    private filter: string = '';
    private model: any = {};
    private interval: any = {};
    private errorMessages: string[] = [];
    private errorMessage: string = '';
    private selectedTempInterval7: string = '-';
    private selectedTempInterval8: string = '-';
    private selectedTempInterval9: string = '-';
    private selectedTempInterval10: string = '-';

    @ViewChild('admCenterList') public admCenterList: AdmCenterList;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;
    // @ViewChild('companyTypeList') public companyTypeList: CompanyTypeList;
    @ViewChild('companyTypeListModal') public companyTypeListModal: ModalDirective;
    @ViewChild('locationList') public locationList: LocationList;
    @ViewChild('locationListModal') public locationListModal: ModalDirective;
    // @ViewChild('mapTempList') public mapTempList: MapTempSelection;
    @ViewChild('mapTempListModal') public mapTempListModal: ModalDirective;
    @ViewChild('employeeList') public employeeList: EmployeeList;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;

    constructor(private router: Router,
                private identityHttpService: IdentityService,
                private translate: TranslateService,
                private identityService: IdentityService,
                private toastr: ToastsManager,
                private vcr: ViewContainerRef,
                private admCenterHttpService: AdmCenterHttpService,
                // private locationTypeHttpService: LocationTypeHttpService,
                private locationHttpService: LocationHttpService,
                private companyHttpService: CompanyHttpService,
                // private companyTypeHttpService: CompanyTypeHttpService,
                private employeeHttpService: EmployeeHttpService) {

        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
        this.toastr.setRootViewContainerRef(vcr);
    }

    ngAfterViewInit() {
        this.refreshUsers();
    }

    private onTempIntervalUpdate7(selectedTempInterval7: string) {
        this.selectedTempInterval7 = selectedTempInterval7;
    }

    private onTempIntervalUpdate9(selectedTempInterval9: string) {
        this.selectedTempInterval9 = selectedTempInterval9;
    }

    private onTempIntervalUpdate8(selectedTempInterval8: string) {
        this.selectedTempInterval8 = selectedTempInterval8;
    }

    private onTempIntervalUpdate10(selectedTempInterval10: string) {
        this.selectedTempInterval10 = selectedTempInterval10;
    }

    private changeRole(claimsValue: string) {
        if(this.userList.selectedItem != null){
            if (confirm('Modificati utilizatorul selectat?')) {
                this.identityService.updateUser(this.userList.selectedItem.userName, claimsValue)
                    .subscribe(() => {
                        this.refreshUsers();
                        this.toastr.success('Rolul a fost modificat cu succes!!');
                    });
            }
        }else {
            this.toastr.info('Va rugam sa selectati un utilizator!');
        }
    }

    private refreshUsers() {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('role', this.role));

        this.userList.refresh(params);
    }

    private register() {
        // this.registerModal.show();
        this.router.navigate(['/signup']);
    }

    private setSelectedRole(role: string) {
        this.role = role;
        this.refreshUsers();
    }

    private  changePassword(user: string) {
        this.router.navigate(['/passwordreset', user]);
    }
    private  deleteUser(user: string) {
        if (confirm('Stergeti utilizatorul selectat?')) {
            this.identityService.Delete(user)
                .subscribe(() => {
                   this.refreshUsers();
                    alert('Utilizatorul a fost sters.');
                });
        }
    }

    // private selectCompanyType() {
    //     this.companyTypeListModal.show();
    //     this.companyTypeList.refresh(null);
    // }

    // private setSelectedCompanyType() {

    //     this.model.userId = this.userList.selectedItem.id;
    //     // this.model.admCenterId = this.admCenterList.selectedItem.id;

    //     if (this.companyTypeList.selectedItems != null) {
    //         this.model.companyTypeIds = new Array<number>();
    //         this.companyTypeList.selectedItems.forEach((selectedItem) => {
    //             this.model.companyTypeIds.push(selectedItem.id);
    //         });
    //     }



    //     this.identityService.UpdateUserCompanyType(this.model)
    //         .subscribe(
    //         (res: any) => {
    //             // // IdentityResult.
    //             // if (res.succeeded) {
    //             //     // Signs in the user.
    //             //     this.router.navigate(['/identity']);
    //             // } else {
    //             //     this.errorMessages = res.errors;
    //             // }

    //             this.refreshUsers();

    //         },
    //         (error: any) => {

    //             // Error on post request.
    //             let errMsg = (error.message) ? error.message :
    //                 error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    //             this.errorMessage = "Server error. Try later.";

    //         });

    //     this.companyTypeListModal.hide();
    // }


    private selectLocation() {
        this.locationListModal.show();
        this.locationList.refresh(null);
    }

    // private setSelectedLocation() {

    //     this.model.userId = this.userList.selectedItem.id;
    //     // this.model.admCenterId = this.admCenterList.selectedItem.id;

    //     if (this.locationList.selectedItems != null) {
    //         this.model.locationIds = new Array<number>();
    //         this.locationList.selectedItems.forEach((selectedItem) => {
    //             this.model.locationIds.push(selectedItem.id);
    //         });
    //     }



    //     this.identityService.UpdateUserLocation(this.model)
    //         .subscribe(
    //         (res: any) => {
    //             // // IdentityResult.
    //             // if (res.succeeded) {
    //             //     // Signs in the user.
    //             //     this.router.navigate(['/identity']);
    //             // } else {
    //             //     this.errorMessages = res.errors;
    //             // }

    //             this.refreshUsers();

    //         },
    //         (error: any) => {

    //             // Error on post request.
    //             let errMsg = (error.message) ? error.message :
    //                 error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    //             this.errorMessage = "Server error. Try later.";

    //         });

    //     this.locationListModal.hide();
    // }


    private selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    private setSelectedAdmCenter() {

        this.model.userId = this.userList.selectedItem.id;
        // this.model.admCenterId = this.admCenterList.selectedItem.id;

        if (this.admCenterList.selectedItems != null) {
            this.model.admCenterIds = new Array<number>();
            this.admCenterList.selectedItems.forEach((selectedItem) => {
                this.model.admCenterIds.push(selectedItem.id);
            });
        }



        this.identityService.UpdateUserAdmCenter(this.model)
            .subscribe(
            (res: any) => {
                // // IdentityResult.
                // if (res.succeeded) {
                //     // Signs in the user.
                //     this.router.navigate(['/identity']);
                // } else {
                //     this.errorMessages = res.errors;
                // }

                this.refreshUsers();

            },
            (error: any) => {

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                this.errorMessage = "Server error. Try later.";

            });

        this.admCenterListModal.hide();
    }


    private selectMapTemp() {
        this.mapTempListModal.show();
    }

    // private setSelectedTempInterval() {

    //     this.interval.userId = this.userList.selectedItem.id;
    //     this.interval.tempInterval7 = this.selectedTempInterval7;
    //     this.interval.tempInterval8 = this.selectedTempInterval8;
    //     this.interval.tempInterval9 = this.selectedTempInterval9;
    //     this.interval.tempInterval10 = this.selectedTempInterval10;

    //     this.identityService.UpdateUserTempInterval(this.interval)
    //         .subscribe(
    //         (res: any) => {
    //             this.mapTempListModal.hide();
    //             this.refreshUsers();

    //         },
    //         (error: any) => {

    //             // Error on post request.
    //             let errMsg = (error.message) ? error.message :
    //                 error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    //             this.errorMessage = "Server error. Try later.";

    //         });

    //     this.admCenterListModal.hide();
    // }

    private selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    private setSelectedEmployee() {
                this.model.userId = this.userList.selectedItem.id;
                this.model.employeeId = this.employeeList.selectedItem.id;

                this.identityService.UpdateUserEmployee(this.model)
                    .subscribe(
                    (res: any) => {
                        this.refreshUsers();
                    },
                    (error: any) => {
                        // Error on post request.
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        
                        this.errorMessage = "Server error. Try later.";
                    });
        
                this.employeeListModal.hide();
            }
}