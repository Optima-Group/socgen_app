import { Http, Response, ResponseContentType, URLSearchParams } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Employee } from '../../../model/api/administration/employee';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from '../../../config';
import { AuthHttp } from "angular2-jwt/angular2-jwt";
import { Param } from 'app/model/common/param';
import { EmployeeUpdate } from 'app/model/common/import/employee-update';

@Injectable()
export class EmployeeHttpService extends GenericHttpService<Employee, number> {
    constructor(public http: AuthHttp) {
        super(http, "", "employees");
    }

    public import(file: any) {
        let input = new FormData();
        input.append('file', file);

        return this.http
            .post(AppConfig.urlPrefix + this.url + '/importEmployees', input)
            .map((data: Response) => {
                return data.json();
            });
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`)
            .map((data: Response) => {
                return data.json();
            });
    }

    public sendEmail(employeeId: number): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.http.post(AppConfig.urlPrefix + this.url + `/sendEmail/ ${employeeId}`,
            { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public sendBookEmail(employeeId: number): Observable<any> {
        // console.log('ITEMS: ', item);
        return this.http.post(AppConfig.urlPrefix + this.url + `/sendBookEmail/ ${employeeId}`,
            { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public sendBookEmailPreview(employeeId: number): Observable<any> {
      // console.log('ITEMS: ', item);
      return this.http.post(AppConfig.urlPrefix + this.url + `/sendBookEmailPreview/ ${employeeId}`,
          { headers: this.headers })
          .map((data: Response) => {
              return data;
          });
  }

    public export(params: Array<Param>) {
        let searchParams: URLSearchParams = null;
        let url = AppConfig.urlPrefix + this.url + '/export';

        searchParams = this.getSearchParams(params);
        return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                        .map(res => res.blob());
    }

    public updateAllEmp(): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateAllEmployees', [])
            .map((data: Response) => {
                return data.json();
            });
    }


    public deleteEmployee(id: number): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/deleteemployee' + `/${id}`, { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public updateAllERPEmployees(): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/updateAllERPEmployees', [])
            .map((data: Response) => {
                return data.json();
            });
    }

  public updateEmployees(reco: EmployeeUpdate): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/updateHeadPhones', JSON.stringify(reco), { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

    public checkInventory(id: number): Observable<any> {
        return this.http
            .post(AppConfig.urlPrefix + this.url + '/checkInventory' + `/${id}`, { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    public getByGUID(guid: string): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/getById' + `/${guid}`, { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

    public items(): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + '/items', { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
    }

}
