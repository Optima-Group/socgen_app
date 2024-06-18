import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { AdmCenterHttpService } from "app/services/http/administration/adm-center.http.service";
import { AdmCenter } from "app/model/api/administration/adm-center";
import { AdmCenterList } from "app/forms/administration/adm-centers/adm-center.list";

@Component({
    selector: 'adm-center-selection',
    templateUrl: 'adm-center.selection.html',
    providers: [ AdmCenterHttpService ]
})
export class AdmCenterSelection {

    @Input() itemSelection: string;

    @ViewChild('admCenterListModal') modal: ModalDirective;
    @ViewChild('admCenterList') public admCenterList: AdmCenterList;

    private filter: string = '';

    constructor(private admCenterHttpService: AdmCenterHttpService) {
    }

    private selectAdmCenters() {
        this.modal.show();
        this.admCenterList.refresh(null);
    }
}
