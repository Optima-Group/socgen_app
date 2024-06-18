export class PagingInfo {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    sumValueInv: number;
    sumValueRem: number;

    constructor(totalItems: number, pageSize: number, currentPage: number, sumValueInv: number, sumValueRem: number) {
        this.totalItems = totalItems;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.sumValueInv = sumValueInv;
        this.sumValueRem = sumValueRem;
    }
}