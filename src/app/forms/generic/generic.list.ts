import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IReadService } from '../../services/common/i-read.service';
import { Param } from '../../model/common/param';
import { PagedResult } from '../../model/common/paged-result';

export class GenericList<T extends IEntity<V>, V>  {
    @Input() dataSource: IReadService<V>;
    @Input() protected itemAddedEvent: EventEmitter<T>;
    @Input() protected itemUpdatedEvent: EventEmitter<T>;
    @Input() protected itemDeletedEvent: EventEmitter<T>;
    @Input() protected requestSelectionEvent: EventEmitter<void>;
    // @Input() protected requestRefreshEvent: EventEmitter<Array<T>>;
    @Input() protected requestRefreshEvent: EventEmitter<Array<Param>>;
    @Input() protected updateSelectionEvent: EventEmitter<Array<T>>;
    @Input() protected requestClearEvent: EventEmitter<void>;
    @Input() protected pageSizeUpdatedEvent: EventEmitter<number>;
    @Input() protected setCurrentPageDataEvent: EventEmitter<PagedResult<T>>;

    @Input() protected parentId: number = 0;
    @Input() protected pageSize: number = 10;
    // @Input() protected pageSize: string = "10";
    @Input() protected rowSelection: string = 'single'; //"multiple"
    @Input() protected notifyOnChange: string = 'true';
    @Input() protected usePaging: string = 'false';
    @Input() protected showSimpleSearch: string = 'true';
    @Input() protected loadOnInit: string = 'false';
    @Input() protected selectionRequired: string = 'false';
    @Input() protected dynamicQuery: string = 'false';
    @Input() protected detailType: string = '';
    @Input() protected sortColumn: string = '';
    @Input() protected sortDirection: string = '';
    // @Input() protected dataSource: string = "HTTP";

    @Output() protected selectionChanged: EventEmitter<Array<T>> = new EventEmitter<Array<T>>();
    @Output() public CurrentPageData: PagedResult<T> = null;

    protected params: Array<Param> = new Array<Param>();
    // protected jsonFilters: string = "";
    protected items: Array<T>;
    protected _selectedItems: Array<T> = new Array<T>();

    // protected sortColumn: string = "";
    // protected sortDirection: string = "asc";

    constructor(protected sortColumnEx: string, protected sortDirectionEx: string, protected detailTypeEx?: string
    ) {
    }

    // paging
    // protected pagingInfo: PagingInfo = new PagingInfo(0, 1, 10); //totalItems = 0, currentPage = 1, pageSize = 15

    protected initialized: boolean = false;
    protected totalItems: number = 0;
    protected currentPage: number = 1;
    protected sumValueInv: number = 0;
    protected sumValueRem: number = 0;
    //protected pageSize: number = 50;

    private maxSize: number = 10;
    private numPages: number = 0;
    private loading: boolean = false;

    ngOnInit() {
        if (this.itemAddedEvent != null) this.itemAddedEvent.subscribe((data: T) => this.itemAdded(data));
        if (this.itemUpdatedEvent != null) {
            this.itemUpdatedEvent.subscribe(
                (data: T) => this.itemUpdated(data)
            );
        }
        if (this.itemDeletedEvent != null) this.itemDeletedEvent.subscribe((data: T) => this.itemDeleted(data));
        if (this.requestSelectionEvent != null) this.requestSelectionEvent.subscribe(() => this.notifyCurrentSelection());
        if (this.requestRefreshEvent != null) {
            this.requestRefreshEvent.subscribe((externalFilters: Array<Param>) => {
                this.initialized = true;
                this.refresh(externalFilters);
            });
        }
        if (this.updateSelectionEvent != null) {
            this.updateSelectionEvent.subscribe((selectedItems: Array<T>) => {
                this._selectedItems = selectedItems != null ? selectedItems : new Array<T>();
                this.doCustomProcessing();
            });
        }
        if (this.requestClearEvent != null) this.requestClearEvent.subscribe(() => this.clear());
        if (this.pageSizeUpdatedEvent != null) {
            this.pageSizeUpdatedEvent.subscribe(
                (pageSize: number) => this.pageSize = pageSize
            );
        }
        if (this.setCurrentPageDataEvent != null) {
            this.setCurrentPageDataEvent.subscribe(
                (data: PagedResult<T>) => this.setCurrentPageData(data)
            );
        }

        if (this.loadOnInit == "true") {
            this.initialized = true;
            this.refresh(null);
        }
    }

    protected applySimpleSearchFilter(filter: string) {
        let filters: Array<Param> = new Array<Param>();
        filters.push(new Param("filter", filter));
        this.refresh(filters);
    }

    public refresh(filters: Array<Param>) { //, mergeFilters: boolean = false) {
        // if (mergeFilters) {
        //     this.mergeFilters(filters);
        // }
        // else {
        //     this.resetFilters(filters);
        // }
        this.mergeFilters(filters);
        this.refreshItems();
    }

    protected mergeFilters(filters: Array<Param>) {
        if (filters != null) {
            let found: boolean = false;
            filters.forEach((filter) => {

                found = false;
                this.params.forEach((param) => {
                    if (param.name === filter.name) {
                        param.value = filter.value;
                        found = true;
                    }
                });

                if (!found) {
                    this.params.push(filter);
                }
            });
        }
    }

