import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Http } from '@angular/http';
import { EntityFileHttpService } from "app/services/http/common/entity-file.http.service";
import { saveAs as fileSaveAs } from "file-saver";
import { EntityFile } from "app/model/api/common/entity-file";

@Component({
    selector: 'entity-file-download',
    templateUrl: 'entity-file-download.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileDownload {
    //@Input() entityFileId: number = 0;
    @Input() entityFile: EntityFile = null;

    @Output() protected downloadFinished = new EventEmitter<void>();

    constructor(private entityFileHttpService: EntityFileHttpService) {}

    download() {
        this.entityFileHttpService
            .download(this.entityFile.id)
            .subscribe((blob) => {
                // this.downloadFinished.emit(null);
                // console.log(JSON.stringify(res));
                // console.log('download finished!');

                //this.downloadFile(res);
                fileSaveAs(blob, this.entityFile.name);
            });
    }
}