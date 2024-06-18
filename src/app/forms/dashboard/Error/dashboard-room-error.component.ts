import { Component, OnInit } from '@angular/core';
import { DashboardHttpService } from 'app/services/http/common/dashboard.http.service';

@Component({
  templateUrl: 'dashboard-room-error.component.html',
  styleUrls: ['./dashboard-room-error.component.scss']
})
export class DashboardRoomErrorComponent implements OnInit {


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

  this.dashboardHttpService.scanErrorPhotos(inventoryId).subscribe( (res: any[]) => {
    this.itemsArray = res;
});

}
}