    protected resetFilters(filters: Array<Param>) {
        this.params = new Array<Param>();

        if (filters != null) {
            filters.forEach((filter) => {
                this.params.push(filter);
            });
        }
    }

    protected clear() {

        this.items = new Array<T>();
        if (this.usePaging === "true") {
            this.totalItems = 0;
        }
        this.doCustomProcessing();
    }

    protected refreshItems() {
        this.loading = true;
        if (this.usePaging === "true") {
            this.dataSource.get<PagedResult<T>>(this.currentPage, this.pageSize, this.sortColumn, this.sortDirection, 
                    this.params, (this.parentId > 0 ? this.parentId : null), this.detailType)
                .subscribe(res => {
                // this.items = res.items;

                // //this.pagingInfo = res.paging;
                // this.totalItems = res.pagingInfo.totalItems;
                // this.pageSize = res.pagingInfo.pageSize;
                // //this.pageSize = res.pagingInfo.pageSize.toString();
                // this.currentPage = res.pagingInfo.currentPage;

                // this.doCustomProcessing();

                this.setCurrentPageData(res);
                //this.isBusy = false;
                this.loading = false;
            });
        }
        else {
            //this.service.get(this.url, this.params).subscribe(res => {
            this.dataSource.get<Array<T>>(null, null, this.sortColumn, this.sortDirection, this.params, 
                    (this.parentId > 0 ? this.parentId : null), this.detailType)
                .subscribe(res => {
                this.items = res;

                this.doCustomProcessing();
                //this.isBusy = false;
                this.loading = false;
            });
        }
    }

    public setCurrentPageData(pageData: PagedResult<T>) {
        this.items = pageData.items;

        this.totalItems = pageData.pagingInfo.totalItems;
        this.pageSize = pageData.pagingInfo.pageSize;
        this.currentPage = pageData.pagingInfo.currentPage;
        this.sumValueInv = pageData.pagingInfo.sumValueInv;
        this.sumValueRem = pageData.pagingInfo.sumValueRem;


        this.CurrentPageData = pageData;

        this.doCustomProcessing();
    }

    // public setCurrentData(params: Array<Param>, pageData: PagedResult<T>) {
    //     this.params = params;
    //     this.setCurrentPageData(pageData);
    // }

    public get searchParams(): Array<Param> {
        return this.params;
    }

    public set searchParams(params: Array<Param>) {
        this.params = params;
    }

    public get sortingColumn(): string {
        return this.sortColumn;
    }

    public set sortingColumn(sortColumn: string) {
        this.sortColumn = sortColumn;
    }
    
    public get sortingDirection(): string {
        return this.sortDirection;
    }

    public set sortingDirection(sortDirection: string) {
        this.sortDirection = sortDirection;
    }

    public get selectedItems(): Array<T> {
        return this._selectedItems;
        //return (this.rowSelection === 'multiple') ? this._selectedItems : null;
    }

    public get selectedItem(): T {
        return ((this.rowSelection === 'single') && (this._selectedItems != null) && (this._selectedItems.length === 1)) ? this._selectedItems[0] : null;
    }

    public set selectedItems(selectedItems: Array<T>) {
        this._selectedItems = selectedItems;

        // if (this.notifyOnChange.toUpperCase() === "TRUE") {
        //     this.notifyCurrentSelection();
        // }

        this.doCustomProcessing();
    }

    protected doCustomProcessing() {
    }

    protected itemAdded(addedItem: T) {
        //this.items.push(addedItem);

        // this.items.splice(this.items.length - 1, 1);
        // this.items.splice(0, 0, addedItem);
        // this.totalItems += 1;

        this.refreshItems();
    }

    protected itemUpdated(updatedItem: T) {
        //1
        //let index: number = this.items.indexOf(updatedItem);
        
        //2
        // let currentIndex = -1;
        // let index = -1;

        // this.items.forEach((item: T) => {
        //     currentIndex++;
        //     if (item.id === updatedItem.id) {
        //         index = currentIndex;
        //     }
        // });

        // if (index != -1) {
        //     this.items.splice(index, 1, updatedItem);
        // }

        //3
        this.refreshItems();
    }

    protected itemDeleted(deletedItem: T) {
        //1
        // let index: number = this.items.indexOf(deletedItem);
        // this.items.splice(index, 1);

        //2
        // let currentIndex = -1;
        // let index = -1;

        // this.items.forEach((item: T) => {
        //     currentIndex++;
        //     if (item.id === deletedItem.id) {
        //         index = currentIndex;
        //     }
        // });

        // if (index != -1) {
        //     this.items.splice(index, 1);
        // }
        // this.totalItems -= 1;

        //3
        this.refreshItems();
    }

    protected notifyCurrentSelection() {
        this.selectionChanged.emit(this._selectedItems);
    }

    //protected isBusy: boolean = false;

    private pageChanged(event: any): void {
        // if (this.isBusy === false) {
        //     this.isBusy = true;
            //this.pagingInfo.currentPage = event.page;

            if (event.page === this.currentPage) return;

            //console.log(JSON.stringify(event));

            this.currentPage = event.page;
            this.refreshItems();
        // }
    };

    applySort(sortColumn: string) {
        if (this.sortColumn === sortColumn) {
            this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        }
        else {
            this.sortColumn = sortColumn;
            this.sortDirection = 'asc';
        }

        this.refreshItems();
    }
}