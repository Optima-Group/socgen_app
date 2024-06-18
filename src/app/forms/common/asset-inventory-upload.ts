import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FileUploader, FileItem } from 'ng2-file-upload';
import { AppConfig } from 'app/config';

@Component({
    selector: 'asset-inventory-upload',
    templateUrl: './asset-inventory-upload.html',
    styleUrls: ['./asset-inventory-upload.css']
})

export class AssetInventoryUpload implements OnInit {
    @Input() files: any[];

    public uploader: FileUploader;
    public hasBaseDropZoneOver: boolean = false;
    public baseUrl = AppConfig.urlPrefix;


    constructor(private changeDetector: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.initiliazeUploader();
    }

    public fileOverBase(e: any): void {
        this.hasBaseDropZoneOver = e;
      }

    public initiliazeUploader() {
        this.uploader = new FileUploader({
            url: this.baseUrl + 'assets/uploadInv',
            isHTML5: true,
            // allowedFileType: ['xslx'],
            allowedMimeType: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
            removeAfterUpload: true,
            autoUpload: false,
            maxFileSize: 10 * 1024 * 1024
        });

        this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
        this.uploader.onProgressItem = (file: FileItem, progress: any) => {
            this.changeDetector.detectChanges();
            return { file, progress };
          };

          this.uploader.onSuccessItem = (progress: any) => {
            alert('Datele au importate cu succes!');
          };
          this.uploader.onErrorItem = (progress: any) => {
            alert('Eroare la importul datelor!');
          };
    }
}
