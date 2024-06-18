import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { RoomDetail } from '../../../model/api/administration/room-detail';

import { RoomHttpService } from '../../../services/http/administration/room.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { LocationList } from "app/forms/administration/locations/location.list";
import { RoomDetail as RoomDetailUI } from "app/forms/administration/rooms/room.detail";
import { LocationHttpService } from "app/services/http/administration/location.http.service";
import { RoomList } from "app/forms/administration/rooms/room.list";
import { AppUtils } from "app/common/app.utils";
import { saveAs as fileSaveAs } from "file-saver";


@Component({
    selector: 'room-manage',
    templateUrl: 'room.manage.html',
    styleUrls: ['room.manage.scss'],
    providers: [ LocationHttpService, RoomHttpService, RoomDetailHttpService ]
})
export class RoomManage extends GenericManage<Room, number> {

    @ViewChild('roomDetailModal') roomDetailModal: ModalDirective;
    @ViewChild('roomList') roomList: RoomList;
    @ViewChild('roomDetail') roomDetail: RoomDetailUI;
    @ViewChild('locationListModal') locationListModal: ModalDirective;
    @ViewChild('locationList') locationList: LocationList;

    private filter: string = '';
    private selectedLocation: Location = null;

    constructor(private locationHttpService: LocationHttpService, private roomHttpService: RoomHttpService, 
        private roomDetailHttpService: RoomDetailHttpService) {

        super();
    }

    protected addNewItem() {
        super.addNewItem();

        this.roomDetail.location = null;
    }

    protected editItem() {
        super.editItem();

        let room: RoomDetail = this.selectedItem as RoomDetail;

        this.roomDetail.location = null;
        if (room != null) {
            this.locationHttpService
                .getById(room.location.id)
                .subscribe((location: Location) => {
                    this.roomDetail.location = location;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.roomDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.roomDetailModal.hide();
    }

    private onRoomDetailLocationNeeded() {
        this.roomDetailModal.hide();
        this.selectLocation();
    }

    private onLocationListCancel() {
        this.locationListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.roomDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("locationIds", AppUtils.getIdsList<Location, number>([ this.selectedLocation ])));

        this.roomList.refresh(params);
    }

    private selectLocation() {
        this.locationListModal.show();
        this.locationList.refresh(null);
    }

    private setSelectedLocation() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedLocation = this.locationList.selectedItem;
                this.locationListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.roomDetail.location = this.locationList.selectedItem;
                this.locationListModal.hide();
                this.roomDetailModal.show();
                break;
        }
    }

    private unselectLocation() {
        this.selectedLocation = null;
        this.refresh();
    }

    // private exportToExcel() {

    //      let params: Array<Param> = null;

    //     if ((this.filter != null) && (this.filter.length > 0)) {
    //         params = new Array<Param>();
    //         params.push(new Param('filter', this.filter));
    //     }

    //     this.roomDetailHttpService.get(1, 1000000, 'code', 'asc', params, null).subscribe(
    //         (data: PagedResult<Room>) => {

    //             let options = {
    //                 sheetid: 'Rooms',
    //                 headers: true,
    //                 column: { style: { Font: { Bold: '1' } } },
    //                 rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
    //                 cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
    //             };

    //             let res = alasql(`SELECT id as [Id],
    //                                 code as [Cod],
    //                                 name as [Denumire],
    //                                 location->name as [Localitate],
    //                                 region->name as [Judet]
    //                                 INTO XLSX("Rooms.xlsx",?) FROM ?`,[ options, data.items ]);

    //         });
    // }

    private getFilters(): Array<Param> {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('locationIds', AppUtils.getIdsList<Location, number>([this.selectedLocation])));

        return params;
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        params = this.getFilters();
        this.roomHttpService
            .export(params)
            .subscribe((blob) => {
                fileSaveAs(blob, 'Zones.xlsx');
            });
    }

}
