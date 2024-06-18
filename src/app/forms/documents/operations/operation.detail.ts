import { DocumentTypeDropDownList } from './../document-types/document-type.drop-down.list';
import { RoomList } from './../../administration/rooms/room.list';
import { EmployeeList } from './../../administration/employees/employee.list';
import { AssetList } from './../../assets/assets/asset.list';
import { EmployeeHttpService } from './../../../services/http/administration/employee.http.service';
import { RoomDetailHttpService } from '../../../services/http/administration/room-detail.http.service';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AppData } from '../../../app-data';
import { AppConfig } from '../../../config';
import { Param } from '../../../model/common/param';
import { SelectionResult } from '../../../model/common/selection-result';

import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { Document } from '../../../model/api/documents/document';
import { Operation } from '../../../model/api/documents/operation';
import { DocumentUpload } from '../../../model/api/documents/document-upload';
import { DocumentType } from '../../../model/api/documents/document-type';
import { Employee } from '../../../model/api/administration/employee';
import { Room } from '../../../model/api/administration/room';

import { AssetMemoryService } from '../../../services/memory/asset.memory.service';
import { DocumentHttpService } from '../../../services/http/documents/document.http.service';
import { DocumentTypeHttpService } from '../../../services/http/documents/document-type.http.service';
import { GenericTableList } from './../../generic/generic.table.list';
import { ModalDirective } from 'ng2-bootstrap/modal';
import { CostCenter } from 'app/model/api/administration/cost-center';
import { CostCenterList } from 'app/forms/administration/cost-centers/cost-center.list';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';
import { InvState } from 'app/model/api/inventory/inv-state';
import { InvStateList } from 'app/forms/inventory/inv-state/inv-state.list';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { BudgetManager } from 'app/model/api/assets/budget-manager';
import { Project } from 'app/model/api/assets/project';
import { Dimension } from 'app/model/api/administration/dimension';
import { BudgetManagerList } from 'app/forms/assets/budget-manager/budget-manager.list';
import { ProjectList } from 'app/forms/assets/projects/project.list';
import { DimensionList } from 'app/forms/assets/dimensions/dimension.list';
import { DimensionHttpService } from 'app/services/http/administration/dimension.http.service';
import { ProjectHttpService } from 'app/services/http/assets/project.http.service';
import { BudgetManagerHttpService } from 'app/services/http/assets/budget-manager.http.service';
import { Administration } from 'app/model/api/administration/administration';
import { AdministrationList } from 'app/forms/administration/administrations/administration.list';
import { AdministrationHttpService } from 'app/services/http/administration/administration.http.service';
import { ZoneState } from 'app/model/api/assets/zone-state';
import { ZoneStateList } from 'app/forms/assets/zone-states/zone-state.list';
import { ZoneStateDetailHttpService } from 'app/services/http/assets/zone-state.detail.http.service';
import * as decode from 'jwt-decode';
import { UomList } from 'app/forms/assets/uoms/uom.list';
import { Uom } from 'app/model/api/assets/uom';
import { UomHttpService } from 'app/services/http/assets/uom.http.service';

@Component({
    selector: 'operation-detail',
    templateUrl: 'operation.detail.html',
    styleUrls: ['operation.detail.scss'],
    providers: [ AssetMemoryService, DocumentTypeHttpService, RoomDetailHttpService ]
})
export class OperationDetail { // extends GenericDetail<AssetFullDetail> {

    private selectedDocumentType: DocumentType = null;
    private selectedEmployee: Employee = null;
    private selectedEmployeePrev: Employee = null;
    private selectedInvStatePrev: InvState = null;
    private selectedInvState: InvState = null;
    private selectedZoneState: ZoneState = null;
    private selectedRoom: Room = null;
    private selectedRoomPrev: Room = null;
    private selectedCostCenter: CostCenter = null;
    private selectedBudgetManager: BudgetManager = null;
    private selectedUom: Uom = null;
    private selectedProject: Project = null;
    private selectedDimension: Dimension = null;
    private selectedAdministration: Administration = null;
    private selectedCostCenterPrev: CostCenter = null;
    private selectedValue: number = 0;
    private selectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();

