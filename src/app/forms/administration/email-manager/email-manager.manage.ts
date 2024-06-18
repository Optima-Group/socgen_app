import { PagedResult } from './../../../model/common/paged-result';
import { Param } from './../../../model/common/param';
import { Component, EventEmitter, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { GenericManage, GenericManageViewMode } from '../../generic/generic.manage';
import { Division } from '../../../model/api/administration/division';
import { Administration } from '../../../model/api/administration/administration';
import { AdministrationDetail } from '../../../model/api/administration/administration-detail';

import { AdministrationHttpService } from '../../../services/http/administration/administration.http.service';
import { AdministrationDetailHttpService } from '../../../services/http/administration/administration-detail.http.service';
import { DivisionList } from "app/forms/administration/divisions/division.list";
import { AdministrationDetail as AdministrationDetailUI } from "app/forms/administration/administrations/administration.detail";
import { DivisionHttpService } from "app/services/http/administration/division.http.service";
import { AdministrationList } from "app/forms/administration/administrations/administration.list";
import { AppUtils } from "app/common/app.utils";
import { DictionaryTypeHttpService } from 'app/services/http/administration/dictionary-type.http.service';
import { DictionaryItemHttpService } from 'app/services/http/administration/dictionary-item.http.service';
import { DictionaryItemDetailHttpService } from 'app/services/http/administration/dictionary-item-detail.http.service';
import { DictionaryItem } from 'app/model/api/administration/dictionary-item';
import { DictionaryTypeList } from '../dictionary-type/dictionary-type.list';
import { DictionaryType } from 'app/model/api/administration/dictionary-type';
import { DictionaryItemList } from './dictionary-item.list';

import { EmailManagerDetail as EmailManagerDetailUI } from "app/forms/administration/email-manager/email-manager.detail";
import { DictionaryItemDetail } from '../../../model/api/administration/dictionary-item-detail';
import { AssetCategoryList } from 'app/forms/assets/asset-categories/asset-category.list';
import { AssetCategory } from 'app/model/api/assets/asset-category';
import { AssetCategoryHttpService } from 'app/services/http/assets/asset-category.http.service';
import { EmailTypeHttpService } from 'app/services/http/administration/email-type.http.service';
import { EmailManagerHttpService } from 'app/services/http/administration/email-manager.http.service';
import { EmailManagerDetailHttpService } from 'app/services/http/administration/email-manager-detail.http.service';
import { EmailManager } from 'app/model/api/administration/email-manager';
import { EmailType } from 'app/model/api/administration/email-type';
import { EmailTypeList } from '../email-type/email-type.list';
import { EmailManagerList } from './email-manager.list';
import { EmailManagerDetail } from 'app/model/api/administration/email-manager-detail';
import { AppStateHttpService } from 'app/services/http/common/app-state.http.service';
import { AppState } from 'app/model/api/common/app-state';

@Component({
    selector: 'email-manager-manage',
    templateUrl: 'email-manager.manage.html',
    styleUrls: ['email-manager.manage.scss'],
    providers: [ EmailTypeHttpService, EmailManagerHttpService, EmailManagerDetailHttpService ]
})
export class EmailManagerManage extends GenericManage<EmailManager, number> {

    @ViewChild('emailManagerDetailModal') emailManagerDetailModal: ModalDirective;
    @ViewChild('emailManagerList') emailManagerList: EmailManagerList;
    @ViewChild('emailManagerDetail') emailManagerDetail: EmailManagerDetailUI;
    @ViewChild('emailTypeListModal') emailTypeListModal: ModalDirective;
    @ViewChild('emailTypeList') emailTypeList: EmailTypeList;

    private filter: string = '';
    private selectedEmailType: EmailType = null;
    private selectedAppState: AppState = null;
    private appState: string = 'Status';
    private appStates: Array<AppState> = new Array<AppState>();

    constructor(private emailTypeHttpService: EmailTypeHttpService, private emailManagerHttpService: EmailManagerHttpService, private appStateHttpService: AppStateHttpService,
        private emailManagerDetailHttpService: EmailManagerDetailHttpService) {

        super();

        this.appStateHttpService.getDetailByParentCode('EMAILMANAGER').subscribe((res: any) => { this.appStates = res; });

    }

    protected addNewItem() {
        super.addNewItem();

        this.emailManagerDetail.emailType = null;
    }

    protected editItem() {
        super.editItem();

        let emailManager: EmailManagerDetail = this.selectedItem as EmailManagerDetail;

        this.emailManagerDetail.emailType = null;

        if (emailManager != null && emailManager.emailType != null) {
            this.emailTypeHttpService
                .getById(emailManager.emailType.id)
                .subscribe((emailType: EmailType) => {
                    this.emailManagerDetail.emailType = emailType;
                });
        }
    }

    protected detailInitialize() {
        super.detailInitialize();
        this.emailManagerDetailModal.show();
    }

    protected detailTerminate() {
        super.detailTerminate();
        this.emailManagerDetailModal.hide();
    }

    private onEmailManagerDetailEmailTypeNeeded() {
        this.emailManagerDetailModal.hide();
        this.selectEmailType();
    }

    private onEmailTypeListCancel() {
        this.emailTypeListModal.hide();
        if (this.viewMode === GenericManageViewMode.ItemDetail) {
            this.emailManagerDetailModal.show();
        }
    }

    private refresh() {
        let params: Array<Param> = new Array<Param>();

        params.push(new Param('filter', this.filter));
        params.push(new Param("emailTypeIds", AppUtils.getIdsList<EmailType, number>([ this.selectedEmailType ])));
        params.push(new Param("appStateIds", AppUtils.getIdsList<AppState, number>([ this.selectedAppState ])));

        this.emailManagerList.refresh(params);
    }

    private selectEmailType() {
        this.emailTypeListModal.show();
        this.emailTypeList.refresh(null);
    }

    private setSelectedEmailType() {
        switch(this.viewMode) {
            case GenericManageViewMode.ItemList:
                this.selectedEmailType = this.emailTypeList.selectedItem;
                this.emailTypeListModal.hide();
                this.refresh();
                break;
            case GenericManageViewMode.ItemDetail:
                this.emailManagerDetail.emailType = this.emailTypeList.selectedItem;
                this.emailTypeListModal.hide();
                this.emailManagerDetailModal.show();
                break;
        }
    }


    private unselectEmailType() {
        this.selectedEmailType = null;
        this.refresh();
    }

    private onAppStateUpdate(appStateId: number, appStateName: string) {
        if (appStateId !== -1) {
            this.selectedAppState = new AppState(appStateId, appStateName, appStateName, 'EMAILMANAGER');
        } else {
            this.selectedAppState = null;
        }
        
        this.appState = appStateName ;
        this.refresh();
    }

    private exportToExcel() {

         let params: Array<Param> = null;

        if ((this.filter != null) && (this.filter.length > 0)) {
            params = new Array<Param>();
            params.push(new Param('filter', this.filter));
        }

        this.emailManagerDetailHttpService.get(1, 1000000, 'id', 'asc', params, null).subscribe(
            (data: PagedResult<EmailManager>) => {

                let options = {
                    sheetid: 'emailManager',
                    headers: true,
                    column: { style: { Font: { Bold: '1' } } },
                    rows: { 1: { style: { Font: { Color: '#FF0077' } } } },
                    cells: { 1: { 1: { style: { Font: { Color: '#00FFFF' } } } } }
                };

                let res = alasql(`SELECT id as [Id]
                                    INTO XLSX("emailManager.xlsx",?) FROM ?`,[ options, data.items ]);

            });
    }
}
