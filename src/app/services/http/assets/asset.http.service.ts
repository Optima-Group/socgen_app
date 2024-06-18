import { ProgressBarService } from 'app/services/http/common/progress-bar.service';
import { Param } from './../../../model/common/param';
import { AssetState } from '../../../model/api/assets/asset-state';
import { URLSearchParams, Response, ResponseContentType } from '@angular/http';
import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { GenericHttpService } from '../generic.http.service';
import { AppConfig } from 'app/config';
import { AssetUpload } from 'app/model/api/assets/asset-upload';
import { AssetImportV1 } from 'app/model/common/import/asset-import-v1';
import { AssetImportV2 } from 'app/model/common/import/asset-import-v2';
import { AssetSave } from 'app/model/api/assets/asset-save';
import { AuthHttp } from 'angular2-jwt';
import { AssetRecoSave } from 'app/model/api/assets/asset-reco-save';
import { PrintLabel } from 'app/model/common/print-label';
import { AssetTempRecoSave } from 'app/model/api/assets/asset-temp-reco-save';
import { AssetTransferAdd } from 'app/model/api/assets/asset-transfer-add';
import { EmployeeValidate } from 'app/model/common/import/employee-validate';
import { ItemValidate } from 'app/model/common/import/item-validate';
import { ItemDateValidate } from 'app/model/common/import/item-date-validate';
import { AssetImportIT } from 'app/model/common/import/asset-import-it';
import { AssetImportOS } from 'app/model/common/import/asset-import-os';
import { AssetImportSN } from 'app/model/common/import/asset-import-sn';
@Injectable()
export class AssetHttpService extends GenericHttpService<any, number> {
    constructor(public http: AuthHttp, private progressBarService: ProgressBarService) {
        super(http, '', 'assets');
    }

