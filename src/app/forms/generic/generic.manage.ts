import { EventEmitter } from '@angular/core';
import { Param } from '../../model/common/param';

export class GenericManage<T extends IEntity<V>, V> {

    protected selectedItem: IEntity<V> = null;

    protected addNewItemEvent: EventEmitter<void> = new EventEmitter<void>();
    protected editItemEvent: EventEmitter<IEntity<V>> = new EventEmitter<IEntity<V>>();
    protected itemAddedEvent: EventEmitter<T> = new EventEmitter<T>();
    protected itemUpdatedEvent: EventEmitter<T> = new EventEmitter<T>();
    protected itemDeletedEvent: EventEmitter<T> = new EventEmitter<T>();

    protected requestSelectionEvent: EventEmitter<void> = new EventEmitter<void>();
    protected requestRefreshEvent: EventEmitter<Array<Param>> = new EventEmitter<Array<Param>>();
    protected updateSelectionEvent: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();

    protected viewMode: GenericManageViewMode = GenericManageViewMode.ItemList;
    // protected viewMode: number = GenericManageViewMode.ItemList;

    // protected get itemListViewMode(): boolean { return this.viewMode === GenericManageViewMode.ItemList; }
    // protected get itemDetailViewMode(): boolean { return this.viewMode === GenericManageViewMode.ItemDetail; }

    //protected detailMode: boolean = false;
    //protected viewMode: string = 'DEFAULT';

    //constructor(public service: GenericService<T>, public url: string) {
    //}

    ngAfterViewInit() {
        this.requestRefreshEvent.emit(null);
    }

    protected setSelectedItem(items: Array<T>) {
        this.selectedItem = ((items != null) && (items.length > 0)) ? items[0] : null;
    }

    private doSimpleSearch(filter: string) {
        // if ((filter != null) && (filter != undefined) && (filter.length > 0)) {
            let params: Array<Param> = new Array<Param>();
            params.push(new Param("filter", filter));
            this.requestRefreshEvent.emit(params);
        // }
    }

    protected addNewItem() {
        this.addNewItemEvent.emit(null);
        this.detailInitialize();
    }

    protected editItem() {
        this.editItemEvent.emit(this.selectedItem);
        this.detailInitialize();
    }

    protected itemAdded(item: T) {
        this.itemAddedEvent.emit(item);
        this.detailTerminate();
    }

    protected itemUpdated(item: T) {
        if (this.selectedItem.id === item.id)
            this.selectedItem = item;

        this.itemUpdatedEvent.emit(item);
        this.detailTerminate();
    }

    protected itemDeleted(item: T) {
        this.selectedItem = null;
        this.itemDeletedEvent.emit(item);
        this.detailTerminate();
    }

    protected detailInitialize() {
        this.viewMode = GenericManageViewMode.ItemDetail;
    }

    protected detailTerminate() {
        this.viewMode = GenericManageViewMode.ItemList;
    }
}

export enum GenericManageViewMode {
    ItemList = 1,
    ItemDetail = 2
}
