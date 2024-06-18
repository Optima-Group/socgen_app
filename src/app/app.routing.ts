import { AccMonthManage } from './forms/accounting/acc-month.manage';
import { InventoryReport } from './forms/inventory/inventory.report';
import { PasswordReset } from './forms/auth/password-reset';
import { AssetOpManage } from './forms/assets/asset-ops/asset-op-manage';
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { AuthGuard } from './services/auth.guard';

import { Login } from './forms/auth/login';
import { Register } from './forms/auth/register';
import { AssetCategoryManage } from './forms/assets/asset-categories/asset-category.manage';
import { AssetClassManage } from './forms/assets/asset-classes/asset-class.manage';
// import { AssetDepDetailManage } from './forms/assets/assets/asset-dep-detail.manage';
// import { AssetInvDetailManage } from './forms/assets/assets/asset-inv-detail.manage';
import { AssetManage } from './forms/assets/assets/asset.manage';
import { AssetDepManage } from "app/forms/assets/assets/asset-dep.manage";
import { AssetDetailUI } from './forms/assets/assets/asset.detail.ui';
import { AdmCenterManage } from './forms/administration/adm-centers/adm-center.manage';
import { CostCenterManage } from './forms/administration/cost-centers/cost-center.manage';
import { DepartmentManage } from './forms/administration/departments/department.manage'
import { EmployeeManage } from './forms/administration/employees/employee.manage'
import { InventoryInvCompManage } from './forms/inventory/inv-comp/inventory-inv-comp.manage';
import { InvCompOpInvDetailManage } from './forms/inventory/inv-comp/inv-comp-op-inv-detail.manage';
import { LocationManage } from './forms/administration/locations/location.manage'
import { OperationDetail } from './forms/documents/operations/operation.detail'
import { PartnerManage } from './forms/documents/partners/partner.manage'
import { RoomManage } from './forms/administration/rooms/room.manage'
import { AssetInventoryManage } from "app/forms/assets/assets/asset-inventory.manage";
import { IdentityManage } from './forms/auth/identity.manage'
import { Password } from "app/forms/auth/password";
import { InventoryManage } from "app/forms/inventory/inventory.manage";
import { AssetOpFullDetailList } from "app/forms/assets/asset-ops/asset-op-full-detail";
import { AssetInventoryReport } from "app/forms/assets/assets/asset-inventory-report";
import { ConfigValuesManage } from "app/forms/common/config-values.manage";
import { TableDefinitionManage } from "app/forms/common/table-definition/table-definition.manage";
import { InvStateManage } from "app/forms/inventory/inv-state/inv-state.manage";
import { AssetTypeManage } from 'app/forms/assets/asset-types/asset-type.manage';
import { AdministrationManage } from 'app/forms/administration/administrations/administration.manage';
import { DivisionManage } from 'app/forms/administration/divisions/division.manage';
import { UomManage } from './forms/assets/uoms/uom.manage';
import { DictionaryTypeManage } from './forms/administration/dictionary-type/dictionary-type.manage';
import { DictionaryItemManage } from './forms/administration/dictionary-item/dictionary-item.manage';
import { RegionManage } from './forms/administration/regions/region.manage';
import { AssetStateManage } from './forms/assets/asset-states/asset-state.manage';
import { LocationMap } from './forms/common/Maps/maps';
import { PartnerLocationManage } from './forms/documents/partner-locations/partner-location.manage';
import { AssetNatureManage } from './forms/assets/asset-natures/asset-nature.manage';
import { BudgetManagerManage } from './forms/assets/budget-manager/budget-manager.manage';
import { AccountManage } from './forms/administration/account/account.manage';
import { ExpAccountManage } from './forms/administration/exp-account/exp-account.manage';
import { ArticleManage } from './forms/assets/articles/article.manage';
import { MasterTypeManage } from './forms/assets/master-types/master-type.manage';
import { ModelManage } from './forms/assets/models/model.manage';
import { BrandManage } from './forms/assets/brands/brand.manage';
import { InsuranceCategoryManage } from './forms/assets/insurance-categories/insurance-category.manage';
import { ProjectManage } from './forms/assets/projects/project.manage';
import { InterCompanyManage } from './forms/assets/inter-companies/inter-company.manage';
import { TypeManage } from './forms/administration/types/type.manage';
import { SubTypeManage } from './forms/administration/sub-types/sub-type.manage';
import { CompanyManage } from './forms/assets/companies/company.manage';
import { DimensionManage } from './forms/assets/dimensions/dimension.manage';
import { AssetComponentManage } from './forms/assets/asset-components/asset-component.manage';
import { EmployeeDetailUI } from './forms/administration/employees/employee.detail.ui';
import { CountryManage } from './forms/administration/countries/country.manage';
import { CountyManage } from './forms/administration/counties/county.manage';
import { CityManage } from './forms/administration/cities/city.manage';
import { EmailTypeManage } from './forms/administration/email-type/email-type.manage';
import { EmailManagerManage } from './forms/administration/email-manager/email-manager.manage';
import { EmailManagerNotValidatePage } from './forms/common/email-manager-not-validate-page';
import { EmailManagerErrorPage } from './forms/common/email-manager-error-page';
import { EmailManagerValidatePage } from './forms/common/email-manager-validate-page';
import { EmailManagerSuccessPage } from './forms/common/email-manager-success-page';
import { Dashboard } from './forms/dashboard/dashboard';
import { AssetInventoryEmployeeValidateManage } from './forms/assets/assets/asset-inventory-employee-validate.manage';
import { AssetInventoryEmailManage } from './forms/assets/assets/asset-inventory-email.manage';
import { DashboardItemValidate } from './forms/dashboard/item-validate/dashboard-item-validate';
import { DashboardIT } from './forms/dashboard/IT/dashboard-it';
import { DashboardNONIT } from './forms/dashboard/NON-IT/dashboard-non-it';
import { PasswordEmailReset } from './forms/auth/password-email-reset';
import { ConfirmEmailPage } from './forms/common/confirm-email-page';
import { ErrorConfirmEmailPage } from './forms/common/error-confirm-email-page';
import { ErrorResetEmailPage } from './forms/common/error-reset-email-page';
import { ZoneStateManage } from './forms/assets/zone-states/zone-state.manage';
import { AssetDetailMultipleUI } from './forms/assets/assets/asset.detail-multiple.ui';
import { SyncStatusManage } from './forms/administration/sync-status/sync-status.manage';
import { DashboardScanErrorComponent } from './forms/dashboard/Error/dashboard-scan-error.component';
import { DashboardRoomErrorComponent } from './forms/dashboard/Error/dashboard-room-error.component';

