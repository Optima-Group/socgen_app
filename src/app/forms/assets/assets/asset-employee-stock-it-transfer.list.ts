import { ColumnHeader } from './../../../model/common/column-header';
import { ColumnDefinition } from './../../../model/common/column-definition';
import { Component, ElementRef, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { GenericTableList } from '../../generic/generic.table.list';

import { AppConfig } from "app/config";
import { AppData } from "app/app-data";
import { Param } from "app/model/common/param";
import { TranslateService } from "@ngx-translate/core";
import { AssetDepTotal } from "app/model/api/assets/asset-dep-total";
import { AssetDepPagedResult } from "app/model/api/assets/asset-dep-paged-result";
import { TableItemEmployee } from 'app/model/common/table-item-employee';
import * as _ from 'underscore'
import { time } from 'console';

@Component({
    selector: 'asset-employee-auto-validate-list',
    templateUrl: '../../assets/assets/asset-employee-auto-validate.list.html',
    // host: {
    //     '(document:click)': 'handleClick($event)'
    // },
    inputs: [ 'listTemplate' ],
    outputs: [ 'listAtferViewInit' ]
})
export class AssetEmployeeAutoValidateList extends GenericTableList<any, number> implements AfterViewInit {
    public query = '';
    public filteredList = [];
    public elementRef;
    private listTemplate: string = 'EMPLOYEEAUTOVALIDATES';
    private loadType: string = '';
    private totals: AssetDepTotal = null;
    private allowLabel: string = '-';

    public rooms = [
        { id:8202, name:'1 Decembrie'},
        { id:8235, name:'21 Decembrie'},
        { id:8346, name:'A. I. Cuza'},
        { id:8561, name:'Adjud'},
        { id:8497, name:'Afi Cotroceni'},
        { id:8395, name:'Afi Ploiesti'},
        { id:8396, name:'Agnita'},
        { id:8146, name:'Aiud'},
        { id:8142, name:'Alba'},
        { id:8263, name:'Albatros'},
        { id:8186, name:'Alesd'},
        { id:8339, name:'Alexandru cel Bun'},
        { id:8151, name:'Alexandru Davila'},
        { id:8400, name:'Ambient'},
        { id:8166, name:'Arad'},
        { id:8150, name:'Arges'},
        { id:8576, name:'Arhiva Dragomiresti'},
        { id:8218, name:'Astra Orizont'},
        { id:8405, name:'Aurel Vlaicu'},
        { id:8172, name:'Aviatori'},
        { id:8165, name:'Avram Iancu'},
        { id:8406, name:'Avrig'},
        { id:8531, name:'Babadag'},
        { id:8177, name:'Bacau'},
        { id:8176, name:'Bacovia'},
        { id:8472, name:'Bagdasar'},
        { id:8268, name:'Balada'},
        { id:8378, name:'Bals'},
        { id:8459, name:'Balta Alba'},
        { id:8426, name:'Baneasa'},
        { id:8274, name:'Baraolt'},
        { id:8569, name:'Barlad'},
        { id:8214, name:'Bartolomeu'},
        { id:8446, name:'Basarabiei'},
        { id:8192, name:'Beclean'},
        { id:8381, name:'Beica'},
        { id:8180, name:'Beius'},
        { id:8470, name:'Berceni'},
        { id:8372, name:'Bicaz'},
        { id:8562, name:'Big Centru'},
        { id:8179, name:'Bihor'},
        { id:8194, name:'Bistrita Nasaud'},
        { id:8148, name:'Blaj'},
        { id:8464, name:'Bobocica'},
        { id:8311, name:'Bolintin Vale'},
        { id:8355, name:'Borsa'},
        { id:8329, name:'Borsec'},
        { id:8205, name:'Botosani'},
        { id:8317, name:'Brad'},
        { id:8483, name:'Bragadiru'},
        { id:8203, name:'Braila'},
        { id:8215, name:'Brasov'},
        { id:8307, name:'Brates'},
        { id:8418, name:'Bucurestii Noi'},
        { id:8533, name:'Budai Deleanu'},
        { id:8422, name:'Buftea'},
        { id:8519, name:'Burdujeni'},
        { id:8229, name:'Buzau'},
        { id:8291, name:'Calafat'},
        { id:8251, name:'Calarasi'},
        { id:8200, name:'Calarasilor'},
        { id:8221, name:'Calea Bucuresti'},
        { id:8534, name:'Calea Buziasului'},
        { id:8246, name:'Calea Floresti'},
        { id:8548, name:'Calea Lugojului'},
        { id:8547, name:'Calea Sagului'},
        { id:8144, name:'Campeni'},
        { id:8240, name:'Campia Turzii'},
        { id:8382, name:'Campina'},
        { id:8521, name:'Campulung Moldovenesc'},
        { id:8158, name:'Campulung Muscel'},
        { id:8386, name:'Cantacuzino'},
        { id:8377, name:'Caracal'},
        { id:8256, name:'Caransebes'},
        { id:8255, name:'Caras Severin'},
        { id:8513, name:'Carei'},
        { id:8290, name:'Carol'},
        { id:8507, name:'Cehu Silvaniei'},
        { id:8369, name:'Central'},
        { id:8266, name:'Cernavoda'},
        { id:8145, name:'Cetate'},
        { id:8167, name:'Chisineu Cris'},
        { id:8243, name:'Cipariu'},
        { id:8244, name:'Cluj'},
        { id:8213, name:'Codlea'},
        { id:8437, name:'Colentina'},
        { id:8175, name:'Comanesti'},
        { id:8269, name:'Constanta'},
        { id:8477, name:'Constantin Brancoveanu'},
        { id:8741, name:'Contact Center'},
        { id:8345, name:'Copou'},
        { id:8379, name:'Corabia'},
        { id:8279, name:'Coresi'},
        { id:8228, name:'Coresi Mall'},
        { id:8273, name:'Covasna'},
        { id:8285, name:'Craiovita'},
        { id:8502, name:'Crangasi'},
        { id:8511, name:'Crisan'},
        { id:8325, name:'Cristuru Secuiesc'},
        { id:8149, name:'Cugir'},
        { id:8160, name:'Curtea de Arges'},
        { id:8157, name:'Dacia'},
        { id:8277, name:'Dambovita'},
        { id:8198, name:'Danubiu'},
        { id:8201, name:'Darclee'},
        { id:8189, name:'Decebal'},
        { id:8233, name:'Dej'},
        { id:8262, name:'Delfinul'},
        { id:8542, name:'Demetriade'},
        { id:8284, name:'Dolj'},
        { id:8416, name:'Dorobanti'},
        { id:8209, name:'Dorohoi'},
        { id:8425, name:'Dr. Felix'},
        { id:8471, name:'Dr. Obregia'},
        { id:8557, name:'Dragasani'},
        { id:8460, name:'Dristor'},
        { id:8489, name:'Drumul Taberei'},
        { id:8491, name:'Drumul Taberei 34'},
        { id:8302, name:'Dunarea'},
        { id:8156, name:'Exercitiu'},
        { id:8211, name:'Fagaras'},
        { id:8299, name:'Faleza'},
        { id:8522, name:'Falticeni'},
        { id:8430, name:'Ferdinand'},
        { id:8333, name:'Fetesti'},
        { id:8287, name:'Filiasi'},
        { id:8448, name:'Floreasca Park'},
        { id:8162, name:'Fortuna'},
        { id:8280, name:'Gaesti'},
        { id:8298, name:'Galati'},
        { id:8571, name:'Garden Business Center (HQ)'},
        { id:8490, name:'Ghencea'},
        { id:8480, name:'Gheorghe Sincai'},
        { id:8744, name:'Gheorgheni'},
        { id:8234, name:'Gherla'},
        { id:8536, name:'Giroc'},
        { id:8310, name:'Giurgiu'},
        { id:8478, name:'Giurgiului'},
        { id:8293, name:'Gorj'},
        { id:8530, name:'Grigore Moisil'},
        { id:8411, name:'Grivita'},
        { id:8525, name:'Gura Humorului'},
        { id:8326, name:'Harghita'},
        { id:8323, name:'Hateg'},
        { id:8259, name:'Histria'},
        { id:8559, name:'Horezu'},
        { id:8250, name:'Huedin'},
        { id:8320, name:'Hunedoara'},
        { id:8316, name:'Hunedoara SJ'},
        { id:8567, name:'Husi'},
        { id:8331, name:'Ialomita'},
        { id:8441, name:'Iancului'},
        { id:8342, name:'Iasi'},
        { id:8429, name:'Ikea Baneasa'},
        { id:8465, name:'Ikea Pallady'},
        { id:8349, name:'Independentei'},
        { id:8161, name:'Ineu'},
        { id:8275, name:'Intorsura Buzaului'},
        { id:8420, name:'Ion Mihalache'},
        { id:8463, name:'Iris Titan'},
        { id:8499, name:'Iuliu Maniu'},
        { id:8357, name:'Iza'},
        { id:8487, name:'Izvor'},
        { id:8506, name:'Jibou'},
        { id:8538, name:'Jimbolia'},
        { id:8433, name:'Lacul Tei'},
        { id:8288, name:'Lapus'},
        { id:8253, name:'Lehliu Gara'},
        { id:8468, name:'Libertatii'},
        { id:8164, name:'Lipova'},
        { id:8452, name:'Lipscani'},
        { id:8195, name:'Liviu Rebreanu'},
        { id:8178, name:'Luceafarul'},
        { id:8364, name:'Ludus'},
        { id:8545, name:'Lugoj'},
        { id:8498, name:'Lujerului'},
        { id:8314, name:'Lupeni'},
        { id:8528, name:'Macin'},
        { id:8494, name:'Mall Plaza'},
        { id:8384, name:'Malu Rosu'},
        { id:8271, name:'Mamaia'},
        { id:8249, name:'Manastur'},
        { id:8261, name:'Mangalia'},
        { id:8360, name:'Mara'},
        { id:8356, name:'Maramures'},
        { id:8236, name:'Marasti'},
        { id:8188, name:'Marghita'},
        { id:8335, name:'Matei Basarab'},
        { id:8264, name:'Medgidia'},
        { id:8397, name:'Medias'},
        { id:8350, name:'Mehedinti'},
        { id:8245, name:'Memorandumului'},
        { id:8303, name:'Micro 21'},
        { id:8305, name:'Micro 40'},
        { id:8439, name:'Mihai Bravu'},
        { id:8286, name:'Mihai Viteazu'},
        { id:8159, name:'Mioveni'},
        { id:8254, name:'Mircea Voda'},
        { id:8389, name:'Mizil'},
        { id:8173, name:'Moinesti'},
        { id:8282, name:'Moreni'},
        { id:8432, name:'Mosilor'},
        { id:8294, name:'Motru'},
        { id:8361, name:'Mures'},
        { id:8362, name:'Mureseni'},
        { id:8241, name:'Napoca'},
        { id:8191, name:'Nasaud'},
        { id:8270, name:'Navodari'},
        { id:8370, name:'Neamt'},
        { id:8566, name:'Negresti'},
        { id:8512, name:'Negresti Oas'},
        { id:8467, name:'Nerva Traian'},
        { id:8399, name:'Nicolae Balcescu'},
        { id:8207, name:'Nicolae Iorga'},
        { id:8348, name:'Nicolina'},
        { id:8300, name:'Nord'},
        { id:8524, name:'Obcini'},
        { id:8324, name:'Odorheiu Secuiesc'},
        { id:8376, name:'Olt'},
        { id:8252, name:'Oltenita'},
        { id:8473, name:'Oltenitei'},
        { id:8169, name:'Onesti'},
        { id:8223, name:'Onix'},
        { id:8322, name:'Orastie'},
        { id:8449, name:'Oregon'},
        { id:8570, name:'Orhideea Business'},
        { id:8171, name:'Orizont'},
        { id:8351, name:'Orsova'},
        { id:8556, name:'Ostroveni'},
        { id:8424, name:'Otopeni'},
        { id:8337, name:'Pacurari'},
        { id:8267, name:'Palas'},
        { id:8343, name:'Palat'},
        { id:8529, name:'Panait Cerna'},
        { id:8199, name:'Panait Istrati'},
        { id:8440, name:'Pantelimon'},
        { id:8442, name:'Pantelimon II'},
        { id:8296, name:'Parang'},
        { id:8457, name:'Park Lake'},
        { id:8393, name:'Partizani'},
        { id:8336, name:'Pascani'},
        { id:8292, name:'Patria'},
        { id:8313, name:'Petrosani'},
        { id:8535, name:'Piata 700 Timisoara (fosta Bastion)'},
        { id:8421, name:'Piata Chibrit'},
        { id:8237, name:'Piata Garii'},
        { id:8501, name:'Piata Gorjului'},
        { id:8564, name:'Piata Moldovei'},
        { id:8544, name:'Piata Operei'},
        { id:8486, name:'Piata Rahova'},
        { id:8444, name:'Piata Rosetti'},
        { id:8225, name:'Piata Sfatului'},
        { id:8414, name:'Piata Victoriei'},
        { id:8447, name:'Pipera'},
        { id:8152, name:'Pitesti'},
        { id:8412, name:'Plevnei'},
        { id:8385, name:'Ploiesti Sud'},
        { id:8338, name:'Podu Iloaiei'},
        { id:8568, name:'Podul Inalt'},
        { id:8496, name:'Politehnica'},
        { id:8247, name:'Polus'},
        { id:8474, name:'Popesti Leordeni'},
        { id:8308, name:'Port'},
        { id:8353, name:'Portile de Fier'},
        { id:8391, name:'Prahova'},
        { id:8371, name:'Precista'},
        { id:8488, name:'Prelungirea Ghencea'},
        { id:8208, name:'Primaverii'},
        { id:8410, name:'Private Banking Bucuresti'},
        { id:8154, name:'Prundu'},
        { id:8281, name:'Pucioasa'},
        { id:8517, name:'Radauti'},
        { id:8485, name:'Rahova'},
        { id:8230, name:'Ramnicu Sarat'},
        { id:8217, name:'Rasnov'},
        { id:8366, name:'Reghin'},
        { id:8185, name:'Republicii'},
        { id:8181, name:'Rogerius'},
        { id:8374, name:'Roman'},
        { id:8415, name:'Romana'},
        { id:8289, name:'Romanescu'},
        { id:8551, name:'Rosiorii de Vede'},
        { id:8297, name:'Rovinari'},
        { id:8220, name:'Sacele'},
        { id:8407, name:'Sala Palatului'},
        { id:8505, name:'Salaj'},
        { id:8183, name:'Salonta'},
        { id:8539, name:'Sannicolau Mare'},
        { id:8510, name:'Satu Mare'},
        { id:8206, name:'Saveni'},
        { id:8484, name:'Sebastian'},
        { id:8147, name:'Sebes'},
        { id:8413, name:'Sector 1'},
        { id:8435, name:'Sector 2'},
        { id:8445, name:'Sector 3'},
        { id:8466, name:'Sector 4'},
        { id:8482, name:'Sector 5'},
        { id:8493, name:'Sector 6'},
        { id:8258, name:'Semenic'},
        { id:8475, name:'Serban Voda'},
        { id:8352, name:'Severin'},
        { id:8402, name:'Sibiu'},
        { id:8354, name:'Sighetu Marmatiei'},
        { id:8368, name:'Sighisoara'},
        { id:8508, name:'Silvania'},
        { id:8509, name:'Simleul Silvaniei'},
        { id:8383, name:'Sinaia'},
        { id:8518, name:'Siret'},
        { id:8232, name:'Siriu'},
        { id:8248, name:'Somes'},
        { id:8380, name:'Steaua'},
        { id:8431, name:'Stefan cel Mare'},
        { id:8182, name:'Stei'},
        { id:8516, name:'Suceava'},
        { id:8527, name:'Sulina'},
        { id:8334, name:'Tandarei'},
        { id:8341, name:'Targu Frumos'},
        { id:8375, name:'Targu Neamt'},
        { id:8170, name:'Targu Ocna'},
        { id:8276, name:'Targu Secuiesc'},
        { id:8363, name:'Tarnaveni'},
        { id:8347, name:'Tatarasi'},
        { id:8309, name:'Tecuci'},
        { id:8438, name:'Teiul Doamnei'},
        { id:8549, name:'Teleorman'},
        { id:8398, name:'Terezian'},
        { id:8458, name:'Th. Pallady'},
        { id:8504, name:'The Bridge'},
        { id:8573, name:'The Bridge Building (HQ)'},
        { id:8537, name:'Timis'},
        { id:8532, name:'Timisoara Shopping City'},
        { id:8359, name:'Tisa'},
        { id:8455, name:'Titan'},
        { id:8283, name:'Titu'},
        { id:8224, name:'Titulescu'},
        { id:8272, name:'Tomis Nord'},
        { id:8328, name:'Toplita'},
        { id:8476, name:'Toporasi'},
        { id:8301, name:'Traian'},
        { id:8153, name:'Trivale'},
        { id:8365, name:'Tudor'},
        { id:8526, name:'Tulcea'},
        { id:8239, name:'Turda'},
        { id:8550, name:'Turnu Magurele'},
        { id:8408, name:'Unic'},
        { id:8514, name:'Unio'},
        { id:8450, name:'Unirea'},
        { id:8469, name:'Unirea Center'},
        { id:8451, name:'Unirea Shopping Center'},
        { id:8453, name:'Universitate'},
        { id:8332, name:'Urziceni'},
        { id:8554, name:'Valcea'},
        { id:8555, name:'Valcea Centru (fosta River Plaza)'},
        { id:8558, name:'Valcea Nord'},
        { id:8394, name:'Valenii de Munte'},
        { id:8184, name:'Varadinum'},
        { id:8403, name:'Vasile Aaron'},
        { id:8231, name:'Vasile Voiculescu'},
        { id:8565, name:'Vaslui'},
        { id:8523, name:'Vatra Dornei'},
        { id:8443, name:'Vergului (Cora)'},
        { id:8212, name:'Victoria BV'},
        { id:8295, name:'Victoria GJ'},
        { id:8552, name:'Videle'},
        { id:8193, name:'Viisoara'},
        { id:8461, name:'Vitan'},
        { id:8436, name:'Voluntari'},
        { id:8560, name:'Vrancea'},
        { id:8315, name:'Vulcan'},
        { id:8190, name:'Vulturul Negru'},
        { id:8419, name:'WTC'},
        { id:8219, name:'Zarnesti'},
        { id:8168, name:'Ziridava'},
        { id:8242, name:'Zorilor'}
    ];

    public deposits = [
        { id:60, name:'-'},
        { id:61, name:'DA'},
        { id:62, name:'NU'}
    ];
    


    @Output() protected listAtferViewInit: EventEmitter<void> = new EventEmitter<null>();

    constructor(private translate: TranslateService, private myElement: ElementRef) {
        super('invNo', 'asc', 'inventory');

        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        //this.resetColumnDefinitions(AppData.ColumnDefinitions[this.listTemplate]);


        translate.use(AppConfig.TRANSLATE_DEFAULT_LANGUAGE);
        this.elementRef = myElement;
    }

    ngAfterViewInit(): void {
        // console.log("employee validate afterviewinit");
        this.listAtferViewInit.emit(null);
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listTemplate];
        super.refresh(filters);
    }

    public setCurrentPageData(pageData: AssetDepPagedResult) {
        this.totals = pageData.totals;
        super.setCurrentPageData(pageData);
    }

    public filter() {
        if (this.query !== ''){
            this.filteredList = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(this.query.toLowerCase()) > -1;
            }.bind(this));
        }else{
            this.filteredList = [];
        }
    }

    public select(item){
        this.query = item;
        this.filteredList = [];
        if(item != null){
            this.tableItems = this.tableItems.filter(function(el){
                return el.item.invNo.toString().toLowerCase().indexOf(item.toLowerCase()) > -1;
            })
        }
    }

    private onAllowLabelUpdate(tableItem) {
       tableItem.item.isMinus = !!tableItem.item.isMinus;
       // tableItem.selected = !tableItem.selected;
       this.updateCheckStateEmp(true);
    }

    private onInfoUpdate(tableItem) {
        tableItem.item.info = tableItem.item.info;
        // tableItem.selected = !tableItem.selected;
        this.updateCheckStateEmp(true);
     }

    private onRecoUpdate(tableItem) {
        console.log(JSON.stringify(tableItem.item.isReconcile));
         tableItem.item.isReconcile = tableItem.item.isReconcile == false ? true : false;
        // console.log(JSON.stringify(tableItem.item.isReconcile));
        tableItem.item.isReconcile = !!tableItem.item.isReconcile;
        // tableItem.selected = !tableItem.selected;
        this.updateCheckStateEmp(true);
     }


     private onRoomUpdate(tableItem) {
        // console.log(JSON.stringify(tableItem.item.isReconcile));
        tableItem.item.roomFinal.id = tableItem.item.roomFinal.id;
        // console.log(JSON.stringify(tableItem.item.isReconcile));
        // tableItem.item.isReconcile = !!tableItem.item.isReconcile;
        // tableItem.selected = !tableItem.selected;
        this.updateCheckStateEmp(true);
     }

     private onDepositUpdate(tableItem) {
        console.log(JSON.stringify(tableItem.item.depositFinal));
        tableItem.item.depositFinal.id = tableItem.item.depositFinal.id;
        // console.log(JSON.stringify(tableItem.item.isReconcile));
        // tableItem.item.isReconcile = !!tableItem.item.isReconcile;
        // tableItem.selected = !tableItem.selected;
        this.updateCheckStateEmp(true);
     }

    private onAllowUpdate(tableItem) {
        tableItem.item.isMinus = true;
        tableItem.selected = true;
     }

     private onNotAllowUpdate(tableItem) {
        tableItem.item.isMinus = false;
        tableItem.selected = false;
     }

     private updateCheckStateEmp(checked: boolean) {
        if (checked) this.selectAllEmp(); else this.unselectAllEmp();
    }
    

    private selectAllEmp() {
        //  alert(this.tableItems.length);
        this.tableItems.forEach((tItem) => {

             // alert(JSON.stringify(tItem.item.isReconcile));

            // if (!tItem.selected) {
            //     this.selectItemEmp(tItem.item);
            // } 
            this.selectItemEmp(tItem.item);
        });
    }

    private unselectAllEmp() {
        this.tableItems.forEach((tItem) => {
            if (tItem.selected) {
                this.unselectItem(tItem.item);
            }
        });
    }

    private isAllCheckedEmp(): boolean {
        return this.tableItems.every(item => item.selected);
    }

    private selectItemEmp(item) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<any>();
            this._selectedItems.push(item);
            
            this.tableItems.forEach((tItem) => {
                tItem.selected = tItem.item.id === item.id ? true : false;
            });
        }
        else if (this.rowSelection === "multiple") {


             var index : number = _.indexOf(this._selectedItems, item);

        //    var index = -1;
        //         for (var i = 0; i < this._selectedItems.length; ++i) {
        //             if (this._selectedItems[i].id === item.id) {
        //                 index = i;
        //                 break;
        //             }
        //         }
        //         console.log(index);

             //alert(index);

           
            
            if (index < 0) {
                this._selectedItems.push(item);
            }

            this.tableItems.forEach((tItem) => {
                if (tItem.item.id === item.id) tItem.selected = true;
                // if (tItem.item.id === item.id) tItem.item.isMinus = true;
            });
        }

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

    protected unselectItem(item) {
        if (this.rowSelection === "single") {
            this._selectedItems = new Array<any>();
        }
        else if (this.rowSelection === "multiple") {
            let index: number = -1;
            let currentIndex: number = 0;

            this._selectedItems.forEach((sItem) => {
                if (sItem.id === item.id)
                {
                    index  = currentIndex;
                }
                currentIndex++;
            });

            if (index > -1)
            {
                this._selectedItems.splice(index, 1);
            }
        }

        this.tableItems.forEach((tItem) => {
            if (tItem.item.id === item.id) tItem.selected = false;
            // if (tItem.item.id === item.id) tItem.item.isMinus = false;
        });

        if (this.notifyOnChange.toUpperCase() === "TRUE") {
            this.notifyCurrentSelection();
        }
    }

