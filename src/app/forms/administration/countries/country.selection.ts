import { Component, EventEmitter, ViewChild, Input } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { CountryList } from './country.list';
import { CountryHttpService } from 'app/services/http/administration/contry.http.service';

@Component({
    selector: 'country-selection',
    templateUrl: 'country.selection.html',
    providers: [ CountryHttpService ]
})
export class CountrySelection {

    @Input() itemSelection: string;

    @ViewChild('countryListModal') modal: ModalDirective;
    @ViewChild('countryList') public countryList: CountryList;

    private filter: string = '';

    constructor(private regionHttpService: CountryHttpService) {
    }

    private selectCountries() {
        this.modal.show();
        this.countryList.refresh(null);
    }
}
