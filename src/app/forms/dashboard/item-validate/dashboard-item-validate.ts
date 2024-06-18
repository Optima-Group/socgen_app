import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { AssetHttpService } from 'app/services/http/assets/asset.http.service';
import { BaThemeConfigProvider, colorHelper } from 'app/theme';
import { ModalDirective, TabDirective, TabsetConfig } from 'ng2-bootstrap';
import * as Chartist from 'chartist';
import * as MyLegend from 'chartist-plugin-legend';
import * as ctPointLabels from 'chartist-plugin-pointlabels';
import { InventoryHttpService } from 'app/services/http/inventory/inventory.http.service';
import { Inventory } from 'app/model/api/inventory/inventory';
import { InventoryList } from 'app/forms/inventory/inventory.list';
import { ActivatedRoute, Params } from '@angular/router';
import { ItemValidate } from 'app/model/common/import/item-validate';
import { EmployeeHttpService } from 'app/services/http/administration/employee.http.service';
import { Employee } from 'app/model/api/administration/employee';
import { ItemDateValidate } from 'app/model/common/import/item-date-validate';
// import * as ctBarLabels from 'chartist-plugin-barlabels';
declare const window: any;

export function getTabsetConfig(): TabsetConfig {
  return Object.assign(new TabsetConfig(), { type: 'pills', isKeysAllowed: true });
}

@Component({
  selector: 'dashboard-item-validate',
  styleUrls: ['./dashboard-item-validate.scss'],
  templateUrl: './dashboard-item-validate.html',
  providers: [ InventoryHttpService, { provide: TabsetConfig, useFactory: getTabsetConfig }]
})
export class DashboardItemValidate implements OnInit {

   chart: any;
   public charts: Array<Object>;
   private _init = false;
   public chartPies: Array<Object>;

   value: string;

   mCount = 0;
   bCount = 0;
   sCount = 0;

   curentItemSelected=  '';
   curentItemSelected2 = '';

   selectedItemType = '';

   min = new Date('2021-02-23');
   max = new Date('2021-03-10');

   public doughnutData: Array<Object>;
   @ViewChild('inventoryList') public inventoryList: InventoryList;
   @ViewChild('inventoryListModal') public inventoryListModal: ModalDirective;

   private selectedInventories: Array<Inventory> = new Array<Inventory>();
   private inventoryId = 5;
   guid: string = '';
   employee: Employee;
   currentTabId = 0;

   tabPrefix = '';

  constructor(
    private assetHttpService: AssetHttpService,
    private inventoryHttpService: InventoryHttpService,
    private employeeHttpService: EmployeeHttpService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute,
    private _baConfig: BaThemeConfigProvider) {
    this.route.params.subscribe((params: Params) => {
      if (params['id']) {
          this.guid = params['id'];
      }
  });

  }

  ngOnInit() {
    this.updateData(this.inventoryId);
    this.employeeHttpService.getByGUID(this.guid).subscribe( (res) => {
      this.employee = res;
    });
  }

  ngAfterViewInit() {
    if (!this._init) {
      this._loadPieCharts();
      this._updatePieCharts();
      this.updatePickupDate();
      this._init = true;
    }
  }

  ngAfterContentChecked() {
    this.cdr.detectChanges();
 // call or add here your code

 this.currentTabId = 3;

 if (this.employee != null && this.employee.selectedItem != null && this.employee.selectedItem != '') {

  if(this.employee.selectedItem === 'B') {
    // this.currentTabId = 0;
    this.curentItemSelected = 'Birou operational Arkus (1400x800x735h – aprox. 27 kg).';
  } else if(this.employee.selectedItem === 'S') {
    // this.currentTabId = 1;
    this.curentItemSelected = 'Scaun operational Rim Flexi 1104 (680x1200h – aprox. 18 kg).';
  } else if(this.employee.selectedItem === 'M') {
    // this.currentTabId = 2;
    this.curentItemSelected = 'Monitor Dell/Hp 23’’, 24’’, 27’’ (aprox. – 5-10 kg).';
  } else {
    // this.currentTabId = 3;
    this.curentItemSelected = '';
  }

  this.cdr.detach();

}

if (this.employee != null && this.employee.selectedItem2 != null && this.employee.selectedItem2 != '') {

  if(this.employee.selectedItem2 === 'B') {
    // this.currentTabId = 0;
    this.curentItemSelected2 = 'Birou operational Arkus (1400x800x735h – aprox. 27 kg).';
  } else if(this.employee.selectedItem2 === 'S') {
    // this.currentTabId = 1;
    this.curentItemSelected2 = 'Scaun operational Rim Flexi 1104 (680x1200h – aprox. 18 kg).';
  } else if(this.employee.selectedItem2 === 'M') {
    // this.currentTabId = 2;
    this.curentItemSelected2 = 'Monitor Dell/Hp 23’’, 24’’, 27’’ (aprox. – 5-10 kg).';
  } else {
    // this.currentTabId = 3;
    this.curentItemSelected2 = '';
  }

  this.cdr.detach();

}
}

reload() {
  this.updateData(this.inventoryId);
  this.updatePickupDate();
  this.employeeHttpService.getByGUID(this.guid).subscribe( (res) => {
    this.employee = res;
    this.selectedItemType = '';
    this.cdr.detectChanges();
    // call or add here your code

    if (this.employee != null && this.employee.selectedItem != null && this.employee.selectedItem != '') {
     if(this.employee.selectedItem === 'B') {
       this.currentTabId = 0;
       this.curentItemSelected = 'Birou operational Arkus (1400x800x735h – aprox. 27 kg).';
     } else if(this.employee.selectedItem === 'S') {
       this.currentTabId = 1;
       this.curentItemSelected = 'Scaun operational Rim Flexi 1104 (680x1200h – aprox. 18 kg).';
     } else if(this.employee.selectedItem === 'M') {
       this.currentTabId = 2;
       this.curentItemSelected = 'Monitor Dell/Hp 23’’, 24’’, 27’’ (aprox. – 5-10 kg).';
     } else {
       this.currentTabId = 3;
       this.curentItemSelected = '';
     }

     this.cdr.detach();

   }
  });
}