//    public handleClick(event){
//         let clickedComponent = event.target;
//         let inside = false;
//         do {
//             if (clickedComponent === this.elementRef.nativeElement) {
//                 inside = true;
//             }
//            clickedComponent = clickedComponent.parentNode;
//         } while (clickedComponent);
//          if(!inside){
//              this.filteredList = [];
//              this.totalItems = this.tableItems.length;
//              if(this.query == ''){
//                 this.refresh(null);
//              }
//          }
//      }


    //   getSum(column) : number {

    //     let sum = 0;
    //     for(let i = 0; i < this.tableItems.length; i++) {
    //         sum += this.tableItems[i][column];
    //     }
    //     return sum;
    // }


}


const ROOM = [
    { 
        id: 151, 
        name: 'Alan B. Shepard, Jr.', 
        job: 'Astronaut', 
        year_joined: 1959,
        missions: ['MR-3', 'Apollo 14']
    },
    { 
        id: 152, 
        name: 'Virgil I. Grissom', 
        job: 'Astronaut', 
        year_joined: 1959,
        missions: ['MR-4', 'Apollo 1']
    },
    { 
        id: 153, 
        name: 'John H. Glenn, Jr.', 
        job: 'Astronaut', 
        year_joined: 1959,
        missions: ['MA-6','STS-95']
    },
    { 
        id: 154, 
        name: 'M. Scott Carpenter', 
        job: 'Astronaut', 
        year_joined: 1959,
        missions: ['MA-7']
    }
];