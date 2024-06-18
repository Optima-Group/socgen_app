import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { EntityFileHttpService } from "app/services/http/common/entity-file.http.service";

@Component({
    selector: 'entity-file-upload',
    templateUrl: 'entity-file-upload.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileUpload {
    @Input() multiple: boolean = false;
    @Input() entityId: number = 0;
    @Input() entityTypeCode: string = '';
    @Input() info: string = '';

    @Output() protected uploadFinished = new EventEmitter<void>();

    @ViewChild('fileInput') fileInput: ElementRef;
    //private info: string = '';

    constructor(private entityFileHttpService: EntityFileHttpService) {}

    private get allowUpload(): boolean {
        // let fi = this.fileInput.nativeElement;

        // console.log(this.entityId);
        // console.log(this.entityTypeCode);

        // return this.entityId > 0 && this.entityTypeCode != null && this.entityTypeCode.length > 0 && fi.files && fi.files[0];

        return true;
    }

    upload() {
        let fi = this.fileInput.nativeElement;
        if (fi.files && fi.files[0]) {
            let fileToUpload = fi.files[0];
            this.entityFileHttpService
                .upload(fileToUpload, this.entityId, this.entityTypeCode, this.info)
                .subscribe(res => {
                    this.uploadFinished.emit(null);
                    this.fileInput.nativeElement.value = '';
                });
        }
    }
}