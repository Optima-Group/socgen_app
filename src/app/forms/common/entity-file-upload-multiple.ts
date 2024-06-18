import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Http } from '@angular/http';
import { EntityFileHttpService } from "app/services/http/common/entity-file.http.service";

@Component({
    selector: 'entity-file-upload-multiple',
    templateUrl: 'entity-file-upload-multiple.html',
    providers: [ EntityFileHttpService ]
})
export class EntityFileUploadMultiple {
    @Input() multiple: boolean = false;
    @Input() entityIds: Array<number> = new Array<number>();
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

        for (let index = 0; index < this.entityIds.length; index++) {
            const element = this.entityIds[index];

            let fi = this.fileInput.nativeElement;
             if (fi.files && fi.files[0]) {
                let fileToUpload = fi.files[0];
                this.entityFileHttpService
                    .upload(fileToUpload, element, this.entityTypeCode, this.info)
                    .subscribe(res => {
                        if((index + 1) === this.entityIds.length){
                        this.uploadFinished.emit(null);
                        this.fileInput.nativeElement.value = '';
                        }   
                        
                    });
             }
            
        }
        
    }
}