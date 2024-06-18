import { Observable } from 'rxjs/Observable';
import { IReadService } from '../../services/common/i-read.service';

export interface IService<V> extends IReadService<V> {
    create<T>(item: T): Observable<T>;
    update<T>(item: T): Observable<void>;
    delete(id: V): Observable<void>;
}

// export interface IService<T> extends IReadService<T> {
//     create(item: T): Observable<T>;
//     update(item: T): Observable<void>;
//     delete(id: number): Observable<void>;
// }