import { Http, URLSearchParams, Response, Request, Headers } from '@angular/http';
// import { Injectable, Component } from 'angular2/core'; //Injectable,
import 'rxjs/add/operator/share';
import 'rxjs/add/operator/catch';
import 'rxjs/Rx';
import { Observable } from 'rxjs/Observable';
import { Param } from '../../model/common/param';
import { PagedResult } from '../../model/common/paged-result';
import { AppConfig } from '../../config';
import { IService } from '../common/i-service';

// @Injectable()
// @Component({
//    providers: [ GenericHttpService ]
// })
export abstract class GenericHttpService<T, W> implements IService<W> {

    protected headers: Headers = null;
    // protected parentUrl: string = "";
    // protected url: string = "";

    constructor(public http: any, public parentUrl: string, public url: string) {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/json');
        this.headers.append('Access-Control-Allow-Origin', '*');
    }

    protected getSearchParams(params: Array<Param>) {
        let searchParams: URLSearchParams = null;

        if (params && params.length > 0) {
            searchParams = new URLSearchParams();

            params.forEach((param) => {
                if ((param.value != null) && (param.value.length > 0)) {
                    searchParams.set(param.name, param.value);
                }
            });
        }

        return searchParams;
    }

    protected httpGet(parent: number, currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, detailType?: string): any {

        let urlLeft = this.url;
        if (detailType) urlLeft = urlLeft + '/' + detailType;
        let urlRight = '';
        let searchParams: URLSearchParams = null;
        let filter: string = '';
        let filtered: boolean = false;
        let paged: boolean = false;

        searchParams = new URLSearchParams();

        // urlLeft = urlLeft + '/paged';
        if (currentPage > 0) {
            // urlLeft = urlLeft + '/paged';
            // urlRight = urlRight + `page=${currentPage}&pageSize=${pageSize}`;
            searchParams.set('page', currentPage.toString());
            searchParams.set('pageSize', pageSize.toString());
            paged = true;
        }

        if ((sortColumn != null) && (sortColumn.length > 0)) {
            // urlRight = urlRight + `&sortColumn=${sortColumn}&sortDirection=${sortDirection}`;
            searchParams.set('sortColumn', sortColumn);
            searchParams.set('sortDirection', sortDirection);
            // filtered = true;
        }

        if (params && params.length > 0) {
            params.forEach((param) => {
                switch (param.name) {
                    case 'parentId':
                        urlLeft = this.parentUrl + `/${param.value}` + urlLeft;
                        break;
                    // case "filter":
                    //     filter = param.value;
                    //     break;
                    default:
                        if ((param.value != null) && (param.value.length > 0)) {
                            searchParams.set(param.name, param.value);
                        }
                        break;
                }
            });
            filtered = true;
        }

        if (!paged && filtered) urlLeft = urlLeft + '/filtered';

        // if (filter.length > 0) {
        //     if (!searchParams) {
        //         urlRight = urlRight + `&filter=${filter}`;
        //     }
        //     else {
        //         searchParams.set("filter", filter);
        //     }
        // }

        // let urlLeft = (parent > 0 ? this.parentUrl + `/${parent}/` : '') + this.url;
        // let urlRight = '';

        // let searchParams: URLSearchParams = null;

        // if (currentPage > 0) {
        //     urlRight = urlRight + `/${currentPage}/${pageSize}`;

        //     if ((sortColumn != null) && (sortColumn.length > 0)) {
        //         urlRight = urlRight + `/${sortColumn}/${sortDirection}`;
        //     }
        // }

        // if (params) {
        //     if ((params.length == 1) && (params[0].name === 'filter')) {
        //         urlRight = urlRight + `/${params[0].value}`;
        //     }
        //     else {
        //         if (params.length > 0) {
        //             urlLeft = urlLeft + '/filtered';
        //             searchParams = new URLSearchParams();
        //             params.forEach((param) => {
        //                 searchParams.set(param.name, param.value);
        //             });
        //         }
        //     }
        // }

        return this.http.get(AppConfig.urlPrefix + urlLeft + urlRight, (searchParams ? { search: searchParams } : null))
            .map((data: Response) => {
                return data.json();
            })
            .catch(this.handleError);
    }

    handleError(error: Response) {
        console.error('Eroare: ' + error);
        return Observable.throw(error);
    }

    getById<V, W>(id: W): Observable<V> {
        return this.http.get(AppConfig.urlPrefix + this.url + `/${id}`)
            .map((data: Response) => {
                return data.json();
            });
    }

    get<V>(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number, detailType?: string): Observable<V> {
        return this.httpGet((parent ? parent : 0), currentPage, pageSize, sortColumn, sortDirection, params, detailType);
    }

    create<T>(item: T, subUrl?: string): Observable<T> {

        let url: string = AppConfig.urlPrefix + this.url;
        if (subUrl) url = url + '/' + subUrl;

        return this.http.post(url, JSON.stringify(item), { headers: this.headers })
            .map((data: Response) => {
                return data.json();
            });
            // .map((item: T) => {
            //    return item;
            // });
    }

    update<T>(item: T): Observable<void> {
        return this.http.put(AppConfig.urlPrefix + this.url, JSON.stringify(item), { headers: this.headers });
    }

    delete<T>(id: W): Observable<void> {
        console.log(AppConfig.urlPrefix + this.url + `/${id}`);
        return this.http.delete(AppConfig.urlPrefix + this.url + `/${id}`);
    }
}
