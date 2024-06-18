import { AccMonthManage } from './forms/accounting/acc-month.manage';
import { AccMonthDetail } from './forms/accounting/acc-month.detail';
import { InvStateList } from './forms/inventory/inv-state/inv-state.list';
import { InvStateDetail } from './forms/inventory/inv-state/inv-state.detail';
import { InvStateManage } from 'app/forms/inventory/inv-state/inv-state.manage';
import { ConfigValuesDetail } from './forms/common/config-values.detail';
import { ConfigValuesList } from './forms/common/config-values.list';
import { AssetOpManage } from './forms/assets/asset-ops/asset-op-manage';
import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, RouteReuseStrategy } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

import { CustomReuseStrategy }  from './common/reuse-strategy';

// Services.
import { AuthGuard } from './services/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { IdentityService } from './services/http/identity/identity.service';

// angular2-jwt config for JiT and AoT compilation.
import { AuthHttp, AuthConfig } from 'angular2-jwt';
import { Http } from '@angular/http';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { routing } from './app.routing';

import { App } from './app.component';
import { AppState, InternalStateType } from './app.service';
import { GlobalState } from './global.state';
import { NgaModule } from './theme/nga.module';

import { Login } from './forms/auth/login';
import { Register } from './forms/auth/register';
import { Password } from './forms/auth/password';
import { IdentityManage } from './forms/auth/identity.manage';

import { AssetCategoryDetail } from './forms/assets/asset-categories/asset-category.detail';
import { AssetCategoryList } from './forms/assets/asset-categories/asset-category.list';
import { AssetCategoryManage } from './forms/assets/asset-categories/asset-category.manage';

import { AssetClassDetail } from './forms/assets/asset-classes/asset-class.detail';
import { AssetClassList } from './forms/assets/asset-classes/asset-class.list';
import { AssetClassManage } from './forms/assets/asset-classes/asset-class.manage';

import { AssetTypeDetail } from './forms/assets/asset-types/asset-type.detail';
import { AssetTypeList } from './forms/assets/asset-types/asset-type.list';
import { AssetTypeManage } from './forms/assets/asset-types/asset-type.manage';

import { AssetDetailUI } from './forms/assets/assets/asset.detail.ui';
import { AssetDepDetailList } from './forms/assets/assets/asset-dep-detail.list';
import { AssetInvDetailList } from './forms/assets/assets/asset-inv-detail.list';
import { AssetInvFullDetailList } from './forms/assets/assets/asset-inv-full-detail.list';
import { AssetList } from './forms/assets/assets/asset.list';
import { AssetManage } from './forms/assets/assets/asset.manage';
import { AssetDepManage } from './forms/assets/assets/asset-dep.manage';

import { AssetTypeDropDownList } from './forms/assets/asset-types/asset-type.drop-down.list';

import { CostCenterDetail } from './forms/administration/cost-centers/cost-center.detail';
import { CostCenterList } from './forms/administration/cost-centers/cost-center.list';
import { CostCenterManage } from './forms/administration/cost-centers/cost-center.manage';

import { DocumentTypeDropDownList } from './forms/documents/document-types/document-type.drop-down.list';

import { DepartmentDetail } from './forms/administration/departments/department.detail';
import { DepartmentList } from './forms/administration/departments/department.list';
import { DepartmentManage } from './forms/administration/departments/department.manage';

import { EmployeeDetail } from './forms/administration/employees/employee.detail';
import { EmployeeList } from './forms/administration/employees/employee.list';
import { EmployeeManage } from './forms/administration/employees/employee.manage';

import { InvCompDetailList } from './forms/inventory/inv-comp/inv-comp-detail.list';
import { InventoryInvCompList } from './forms/inventory/inv-comp/inventory-inv-comp.list';
import { InventoryInvCompManage } from './forms/inventory/inv-comp/inventory-inv-comp.manage';

import { InvCompOpDetailList } from './forms/inventory/inv-comp/inv-comp-op-detail.list';
import { InvCompOpInvDetailList } from './forms/inventory/inv-comp/inv-comp-op-inv-detail.list';
import { InvCompOpInvDetailManage } from './forms/inventory/inv-comp/inv-comp-op-inv-detail.manage';


import { LocationDetail } from './forms/administration/locations/location.detail';
import { LocationList } from './forms/administration/locations/location.list';
import { LocationManage } from './forms/administration/locations/location.manage';

