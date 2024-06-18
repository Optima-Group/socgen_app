
import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { GenericHttpService } from '../generic.http.service';
import { TableDefinition } from "app/model/common/table-definition";
import { Observable } from "rxjs/Observable";
import { AppConfig } from "app/config";

@Injectable()
export class TableDefinitionHttpService extends GenericHttpService<TableDefinition, number> {
    constructor(public http: Http) {
        super(http, "", "tabledefinitions");
    }

    // public getDownloadData(): Observable<any> {
    //     // return this.get(null, null, '', '', null, null, 'data').map((data: any) => {
    //     //         return data;
    //     //     });
    // }

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