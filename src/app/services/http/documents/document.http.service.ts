// import { Http } from '@angular/http';
import { AuthHttp } from 'angular2-jwt';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Document } from '../../../model/api/documents/document';
import { DocumentUpload } from '../../../model/api/documents/document-upload';
import { GenericHttpService } from './../generic.http.service';
import { AppConfig } from '../../../config';

@Injectable()
export class DocumentHttpService extends GenericHttpService<Document, number> {
    // constructor(public http: Http) {
    //     super(http, "", "documents");
    // }

    constructor(private authHttp: AuthHttp) {
        super(authHttp, '', 'documents');
    }

    public saveFullDocument(document: DocumentUpload): Observable<number> {
      return this.http.post(AppConfig.urlPrefix + this.url + '/full', JSON.stringify(document), { headers: this.headers })
          .map((response) => {
              return response.json();
          });
  }

    public operation(document: DocumentUpload): Observable<Document> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/validate', JSON.stringify(document), { headers: this.headers })
            .map((response) => {

                return response.json();

            });
    }
}