    private confirmationMessage = 'Doriti sa descarcati PV- ul in format .pdf ?';
    protected operationType: number = OperationType.NotSet;
    private documentId = 0;
    isOK = true;

    showSaveButton: boolean = false;
    showSendEmailButton: boolean = true;
    showAdmBtn = true;
    showEmpBtn = true;
    showRoomBtn = true;
    showCCBtn = true;
    showBMBtn = true;
    showDimBtn = true;

    info = '';
    isNew = false;
    isNewIT = false;
    assetIdNew = 0;
    assetIdITNew = 0;
    private enableAdministration: boolean = false;
    private requireAdministration: boolean = false;
    private enableAssetAccState: boolean = false;
    private requireAssetAccState: boolean = false;
    private enableAssetCategory: boolean = false;
    private requireAssetCategory: boolean = false;
    private enableCostCenter: boolean = false;
    private requireCostCenter: boolean = false;
    private enableBudgetManager: boolean = false;
    private requireBudgetManager: boolean = false;
    private enableUom: boolean = false;
    private requireUom: boolean = false;
    private enableProject: boolean = false;
    private requireProject: boolean = false;
    private enableDimension: boolean = false;
    private requireDimension: boolean = false;
    private enableDepartment: boolean = false;
    private requireDepartment: boolean = false;
    private enableEmployee: boolean = false;
    private requireEmployee: boolean = false;
    private enableInvState: boolean = false;
    private requireInvState: boolean = false;
    private requireInfo: boolean = false;
    private enableInfo: boolean = false;
    private enableZoneState: boolean = false;
    private requireZoneState: boolean = false;
    private enableRoom: boolean = false;
    private requireRoom: boolean = false;
    private enableValue: boolean = false;
    private requireValue: boolean = false;
    private validData: boolean = false;
    private enableTempTransfer: boolean = false;
    private requireTempTransfer: boolean = false;
    private startFromDate: Date;
    private startToDate: Date;

    private documentSaved: boolean = false;

    private documentDate: Date;
    private registerDate: Date;
    private employeeDetail: string = '';
    private invStateDetail: string = '';
    private roomDetail: string = '';
    private appDataAssetList: Array<AppData>;
    private documentInfo: string = '';
    private serialNumber: string = '';

    private costCenterListSelectedItem: CostCenter = null;
    private budgetManagerListSelectedItem: BudgetManager = null;
    private uomListSelectedItem: Uom = null;
    private projectListSelectedItem: Project = null;
    private dimensionListSelectedItem: Dimension = null;
    private administrationListSelectedItem: Administration = null;
    private employeeListSelectedItem: Employee = null;
    private invStateListSelectedItem: InvState = null;
    private zoneStateListSelectedItem: ZoneState = null;
    private roomListSelectedItem: Room = null;

    @ViewChild('assetList') private assetList: AssetList;
    @ViewChild('documentTypeDropDownList') private documentTypeDropDownList: DocumentTypeDropDownList;
    @ViewChild('costCenterList') private costCenterList: CostCenterList;
    @ViewChild('costCenterListModal') private costCenterListModal: ModalDirective;
    @ViewChild('budgetManagerList') private budgetManagerList: BudgetManagerList;
    @ViewChild('budgetManagerListModal') private budgetManagerListModal: ModalDirective;
    @ViewChild('uomList') private uomList: UomList;
    @ViewChild('uomListModal') private uomListModal: ModalDirective;
    @ViewChild('projectList') private projectList: ProjectList;
    @ViewChild('projectListModal') private projectListModal: ModalDirective;
    @ViewChild('dimensionList') private dimensionList: DimensionList;
    @ViewChild('dimensionListModal') private dimensionListModal: ModalDirective;
    @ViewChild('administrationList') private administrationList: AdministrationList;
    @ViewChild('administrationListModal') private administrationListModal: ModalDirective;
    @ViewChild('employeeList') private employeeList: EmployeeList;
    @ViewChild('employeeListModal') private employeeListModal: ModalDirective;
    @ViewChild('invStateList') private invStateList: InvStateList;
    @ViewChild('invStateListModal') private invStateListModal: ModalDirective;
    @ViewChild('zoneStateList') private zoneStateList: ZoneStateList;
    @ViewChild('zoneStateListModal') private zoneStateListModal: ModalDirective;
    @ViewChild('roomList') private roomList: RoomList;
    @ViewChild('roomListModal') private roomListModal: ModalDirective;
    @ViewChild('confirmationModal') public confirmationModal: ModalDirective;

