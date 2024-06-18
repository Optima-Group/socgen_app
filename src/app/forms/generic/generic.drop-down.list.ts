import { GenericList } from '../../forms/generic/generic.list';

export class GenericDropDownList<T extends IEntity<V>, V> extends GenericList<T, V> {

    // constructor(sortColumn: string, sortDirection: string) {
    //     super(sortColumn, sortDirection);

    //     this.usePaging = "false";
    // }

    private clearSelectedItem() {
        this._selectedItems = new Array<T>();
        this.notifyCurrentSelection();
    }

    private setSelectedItem(item: T) {
        this._selectedItems = new Array<T>();
        this._selectedItems.push(item);
        this.notifyCurrentSelection();
    }

    protected doCustomProcessing() {
        if ((this.selectionRequired == "true") && (this.items.length > 0)) {
            this.setSelectedItem(this.items[0]);
        }
    }
}