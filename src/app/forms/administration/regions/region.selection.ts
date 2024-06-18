import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { RegionHttpService } from 'app/services/http/administration/region.http.service';
import { RegionList } from '../regions/region.list';

@Component({
    selector: 'region-selection',
    templateUrl: 'region.selection.html',
    providers: [ RegionHttpService ]
})
export class RegionSelection {

    @Input() itemSelection: string;

    @ViewChild('regionListModal') modal: ModalDirective;
    @ViewChild('regionList') public regionList: RegionList;

    private filter: string = '';

    constructor(private regionHttpService: RegionHttpService) {
    }

    private selectRegions() {
        this.modal.show();
        this.regionList.refresh(null);
    }
}
