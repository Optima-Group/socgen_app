
import { Component, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';

import { ModalDirective } from 'ng2-bootstrap/modal';

import { EmployeeHttpService } from '../../../services/http/administration/employee.http.service';
import { Location as NgLocation } from '@angular/common';
import { AppData } from 'app/app-data';
import { DocumentTypeDropDownList } from 'app/forms/documents/document-types/document-type.drop-down.list';
import { EntityFileList } from 'app/forms/common/entity-file.list';
import { AssetTypeDropDownList } from 'app/forms/assets/asset-types/asset-type.drop-down.list';
import { DocumentType } from '../../../model/api/documents/document-type';
import { Document } from '../../../model/api/documents/document';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { EmployeeUI } from 'app/model/api/administration/employee-detail.ui';
import { AssetComponentHttpService } from 'app/services/http/assets/asset-component.http.service';
import { AssetComponentList } from 'app/forms/assets/asset-components/asset-component.list';
import { Param } from 'app/model/common/param';
import { AssetOpHttpService } from 'app/services/http/assets/asset-op.http.service';
import { EntityFileHttpService } from 'app/services/http/common/entity-file.http.service';
import { AssetComponentOpDetailList } from 'app/forms/assets/asset-component-ops/asset-component-op.detail.list';
import { AssetComponentOpHttpService } from 'app/services/http/assets/asset-component-op.http.service';
import { AssetComponent } from 'app/model/api/assets/asset-component';
import { CodeNameEntity } from 'app/model/api/common/code-name-entity';
import { AssetComponentAdd } from 'app/model/api/assets/asset-component-add';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { AssetList } from 'app/forms/assets/assets/asset.list';
import { TabsetComponent } from 'ng2-bootstrap';
import { AssetTransferAdd } from 'app/model/api/assets/asset-transfer-add';
import { Asset } from 'app/model/api/assets/asset';
import { AssetEntityList } from 'app/forms/assets/assets/asset-entity.list';
import { AssetComponentTransferAdd } from 'app/model/api/assets/asset-component-transfer-add';
import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { AssetOpDetailList } from 'app/forms/assets/asset-ops/asset-op.detail.list';
import { DocumentTypeHttpService } from 'app/services/http/documents/document-type.http.service';
import { Operation } from 'app/model/api/documents/operation';
import { DocumentUpload } from 'app/model/api/documents/document-upload';
import { ZoneState } from 'app/model/api/assets/zone-state';
import { Employee } from 'app/model/api/administration/employee';
import { Room } from 'app/model/api/administration/room';
import { Uom } from 'app/model/api/assets/uom';
import { AppConfig } from 'app/config';
import { DocumentHttpService } from 'app/services/http/documents/document.http.service';
import * as decode from 'jwt-decode';
import { ZoneStateList } from 'app/forms/assets/zone-states/zone-state.list';
import { AssetDetailUI } from 'app/forms/assets/assets/asset.detail.ui';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { UomList } from 'app/forms/assets/uoms/uom.list';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';

@Component({
    selector: 'employee-detail-ui',
    templateUrl: 'employee.detail.ui.html',
    styleUrls: ['employee.detail.ui.scss'],
    // encapsulation: ViewEncapsulation.Emulated,
    providers: [AssetComponentHttpService, AssetOpHttpService, EntityFileHttpService, AssetHttpService, DocumentTypeHttpService, DocumentHttpService]
})
export class EmployeeDetailUI  {

    @ViewChild(TabsetComponent)
    staticTabs: TabsetComponent;
    @ViewChild('assetComponentDetailModal') public assetComponentDetailModal: ModalDirective;
    @ViewChild('assetComponentListModal') public assetComponentListModal: ModalDirective;
    @ViewChild('assetComponentList') public assetComponentList: AssetComponentList;

    @ViewChild('assetComponentAddListModal') public assetComponentAddListModal: ModalDirective;
    @ViewChild('assetComponentAddList') public assetComponentAddList: AssetComponentList;

    @ViewChild('assetComponentTransferDetailModal') public assetComponentTransferDetailModal: ModalDirective;
    @ViewChild('assetDetailModal') public assetDetailModal: ModalDirective;
    @ViewChild('assetEntityListModal') assetEntityListModal: ModalDirective;
    @ViewChild('assetEntityList') assetEntityList: AssetEntityList;

    @ViewChild('assetAddListModal') public assetAddListModal: ModalDirective;
    @ViewChild('assetAddList') public assetAddList: AssetEntityList;

    @ViewChild('assetComponentTransferAddListModal') public assetComponentTransferAddListModal: ModalDirective;
    @ViewChild('assetComponentTransferAddList') public assetComponentTransferAddList: AssetComponentList;

    @ViewChild('assetComponentOpDetailList') public assetComponentOpList: AssetComponentOpDetailList;
    @ViewChild('assetOpDetailList') public assetOpList: AssetOpDetailList;
    @ViewChild('entityFileList') public entityFileList: EntityFileList;

    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;
    @ViewChild('operationModal') public operationModal: ModalDirective;
    @ViewChild('assetTypeDropDownList') public assetTypeDropDownList: AssetTypeDropDownList;
    @ViewChild('documentTypeDropDownList') public documentTypeDropDownList: DocumentTypeDropDownList;

    @ViewChild('invStateList') private invStateList: InvStateList;
    @ViewChild('invStateListModal') private invStateListModal: ModalDirective;

    @ViewChild('uomList') private uomList: UomList;
    @ViewChild('uomListModal') private uomListModal: ModalDirective;

    @ViewChild('fileInput') fileInput;


    @ViewChild('zoneStateList') private zoneStateList: ZoneStateList;
    @ViewChild('zoneStateListModal') private zoneStateListModal: ModalDirective;



    @ViewChild('assetList') public assetList: AssetList;

    private selectedAssets: Array<any> = new Array<any>();
    private selectedFromAssets: Array<any> = new Array<any>();
    private uomListSelectedItem: Uom = null;
    private invStateListSelectedItem: InvState = null;
    private employeeId: number = 0;
    private employeeUI: EmployeeUI = new EmployeeUI();
    private selectedAssetComponent: any;
    private selectedAsset: any;
    private selectedAssetComponentOp: any;
    private selectedAssetOp: any;
    private assetComponent: CodeNameEntity = null;
    private asset: CodeNameEntity = null;
    private assetComponentTransfer: CodeNameEntity = null;
    private operationType: OperationType = OperationType.NotSet;
    private confirmationMessage: string = '';
    private operationMessage = 'Doriti sa descarcati PV- ul in format .pdf ?';
    private showMoveToStocksBtn = false;
    private showTransferBtn = false;
    private invStateId: number;
    private invState: string = 'Asset States';
    private invStates: Array<InvState> = new Array<InvState>();
    showBtnEmail = true;

    // private selectedDocumentType: DocumentType = null;
    private selectedZoneState: ZoneState = null;
    private selectedEmployee: Employee = null;
    private selectedRoom: Room = null;
    private selectedInvState: InvState = null;
    private selectedUom: Uom = null;
    private selectedValue: number = 0;

    private enableZoneState: boolean = false;
    private requireZoneState: boolean = false;
    private documentSaved: boolean = false;
    private enableTempTransfer: boolean = false;
    private requireTempTransfer: boolean = false;
    private startFromDate: Date;
    private startToDate: Date;
    private documentDate: Date;
    private registerDate: Date;
    private validData: boolean = false;

    private requireInfo: boolean = false;

    private enableEmployee: boolean = false;
    private requireEmployee: boolean = false;
    private enableRoom: boolean = false;
    private requireRoom: boolean = false;

    private enableInvState: boolean = false;
    private requireInvState: boolean = false;
    private enableValue: boolean = false;
    private requireValue: boolean = false;
    private enableUom: boolean = false;
    private requireUom: boolean = false;

    private enableInfo: boolean = false;

    message = '';
    info = '';
    private documentInfo: string = '';
    private serialNumber: string = '';
    isNew = false;
    isNewIT = false;
    assetIdNew = 0;
    assetIdITNew = 0;
    private documentId = 0;
    isOK = true;


    showSendEmailButton: boolean = true;
    showAdmBtn = true;
    showEmpBtn = true;
    showRoomBtn = true;
    showCCBtn = true;
    showBMBtn = true;
    showDimBtn = true;

    showSaveButton: boolean = false;

   private get isAdmin(): boolean { return AppData.UserIsAdmin; }

    constructor(
        private ngLocation: NgLocation,
        private route: ActivatedRoute,
        private router: Router,
        private employeeHttpService: EmployeeHttpService,
        private assetComponentHttpService: AssetComponentHttpService,
        private assetHttpService: AssetHttpService,
        private invStateHttpService: InvStateHttpService,
        private uomHttpService: UomHttpService,
        private assetComponentOpHttpService: AssetComponentOpHttpService,
        private assetOpHttpService: AssetOpHttpService,
        private entityFileHttpService: EntityFileHttpService,
        private documentTypeHttpService: DocumentTypeHttpService,
        private documentHttpService: DocumentHttpService,
        private toastr: ToastsManager,
        private vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                // let id: number = +params['id'];
                this.employeeId = +params['id'];
            }
        });
    }

    ngAfterViewInit() {
        if (this.employeeId > 0) {
            this.employeeHttpService.getDetailById(this.employeeId)
                .subscribe((employeeUI: EmployeeUI) => {
                       this.updateDetails(employeeUI);
                       this.refreshAssets();
                       this.refreshAssetComponents();
                       this.refreshAssetComponentOperations();
                       this.refreshAssetOperations();
                       // this.refreshDocumentTypes();
                       // this.refreshEntityFiles();

                       this.uomHttpService.getById(259).subscribe((res: Uom) => {
                        if (res != null) {
                            this.selectedUom = res;
                        }
                    });
                });
        }
        this.staticTabs.tabs[2].active = true;
    }


    private refreshDocumentTypes() {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('parentCode', 'ASSET'));

        this.documentTypeDropDownList.refresh(params);
    }

    private onAssetSelectionChanged(assets: Array<any>) {
        // console.log('CLICK');
        this.selectedAssets = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedAssets.push(asset);
        });

        // this.refreshAssetRecoList();
    }

    // private setSelectedDocumentType(documentTypes: Array<DocumentType>) {
    //     this.selectedDocumentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
    //     this.updateRequiredData(this.selectedDocumentType);
    // }

    private updateRequiredData(documentType: DocumentType) {

        this.resetOptions();

        if (documentType != null) {
            let maskParts: string[] = documentType.mask.split(';');

            // console.log(JSON.stringify(maskParts));

            maskParts.forEach((maskPart: string) => {

                if (!this.enableUom && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_UOM)) {
                    this.enableUom = true;
                    this.requireUom = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableEmployee && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_EMPLOYEE)) {
                    // console.log('check for employee');
                    this.enableEmployee = true;
                    // this.requireEmployee = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                    this.requireEmployee = true;
                    this.enableInfo = false;
                }

                if (!this.enableInvState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_INVSTATE)) {
                    this.enableInvState = true;
                    this.requireInvState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                    // console.log(this.validData);
                }

                if (!this.enableInfo && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_INFO)) {
                    this.enableInfo = true;
                    this.requireInfo = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                    // console.log(this.validData);
                }

                if (!this.enableZoneState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ZONESTATE)) {
                    this.enableZoneState = true;
                    this.enableRoom = false;
                    this.requireZoneState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                    // console.log(this.validData);
                }

                if (!this.enableTempTransfer && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_TEMP)) {
                    this.enableTempTransfer = true;
                    this.enableEmployee = true;
                    this.requireTempTransfer = true;
                }

                if (!this.enableRoom && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ROOM)) {
                    this.enableRoom = true;
                    this.requireRoom = true;
                }

                if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_VALUE)) {
                    this.enableValue = true;
                    this.requireValue = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableValue && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ALL)) {
                    this.enableEmployee = true;
                    this.enableInvState = true;
                    this.enableZoneState = true;
                    this.enableRoom = true;
                    this.enableValue = true;
                }
            });
        }

        this.updateValidData();
    }


    private updateValidData(): void {
        this.validData = (this.selectedAsset != null) && (this.selectedAsset.length > 0) && (!this.documentSaved) &&
            ((this.selectedZoneState != null && (this.selectedZoneState.id === 3 || this.selectedZoneState.id === 4)) || (this.selectedEmployee != null && this.selectedZoneState != null) || (this.selectedRoom != null) || (this.selectedInvState != null) || (this.selectedValue !== 0))
            && ((!this.requireInvState) || ((this.requireInvState) && (this.selectedInvState != null)))
            && ((!this.requireUom) || ((this.requireUom) && (this.selectedUom != null)))
            && ((!this.requireZoneState) || ((this.requireZoneState) && (this.selectedZoneState != null)))
            && ((!this.requireTempTransfer) || ((this.requireTempTransfer && this.selectedEmployee != null) && ((this.startFromDate !== undefined) && (this.startToDate !== undefined))))
            && ((!this.requireValue) || ((this.requireValue) && (this.selectedValue !== 0)));

            if(this.enableInfo) {
                this.validData = true;
            }
    }


    private saveToEmployeeDocument() {

        if (confirm(`Doriti sa initializati transferul?`)) {
            let document: Document = null;
            let operation: Operation = null;
            let operations: Array<Operation> = null;
            let documentUpload: DocumentUpload = null;
            let employeeId: number = null;
            let roomId: number = null;
            let costCenterId: number = null;
            let budgetManagerId: number = null;
            let projectId: number = null;
            let dimensionId: number = null;
            let administrationId: number = null;
            let invStateId: number = null;
            let uomId: number = null;
            let zoneStateId: number = null;
            let fromDate = new Date();
            let toDate = new Date();
            let info = '';

            this.documentSaved = true;
            this.updateValidData();

            this.documentDate = new Date();
            this.registerDate = new Date();



            document = new Document(0, 2, '', '', this.documentDate, this.registerDate, false, this.documentInfo, this.serialNumber, fromDate, toDate);

            if (this.selectedInvState != null) invStateId = this.selectedInvState.id;
            if (this.selectedUom != null) uomId = this.selectedUom.id;

            operations = new Array<Operation>();
            this.selectedAssets.forEach((asset) => {
                if(asset != null && asset.adm.room != null && asset.adm.room.id == 1512){
                    this.isNewIT = true;
                    this.assetIdITNew = asset.id;
                }
                if(asset.adm != null && asset.adm.room != null && asset.adm.room.id == 1576){
                    this.isNew = true;
                    this.assetIdNew = asset.id;
                }
                operation = new Operation(0, asset.id, false, administrationId, costCenterId, budgetManagerId, projectId, dimensionId, this.employeeId, this.invStateId, null, null, roomId, invStateId, uomId, 1, info, asset.adm.employee != null ? asset.adm.employee.id: 0);
                operations.push(operation);

            });

            // documentUpload = new DocumentUpload(document, operations, null, null);
            documentUpload = new DocumentUpload();
            documentUpload.id = document.id;
            documentUpload.documentTypeId = document.documentTypeId;
            documentUpload.docNo1 = document.docNo1;
            documentUpload.docNo2 = document.docNo2;
            documentUpload.documentDate = document.documentDate;
            documentUpload.registerDate = document.registerDate;
            documentUpload.validated = document.validated;
            documentUpload.details = document.details;
            documentUpload.serialNumber = document.serialNumber;
            documentUpload.fromDate = fromDate;
            documentUpload.toDate = toDate;


            documentUpload.operations = operations;

            this.documentHttpService.saveFullDocument(documentUpload).subscribe((data) => {
                // alert('The operation was saved successfully');
                // this.router.navigate(['/assetinvdetails']);
                this.documentId = data;
                // alert(this.documentId);
                if(documentUpload.documentTypeId != 20) {
                    this.generateBook()
                }else {
                    this.showSaveButton = true;
                    this.router.navigate(['/assetinvdetails']);
                }

            });
        }
    }

    private saveFromEmployeeDocument(zoneStateId: number) {

        let document: Document = null;
        let operation: Operation = null;
        let operations: Array<Operation> = null;
        let documentUpload: DocumentUpload = null;
        let employeeId: number = null;
        let roomId: number = null;
        let costCenterId: number = null;
        let budgetManagerId: number = null;
        let projectId: number = null;
        let dimensionId: number = null;
        let administrationId: number = null;
        let invStateId: number = null;
        let uomId: number = null;
        let fromDate = new Date();
        let toDate = new Date();
        let info = '';

        this.documentSaved = true;
        this.updateValidData();

        this.documentDate = new Date();
        this.registerDate = new Date();



        document = new Document(0, 2, '', '', this.documentDate, this.registerDate, false, this.documentInfo, this.serialNumber, fromDate, toDate);

        if (this.selectedInvState != null) invStateId = this.selectedInvState.id;
        if (this.selectedUom != null) uomId = this.selectedUom.id;

        operations = new Array<Operation>();
        this.selectedFromAssets.forEach((asset) => {
            if(asset != null && asset.room != null && asset.room.id == 1512){
                this.isNewIT = true;
                this.assetIdITNew = asset.id;
            }
            if(asset.room != null && asset.room.id == 1576){
                this.isNew = true;
                this.assetIdNew = asset.id;
            }
            operation = new Operation(0, asset.id, false, administrationId, costCenterId, budgetManagerId, projectId, dimensionId, this.employeeId, invStateId, null, null, roomId, invStateId, uomId, zoneStateId, info, asset.employee != null ? asset.employee.id: 0);
            operations.push(operation);

        });

        // documentUpload = new DocumentUpload(document, operations, null, null);
        documentUpload = new DocumentUpload();
        documentUpload.id = document.id;
        documentUpload.documentTypeId = document.documentTypeId;
        documentUpload.docNo1 = document.docNo1;
        documentUpload.docNo2 = document.docNo2;
        documentUpload.documentDate = document.documentDate;
        documentUpload.registerDate = document.registerDate;
        documentUpload.validated = document.validated;
        documentUpload.details = document.details;
        documentUpload.serialNumber = document.serialNumber;
        documentUpload.fromDate = fromDate;
        documentUpload.toDate = toDate;


        documentUpload.operations = operations;

        this.documentHttpService.saveFullDocument(documentUpload).subscribe((data) => {
            // alert('The operation was saved successfully');
            // this.router.navigate(['/assetinvdetails']);
            this.documentId = data;
            // alert(this.documentId);
            if(documentUpload.documentTypeId != 20) {
                this.generateBook()
            }else {
                this.showSaveButton = true;
                this.router.navigate(['/assetinvdetails']);
            }

        });
    }


    private generateBook () {
        this.operationType = OperationType.Operation;
        this.operationModal.show();
    }

    private newTab(documentId: number) {
      const token = localStorage.getItem('id_token');
      const tokenPayload = decode(token);
      const userId = tokenPayload.sub;

      let reportType: string = 'MOVEMENTPROVIDING';

      window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${documentId}&reportId=${userId}`);
      this.showSaveButton = true;

      // if(this.isNew){
      // window.open(`${AppConfig.reportingServer}Report.aspx/?report=pifReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}`);
      // this.showSaveButton = true;
      // }

      // if(this.isNewIT){
      // window.open(`${AppConfig.reportingServer}Report.aspx/?report=pifitReport&reportId=${userId}&assetId=${this.assetList.selectedItem.id}`);
      // this.showSaveButton = true;
      // }

      this.router.navigate(['/assetinvdetails']);
  }

  private newPIFTab(documentId: number) {
      const token = localStorage.getItem('id_token');
      const tokenPayload = decode(token);
      const userId = tokenPayload.sub;

      window.open(`${AppConfig.reportingServer}Report.aspx/?report=pifReport&reportId=${userId}&assetId=${this.assetIdNew}`);
      this.showSaveButton = true;
  }

  private newPIFITTab(documentId: number) {
      const token = localStorage.getItem('id_token');
      const tokenPayload = decode(token);
      const userId = tokenPayload.sub;
      window.open(`${AppConfig.reportingServer}Report.aspx/?report=pifitReport&reportId=${userId}&assetId=${this.assetIdITNew}`);
      this.showSaveButton = true;

  }

  private newTabScrab(documentId: number) {
    let reportType: string = 'SCRAB';
    window.open(`${AppConfig.reportingServer}Report.aspx/?report=${reportType}&documentId=${documentId}`);
    this.showSaveButton = true;
    this.router.navigate(['/assetinvdetails']);

  }

    private onOperationApproved (confirm: string) {
      if (confirm === 'YES') {
        setTimeout(() => {
            if(this.isNew){
                this.newPIFTab(this.documentId);
            }
            if(this.isNewIT){
                this.newPIFITTab(this.documentId);
            }
            this.newTab(this.documentId);
        }, 0);

      } else {
          this.showSaveButton = true;
          this.showSendEmailButton = false;
          this.router.navigate(['/assetinvdetails']);
      }

      this.showAdmBtn = false;
      this.showEmpBtn = false;
      this.showRoomBtn = false;
      this.showCCBtn = false;
      this.showBMBtn = false;
      this.showDimBtn = false;

      this.operationType = OperationType.NotSet;
      this.confirmationModal.hide();
  }

    private onOperationCanceled() {
      this.operationType = OperationType.NotSet;
      this.confirmationModal.hide();
  }

      private resetOptions() {
          this.enableUom = false;
          this.enableEmployee = false;
          this.enableInvState = false;
          this.enableInfo = false;
          this.enableZoneState = false;
          this.enableRoom = false;
          this.enableValue = false;
          this.enableTempTransfer = false;
          this.requireUom = false;
          this.requireInvState = false;
          this.requireZoneState = false;
          this.requireValue = false;
          this.requireTempTransfer = false;

          this.validData = false;
      }


    private updateDetails(employeeUI: EmployeeUI) {
        this.employeeUI.id = employeeUI.id;
        this.employeeUI.internalCode = employeeUI.internalCode;
        this.employeeUI.firstName = employeeUI.firstName;
        this.employeeUI.lastName = employeeUI.lastName;

    }


     private cancelChanges() {
        this.router.navigate(['/employees'])
    }

    private onAssetListSelectionChanged(assets: Array<any>) {
        // this.selectedAsset = this.assetList.selectedItem;
        this.selectedFromAssets = new Array<any>();
        assets.forEach((asset: any) => {
            this.selectedFromAssets.push(asset);
        });
        this.showTransferBtn = true;
    }


    private onAssetComponentListSelectionChanged(assetComponents: Array<any>) {
        this.selectedAssetComponent = this.assetComponentList.selectedItem;
        this.showMoveToStocksBtn = true;
    }


    private onAssetComponentOpDetailListSelectionChanged(assetComponentOpDetails: Array<any>) {
        this.selectedAssetComponentOp = this.assetComponentOpList.selectedItem;
    }

    private onAssetOpDetailListSelectionChanged(assetOpDetails: Array<any>) {
      this.selectedAssetOp = this.assetOpList.selectedItem;
  }


    private refreshAssets(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('employeeId', this.employeeId.toString()));
        this.assetList.refresh(params);
    }

    private refreshAssetComponents(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('employeeId', this.employeeId.toString()));
        this.assetComponentList.refresh(params);
    }

    private refreshAssetComponentOperations(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('employeeId', this.employeeId.toString()));
        this.assetComponentOpList.refresh(params);

    }

    private refreshAssetOperations(){
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('employeeId', this.employeeId.toString()));
        this.assetOpList.refresh(params);

    }

    private refreshEntityFiles(){
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('entityTypeCode', 'ASSETCOMPONENT'));
        params.push(new Param('entityId', this.employeeId.toString()));

        this.entityFileList.refresh(params);
    }

      /* ASSET COMPONENT */

      private selectAssetComponent() {
        this.assetComponentAddList.refresh(null);
        this.assetComponentAddListModal.show();
    }


    private setSelectedAssetComponent() {

        let items: Array<any> = this.assetComponentAddList.selectedItems;
        this.assetComponent = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetComponentAddListModal.hide();

        let aIds: number[] = new Array<number>();
        let assetComponentsIds: AssetComponentAdd = new AssetComponentAdd();
        items.forEach(item => {
            // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
            let index: number = aIds.indexOf(item.id);
            if (index < 0) aIds.push(item.id);
        });

        assetComponentsIds.assetComponentIds = aIds;
        assetComponentsIds.employeeId = this.employeeId;

        this.assetComponentHttpService.addAssetComponentByEmployee(assetComponentsIds).subscribe( (res) => {
                if (res.statusCode === 200) {
                    this.toastr.success('Datele au fost salvate cu success!');
                    this.assetComponentList.refresh(null);
                    this.assetComponentOpList.refresh(null);
                    this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
                } else if (res.statusCode === 404) {
                    this.toastr.error('Accesorul nu exista!');
                    this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
                }
        }, (error) => {
            this.toastr.error('Save error!!');
            this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
        });



    }

    private assetComponentAdded(assetComponent: AssetComponent) {
        this.assetComponent = assetComponent;
        this.assetComponentDetailModal.hide();
    }
    private assetComponentAddCanceled() {
        this.assetComponentDetailModal.hide();
    }

    private closeAssetComponent() {
        this.assetComponentAddList.selectedItems = new Array<AssetComponent>();
        this.assetComponentAddListModal.hide();
    }

    /* ASSET COMPONENT */

     /* ASSET COMPONENT TRANSFER */

     private selectAssetComponentTransfer() {
        this.assetComponentTransferAddList.refresh(null);
        this.assetComponentTransferAddListModal.show();
        this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });
    }


    private setSelectedAssetComponentTransfer() {

        let items: Array<any> = this.assetComponentTransferAddList.selectedItems;
        let itemSelected: Array<any> = this.assetComponentList.selectedItems;
        this.assetComponentTransfer = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetComponentTransferAddListModal.hide();

        let aOldIds: number[] = new Array<number>();
        let aNewIds: number[] = new Array<number>();
        let assetsIds: AssetComponentTransferAdd = new AssetComponentTransferAdd();
        items.forEach(item => {
            // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
            let index: number = aNewIds.indexOf(item.id);
            if (index < 0) aNewIds.push(item.id);
        });

        itemSelected.forEach(item => {
            // aIds.indexOf(item.id) !== -1 ? aIds.push(item.id) : '';
            let index: number = aOldIds.indexOf(item.id);
            if (index < 0) aOldIds.push(item.id);
        });

        assetsIds.assetComponentOldIds = aOldIds;
        assetsIds.assetComponentNewIds = aNewIds;
        assetsIds.employeeId = this.employeeId;
        assetsIds.invStateId = this.invStateId;

        this.assetComponentHttpService.addAssetByEmployee(assetsIds).subscribe( (res) => {
                if (res.statusCode === 200) {
                    this.toastr.success('Datele au fost salvate cu success!');
                    this.assetComponentList.refresh(null);
                    this.assetComponentOpList.refresh(null);
                    this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
                } else if (res.statusCode === 404) {
                    this.toastr.error('Accesorul nu exista!');
                    this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
                }
        }, (error) => {
            this.toastr.error('Save error!!');
            this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
        });



    }

    private assetComponentTransferAddCanceled() {
        this.assetComponentTransferDetailModal.hide();
    }

    private closeAssetComponentTransfer() {
        this.assetComponentTransferAddList.selectedItems = new Array<AssetComponent>();
        this.assetComponentTransferAddListModal.hide();
    }

    /* ASSET COMPONENT TRANSFER */

    // SELECTED ZONE //

    private selectZoneState() {
        this.isOK = true;
        this.zoneStateList.refresh(null);
        this.zoneStateListModal.show();
    }

    // SELECTED ZONE //


     /* ASSET */

     private selectAsset() {
        this.assetAddList.refresh(null);
        this.assetAddListModal.show();
        this.invStateHttpService.get(0, 0, null, null, null).subscribe((res: any) => { this.invStates = res; });
    }


    private setSelectedAsset() {


        let items: Array<any> = this.assetAddList.selectedItems;
        let itemSelected: Array<any> = this.assetList.selectedItems;
        this.asset = ((items != null) && (items.length === 1)) ? items[0] : null;
        this.assetAddListModal.hide();

        let aOldIds: number[] = new Array<number>();
        let aNewIds: number[] = new Array<number>();
        let assetsIds: AssetTransferAdd = new AssetTransferAdd();
        items.forEach(item => {
            let index: number = aOldIds.indexOf(item.id);
            if (index < 0) aOldIds.push(item.id);
        });

        itemSelected.forEach(item => {
            let index: number = aNewIds.indexOf(item.id);
            if (index < 0) aNewIds.push(item.id);
        });

        assetsIds.assetOldIds = aOldIds;
        assetsIds.assetNewIds = aNewIds;
        assetsIds.employeeId = this.employeeId;
        assetsIds.invStateId = this.invStateId;

        this.assetHttpService.addAssetByEmployee(assetsIds).subscribe( (res) => {
                if (res.statusCode === 200) {
                    this.toastr.success('Datele au fost salvate cu success!');
                    this.assetList.refresh(null);
                    this.assetComponentOpList.refresh(null);
                    this.assetAddList.selectedItems = new Array<Asset>();
                } else if (res.statusCode === 404) {
                    this.toastr.error('Accesorul nu exista!');
                    this.assetAddList.selectedItems = new Array<Asset>();
                }
        }, (error) => {
            this.toastr.error('Save error!!');
            this.assetAddList.selectedItems = new Array<Asset>();
        });



    }

    private assetAddCanceled() {
        this.assetDetailModal.hide();
    }

    private closeAsset() {
        this.assetAddList.selectedItems = new Array<Asset>();
        this.assetAddListModal.hide();
    }

    /* ASSET */

    private onTransferAssetIT() {
        this.operationType = OperationType.TransferAssetIT;
        this.confirmationMessage = 'Are you sure?';
        this.confirmationModal.show();
    }

    private onTransferAssetNONTIT() {
        this.operationType = OperationType.TransferAssetNONTIT;
        this.confirmationMessage = 'Are you sure?';
        this.confirmationModal.show();
    }

    private onDeleteAssetComponentOp() {
        this.operationType = OperationType.DeleteAssetComponentOp;
        this.confirmationMessage = 'Stergeti operatia selectata?';
        this.confirmationModal.show();
    }

    private deleteAssetComponent() {
        this.assetComponentHttpService.deleteAssetComponent(this.assetComponentList.selectedItem.id)
        .subscribe((res) => {
            if (res.statusCode === 200) {
                this.toastr.success('The operation was completed successfully!');
                this.assetComponentOpList.refresh(null);
                this.assetComponentList.refresh(null);
            } else if (res.statusCode === 404) {
                this.toastr.error('Save error!');
            }
        }, (error) => {
            this.toastr.error('Server error!!');
        });
    }

    private deleteAssetComponentOp() {
        this.assetComponentOpHttpService.deleteAssetComponentOp(this.assetComponentOpList.selectedItem.id)
            .subscribe((res) => {
                if (res.statusCode === 200) {
                    this.toastr.success('The operation was completed successfully!');
                    this.assetComponentOpList.refresh(null);
                    this.assetComponentList.refresh(null);
                } else if (res.statusCode === 404) {
                    this.toastr.error('Save error!');
                }
            }, (error) => {
                this.toastr.error('Server error!!');
            });
    }

    private onConfirmationApproved() {

        switch (this.operationType) {
            case OperationType.TransferAssetIT:
                this.saveFromEmployeeDocument(3);
                break;
            case OperationType.TransferAssetNONTIT:
                this.saveFromEmployeeDocument(5);
                break;
            case OperationType.DeleteAssetComponentOp:
                this.deleteAssetComponentOp();
                break;
            default:
                break;
        }

        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    private onConfirmationCanceled() {
        this.operationType = OperationType.NotSet;
        this.confirmationModal.hide();
    }

    private changeTab(type, e){
        // if (!e.tabset){
        //     return;
        // }else{
        //     if (e.heading === 'Fisiere' || e.heading === 'Eticheta') {
        //         this.showDeleteScan = false;
        //     }else{
        //         this.showDeleteScan = true;
        //     }
        // }

        if (e.heading === 'Active') {
           this.showMoveToStocksBtn = false;
           if (this.assetList.selectedItems.length > 0) {
               this.showTransferBtn = true;
           }
        } else if (e.heading === 'Accesorii') {
            this.showTransferBtn = false;
            if (this.assetComponentList.selectedItems.length > 0) {
                this.showMoveToStocksBtn = true;
            }
        }  else if (e.heading === 'Operatii') {
            this.showMoveToStocksBtn = false;
            this.showTransferBtn = false;
       }

     }

       private sendEmail() {
        this.employeeHttpService.sendEmail(this.employeeId) .subscribe((res) => {
            if (res === true) {
                this.toastr.success('Mailul a fost trimis cu success!');
            } else if (res === false) {
                this.toastr.error('Eroare trimitere mail');
            }
        }, (error) => {
            this.toastr.error('Server error!!');
        });
    }

    private sendBookEmail() {
      if(confirm('Esti sigur ca vrei sa trimiti emailul?')){
        this.employeeHttpService.sendBookEmail(this.employeeId) .subscribe((res) => {
          if (res === true) {
              this.toastr.success('Mailul a fost trimis cu success!');
          } else if (res === false) {
              this.toastr.error('Eroare trimitere mail');
          }
      }, (error) => {
          this.toastr.error('Server error!!');
      });
    }

    }


    private sendBookEmailPreview() {
      this.employeeHttpService.sendBookEmailPreview(this.employeeId) .subscribe((res) => {
          this.message = res._body;
      }, (error) => {
          this.toastr.error('Server error!!');
      });
  }

    private onInvStateUpdate(invStateId: number, invStateName: string) {
        this.invStateId = invStateId;
        this.invState = invStateName ;
    }

    private checkInventory() {
        this.showBtnEmail = false;
        if(confirm('Are you sure?')){
            this.employeeHttpService.checkInventory(this.employeeId).subscribe((res) => {
                if(res) {
                    alert('The email was successfully sent!');
                    this.showBtnEmail = true;
                }
            });
        };
    }

    private selectInvState() {
        this.invStateList.refresh(null);
        this.invStateListModal.show();
    }

    private setSelectedInvState() {
        this.selectedInvState = this.invStateListSelectedItem;
        this.invStateListModal.hide();
        this.updateValidData();
    }

    private setInvStateListSelectedItem(invStates: Array<InvState>) {
        this.invStateListSelectedItem = invStates != null && invStates.length === 1 ? invStates[0] : null;
    }


    private setUomListSelectedItem(uoms: Array<Uom>) {
        this.uomListSelectedItem = uoms != null && uoms.length === 1 ? uoms[0] : null;
    }

    private selectUom() {
        this.uomList.refresh(null);
        this.uomListModal.show();
    }

    private setSelectedUom() {
        this.selectedUom = this.uomListSelectedItem;
        this.uomListModal.hide();
        this.updateValidData();
    }

}

enum OperationType {
    NotSet = 1,
    AssetComponentalidation = 2,
    TransferAssetIT = 3,
    TransferAssetNONTIT = 3,
    DeleteAssetComponentOp = 4,
    Operation = 5,
}
