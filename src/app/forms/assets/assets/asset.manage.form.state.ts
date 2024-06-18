import { CostCenter } from './../../../model/api/administration/cost-center';
import { Partner } from '../../../model/api/documents/partner';
import { AssetCategory } from '../../../model/api/assets/asset-category';
import { AssetClass } from '../../../model/api/assets/asset-class';
import { AssetDepDetail } from '../../../model/api/assets/asset-dep-detail';
import { AssetInvDetail } from '../../../model/api/assets/asset-inv-detail';
import { AssetSimpleDetail } from '../../../model/api/assets/asset-simple-detail';
import { Department } from '../../../model/api/administration/department';
import { Employee } from '../../../model/api/administration/employee';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { PagedResult } from '../../../model/common/paged-result';
import { Param } from '../../../model/common/param';
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";

export class AssetManageFormState {
    public static PartnerSelection: Array<Partner> = new Array<Partner>();
    public static AssetCategorySelection: Array<AssetCategory> = new Array<AssetCategory>();
    public static AssetClassSelection: Array<AssetClass> = new Array<AssetClass>();
    public static DepartmentSelection: Array<Department> = new Array<Department>();
    public static EmployeeSelection: Array<Employee> = new Array<Employee>();
    public static LocationSelection: Array<Location> = new Array<Location>();
    public static CostCenterSelection: Array<CostCenter> = new Array<CostCenter>();
    public static RoomSelection: Array<Room> = new Array<Room>();
    public static Filter: string = '';
    public static SortingColumn: string = '';
    public static SortingDirection: string = '';
    public static Params: Array<Param> = new Array<Param>();
    public static AssetRowSelection: string = '';

    public static SelectedAssets: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
}

export class AssetInvManageFormState extends AssetManageFormState {
    public static SelectedAssetInvDetails: Array<AssetInvDetail> = new Array<AssetInvDetail>();
    public static CurrentPageData: PagedResult<AssetInvDetail> = null;
}

export class AssetDepManageFormState extends AssetManageFormState {
    public static SelectedAssetDepDetails: Array<AssetDepDetail> = new Array<AssetDepDetail>();
    public static CurrentPageData: PagedResult<AssetDepDetail> = null;
    //public static CurrentPageData: AssetDepPagedResult = null;
}