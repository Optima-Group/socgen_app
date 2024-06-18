import { Observable } from 'rxjs/Observable';
import { Observer }   from 'rxjs/Observer';
import { Param } from '../../model/common/param';
import { PagedResult } from '../../model/common/paged-result';
import { PagingInfo } from '../../model/common/paging-info';
import { AppConfig } from '../../config';
import { IService } from '../common/i-service';

export abstract class GenericMemoryService<T extends IEntity<V>, V> implements IService<V> {

    private dataSource: Array<T>;
    // constructor(public dataSource: Array<T>) {
    // }

    public setDataSource(dataSource: Array<T>) {
        this.dataSource = dataSource;
    }

    getById(id: V): Observable<T> {
        let result: any;
        return result;
    }

    get(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<Array<T>> {
        return Observable.of(this.dataSource);
    }

    // get(sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<Array<T>> {
    //     return Observable.of(this.dataSource);
    // }

    // getPaged(currentPage: number, pageSize: number, sortColumn: string, sortDirection: string, params: Array<Param>, parent?: number): Observable<PagedResult<T>> {
    //     let result: PagedResult<T> = new PagedResult<T>(this.dataSource, new PagingInfo(this.dataSource.length, pageSize, currentPage));
    //     //let result: PagedResult<T> = new PagedResult<T>(this.dataSource, new PagingInfo(0, pageSize, currentPage));
    //     return Observable.fromPromise(Promise.resolve(result));
    //     //return Observable.of(result).timeout(2000);
    // }

    create(item: T): Observable<T> {
        this.dataSource.push(item);
        //return Observable.fromP(item);

        return new Observable<T>((responseObserver: Observer<T>) => {
            responseObserver.next(item);
        });
    }

    update(item: T): Observable<void> {
        return new Observable<void>((responseObserver: Observer<void>) => {
            responseObserver.next(null);
        });
    }

    delete(id: V): Observable<void> {
        let index: number = -1;
        let currentIndex: number = 0;

        this.dataSource.forEach((item: T) => {
            if (item.id === id) {
                index = currentIndex;
            }
            currentIndex++;
        });

        if (index > -1) {
            this.dataSource.splice(index, 1);
        }
        
        return new Observable<void>((responseObserver: Observer<void>) => {
            responseObserver.next(null);
        });
    }
}