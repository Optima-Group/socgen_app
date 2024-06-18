import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { AppConfig } from "app/config";
import { CodeNameEntity } from "app/model/api/common/code-name-entity";

@Component({
    selector: 'room-detail',
    templateUrl: 'room.detail.html',
    inputs: [ 'locationLink', 'locationSelectedEvent' ],
    outputs: ['locationNeeded']
})
export class RoomDetail extends GenericDetail<Room, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    //@ViewChild('detailForm') detailForm: any;

    protected locationRequired: boolean = AppConfig.ROOM_LOCATION_REQUIRED;
    protected locationSelectedEvent: EventEmitter<Location>;
    protected locationNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedLocation: Location = null;
    private locationLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Room(0, '', '', null, false);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    public set location(location: Location) {
        this.selectedLocation = location;
        this.item.location = location != null ? new CodeNameEntity(location.id, location.code, location.name) : null;
    }

    private askForLocation() {
        this.locationNeeded.emit();
    }

    protected saveItem() {
        if ((this.locationRequired) && (this.selectedLocation == null)) {
            alert('Directia este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    //private get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}