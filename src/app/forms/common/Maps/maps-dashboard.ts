import { TranslateService } from '@ngx-translate/core';
import { Component, EventEmitter } from '@angular/core';
import { Location } from '../../../model/api/administration/location';
import { LocationHttpService } from 'app/services/http/administration/location.http.service';
import { Router } from '@angular/router';
import * as L from 'leaflet';

@Component({
    selector: 'location-dashboard-map',
    templateUrl: './maps-dashboard.html',
    outputs: ['selectedLocation']
})
export class LocationMapDashBoard {

    public map: any;
    public markersGroup: any;
    public locations: Array<Location> = new Array<Location>();
    protected selectedLocation: EventEmitter<number> = new EventEmitter<number>();


    constructor(public router: Router,
        public locationHttpService: LocationHttpService, public translate: TranslateService) {
    }

    ngAfterViewInit() {
        this.getLocations();
    }

    public getLocations() {
        this.locationHttpService.getData()
            .subscribe((locations) => {
                this.locations = locations;

                this.showMap();
            });
    }

    public updateLocation(location: Location) {
        this.locations.forEach((l: Location) => {
            if (l.id === location.id) {
                l.code = location.code;
                l.name = location.name;
                l.latitude = location.latitude;
                l.longitude = location.longitude;
                // l.address = location.address;
                // l.email = location.email;
                // l.phoneMobile = location.phoneMobile;
                // l.phoneOffice = location.phoneOffice;
            }
        });

        this.showMarkers();
    }

    public openLocationDetail(location: Location) {
        // if ((location !== null) && (location.id > 0)) {
        //     this.router.navigate(['/location', location.id]);
        // }
        this.selectedLocation.emit(location.id);
    }

    showMap() {
        setTimeout(() => {
            // this.map = L.map("map").setView([44.428097, 26.102403], 12);
            this.map = L.map('map').setView([46.222960, 24.788120], 8);
            L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        });
    }

    showMarkers() {

        const myIcon = L.icon({
            iconUrl: 'assets/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            popupAnchor: [-0, -32],
            shadowUrl: 'assets/images/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [15, 41]
          });

        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = L.layerGroup([]);
        this.locations.forEach(location => {
            if (location.latitude, location.longitude) {
                // let link = $(`<p>${location.name}<br /><a href="#">...</a>`).click(() => this.openLocationDetail(location))[0];
                let marker: any = L.marker([location.latitude, location.longitude], {icon: myIcon, clickable: true, title: location.name })
                // .bindPopup(`<p>${location.name}</p>`)
                .on('click', event => 
                    this.openLocationDetail(event.target.data)
                    );
                marker.bindPopup(`
                    <p>${location.name}</p>
                    <img src="assets/images/marker-icon.png">
                `);
                marker.data = location;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }
}