  onSelect(data: TabDirective): void {
    this.value = data.heading;
    this.tabPrefix = this.value.substring(0, 1) === 'D' ? 'B' : this.value.substring(0, 1) === 'C' ? 'S' : 'M';
    // this.updateData(this.inventoryId);
  }

  save() {

    let item = new ItemValidate(this.value, this.value.substring(0, 1) === 'M' ? this.selectedItemType: '', this.guid, false);
    this.assetHttpService.itemValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The data was saved successfully');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday 22-02-2021 at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      } else if (res.statusCode === 700) {
        alert('Monitors with standard support are no longer available!');
        this.reload();
      } else if (res.statusCode === 701) {
        alert('Metal arm monitors are no longer available!');
        this.reload();
      } else if (res.statusCode === 800) {
        alert('The item has already been picked-up!');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }

      this.selectedItemType = '';

    });
  }


  reject() {
    let item = new ItemValidate(this.value, this.selectedItemType, this.guid, true);
    this.assetHttpService.itemValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The data was saved successfully');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday 22-02-2021 at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }
      this.selectedItemType = '';

    });
  }

  private selectInventories() {

    this.inventoryListModal.show();
    this.inventoryList.selectedItems = this.selectedInventories;
    this.inventoryList.refresh(null);
}

private setSelectedInventories() {
  this.selectedInventories = this.inventoryList.selectedItems;
  this.inventoryListModal.hide();
  this.inventoryId = this.inventoryList != null && this.inventoryList.selectedItems[0] != null ? this.inventoryList.selectedItems[0].id : 3;
  this.updateData(this.inventoryId);
  }


private updateData(inventoryId: number) {

  this.assetHttpService.items(inventoryId).subscribe( (res) => {

    let m: number = +res.map(r => r.m);
    let pieProcentages: number = +res.map(r => r.procentage);
    let b: number = +res.map(r => r.b);
    let s: number = +res.map(r => r.s);
    let pieColor = 'rgb(255, 87, 25)';


    this.mCount = m;
    this.bCount = b;
    this.sCount = s;

    this.chartPies =
[
  {
    color: pieColor,
    description: 'Monitors available',
    stats: m,
    icon: 'refresh',
  },
  {
    color: pieColor,
    description: 'Operational desk available',
    stats: b,
    icon: 'money',
  },

  {
    color: pieColor,
    description: 'Operational chair available',
    stats: s,
    icon: 'person'
  },


  // {
  //   color: pieColor,
  //   description: 'Imobilizari nescanate',
  //   stats: notScanned,
  //   icon: 'person'
  // },

   {
    color: pieColor,
    description: 'Procentage confirmed',
    stats: pieProcentages,
    icon: 'face',
  },
  // {
  //   color: pieColor,
  //   description: 'Plusuri temporare',
  //   stats: totalTemp,
  //   icon: '',
  // },
  //   {
  //   color: pieColor,
  //   description: 'Total puncte de lucru',
  //   stats: totalAdministration,
  //   icon: '',
  // },
  // {
  //   color: pieColor,
  //   description: 'Puncte de lucru finalizate',
  //   stats: finishedAdministration,
  //   icon: '',
  // },

  // {
  //   color: pieColor,
  //   description: 'Procent puncte de lucru finalizate',
  //   stats: procentageAdministration,
  //   icon: '',
  // }

];

});

}

private _loadPieCharts() {

  jQuery('.chart').each(function () {
    let chart = jQuery(this);
    chart.easyPieChart({
      easing: 'easeOutBounce',
      onStep: function (from, to, percent) {
        jQuery(this.el).find('.percent').text(Math.round(percent));
      },
      barColor: jQuery(this).attr('data-rel'),
      trackColor: 'rgba(0,0,0,0)',
      size: 84,
      scaleLength: 0,
      animation: 1000,
      lineWidth: 9,
      lineCap: 'round',
    });
  });

}

