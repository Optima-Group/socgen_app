import { Http, ResponseContentType, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Room } from '../../../model/api/administration/room';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { Param } from 'app/model/common/param';
import { URLSearchParams } from '@angular/http';

@Injectable()
export class RoomHttpService extends GenericHttpService<Room, number> {
    constructor(public http: Http) {
        super(http, "", "rooms");
    }

    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

   
}