import { Component, EventEmitter, Input, Output, ViewContainerRef } from '@angular/core';
import { Http } from '@angular/http';
import { EntityFileHttpService } from '../../services/http/common/entity-file.http.service';
import { saveAs as fileSaveAs } from 'file-saver';
import { EntityFile } from '../../model/api/common/entity-file';
import { ToastsManager } from 'ng2-toastr';

@Component({
    selector: 'entity-file-delete',
    templateUrl: 'entity-file-delete.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileDelete {
    // @Input() entityFileId: number = 0;
    @Input() entityFile: EntityFile = null;

    @Output() protected deleteFinished = new EventEmitter<void>();

    constructor(
        private entityFileHttpService: EntityFileHttpService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef,
        ) { this.toastr.setRootViewContainerRef(vcr); }

    delete() {
        this.entityFileHttpService
            .deleteEntityFile(this.entityFile.id)
            .subscribe((res) => {
                if (res.statusCode === 200){
                    this.toastr.success('Fisierul a fost sters cu success!');
                    this.deleteFinished.emit(null);
               }else{
                    this.toastr.error('Eroare stergere fisier!');
                       // alert('Eroare import!');
               }
            }, (error) => {
                this.toastr.error('Eroare server!');
            });
    }
}