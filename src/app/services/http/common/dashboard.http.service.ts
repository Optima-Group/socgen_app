
import { Http, ResponseContentType } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { ConfigValue } from "app/model/api/common/config-value";
import { AppConfig } from "app/config";

@Injectable()
export class DashboardHttpService extends GenericHttpService<any, number> {
  constructor(public http: Http) {
    super(http, "", "dashboards");
  }

  public budgetStatus(accMonthId: number): Observable<any> {
      return this.http.get(AppConfig.urlPrefix + this.url + '/budgetstatus' + `/${accMonthId}`, { headers: this.headers })
      .map((data: any) => {
          return data.json();
      });
  }

  public ITStatus(accMonthId: number): Observable<any[]> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/itstatus' + `/${accMonthId}`, { headers: this.headers })
      .map((data: any) => {
        return data.json();
    });
}

public scanErrors(inventoryId: number): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/scanerrors' + `/${inventoryId}`, { headers: this.headers })
    .map((data: any) => {
      return data.json();
  });
}

public scanErrorPhotos(inventoryId: number): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/scanerrorphotos' + `/${inventoryId}`, { headers: this.headers })
    .map((data: any) => {
      return data.json();
  });
}

public NonITStatus(accMonthId: number): Observable<any[]> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/nonitstatus' + `/${accMonthId}`, { headers: this.headers })
    .map((data: any) => {
      return data.json();
  });
}


}
