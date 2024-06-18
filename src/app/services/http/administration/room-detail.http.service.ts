import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { RoomDetail } from '../../../model/api/administration/room-detail';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class RoomDetailHttpService extends GenericHttpService<RoomDetail, number> {
    constructor(public http: Http) {
        super(http, "", "rooms");
    }
}