private _updatePieCharts() {
  let getRandomArbitrary = (min, max) => { return Math.random() * (max - min) + min; };

  jQuery('.pie-charts .chart').each(function(index, chart) {
    jQuery(chart).data('easyPieChart').update(getRandomArbitrary(55, 90));
  });
}

private updatePickupDate() {

  this.assetHttpService.getPickupDate().subscribe((res) => {

  let dashboardColors = this._baConfig.get().colors.dashboard;

            let total = res.map(r => r.total);
            let pickupDate = res.map(r => r.pickupDate.substring(0, 10));
            let selectedItem = res.map(r => r.selectedItem);
            let selectedItem2 = res.map(r => r.selectedItem2);
            let selectedItemType = res.map(r => r.selectedItemType);

            let maxPerDay = total.reduce((max, val) => max > val ? max : val, total[0]);

        var data =  {
          labels: pickupDate,
          datasets: [
            {
              label: "",
              backgroundColor: ["#3e95cd ", "#FA910F","#c45850","#3cba9f","#ED4C64", "#BA4D29", "#8e5ea2", '#93EF88', '#A397F0', '#F2EBD5', '#97E6F0'],
              hoverBackgroundColor: [
                "#3e15cd ", "#FA110F","#c41850","#1cba9f","#ED4C14", "#BA4D19", "#8e1ea2", '#13EF88', '#A197F0', '#F1EBD5', '#91E6F0'
            ],
              data: total
            },
          ],
        };
        var ctxLineBarModifyLocation = document.getElementById("bar-chart-modify-location") as HTMLCanvasElement;

        if(window.barmodifylocation != undefined)
        window.barmodifylocation.destroy();
        window.barmodifylocation = new Chart(ctxLineBarModifyLocation, {
          type: 'bar',
                  data: data,
                  options: {
                    scales: {
                      yAxes: [{
                          ticks: {
                              fontSize: 10,
                              fontStyle: 'bold',
                              max: maxPerDay + 10,
                              min: 0
                          }
                      }],
                      xAxes: [{
                        ticks: {
                            fontSize: 10,
                            fontStyle: 'bold',
                        }
                    }]
                  },
                    legend: { display: false },
                    title: {
                          fontSize: 12,
                          display: true,
                          text: 'PERSONS / DAY (MAX 50 FOR CHARS AND 70 FOR MONITORS)'
                        },
                    responsive: true,
                    maintainAspectRatio: true,
                    plugins: {
                      labels: {
                        render: 'value',
                        fontColor: 'black',
                        precision: 0,
                        fontSize: 10,
                        fontStyle: 'bold',
                      },
                    },
                  }
        });

  })

  }

public handleClick( target: HTMLElement ) : void {

	var barElement: HTMLElement | null = target;

	while ( barElement && ! barElement.classList.contains( "bar" ) ) {

		barElement = barElement.parentElement;

	}

	// console.log( "FOUND .bar !!" );
	// console.log( barElement );

}

private parseDate(dateString: string): any {
  // if (dateString) {
  //     return new Date(dateString);
  // } else {
  //     return null;
  // }

  let item = new ItemDateValidate(this.guid, new Date(dateString));
    this.assetHttpService.itemDateValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The picked-up date has been recorded');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday 22-02-2021 at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      } else if (res.statusCode === 800) {
        alert('The item has already been picked-up!');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }

    });

    this.selectedItemType = '';
}

private parseDate2(dateString: string): any {
  // if (dateString) {
  //     return new Date(dateString);
  // } else {
  //     return null;
  // }

  let item = new ItemDateValidate(this.guid, new Date(dateString));
    this.assetHttpService.itemDateValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The pick-up date has been recorded');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      } else if (res.statusCode === 800) {
        alert('The item has already been picked-up!');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }

    });

    this.selectedItemType = '';

}

private clearDate(): any {

  let item = new ItemDateValidate(this.guid, null);
    this.assetHttpService.itemClearDateValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The picked-up date has been deleted');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday 22-02-2021  at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      } else if (res.statusCode === 800) {
        alert('The item has already been picked-up!');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }

    });

    this.selectedItemType = '';

}

private clearDate2(): any {

  let item = new ItemDateValidate(this.guid, null);
    this.assetHttpService.itemClearDateValidate(item).subscribe((res) => {
      if (res.statusCode === 200) {
        alert('The picked-up date has been deleted');
        this.reload();
      } else if (res.statusCode === 300) {
        alert('Data saving will be allowed starting Monday 22-02-2021 at 12:00');
        this.reload();
      } else if (res.statusCode === 400) {
        alert('There are no more places available for the selected day. Please select another day');
        // this.reload();
      } else if (res.statusCode === 600) {
        alert('Saving options is no longer allowed');
        this.reload();
      } else if (res.statusCode === 800) {
        alert('The item has already been picked-up!');
        this.reload();
      }else if (res.statusCode === 900) {
        alert('The response time regarding the change of the expressed option has expired due to the centralization and appointment process!');
        this.reload();
      } else {
        alert('Error');
        this.reload();
      }

    });

    this.selectedItemType = '';

}

}
