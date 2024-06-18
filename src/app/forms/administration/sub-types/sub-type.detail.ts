import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';

import { Location } from '../../../model/api/administration/location';
import { AppConfig } from 'app/config';
import { Region } from 'app/model/api/administration/region';
import { AdmCenter } from 'app/model/api/administration/adm-center';
import { MasterType } from 'app/model/api/assets/master-type';
import { Type } from 'app/model/api/administration/type';
import { SubType } from 'app/model/api/administration/sub-type';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { Param } from 'app/model/common/param';
import { EntityFileList } from 'app/forms/common/entity-file.list';
import { AssetImage, EntityFile } from 'app/model/api/common/entity-file';

@Component({
    selector: 'sub-type-detail',
    templateUrl: 'sub-type.detail.html',
    providers: [EntityFileHttpService],
    outputs: ['typeNeeded']
})
export class SubTypeDetail extends GenericDetail<SubType, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    @ViewChild('entityFileList') public entityFileList: EntityFileList;
    protected typeNeeded: EventEmitter<void> = new EventEmitter<void>();

    private selectedType: Type;
    private entityTypeCode: string = 'SUBTYPE';

    public imageCount: number = 0;
    public imageIndex: number = 0;
    public imageLoading: boolean = false;
    public assetImages: Array<AssetImage> = new Array<AssetImage>();
    public assetFiles: Array<EntityFile> = new Array<EntityFile>();
    public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

    constructor( private entityFileHttpService: EntityFileHttpService) {
        super();
        
    }

    setItemDefaultValues() {
        this.item = new SubType(0, '', '', null);
    }

    protected resetForm() {
        this.detailForm.reset();
    }

    protected saveItem() {
        if ((AppConfig.LOCATION_REGION_REQUIRED) && (this.selectedType == null)) {
            alert('Type este obligatoriu!');
        }
        else {
            super.saveItem();
        }
    }

    public set type(type: Type) {
        this.setType(type);
    }

    private setType(type: Type) {
        this.selectedType = type;
        this.item.typeId = type != null ? type.id : null;
    }

    private askForType() {
        this.typeNeeded.emit();
    }

    // private refreshEntityFiles() {
    //     let params: Array<Param> = new Array<Param>();
    //     params.push(new Param('entityTypeCode', 'SUBTYPE'));
    //     params.push(new Param('entityId', this.item.id.toString()));
    //     this.entityFileList.refresh(params);
            
    //     }


        private refreshEntityFiles(loadAssetImages: boolean) {
            this.entityFileHttpService.getByEntity('SUBTYPE', this.item.id)
            .subscribe((entityFiles: Array<EntityFile>) => {
                this.existingAssetImages.splice(0, this.existingAssetImages.length);
                this.assetImages.forEach((assetImage: AssetImage) => this.existingAssetImages.push(assetImage));
                this.assetImages.splice(0, this.assetImages.length);
                this.assetFiles.splice(0, this.assetFiles.length);
                // this.entityFileMemoryDataSource.clear();
                entityFiles.forEach((entityFile: EntityFile) => {
                    if (entityFile.fileType.startsWith('image/')) {
                        let fileContent: any = null;
                        this.existingAssetImages.forEach((assetImage: AssetImage) => {
                            console.log(JSON.stringify(assetImage));
                            if (assetImage.entityFile.id === entityFile.id) {
                                fileContent = assetImage.fileContent;
                            }
                        });
                        this.assetImages.push(new AssetImage(entityFile, fileContent));
                    }
                    else {
                        this.assetFiles.push(entityFile);
                        // this.entityFileMemoryDataSource.addItem(entityFile);
                    }
                });
               // this.fileList.refresh(null);
                if (loadAssetImages) this.loadAssetImages();
            });
        }

            private loadAssetImages() {
                        if ((this.assetImages !== null) && (this.assetImages.length > 0)) {
                            this.imageCount = this.assetImages.length;
                            this.imageIndex = 0;
                            this.imageLoading = true;
                            this.loadAssetImageLoop();
                        }
                    }

        private loadAssetImageLoop() {
                    if (this.assetImages.length > this.imageIndex) {
                        let assetImage: AssetImage = this.assetImages[this.imageIndex];
                        if (assetImage.fileContent === null) {
                            this.entityFileHttpService.download(assetImage.entityFile.id).subscribe((image) => {
                                this.createImageFromBlob(assetImage, image);
                                this.loadNextAssetImage();
                            });
                        }
                        else {
                            this.loadNextAssetImage();
                        }
                    }
                }

        private createImageFromBlob(assetImage: AssetImage, image: Blob) {
                    let reader = new FileReader();
                    reader.addEventListener('load', () => {
                    // this.images.push(reader.result);
                    assetImage.fileContent = reader.result;
                    console.log(assetImage);
                    }, false);
                    if (image) {
                    reader.readAsDataURL(image);
                    }
                }

        private loadNextAssetImage() {
                    if (this.imageIndex < (this.assetImages.length - 1)) {
                        this.imageIndex++;
                        this.loadAssetImageLoop();
                    }
                    else {
                        this.imageLoading = false;
                    }
                }

}