    constructor(
        private assetMemoryService: AssetMemoryService,
        private documentHttpService: DocumentHttpService,
        private documentTypeHttpService: DocumentTypeHttpService,
        private costCenterHttpService: CostCenterHttpService,
        private budgetManagerHttpService: BudgetManagerHttpService,
        private uomHttpService: UomHttpService,
        private projectHttpService: ProjectHttpService,
        private dimensionHttpService: DimensionHttpService,
        private administrationHttpService: AdministrationHttpService,
        private router: Router,
        private employeeHttpService: EmployeeHttpService,
        private roomDetailHttpService: RoomDetailHttpService,
        private zoneStateHttpService: ZoneStateDetailHttpService,
        private invStateHttpService: InvStateHttpService) {
    }

    private refresh() {

        this.documentSaved = false;
        this.selectedDocumentType = null;
        this.selectedEmployee = null;
        this.selectedEmployeePrev = null;
        this.selectedInvState = null;
        this.selectedInvStatePrev = null;
        this.selectedRoom = null;
        this.selectedRoomPrev = null;
        this.employeeDetail = '';
        this.roomDetail = '';

        this.resetOptions();

        this.assetMemoryService.setDataSource(AppData.AssetList);
        this.assetMemoryService.get(null, null, '', '', new Array<Param>()).subscribe((assets) => {
            this.selectedAssets = assets;
            if(this.selectedAssets.length === 1){
                this.selectedUom = this.selectedAssets[0].uom;
            }
        });

        // this.uomHttpService.getById(259).subscribe((res: Uom) => {
        //     if (res != null) {
        //         this.selectedUom = res;
        //     }
        // });

        this.refreshAssets();
    }

    private ngAfterViewInit() {
         this.refresh();
         this.refreshDocumentTypes();
    }

    private refreshAssets() {
        this.assetList.refresh(null);
    }

    private refreshDocumentTypes() {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('parentCode', 'ASSET'));

