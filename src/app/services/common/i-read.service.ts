import { Param } from '../../model/common/param';
import { PagedResult } from '../../model/common/paged-result';
import { Observable } from 'rxjs/Observable';

export interface IReadService<V> {
    getById<T>(id: V): Observable<T>;
    get<T>(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number, detailType?: string): Observable<T>;
}

// export interface IReadService<T> {
//     getById(id: number): Observable<T>;
//     get(sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<Array<T>>;
//     getPaged(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<PagedResult<T>>;
// }