import { Component, OnInit } from '@angular/core';
import { DashboardHttpService } from 'app/services/http/common/dashboard.http.service';

@Component({
  templateUrl: 'dashboard-scan-error.component.html',
  styleUrls: ['./dashboard-scan-error.component.scss']
})
export class DashboardScanErrorComponent implements OnInit {


   public InventoryId = 5;
   public itemsArray= [];

  constructor(
    public dashboardHttpService: DashboardHttpService) {
  }

  ngOnInit() {
    this.updateData(this.InventoryId);
  }

  ngAfterViewInit() {
  }


public updateData(inventoryId: number) {

  this.dashboardHttpService.scanErrors(inventoryId).subscribe( (res: any[]) => {
    this.itemsArray = res;
});

}
}
