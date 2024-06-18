import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { GenericManage } from 'app/forms/generic/generic.manage';
import { Param } from 'app/model/common/param';
import { PagedResult } from 'app/model/common/paged-result';
import { SyncStatus } from 'app/model/api/administration/sync-status';
import { SyncStatusHttpService } from 'app/services/http/administration/sync-status.http.service';

@Component({
    selector: 'sync-status-manage',
    templateUrl: 'sync-status.manage.html',
    providers: [ SyncStatusHttpService ]
})
export class SyncStatusManage extends GenericManage<SyncStatus, number> {

     @ViewChild('itemDetailModal') modal: ModalDirective;

     @Output() protected uploadFinished = new EventEmitter<void>();

    private filter: string = '';
    private reportTypeName: string = 'All';
    private reportTypeCode: string = 'ALL';

    private fileEvent: any = null;

    @ViewChild('fileInput') fileInput: ElementRef;

    constructor(private syncStatusHttpService: SyncStatusHttpService) {
        super();
    }

     protected detailInitialize() {
        this.modal.show();
    }

    protected detailTerminate() {
        this.modal.hide();
    }

    private exportToExcel() {

        let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.syncStatusHttpService.get(1, 1000000, 'name', 'asc', params, null).subscribe(
            (data: PagedResult<SyncStatus>) => {

                let options = {
                    sheetid: 'Tari',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                alasql(`SELECT id as [Id],
                    name as [Denumire]
                    INTO XLSX('tari.xlsx',?) FROM ?`, [ options, data.items ]);

            });
    }

    private onReportTypeUpdate(reportTypeCode: string) {
        this.reportTypeCode = reportTypeCode;

        switch (this.reportTypeCode) {
            case 'ALL':
                this.reportTypeName = 'All';
                break;
            case 'GETDIMENSIONRUNCHANGE':
                this.reportTypeName = 'GETDIMENSIONRUNCHANGE';
                break;
            case 'GETDIMENSIONBUGETLINE':
                this.reportTypeName = 'GETDIMENSIONBUGETLINE';
                break;
            case 'GETDIMENSIONPROJECT':
                this.reportTypeName = 'GETDIMENSIONPROJECT';
                break;
            case 'GETDIMENSIONSITE':
                this.reportTypeName = 'GETDIMENSIONSITE';
                break;
            case 'GETITEM':
                this.reportTypeName = 'GETITEM';
                break;
            case 'GETPARTNER':
                this.reportTypeName = 'GETPARTNER';
                break;
            case 'GETDIMENSIONANALYSISCENTER':
                this.reportTypeName = 'GETDIMENSIONANALYSISCENTER';
                break;
            case 'GETDIMENSIONEMPLOYEE':
                this.reportTypeName = 'GETDIMENSIONEMPLOYEE';
                break;
            case 'GETDIMENSIONPODATA':
                this.reportTypeName = 'GETDIMENSIONPODATA';
                break;
            case 'TRANSFER_SAME_ADMCENTER':
                this.reportTypeName = 'Transferuri in aceasi Locatie';
                break;
            case 'TRANSFER_DIFF_ADMCENTER':
                this.reportTypeName = 'Transferuri intre AssetTypes';
                break;
            default :
                break;
        }
    }

    private loadFile(ev) {
        this.fileEvent = ev;
    }

    private upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.syncStatusHttpService
                .import(fileToUpload, this.reportTypeCode)
                .subscribe(res => {
                     // alert(res);
                     if(res != null && res.id > 0){
                        alert('Fisierul a fost importat cu success'!);
                        this.uploadFinished.emit(null);
                        this.reportTypeCode = 'All';
                     } else{
                        alert('Eroare import'!);
                        this.uploadFinished.emit(null);
                        this.reportTypeCode = 'All';
                     }
                }, (error) => {
                    alert('Eroare: ' + error);
                    this.reportTypeCode = 'All';
                });
        }
    }
}
