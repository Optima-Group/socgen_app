import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { IService } from '../../services/common/i-service';
import { AppUtils } from '../../common/app.utils';

enum ViewMode {
    AddNew = 1,
    Edit = 2,
    Delete = 3
}

export class GenericDetail<T extends IEntity<V>, V> {

    @Input() dataSource: IService<V>;
    @Input() addNewItemEvent: EventEmitter<void>;
    @Input() editItemEvent: EventEmitter<T>;

    @Output() protected itemAdded = new EventEmitter<T>();
    @Output() protected itemUpdated = new EventEmitter<T>();
    @Output() protected itemDeleted = new EventEmitter<T>();
    @Output() protected changesCanceled = new EventEmitter<void>();

    protected item: T = null;
    deleteConfirmationMode: boolean = false;
    private viewMode: ViewMode = ViewMode.AddNew;

    ngOnInit() {
        if (this.addNewItemEvent != null) {
            this.addNewItemEvent.subscribe(
                () => {
                    // this.viewMode = ViewMode.AddNew;
                    // this.setItemDefaultValues();

                    this.addNew();
                });
        }

        if (this.editItemEvent != null) {
            this.editItemEvent.subscribe(
                (item: T) => {
                    // this.viewMode = ViewMode.Edit;
                    // this.item = AppUtils.copyObject<T>(data);
                    this.edit(item);
                });
        }
    }

    setItemDefaultValues() {
        this.item = null;
    }

    // get itemId(): number { return 0; }

    // getItemId(): number {
    //    return 0;
    // }

    protected saveItem() {
        if (this.viewMode === ViewMode.AddNew) {
            this.dataSource.create(this.item).subscribe(
                res => {
                    this.itemAdded.emit(res);
                }
            );
        }
        else {
            this.dataSource.update(this.item).subscribe(
                () => {
                    this.itemUpdated.emit(this.item);
                }
            );
        }

        this.resetForm();
    }

    deleteItem() {
        this.deleteConfirmationMode = false;
        this.dataSource.delete(this.item.id).subscribe(
            res => {
                this.itemDeleted.emit(this.item);
            }
        );
        this.resetForm();
    }

    cancelChanges() {
        this.changesCanceled.emit(null);
        this.resetForm();
    }

    protected resetForm() {
    }

    public addNew() {
        this.viewMode = ViewMode.AddNew;
        this.item = null;
        this.setItemDefaultValues();
    }

    public edit(item: T) {
        this.viewMode = ViewMode.Edit;
        this.item = AppUtils.copyObject<T>(item);
    }
}