import { OperationDetail } from './forms/documents/operations/operation.detail';

import { PartnerDetail } from './forms/documents/partners/partner.detail';
import { PartnerList } from './forms/documents/partners/partner.list';
import { PartnerManage } from './forms/documents/partners/partner.manage';

import { RoomDetail } from './forms/administration/rooms/room.detail';
import { RoomList } from './forms/administration/rooms/room.list';
import { RoomManage } from './forms/administration/rooms/room.manage';


import { CollapseModule, DatepickerModule, PaginationModule, ModalModule, TabsModule, ProgressbarModule } from 'ng2-bootstrap';
import { EntityFileUpload } from 'app/forms/common/entity-file-upload';
import { EntityFileDownload } from 'app/forms/common/entity-file-download';
import { EntityFileList } from 'app/forms/common/entity-file.list';
import { AssetInventoryManage } from 'app/forms/assets/assets/asset-inventory.manage';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ToastModule, ToastOptions } from 'ng2-toastr/ng2-toastr';

import { UserList } from 'app/forms/auth/user.list';
import { AdmCenterList } from 'app/forms/administration/adm-centers/adm-center.list';
import { InventoryList } from 'app/forms/inventory/inventory.list';
import { InventoryDetail } from 'app/forms/inventory/inventory.detail';
import { InventoryManage } from 'app/forms/inventory/inventory.manage';
import { AdmCenterDetail } from 'app/forms/administration/adm-centers/adm-center.detail';
import { AdmCenterManage } from 'app/forms/administration/adm-centers/adm-center.manage';
import { AdmCenterSelection } from 'app/forms/administration/adm-centers/adm-center.selection';
import { PasswordReset } from 'app/forms/auth/password-reset';
import { AssetInventoryReport } from 'app/forms/assets/assets/asset-inventory-report';
import { ConfigValuesManage } from 'app/forms/common/config-values.manage';
import { AssetNiList } from 'app/forms/assets/assets/asset-ni.list';
import { FieldByNamePipe } from 'app/forms/common/pipes/field-by-name.pipe';
import { FieldByColumnDefinitionPipe } from 'app/forms/common/pipes/field-by-column-definition';
import { DatePipe, DecimalPipe } from '@angular/common';
import { TableDefinitionList } from 'app/forms/common/table-definition/table-definition.list';
import { TableDefinitionManage } from 'app/forms/common/table-definition/table-definition.manage';
import { ColumnDefinitionList } from 'app/forms/common/table-definition/column-definition.list';
import { TableDefinitionHttpService } from 'app/services/http/common/table-definition.http.service';
import { ColumnDefinitionHttpService } from 'app/services/http/common/column-definition.http.service';
import { ColumnDefinitionDetail } from 'app/forms/common/table-definition/column-definition.detail';
import { ConfigValuesHttpService } from 'app/services/http/common/config-values.service';
import { AssetOpDetailList } from 'app/forms/assets/asset-ops/asset-op.detail.list';
import { CostCenterHttpService } from 'app/services/http/administration/cost-center.http.service';
import { DocumentHttpService } from 'app/services/http/documents/document.http.service';
import { DepartmentHttpService } from 'app/services/http/administration/department.http.service';
import { AssetOpHttpService } from 'app/services/http/assets/asset-op.http.service';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { BoolPipe } from 'app/forms/common/pipes/bool.pipe';
import { AssetStateHttpService } from 'app/services/http/assets/asset-state.http.service';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { RoomHttpService } from 'app/services/http/administration/room.http.service';
import { InvStateHttpService } from 'app/services/http/inventory/inv-state.http.service';
import { MergePipe } from 'app/forms/common/pipes/merge.pipe';
import { ProgressBarService } from 'app/services/http/common/progress-bar.service';
import { AccMonthList } from './forms/accounting/acc-month.list';
import { AdministrationManage } from 'app/forms/administration/administrations/administration.manage';
import { AdministrationList } from 'app/forms/administration/administrations/administration.list';
import { AdministrationDetail } from 'app/forms/administration/administrations/administration.detail';
import { DivisionManage } from 'app/forms/administration/divisions/division.manage';
import { DivisionList } from 'app/forms/administration/divisions/division.list';
import { DivisionDetail } from 'app/forms/administration/divisions/division.detail';
import { AdministrationHttpService } from 'app/services/http/administration/administration.http.service';
import { DivisionHttpService } from 'app/services/http/administration/division.http.service';
import { UomManage } from './forms/assets/uoms/uom.manage';
import { UomList } from './forms/assets/uoms/uom.list';
import { UomDetail } from './forms/assets/uoms/uom.detail';
import { UomHttpService } from './services/http/assets/uom.http.service';
import { DictionaryTypeDetail } from './forms/administration/dictionary-type/dictionary-type.detail';
import { DictionaryTypeList } from './forms/administration/dictionary-type/dictionary-type.list';
import { DictionaryTypeManage } from './forms/administration/dictionary-type/dictionary-type.manage';
import { DictionaryTypeHttpService } from './services/http/administration/dictionary-type.http.service';
import { DictionaryItemDetail } from './forms/administration/dictionary-item/dictionary-item.detail';
import { DictionaryItemList } from './forms/administration/dictionary-item/dictionary-item.list';
import { DictionaryItemManage } from './forms/administration/dictionary-item/dictionary-item.manage';
import { DictionaryItemHttpService } from './services/http/administration/dictionary-item.http.service';
import { BoolPipeState } from './forms/common/pipes/bool.pipe_state';
import { RegionDetail } from './forms/administration/regions/region.detail';
import { RegionList } from './forms/administration/regions/region.list';
import { RegionManage } from './forms/administration/regions/region.manage';
import { RegionSelection } from './forms/administration/regions/region.selection';
import { MergeRoom } from './forms/common/pipes/merge-room.pipe';
import { DatePickerModule } from 'ng2-datepicker';
import { ChartService } from './forms/common/chartistJs/chartistJs.service';
import { ChartComponent } from './forms/common/chartistJs';
import { InventoryDetailHttpService } from './services/http/inventory/inventory-detail.http.service';
import { BoolPipeInventory } from './forms/common/pipes/bool-pipe.inventory';
import { AssetStateManage } from './forms/assets/asset-states/asset-state.manage';
import { AssetStateDetail } from './forms/assets/asset-states/asset-state.detail';
import { AssetStateList } from './forms/assets/asset-states/asset-state.list';
import { AssetInventoryUpload } from './forms/common/asset-inventory-upload';
import { FileUploadModule } from 'ng2-file-upload';
import { UserReportHttpService } from './services/http/common/user-reports.http.service';
import { Dashboard } from './forms/dashboard/dashboard';
import { PieChart } from './pages/dashboard/pieChart';
import { PieChartService } from './pages/dashboard/pieChart/pieChart.service';
import { TrafficChartService } from './pages/dashboard/trafficChart/trafficChart.service';
import { TodoService } from './pages/dashboard/todo/todo.service';
import { TrafficChart } from './pages/dashboard/trafficChart';
import { Todo } from './pages/dashboard/todo';
import { UsersMap } from './pages/dashboard/usersMap';
import { LineChart } from './pages/dashboard/lineChart';
import { UsersMapService } from './pages/dashboard/usersMap/usersMap.service';
import { LineChartService } from './pages/dashboard/lineChart/lineChart.service';
import { Calendar } from './pages/dashboard/calendar';
import { CalendarService } from './pages/dashboard/calendar/calendar.service';
import { ChartistJs } from './pages/charts/components/chartistJs';
import { ChartistJsService } from './pages/charts/components/chartistJs/chartistJs.service';
import { ChartModule } from 'angular2-chartjs';
import { LocationMap } from './forms/common/Maps/maps';
import { LocationHttpService } from './services/http/administration/location.http.service';
import { LeafletMaps } from './pages/maps/components/leafletMaps';
import { LocationMapDashBoard } from './forms/common/Maps/maps-dashboard';
import { BoolPipeEmployee } from './forms/common/pipes/bool-pipe-employee-state';
import { PartnerLocationManage } from './forms/documents/partner-locations/partner-location.manage';
import { PartnerLocationList } from './forms/documents/partner-locations/partner-location.list';
import { PartnerLocationDetail } from './forms/documents/partner-locations/partner-location.detail';
import { PartnerLocationHttpService } from './services/http/documents/partner-location.http.service.';
import { AssetNatureHttpService } from './services/http/assets/asset-nature.http.service';
import { BudgetManagerHttpService } from './services/http/assets/budget-manager.http.service';
import { AssetNatureManage } from './forms/assets/asset-natures/asset-nature.manage';
import { AssetNatureList } from './forms/assets/asset-natures/asset-nature.list';
import { AssetNatureDetail } from './forms/assets/asset-natures/asset-nature.detail';
import { BudgetManagerManage } from './forms/assets/budget-manager/budget-manager.manage';
import { BudgetManagerList } from './forms/assets/budget-manager/budget-manager.list';
import { BudgetManagerDetail } from './forms/assets/budget-manager/budget-manager.detail';
import { AccountManage } from './forms/administration/account/account.manage';
import { AccountDetail } from './forms/administration/account/account.detail';
import { ExpAccountManage } from './forms/administration/exp-account/exp-account.manage';
import { ExpAccountList } from './forms/administration/exp-account/exp-account.list';
import { ExpAccountDetail } from './forms/administration/exp-account/exp-account.detail';
import { AccountHttpService } from './services/http/administration/account.http.service';
import { ExpAccountHttpService } from './services/http/administration/exp-account.http.service';
import { AccountList } from './forms/administration/account/account.list';
import { ArticleManage } from './forms/assets/articles/article.manage';
import { ArticleList } from './forms/assets/articles/article.list';
import { ArticleDetail } from './forms/assets/articles/article.detail';
import { ArticleHttpService } from './services/http/assets/article.http.service';
import { MasterTypeDetail } from './forms/assets/master-types/master-type.detail';
import { MasterTypeList } from './forms/assets/master-types/master-type.list';
import { MasterTypeManage } from './forms/assets/master-types/master-type.manage';
import { MasterTypeHttpService } from './services/http/assets/master-type.http.service';
import { ModelHttpService } from './services/http/assets/model.http.service';
import { ModelDetail } from './forms/assets/models/model.detail';
import { ModelList } from './forms/assets/models/model.list';
import { ModelManage } from './forms/assets/models/model.manage';
import { BrandDetail } from './forms/assets/brands/brand.detail';
import { BrandList } from './forms/assets/brands/brand.list';
import { BrandManage } from './forms/assets/brands/brand.manage';
import { BrandHttpService } from './services/http/assets/brand.http.service';
import { InsuranceCategoryDetail } from './forms/assets/insurance-categories/insurance-category.detail';
import { InsuranceCategoryList } from './forms/assets/insurance-categories/insurance-category.list';
import { InsuranceCategoryManage } from './forms/assets/insurance-categories/insurance-category.manage';
import { InsuranceCategoryHttpService } from './services/http/assets/insurance-category.http.service';
import { ModelDropDownList } from './forms/assets/models/model.drop-down.list';
import { BrandDropDownList } from './forms/assets/brands/brand.drop-down.list';
import { InsuranceCategoryDropDownList } from './forms/assets/insurance-categories/insurance-category.drop-down.list';
import { MasterTypeDropDownList } from './forms/assets/master-types/master-type.drop-down.list';
import { ProjectDropDownList } from './forms/assets/projects/project.drop-down.list';
import { ProjectDetail } from './forms/assets/projects/project.detail';
import { ProjectList } from './forms/assets/projects/project.list';
import { ProjectManage } from './forms/assets/projects/project.manage';
import { ProjectHttpService } from './services/http/assets/project.http.service';
import { InterCompanyHttpService } from './services/http/assets/inter-company.http.service';
import { InterCompanyDropDownList } from './forms/assets/inter-companies/inter-company.drop-down.list';
import { InterCompanyDetail } from './forms/assets/inter-companies/inter-company.detail';
import { InterCompanyList } from './forms/assets/inter-companies/inter-company.list';
import { InterCompanyManage } from './forms/assets/inter-companies/inter-company.manage';
import { TypeDetail } from './forms/administration/types/type.detail';
import { TypeList } from './forms/administration/types/type.list';
import { TypeManage } from './forms/administration/types/type.manage';
import { TypeHttpService } from './services/http/administration/type.http.service';
import { SubTypeHttpService } from './services/http/administration/sub-type.http.service';
import { SubTypeDetail } from './forms/administration/sub-types/sub-type.detail';
import { SubTypeList } from './forms/administration/sub-types/sub-type.list';
import { SubTypeManage } from './forms/administration/sub-types/sub-type.manage';
import { BoolPipeEmployeeStatus } from './forms/common/pipes/bool-pipe-employee-status';
import { CompanyHttpService } from './services/http/assets/company.http.service';
import { CompanyManage } from './forms/assets/companies/company.manage';
import { CompanyList } from './forms/assets/companies/company.list';
import { CompanyDetail } from './forms/assets/companies/company.detail';
import { CompanyDropDownList } from './forms/assets/companies/company.drop-down.list';
import { AssetRecoList } from './forms/assets/assets/asset-reco.list';
import { AssetRecoHttpService } from './services/http/assets/asset-reco.http.service';
import { DimensionDetail } from './forms/assets/dimensions/dimension.detail';
import { DimensionList } from './forms/assets/dimensions/dimension.list';
import { DimensionManage } from './forms/assets/dimensions/dimension.manage';
import { DimensionHttpService } from './services/http/administration/dimension.http.service';
import { DimensionDetailHttpService } from './services/http/administration/dimension-detail.http.service';
import { AssetInvTempDetailList } from './forms/assets/assets/asset-inv-temp-detail.list';
import { AssetComponentHttpService } from './services/http/assets/asset-component.http.service';
import { AssetEntityList } from './forms/assets/assets/asset-entity.list';
import { AssetComponentDetail } from './forms/assets/asset-components/asset-component.detail';
import { AssetComponentList } from './forms/assets/asset-components/asset-component.list';
import { AssetComponentManage } from './forms/assets/asset-components/asset-component.manage';
import { EmployeeDetailUI } from './forms/administration/employees/employee.detail.ui';
import { AssetComponentOpDetailList } from './forms/assets/asset-component-ops/asset-component-op.detail.list';
import { AssetComponentOpHttpService } from './services/http/assets/asset-component-op.http.service';
import { CityDetail } from './forms/administration/cities/city.detail';
import { CityList } from './forms/administration/cities/city.list';
import { CityManage } from './forms/administration/cities/city.manage';
import { CountyDetail } from './forms/administration/counties/county.detail';
import { CountyList } from './forms/administration/counties/county.list';
import { CountyManage } from './forms/administration/counties/county.manage';
import { CountryDetail } from './forms/administration/countries/country.detail';
import { CountryList } from './forms/administration/countries/country.list';
import { CountryManage } from './forms/administration/countries/country.manage';
import { CountrySelection } from './forms/administration/countries/country.selection';
import { CountryHttpService } from './services/http/administration/contry.http.service';
import { CountyHttpService } from './services/http/administration/county.http.service';
import { CityHttpService } from './services/http/administration/city.http.service';
import { EmailTypeDetail } from './forms/administration/email-type/email-type.detail';
import { EmailTypeList } from './forms/administration/email-type/email-type.list';
import { EmailTypeManage } from './forms/administration/email-type/email-type.manage';
import { EmailManagerDetail } from './forms/administration/email-manager/email-manager.detail';
import { EmailManagerList } from './forms/administration/email-manager/email-manager.list';
import { EmailManagerManage } from './forms/administration/email-manager/email-manager.manage';
import { EmailManagerDetailHttpService } from './services/http/administration/email-manager-detail.http.service';
import { EmailTypeHttpService } from './services/http/administration/email-type.http.service';
import { EmailManagerHttpService } from './services/http/administration/email-manager.http.service';
import { EmailManagerNotValidatePage } from './forms/common/email-manager-not-validate-page';
import { EmailManagerErrorPage } from './forms/common/email-manager-error-page';
import { EmailManagerValidatePage } from './forms/common/email-manager-validate-page';
import { EmailManagerSuccessPage } from './forms/common/email-manager-success-page';
import { AppStateHttpService } from './services/http/common/app-state.http.service';
import { AuthorizationService } from './services/authorization.service';
import { HighlightPipe } from './forms/common/pipes/highlight-pipe ';
import { DisableIfNotUnauthorizedDirective } from './directives/disableIfNotAuthorized';
import { HideIfNotUnauthorizedDirective } from './directives/hideIfNotAuthorized';
import { AssetInventoryEmployeeValidateManage } from './forms/assets/assets/asset-inventory-employee-validate.manage';
import { AssetEmployeeValidateList } from './forms/assets/assets/asset-employee-validate.list';
import { RoleService } from './services/http/identity/role.service';
import { RoleList } from './forms/auth/role.list';
import { AssetInventoryEmailManage } from './forms/assets/assets/asset-inventory-email.manage';
import { AssetInvEmailList } from './forms/assets/assets/asset-inv-email.list';
import { BoolPipeEmployeeConfirmed } from './forms/common/pipes/bool-pipe-employee-confirmed';
import { DashboardItemValidate } from './forms/dashboard/item-validate/dashboard-item-validate';
import { SanitizeHtml } from './forms/common/pipes/sanitize.html-pipe';
import { DashboardIT } from './forms/dashboard/IT/dashboard-it';
import { DashboardNONIT } from './forms/dashboard/NON-IT/dashboard-non-it';
import { ConfirmEmailPage } from './forms/common/confirm-email-page';
import { ErrorConfirmEmailPage } from './forms/common/error-confirm-email-page';
import { PasswordEmailReset } from './forms/auth/password-email-reset';
import { ErrorResetEmailPage } from './forms/common/error-reset-email-page';
import { ZoneStateList } from './forms/assets/zone-states/zone-state.list';
import { ZoneStateDetail } from './forms/assets/zone-states/zone-state.detail';
import { ZoneStateManage } from './forms/assets/zone-states/zone-state.manage';
import { ZoneStateHttpService } from './services/http/assets/zone-state.http.service';
import { ZoneStateDetailHttpService } from './services/http/assets/zone-state.detail.http.service';
import { ActiveRowPipe } from './forms/common/pipes/active-row.pipe';
import { EntityFileDelete } from './forms/common/entity-file-delete';
import { EntityTypeHttpService } from './services/http/common/entity-type.http.service';
import { AssetDetailMultipleUI } from './forms/assets/assets/asset.detail-multiple.ui';
import { EntityFileUploadMultiple } from './forms/common/entity-file-upload-multiple';
import { SyncStatusDetail } from './forms/administration/sync-status/sync-status.detail';
import { SyncStatusList } from './forms/administration/sync-status/sync-status.list';
import { SyncStatusManage } from './forms/administration/sync-status/sync-status.manage';
import { SyncStatusHttpService } from './services/http/administration/sync-status.http.service';
import { DashboardHttpService } from './services/http/common/dashboard.http.service';
import { DashboardScanErrorComponent } from './forms/dashboard/Error/dashboard-scan-error.component';
import { DashboardRoomErrorComponent } from './forms/dashboard/Error/dashboard-room-error.component';
import { AuthModule } from 'angular-auth-oidc-client';
import { NbThemeModule, NbLayoutModule, NbSidebarModule, NbMenuModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Application wide providers
const APP_PROVIDERS = [
  AppState,
  GlobalState
];

export class CustomOption extends ToastOptions {
  animate = 'flyRight'; // you can override any options available
  newestOnTop = false;
  showCloseButton = true;
  positionClass = 'toast-bottom-right';
  dismiss = 'click';
}

export type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

export function getAuthHttp(http: Http) {
    return new AuthHttp(new AuthConfig({
        noJwtError: true,
        tokenGetter: (() => localStorage.getItem('id_token'))
    }), http);
}

export function createTranslateLoader(http: Http) {
    return new TranslateHttpLoader(http, './../', '.json');
}
export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [App],
  declarations: [
    App,
    Login,
    Register,
    Password,
    PasswordReset,
    IdentityManage,
    AssetEntityList,
    AssetComponentDetail,
    AssetComponentList,
    AssetComponentManage,
    AccMonthManage,
    AccMonthList,
    AccMonthDetail,
    AdmCenterDetail,
    AdmCenterList,
    AdmCenterManage,
    AdmCenterSelection,
    AdministrationDetail,
    AdministrationList,
    AdministrationManage,
    AssetCategoryDetail,
    AssetCategoryList,
    AssetCategoryManage,
    AssetClassDetail,
    AssetClassList,
    AssetClassManage,
    AssetInventoryUpload,
    AssetTypeDetail,
    AssetTypeList,
    AssetTypeManage,
    MasterTypeDetail,
    MasterTypeList,
    MasterTypeManage,
    InsuranceCategoryDetail,
    InsuranceCategoryList,
    InsuranceCategoryManage,
    ProjectDetail,
    ProjectList,
    ProjectManage,
    InterCompanyDetail,
    InterCompanyList,
    InterCompanyManage,
    CompanyDropDownList,
    CompanyDetail,
    CompanyList,
    CompanyManage,
    DimensionDetail,
    DimensionList,
    DimensionManage,
    ModelDetail,
    ModelList,
    ModelManage,
    BrandDetail,
    BrandList,
    BrandManage,
    AssetStateManage,
    AssetStateDetail,
    AssetStateList,
    ZoneStateManage,
    ZoneStateDetail,
    ZoneStateList,
    AssetDetailUI,
    AssetDetailMultipleUI,
    AssetList,
    AssetRecoList,
    AssetNiList,
    AssetDepDetailList,
    AssetInvDetailList,
    AssetInvTempDetailList,
    AssetInvFullDetailList,
    AssetInvEmailList,
    AssetManage,
    AssetOpManage,
    AssetOpDetailList,
    AssetComponentOpDetailList,
    AssetDepManage,
    AssetInventoryManage,
    AssetInventoryEmailManage,
    AssetTypeDropDownList,
    ModelDropDownList,
    BrandDropDownList,
    InsuranceCategoryDropDownList,
    MasterTypeDropDownList,
    ProjectDropDownList,
    InterCompanyDropDownList,
    AssetInventoryEmployeeValidateManage,
    AssetEmployeeValidateList,
    CityDetail,
    CityList,
    CityManage,
    CountyDetail,
    CountyList,
    CountyManage,
    CountryDetail,
    CountryList,
    CountryManage,
    CountrySelection,
    CostCenterDetail,
    CostCenterList,
    CostCenterManage,
    ConfigValuesManage,
    ConfigValuesList,
    ConfigValuesDetail,
    ColumnDefinitionDetail,
    ColumnDefinitionList,
    ChartComponent,
    Dashboard,
    DashboardIT,
    DashboardNONIT,
    DashboardItemValidate,
    DictionaryTypeDetail,
    DictionaryTypeList,
    DictionaryTypeManage,
    DictionaryItemDetail,
    DictionaryItemList,
    DictionaryItemManage,
    EmailTypeDetail,
    EmailTypeList,
    EmailTypeManage,
    EmailManagerDetail,
    EmailManagerList,
    EmailManagerManage,
    ConfirmEmailPage,
    ErrorConfirmEmailPage,
    PasswordEmailReset,
    ErrorResetEmailPage,
    DivisionDetail,
    DivisionList,
    DivisionManage,
    DocumentTypeDropDownList,
    DepartmentDetail,
    DepartmentList,
    DepartmentManage,
    EmployeeDetail,
    EmployeeList,
    EmployeeManage,
    EmployeeDetailUI,
    EntityFileList,
    EntityFileDownload,
    EntityFileUpload,
    EntityFileUploadMultiple,
    FieldByNamePipe,
    FieldByColumnDefinitionPipe,
    InvCompDetailList,
    InvCompOpDetailList,
    InvStateManage,
    InvStateDetail,
    InvStateList,
    InventoryDetail,
    InventoryList,
    InventoryManage,
    InventoryInvCompList,
    InventoryInvCompManage,
    InvCompOpInvDetailList,
    InvCompOpInvDetailManage,
    AssetInventoryReport,
    LocationMap,
    LocationMapDashBoard,
    LocationDetail,
    LocationList,
    LocationManage,
    TypeDetail,
    TypeList,
    TypeManage,
    SubTypeDetail,
    SubTypeList,
    SubTypeManage,
    LeafletMaps,
    OperationDetail,
    PartnerDetail,
    PartnerList,
    PartnerManage,
    PartnerLocationManage,
    PartnerLocationList,
    PartnerLocationDetail,
    AssetNatureManage,
    AssetNatureList,
    AssetNatureDetail,
    BudgetManagerManage,
    BudgetManagerList,
    BudgetManagerDetail,
    AccountManage,
    AccountList,
    AccountDetail,
    ExpAccountManage,
    ExpAccountList,
    ExpAccountDetail,
    ArticleManage,
    ArticleList,
    ArticleDetail,
    PieChart,
    RegionDetail,
    RegionList,
    RegionManage,
    RegionSelection,
    RoomDetail,
    RoomList,
    RoomManage,
    UomDetail,
    UomList,
    UomManage,
    TrafficChart,
    Todo,
    UsersMap,
    LineChart,
    Calendar,
    ChartistJs,
    TableDefinitionList,
    TableDefinitionManage,
    UserList,
    RoleList,
    EmailManagerNotValidatePage,
    EmailManagerErrorPage,
    EmailManagerValidatePage,
    EmailManagerSuccessPage,
    HighlightPipe,
    SanitizeHtml,
    DisableIfNotUnauthorizedDirective,
    HideIfNotUnauthorizedDirective,
    ActiveRowPipe,
    EntityFileDelete,
    SyncStatusDetail,
    SyncStatusList,
    SyncStatusManage,
    DashboardScanErrorComponent,
    DashboardRoomErrorComponent
  ],
  imports: [
    BrowserModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbSidebarModule.forRoot(),
    NbMenuModule.forRoot(),
    NbEvaIconsModule,
    HttpModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    FileUploadModule,
    ToastModule.forRoot(),
    NgaModule.forRoot(),
    CollapseModule.forRoot(),
    DatepickerModule.forRoot(),
    // DropdownModule.forRoot(),
    PaginationModule.forRoot(),
    ProgressbarModule.forRoot(),
    ModalModule.forRoot(),
    ChartModule,
    DatePickerModule,
    TabsModule.forRoot(),
    TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: this.HttpLoaderFactory!,
                deps: [Http]
            }
        }),
    // Ng2Bs3ModalModule,
    routing
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    {provide: RouteReuseStrategy, useClass: CustomReuseStrategy},
    APP_PROVIDERS,
    { provide: RouteReuseStrategy, useClass: CustomReuseStrategy },
    {provide: ToastOptions, useClass: CustomOption},
    AuthGuard,
    AuthorizationService,
    AuthenticationService,
    AdministrationHttpService,
    ChartService,
    ChartistJsService,
    TableDefinitionHttpService,
    ColumnDefinitionHttpService,
    ConfigValuesHttpService,
    DictionaryTypeHttpService,
    DictionaryItemHttpService,
    EmailTypeHttpService,
    EmailManagerHttpService,
    EmailManagerDetailHttpService,
    DivisionHttpService,
    DimensionHttpService,
    DimensionDetailHttpService,
    IdentityService,
    RoleService,
    CostCenterHttpService,
    DepartmentHttpService,
    DocumentHttpService,
    AssetHttpService,
    AssetRecoHttpService,
    AssetOpHttpService,
    AssetStateHttpService,
    ZoneStateHttpService,
    ZoneStateDetailHttpService,
    MasterTypeHttpService,
    InsuranceCategoryHttpService,
    CountryHttpService,
    CountyHttpService,
    CityHttpService,
    ProjectHttpService,
    InterCompanyHttpService,
    CompanyHttpService,
    ModelHttpService,
    TypeHttpService,
    SubTypeHttpService,
    BrandHttpService,
    EmployeeHttpService,
    RoomHttpService,
    EntityTypeHttpService,
    InvStateHttpService,
    DashboardHttpService,
    PartnerLocationHttpService,
    InventoryDetailHttpService,
    UomHttpService,
    SyncStatusHttpService,
    UserReportHttpService,
    PieChartService,
    TrafficChartService,
    AssetNatureHttpService,
    BudgetManagerHttpService,
    AccountHttpService,
    ExpAccountHttpService,
    ArticleHttpService,
    TodoService,
    UsersMapService,
    LineChartService,
    LocationHttpService,
    AssetComponentOpHttpService,
    CalendarService,
    ProgressBarService,
    AssetComponentHttpService,
    AppStateHttpService,
    {
        provide: AuthHttp,
        useFactory: getAuthHttp,
        deps: [Http]
    },
    DatePipe,
    DecimalPipe,
    BoolPipe,
    BoolPipeState,
    BoolPipeInventory,
    BoolPipeEmployee,
    BoolPipeEmployeeStatus,
    BoolPipeEmployeeConfirmed,
    MergePipe,
    MergeRoom,
    HighlightPipe,
    ActiveRowPipe,
    SanitizeHtml
  ],
  exports: [ HighlightPipe, DisableIfNotUnauthorizedDirective, HideIfNotUnauthorizedDirective, SanitizeHtml]
})

// ,
//     { provide: RouteReuseStrategy, useClass: CustomReuseStrategy }

export class AppModule {

  constructor(public appRef: ApplicationRef, public appState: AppState) {
  }

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    // console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }
    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }
}
