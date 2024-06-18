
import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { ConfigValue } from "app/model/api/common/config-value";
import { AppConfig } from "app/config";

@Injectable()
export class ConfigValuesHttpService extends GenericHttpService<ConfigValue, number> {
    constructor(public http: Http) {
        super(http, "", "configvalues");
    }

    public download() {
        let url = AppConfig.urlPrefix + this.url + '/download';

        return this.http.get(url, { responseType: ResponseContentType.Blob })
                        .map(res => res.blob());
    }

    public upload(fileToUpload: any) {
        let input = new FormData();
        input.append("file", fileToUpload);
        
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/upload', input);
    }
}