        this.documentTypeDropDownList.refresh(params);
    }

    private setSelectedDocumentType(documentTypes: Array<DocumentType>) {
        this.selectedDocumentType = ((documentTypes != null) && (documentTypes.length > 0)) ? documentTypes[0] : null;
        this.updateRequiredData(this.selectedDocumentType);
    }

    private cancelChanges() {
        this.router.navigate(['/assetinvdetails']);
    }

    private parseFromDate(dateString: string): Date {
        if (dateString) {
            this.startFromDate = new Date(dateString);
            return this.startFromDate;
        } else {
            return null;
        }
    }

    private parseToDate(dateString: string): Date {
        if (dateString) {
            this.startToDate = new Date(dateString);
            this.validData = true;
            return this.startToDate;
        } else {
            return null;
        }
    }


    private saveDocument() {
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

        

        document = new Document(0, this.selectedDocumentType.id, '', '', this.documentDate, this.registerDate, false, this.documentInfo, this.serialNumber, fromDate, toDate);

        if (this.enableEmployee && this.selectedEmployee != null) employeeId = this.selectedEmployee.id;
        if (this.enableInvState && this.selectedInvState != null) invStateId = this.selectedInvState.id;
        if (this.enableUom && this.selectedUom != null) uomId = this.selectedUom.id;
        if (this.enableInfo && this.info != '') info = this.info;
        if (this.enableZoneState && this.selectedZoneState != null) zoneStateId = this.selectedZoneState.id;
        if (this.enableRoom && this.selectedRoom != null) roomId = this.selectedRoom.id;
        if (this.enableTempTransfer && this.enableTempTransfer != null) fromDate = this.startFromDate;
        if (this.enableTempTransfer && this.enableTempTransfer != null) toDate = this.startToDate;
        if (this.enableCostCenter && this.selectedCostCenter != null) costCenterId = this.selectedCostCenter.id;
        if (this.enableBudgetManager && this.selectedBudgetManager != null) budgetManagerId = this.selectedBudgetManager.id;
        if (this.enableProject && this.selectedProject != null) projectId = this.selectedProject.id;
        if (this.enableDimension && this.selectedDimension != null) dimensionId = this.selectedDimension.id;
        if (this.enableAdministration && this.selectedAdministration != null) administrationId = this.selectedAdministration.id;
        if (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_CASS) invStateId = AppConfig.INVSTATE_CASS_ID;
        if (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_SELL) invStateId = AppConfig.INVSTATE_SELL_ID;

        operations = new Array<Operation>();
        this.selectedAssets.forEach((asset) => {
            if(asset.adm != null && asset.adm.room != null && asset.adm.room.id == 1512){
                this.isNewIT = true;
                this.assetIdITNew = asset.id;
            }
            if(asset.adm != null && asset.adm.room != null && asset.adm.room.id == 1576){
                this.isNew = true;
                this.assetIdNew = asset.id;
            }
            // if(asset.adm != null && asset.adm.subType != null && (
            //     (asset.adm.subType.code == 'LAPTOP NSTD' && this.selectedUom == null) ||
            //     (asset.adm.subType.code == 'LAPTOP STD' && this.selectedUom == null) ||
            //     (asset.adm.subType.code == 'DESKTOP STD' && this.selectedUom == null) ||
            //     (asset.adm.subType.code == 'DESKTOP NSTD' && this.selectedUom == null) ||
            //     (asset.adm.subType.code == 'TABLET' && this.selectedUom == null))){
            //     this.isOK = false;
            //    alert('OS selection is required!');
            //    return;
            // }
            operation = new Operation(0, asset.id, false, administrationId, costCenterId, budgetManagerId, projectId, dimensionId, employeeId, invStateId, null, null, roomId, invStateId, uomId, zoneStateId, info, asset.adm.employee != null ? asset.adm.employee.id: 0);
            operations.push(operation);
            
        });

        if(!this.isOK){
            this.validData = true;
            this.isOK = true;
            return;
        }

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

        switch (this.selectedDocumentType.code) {
            case 'VALIDATEASSET':
            this.documentHttpService.operation(documentUpload).subscribe((data) => {
                alert('The operation was saved successfully');
                this.router.navigate(['/assetinvdetails']);
            });
                break;
            default:
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
                break;
        }
    }

    private generateBook () {
      this.operationType = OperationType.Operation;
      this.confirmationModal.show();
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

  private onConfirmationApproved (confirm: string) {
    if (confirm === 'YES') {
        if (this.selectedDocumentType.code === 'STATE_CHANGE') {
          setTimeout(() => {
            this.newTabScrab(this.documentId);
        }, 0);
        } else {
          setTimeout(() => {
            if(this.isNew){
                this.newPIFTab(this.documentId);
            }
            if(this.isNewIT){
                this.newPIFITTab(this.documentId);
            }
            this.newTab(this.documentId);
        }, 0);
        }

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

  private onConfirmationCanceled() {
    this.operationType = OperationType.NotSet;
    this.confirmationModal.hide();
}

    private resetOptions() {
        this.enableAdministration = false;
        this.enableAssetAccState = false;
        this.enableAssetCategory = false;
        this.enableCostCenter = false;
        this.enableBudgetManager = false;
        this.enableUom = false;
        this.enableProject = false;
        this.enableDimension = false;
        this.enableAdministration = false;
        this.enableDepartment = false;
        this.enableEmployee = false;
        this.enableInvState = false;
        this.enableInfo = false;
        this.enableZoneState = false;
        this.enableRoom = false;
        this.enableValue = false;
        this.enableTempTransfer = false;
        this.requireAdministration = false;
        this.requireAssetAccState = false;
        this.requireAssetCategory = false;
        this.requireCostCenter = false;
        this.requireBudgetManager = false;
        this.requireUom = false;
        this.requireProject = false;
        this.requireDimension = false;
        this.requireAdministration = false;
        this.requireDepartment = false;
        this.requireEmployee = false;
        this.requireInvState = false;
        this.requireInfo = false;
        this.requireZoneState = false;
        this.requireRoom = false;
        this.requireValue = false;
        this.requireTempTransfer = false;

        this.validData = false;
    }

    private updateRequiredData(documentType: DocumentType) {

        this.resetOptions();

        if (documentType != null) {
            let maskParts: string[] = documentType.mask.split(';');

            // console.log(JSON.stringify(maskParts));

            maskParts.forEach((maskPart: string) => {

                if (!this.enableAdministration && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ADMINISTRATION)) {
                    this.enableAdministration = true;
                    this.requireAdministration = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableAssetAccState && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETACCSTATE)) {
                    this.enableAssetAccState = true;
                    this.requireAssetAccState = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableAssetCategory && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_ASSETCATEGORY)) {
                    this.enableAssetCategory = true;
                    this.requireAssetCategory = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableCostCenter && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_COSTCENTER)) {
                    this.enableCostCenter = true;
                    this.requireCostCenter = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableBudgetManager && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_BUDGETMANAGER)) {
                    this.enableBudgetManager = true;
                    this.requireBudgetManager = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableUom && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_UOM)) {
                    this.enableUom = true;
                    this.requireUom = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableProject && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_PROJECT)) {
                    this.enableProject = true;
                    this.requireProject = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableDimension && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_DIMENSION)) {
                    this.enableDimension = true;
                    this.requireDimension = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
                }

                if (!this.enableDepartment && maskPart.startsWith(AppConfig.DOCUMENTTYPE_MASK_DEPARTMENT)) {
                    this.enableDepartment = true;
                    this.requireDepartment = maskPart.endsWith(AppConfig.DOCUMENTTYPE_MASK_REQUIRED);
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
                    // this.enableRoom = false;
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
        this.validData = (this.selectedAssets != null) && (this.selectedAssets.length > 0) && (!this.documentSaved) && (this.selectedDocumentType != null) &&
            // (this.requireAssetAccState || this.requireAssetCategory || this.requireCostCenter
            // || this.requireDepartment || this.requireEmployee || this.requireValue)

            ((this.selectedZoneState != null && (this.selectedZoneState.id === 3 || this.selectedZoneState.id === 4)) || (this.selectedCostCenter != null) || (this.selectedEmployee != null && this.selectedZoneState != null) || (this.selectedRoom != null) || (this.selectedInvState != null) || (this.selectedValue !== 0))

            // && ((!this.requireCostCenter) || ((this.requireCostCenter) && (this.selectedCostCenter != null)))
            // && ((!this.requireBudgetManager) || ((this.requireBudgetManager) && (this.selectedBudgetManager != null)))
            // && ((!this.requireProject) || ((this.requireProject) && (this.selectedProject != null)))
            // && ((!this.requireDimension) || ((this.requireDimension) && (this.selectedDimension != null)))
            // && ((!this.requireAssetNature) || ((this.requireAssetNature) && (this.selectedAssetNature != null)))
            // && ((!this.requireEmployee) || ((this.requireEmployee) && (this.selectedEmployee != null)))
            && ((!this.requireInvState) || ((this.requireInvState) && (this.selectedInvState != null)))
            // && ((!this.requireUom) || ((this.requireUom) && (this.selectedUom != null)))
            && ((!this.requireZoneState) || ((this.requireZoneState) && (this.selectedZoneState != null)))
            // && ((!this.requireRoom) || ((this.requireRoom) && (this.selectedRoom != null)))
            && ((!this.requireTempTransfer) || ((this.requireTempTransfer && this.selectedEmployee != null) && ((this.startFromDate !== undefined) && (this.startToDate !== undefined))))
            && ((!this.requireValue) || ((this.requireValue) && (this.selectedValue !== 0)));

        if (!this.validData) this.validData = (this.validData || (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_CASS)
        || (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_VALIDATE) ||
            (this.selectedDocumentType.code === AppConfig.DOCUMENT_TYPE_SELL));

            if(this.enableInfo) {
                this.validData = true;
            }

        // this.validData = true;
    }

    private selectCostCenter() {
        this.costCenterList.refresh(null);
        this.costCenterListModal.show();
    }


    private selectBudgetManager() {
        this.budgetManagerList.refresh(null);
        this.budgetManagerListModal.show();
    }

    private selectUom() {
        this.uomList.refresh(null);
        this.uomListModal.show();
    }

    private selectProject() {
        this.projectList.refresh(null);
        this.projectListModal.show();
    }

    private selectDimension() {
        this.dimensionList.refresh(null);
        this.dimensionListModal.show();
    }

    private selectAdministration() {
        this.administrationList.refresh(null);
        this.administrationListModal.show();
    }

    private selectEmployee() {
        this.isOK = true;
        this.selectedAssets.forEach(asset => {
            console.log(JSON.stringify(asset));
           // console.log(JSON.stringify(this.selectedZoneState));
        //   if ((asset.zoneState != null && (asset.zoneState.id == 1)) && (this.selectedZoneState != null && this.selectedZoneState.id == 1)) {
        //       this.isOK = false;
        //       alert('Transferurile intre angajati nu sunt permise!');

        //       return;
        //   } else {

           
        //   }
      });

      if (this.isOK) {
        this.employeeList.refresh(null);
        this.employeeListModal.show();
      }

    this.employeeList.refresh(null);
    this.employeeListModal.show();
    }

    private selectInvState() {
        this.invStateList.refresh(null);
        this.invStateListModal.show();
    }


    private selectZoneState() {
        this.isOK = true;
        this.zoneStateList.refresh(null);
        this.zoneStateListModal.show();
    }

    private selectRoom() {
        this.roomList.refresh(null);
        this.roomListModal.show();
    }

    private setCostCenterListSelectedItem(costCenters: Array<CostCenter>) {
        this.costCenterListSelectedItem = costCenters != null && costCenters.length === 1 ? costCenters[0] : null;
    }

    private setSelectedCostCenter() {
        this.selectedCostCenter = this.costCenterListSelectedItem;
        this.costCenterListModal.hide();
        this.updateValidData();
    }

    private setBudgetManagerListSelectedItem(budgetManagers: Array<BudgetManager>) {
        this.budgetManagerListSelectedItem = budgetManagers != null && budgetManagers.length === 1 ? budgetManagers[0] : null;
    }


    private setUomListSelectedItem(uoms: Array<Uom>) {
        this.uomListSelectedItem = uoms != null && uoms.length === 1 ? uoms[0] : null;
    }


    private setSelectedBudgetManager() {
        this.selectedBudgetManager = this.budgetManagerListSelectedItem;
        this.budgetManagerListModal.hide();
        this.updateValidData();
    }

    private setSelectedUom() {
        this.selectedUom = this.uomListSelectedItem;
        this.uomListModal.hide();
        // this.updateValidData();
    }

    private setProjectListSelectedItem(projects: Array<Project>) {
        this.projectListSelectedItem = projects != null && projects.length === 1 ? projects[0] : null;
    }

    private setSelectedProject() {
        this.selectedProject = this.projectListSelectedItem;
        this.projectListModal.hide();
        this.updateValidData();
    }

    private setDimensionListSelectedItem(dimensions: Array<Dimension>) {
        this.dimensionListSelectedItem = dimensions != null && dimensions.length === 1 ? dimensions[0] : null;
    }

    private setSelectedDimension() {
        this.selectedDimension = this.dimensionListSelectedItem;
        this.dimensionListModal.hide();
        this.updateValidData();
    }

    private setAdministrationListSelectedItem(administrations: Array<Administration>) {
        this.administrationListSelectedItem = administrations != null && administrations.length === 1 ? administrations[0] : null;
    }

    private setSelectedAdministration() {
        this.selectedAdministration = this.administrationListSelectedItem;
        this.administrationListModal.hide();
        this.updateValidData();
    }

    private setEmployeeListSelectedItem(employees: Array<Employee>) {
        this.employeeListSelectedItem = employees != null && employees.length === 1 ? employees[0] : null;
    }

    private setInvStateListSelectedItem(invStates: Array<InvState>) {
        this.invStateListSelectedItem = invStates != null && invStates.length === 1 ? invStates[0] : null;
    }


    private setZoneStateListSelectedItem(zoneStates: Array<ZoneState>) {
        this.zoneStateListSelectedItem = zoneStates != null && zoneStates.length === 1 ? zoneStates[0] : null;
    }

    private setSelectedEmployee() {
        this.selectedEmployee = this.employeeListSelectedItem;
        this.employeeListModal.hide();
        this.updateValidData();
    }

    private setSelectedInvState() {
        this.selectedInvState = this.invStateListSelectedItem;
        this.invStateListModal.hide();
        this.updateValidData();
    }

    private setSelectedZoneState() {

        this.clearEmployee();
        this.clearRoom();
        this.selectedZoneState = this.zoneStateListSelectedItem;
        this.zoneStateListModal.hide();
        this.updateValidData();

        
        this.selectedAssets.forEach(element => {
            let zoneStateId =  this.selectedZoneState != null ? this.selectedZoneState.id : 0;
            let employeeLength =  element.adm != null && element.adm.employee != null && element.adm.employee.internalCode != null && element.adm.employee != null ? element.adm != null && element.adm.employee != null && element.adm.employee.internalCode != null && element.adm.employee.internalCode.trim().length : 0;
            // console.log(zoneStateId);
            // console.log(employeeLength);
            if(zoneStateId === 1 && employeeLength > 8){
                alert('Transferul intre angajati nu este permis!');
                this.selectedZoneState = null;
                this.updateValidData();
                return;
            }
        });
    }

    private setRoomListSelectedItem(rooms: Array<Room>) {
        this.roomListSelectedItem = rooms != null && rooms.length === 1 ? rooms[0] : null;
    }

    private setSelectedRoom() {
        this.selectedRoom = this.roomListSelectedItem;
        this.roomListModal.hide();
        this.updateValidData();
    }

    private clearEmployee() {

      this.selectedEmployee = null;
      this.employeeListSelectedItem = null;
      this.updateValidData();
  }

  private clearRoom() {

      this.selectedRoom = null;
      this.roomListSelectedItem = null;
      this.updateValidData();
  }

  private clearCostCenter() {

    this.selectedCostCenter = null;
    this.costCenterListSelectedItem = null;
    this.updateValidData();
}

private clearBudgetManager() {

  this.selectedBudgetManager = null;
  this.budgetManagerListSelectedItem = null;
  this.updateValidData();
}

private clearUom() {

    this.selectedUom = null;
    this.uomListSelectedItem = null;
    this.updateValidData();
  }

  private clearInvState() {

    this.selectedInvState = null;
    this.invStateListSelectedItem = null;
    this.updateValidData();
}

private clearZoneState() {

    this.selectedZoneState = null;
    this.zoneStateListSelectedItem = null;
    this.updateValidData();
}

}

enum OperationType {
  NotSet = 1,
  Operation = 2,
  Transfer = 3,
}