    getDetailById(id: number): Observable<any> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/detail/${id}`)
            .map((data: Response) => {
                return data.json();
            });
    }

    addNewAsset(item: AssetSave): Observable<number> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';

        return this.http.post(url, JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

    updateAsset(item: AssetSave): Observable<Response> {
        let url: string = AppConfig.urlPrefix + this.url + '/detail';
        return this.http.put(url, JSON.stringify(item), { headers: this.headers });
    }

    updateAssetMultiple(item: AssetSave): Observable<Response> {
        let url: string = AppConfig.urlPrefix + this.url + '/detailmultiple';
        return this.http.put(url, JSON.stringify(item), { headers: this.headers });
    }


    public uploadV1(item: AssetImportV1): Observable<void> {
        console.log(JSON.stringify(item));
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv1',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }
    public uploadV2(item: AssetImportV2): Observable<void> {
        return this.http.post(AppConfig.urlPrefix + this.url + '/importv2',
            JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
    }

  public deleteAssetOp(assetId: number, inventoryId: number ): Observable<any> {
    console.log(AppConfig.urlPrefix + this.url + `/${assetId}`, inventoryId);
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAssetOp' + `/${assetId}, ${inventoryId}`);
}

public exportIn(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportIn';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public exportOtp(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOtp';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public exportOut(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportOut';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public import(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/upload', input)
        .map((data: Response) => {
            return data.json();
        });
}

public importCassation(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadCassation', input);
}

public importInventory(file: any) {
    let input = new FormData();
    input.append('file', file);
    this.progressBarService.startTracking().subscribe(progress => console.log(progress));
    return this.http
        .post(AppConfig.urlPrefix + this.url + '/uploadInv', input);
}

public exportDemo(inventoryId: number, regionId: number, locationId: number, roomId: number) {
    let searchParams: URLSearchParams = null;
 //   let url = AppConfig.urlPrefix + 'reporting/exportMegaImage&inventoryId=${inventoryId}&locationId=${locationId}';
    let url = `${AppConfig.urlPrefix}reporting/locationdownload/${regionId}/${locationId}/${roomId}`;

    searchParams = this.getSearchParams(null);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public deleteAsset(assetId: number): Observable<any> {
    return this.http.delete(AppConfig.urlPrefix + this.url + '/deleteAsset' + `/${assetId}`);
}

public checkUniqueAsset(invNo: string) {
    return this.http.get(AppConfig.urlPrefix + this.url + '/checkUnique' + `/${invNo}`, { headers: this.headers })
    .map((data: Response) => {
        return data;
    });
}

public getLastInvNo() {
    return this.http.get(AppConfig.urlPrefix + this.url + '/getLastInvNo', { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public export(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/export';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}


public exportMarley(params: Array<Param>) {
  let searchParams: URLSearchParams = null;
  let url = AppConfig.urlPrefix + this.url + '/exportMarley';

  searchParams = this.getSearchParams(params);
  return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                  .map(res => res.blob());
}

public exportIT(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportIT';
  
    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
  }

public invChart(locationId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryChart' + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

// public auditChart(locationId: number): Observable<any> {
//     return this.http.get(AppConfig.urlPrefix + this.url + '/auditChart' + `/${locationId}`, { headers: this.headers })
//     .map((data: Response) => {
//         return data.json();
//     });
// }

// public saveReco(reco: AssetRecoSave): Observable<any> {
//     return super.create(reco, 'reco');
// }

public exportSocGen(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportSocGen';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams, headers: this.headers })
                    .map(res => res.blob());
}


public exportSocGenEmail(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportSocGenEmail';

    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams, headers: this.headers })
                    .map(res => res.blob());
}

public printLabel(item: Array<PrintLabel>): Observable<void> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/printLabel',
        JSON.stringify(item), { headers: this.headers })
        .map((data: Response) => {
            return data.json();
        });
}

public saveReco(reco: AssetTempRecoSave): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/reco', JSON.stringify(reco), { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public recoverAssetTemp(assetId: number, inventoryId: number): Observable<any> {
    return this.http.put(AppConfig.urlPrefix + this.url + '/recoverAssetTemp' +
     `/${assetId}/${inventoryId}`, {})
     .map((data: Response) => {
        return data.json();
    });
}

public addAssetByEmployee(reco: AssetTransferAdd): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/addTransfer', JSON.stringify(reco), { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public employee(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/employee' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public region(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/region' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public invChartperLocation(locationId): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryChartPerLocation'  + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public room(locationId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/room'  + `/${locationId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public location(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/location'  + `/${regionId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public total(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/total' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public totalIT(inventoryId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/totalit' + `/${inventoryId}`, { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}


public totalNONIT(inventoryId: number): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/totalnonit' + `/${inventoryId}`, { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public items(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/items' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public piePerLocationChart(locationId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/piePerLocationChart' + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public piePerCompanyTypeChartValue(typeId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/piePerCompanyTypeChartValue' + `/${typeId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public piePerTypeChartValue(typeId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/piePerTypeChartValue' + `/${typeId}` , { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public piePerCompanyChartValue(typeId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/piePerCompanyChartValue' + `/${typeId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public inventoryPieChartByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartByDay' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public inventoryPieChartLocationFinishedByDay(inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/inventoryPieChartLocationFinishedByDay' + `/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditChart(locationId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditChart' + `/${locationId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditAdministrationChart(administrationId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditAdministrationChart' + `/${administrationId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditLocationChart(locationId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditLocationChart' + `/${locationId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditDivisionChart(divisionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditDivisionChart' + `/${divisionId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditRegionChart(regionId: number, inventoryId: number): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditRegionChart' + `/${regionId}/${inventoryId}`, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public auditSubtypeChart(): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeChart', { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public auditSubtypeITInUseChart(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeInUseITChart', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}


public auditSubtypeNONITInUseChart(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeInUseNONITChart', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public auditSubtypeITInStockChart(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeInStockITChart', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public auditSubtypeNONITInStockChart(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/auditSubtypeInStockNONITChart', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public auditAssetComponentChart(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/auditAssetComponentChart', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public auditTypeChart(): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditTypeChart', { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}



public auditMasterTypeChart(): Observable<any> {
    return this.http.get(AppConfig.urlPrefix + this.url + '/auditMasterTypeChart', { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public employeeValidate(reco: Array<EmployeeValidate>): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/employeevalidate', JSON.stringify(reco), { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public employeeValidateAll(guid: string): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/employeevalidateall/' + guid, { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}

public itemValidate(item: ItemValidate): Observable<any> {
    // return super.create(reco, 'reco')
    return this.http.post(AppConfig.urlPrefix + this.url + '/itemvalidate', JSON.stringify(item), { headers: this.headers })
    .map((data: Response) => {
        return data.json();
    });
}


public itemDateValidate(item: ItemDateValidate): Observable<any> {
  // return super.create(reco, 'reco')
  return this.http.post(AppConfig.urlPrefix + this.url + '/itemDateValidate', JSON.stringify(item), { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}


public itemClearDateValidate(item: ItemDateValidate): Observable<any> {
  // return super.create(reco, 'reco')
  return this.http.post(AppConfig.urlPrefix + this.url + '/itemClearDateValidate', JSON.stringify(item), { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public exportAll(params: Array<Param>) {
    let searchParams: URLSearchParams = null;
    let url = AppConfig.urlPrefix + this.url + '/exportAll';
    searchParams = this.getSearchParams(params);
    return this.http.get(url, { responseType: ResponseContentType.Blob, search: searchParams })
                    .map(res => res.blob());
}

public getPickupDate(): Observable<any> {
  return this.http.get(AppConfig.urlPrefix + this.url + '/PickupDate2', { headers: this.headers })
  .map((data: Response) => {
      return data.json();
  });
}

public uploadMarkScanAdm(item: AssetImportIT): Observable<void> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/importassetit',
        JSON.stringify(item), { headers: this.headers })            
        .map((data: Response) => {
            return data.json();
        });
}

public uploadOS(item: AssetImportOS): Observable<void> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/importassetos',
        JSON.stringify(item), { headers: this.headers })            
        .map((data: Response) => {
            return data.json();
        });
}

public uploadSN(item: AssetImportSN): Observable<void> {
    return this.http.post(AppConfig.urlPrefix + this.url + '/importassetsn',
        JSON.stringify(item), { headers: this.headers })            
        .map((data: Response) => {
            return data.json();
        });
}


}
