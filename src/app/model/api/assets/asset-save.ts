export class AssetSave {
    id: number;
    invNo: string;
    invNoOld: string;
    name: string;
    serialNumber: string;
    erpCode: string;
    info: string;

    documentTypeId: number;
    documentId: number;
    docNo1: string;
    docNo2: string;
    documentDate: Date;
    partnerId: number;
    partnerDate: Date;
    assetTypeId: number;
    assetSystemId: number;

    // costCenterId: number;
    // assetClassId: number;
    valueInv: number;
    valueDep: number;
    valueDepPU: number;
    depPeriodMonth: number;
    valueRem: number;

    assetCategoryId: number;
    administrationId: number;
    dictionaryItemId: number;
    employeeId: number;
    roomId: number;
    quantity: number;

    validated: boolean;
    purchaseDate: Date;
    partner: string;
    invState: string;
    details: string;
    model: string;
    invStateId: number;
    costCenterId : number;
    departmentId: number;
    companyId: number;
    uomId: number;
    receptionDate: Date;
    invoiceDate: Date;
    poDate: Date;
    startDate: Date;
    endDate: Date;
    removalDate: Date;
    subTypeId: number;
    insuranceCategoryId: number;
    modelId: number;
    brandId: number;
    assetNatureId: number;
    budgetManagerId: number;
    projectId: number;
    interCompanyId: number;
    dimensionId: number;
    modelInv: string;
    producerInv: string;
    isAccepted : boolean;
}