export const AppRoutes: Routes = [
    // { path: 'dashboard', redirectTo: 'assets/inv', pathMatch: 'full' },
    { path: 'nomenclatures', component: AssetCategoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/assetcategories', component: AssetCategoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'assetcomponents', component: AssetComponentManage, canActivate: [AuthGuard], data: { auth: 'MENU_ACCESORIES', shouldDetach: false} },
    { path: 'nomenclatures/uoms', component: UomManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/assetclasses', component: AssetClassManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/assettypes', component: AssetTypeManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/mastertypes', component: MasterTypeManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/insurancecategories', component: InsuranceCategoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/projects', component: ProjectManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/intercompanies', component: InterCompanyManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/companies', component: CompanyManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/models', component: ModelManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/brands', component: BrandManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true } },
    { path: 'nomenclatures/types', component: TypeManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/subtypes', component: SubTypeManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'asset/:id', component: AssetDetailUI, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU' }  },
    { path: 'asset/multiple/:id', component: AssetDetailMultipleUI, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU' }  },
    { path: 'employee/:id', component: EmployeeDetailUI, canActivate: [AuthGuard], data: { auth: 'MENU_EMPLOYEES_DETAIL' }  },
    // { path: 'newasset', component: AssetDetailUI, canActivate: [AuthGuard], data: { shouldDetach: true } },
    { path: 'newasset', component: AssetDetailUI, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU' }  },
    { path: 'assets/:view', component: AssetManage, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU' }  },
    { path: 'assetdepdetails', component: AssetDepManage, canActivate: [AuthGuard], data: { shouldDetach: true} },
    { path: 'assetinvdetails', component: AssetManage, canActivate: [AuthGuard], data: { auth: 'MENU_ASSETS', shouldDetach: false} },
    { path: 'dashboards', component: Dashboard, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'dashboards/inventory', component: Dashboard, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'dashboards/it', component: DashboardIT, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'dashboards/nonit', component: DashboardNONIT, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'dashboards/erroremployee', component: DashboardScanErrorComponent, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'dashboards/errorroom', component: DashboardRoomErrorComponent, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'maps', component: LocationMap, canActivate: [AuthGuard], data: { auth: 'PUBLIC_MENU' } },
    { path: 'notvalidate/:id', component: EmailManagerNotValidatePage},
    { path: 'validate', component: EmailManagerValidatePage},
    { path: 'success', component: EmailManagerSuccessPage},
    { path: 'error', component: EmailManagerErrorPage},
    // { path: 'assetdepdetails', component: AssetManage },
    // { path: 'assetinvdetails', component: AssetManage },
    { path: 'nomenclatures/admcenters', component: AdmCenterManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/regions', component: RegionManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/costcenters', component: CostCenterManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/departments', component: DepartmentManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/dimensions', component: DimensionManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'employees', component: EmployeeManage, canActivate: [AuthGuard], data: { auth: 'MENU_EMPLOYEES', shouldDetach: false} },
    { path: 'syncstatus', component: SyncStatusManage, canActivate: [AuthGuard], data: { auth: 'MENU_EMPLOYEES', shouldDetach: false} },
    { path: 'operations', component: AssetOpManage, canActivate: [AuthGuard], data: { shouldDetach: false, auth: 'MENU_OPERATIONS' } },
    { path: 'nomenclatures/assetnatures', component: AssetNatureManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/budgetmanagers', component: BudgetManagerManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/accounts', component: AccountManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/expaccounts', component: ExpAccountManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/articles', component: ArticleManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'inventory', component: AssetInventoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_INVENTORY', shouldDetach: true} },
    { path: 'inventory/filter', component: AssetInventoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_INVENTORY_FILTER', shouldDetach: true} },
    { path: 'inventory/reports', component: AssetInventoryReport, canActivate: [AuthGuard], data: { auth: 'MENU_INVENTORY_REPORTS', shouldDetach: true} },
    { path: 'nomenclatures/lists', component: InventoryManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/months', component: AccMonthManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/invstates', component: InvStateManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/assetstates', component: AssetStateManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/zonestates', component: ZoneStateManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/locations', component: LocationManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/partners', component: PartnerManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/partnerlocations', component: PartnerLocationManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/rooms', component: RoomManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/divisions', component: DivisionManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/dictionarytypes', component: DictionaryTypeManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/dictionaryitems', component: DictionaryItemManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    // { path: 'emailmanagers', component: EmailManagerManage, canActivate: [AuthGuard], data: { auth: 'EMAIL_MENU', shouldDetach: true} },
     { path: 'emailmanagers', component: AssetInventoryEmailManage, canActivate: [AuthGuard], data: { auth: 'EMAIL_MENU', shouldDetach: true} },
    { path: 'emailtypes', component: EmailTypeManage, canActivate: [AuthGuard], data: { auth: 'EMAIL_MENU', shouldDetach: true} },
    { path: 'nomenclatures/administrations', component: AdministrationManage, canActivate: [AuthGuard], data: {  auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/countries', component: CountryManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/counties', component: CountyManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'nomenclatures/cities', component: CityManage, canActivate: [AuthGuard], data: { auth: 'MENU_NOMENCLATURES', shouldDetach: true} },
    { path: 'newoperation', component: OperationDetail, canActivate: [AuthGuard], data: { auth: 'MENU_NEW_OPERATION', shouldDetach: false}  },
    { path: 'config', component: ConfigValuesManage, canActivate: [AuthGuard], data: { auth: 'SECURITY_MENU',  shouldDetach: true} },
    { path: 'identity', component: IdentityManage, canActivate: [AuthGuard], data: { auth: 'SECURITY_MENU', shouldDetach: true} },
    { path: 'config/global', component: ConfigValuesManage, canActivate: [AuthGuard], data: { auth: 'SECURITY_MENU', shouldDetach: true} },
    { path: 'config/tables', component: TableDefinitionManage, canActivate: [AuthGuard], data: { auth: 'SECURITY_MENU', shouldDetach: true} },
    { path: 'employeevalidates/:id', component: AssetInventoryEmployeeValidateManage, data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'itemvalidates/:id', component: DashboardItemValidate, data: { auth: 'PUBLIC_MENU', shouldDetach: false} },
    { path: 'employeevalidates', component: AssetInventoryEmployeeValidateManage, data: { auth: 'PUBLIC_MENU', shouldDetach: true} },


    { path: 'signin', component: Login },
    { path: 'signup', component: Register },
    { path: 'password', component: Password },
    { path: 'passwordreset/:userName', component: PasswordReset },


    { path: 'passwordemailreset', component: PasswordEmailReset },
    { path: 'confirmemail', component: ConfirmEmailPage },
    { path: 'errorconfirmemail', component: ErrorConfirmEmailPage },
    { path: 'errorresetemail', component: ErrorResetEmailPage },

    { path: '**', redirectTo: 'signin' },
    // { path: '', redirectTo: 'signin' }
    { path: '', redirectTo: 'assetinvdetails', pathMatch: 'full', canActivate: [AuthGuard] }
  // { path: '', redirectTo: 'pages', pathMatch: 'full' },
  // { path: '**', redirectTo: 'pages/dashboard' }
  // { path: '', redirectTo: '/costcenters', pathMatch: 'full' },
  // { path: 'costcenters', component: CostCenterManage }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(AppRoutes, { useHash: true });
