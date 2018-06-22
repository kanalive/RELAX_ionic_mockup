import {Component} from '@angular/core';
import {IonicPage, Config, NavController, NavParams, ToastController, ModalController} from 'ionic-angular';
import { CalendarModal, CalendarModalOptions, CalendarResult } from "ion2-calendar";
import {PropertyService} from '../../providers/property-service-mock';
import leaflet from 'leaflet';

@IonicPage({
	name: 'page-property-list',
	segment: 'propertylist'
})

@Component({
    selector: 'page-property-list',
    templateUrl: 'property-list.html'
})
export class PropertyListPage {

    properties: Array<any>;
    searchKey: string = "";
    viewMode: string = "list";
    proptype: string;
    from: string;
    map;
    markersGroup;
    // search conditions
    public checkin = {
        name: "Move-in",
        date: new Date().toLocaleString().split(',')[0]
    }

    public checkout = {
        name: "Move-out",
        date: new Date(new Date().setDate(new Date().getDate() + 1)).toLocaleString().split(',')[0]
    }
    constructor(public navCtrl: NavController, public navParams: NavParams, public service: PropertyService, public toastCtrl: ToastController, public modalCtrl: ModalController, public config: Config) {
			this.findAll();
			this.proptype = this.navParams.get('proptype') || "";
			this.from = this.navParams.get('from') || "";
		// console.log(this.proptype);
		// console.log(this.from);
    }

    openCalendar() {
        const options: CalendarModalOptions = {
          pickMode: 'range',
          title: 'Range Date'
        };
    
        let myCalendar = this.modalCtrl.create(CalendarModal, {
          options: options
        });
    
        myCalendar.present();
    
        myCalendar.onDidDismiss((date: { from: CalendarResult; to: CalendarResult }, type: string) => {
          if (date !== null) {
            this.checkin.date = new Date(new Date(date.from.time)).toLocaleString().split(',')[0]
            this.checkout.date = new Date(new Date(date.to.time)).toLocaleString().split(',')[0]
          }
        });
        }

    openFilterModal() {
		let modal = this.modalCtrl.create('page-property-filter');
      // modal.onDidDismiss(data => {
      //   console.log(data);
      // });
      modal.present();
    }

    openPropertyDetail(property: any) {
			this.navCtrl.push('page-property-detail', {
				'id': property.id
			});
    }

    favorite(property) {
        this.service.favorite(property)
            .then(property => {
                let toast = this.toastCtrl.create({
                    message: 'Property added to your favorites',
                    cssClass: 'mytoast',
                    duration: 2000
                });
                toast.present(toast);
            });
    }

    onInput(event) {
        this.service.findByName(this.searchKey)
            .then(data => {
                this.properties = data;
                if (this.viewMode === "map") {
                    this.showMarkers();
                }
            })
            .catch(error => alert(JSON.stringify(error)));
    }

    onCancel(event) {
        this.findAll();
    }

    findAll() {
        this.service.findAll()
            .then(data => this.properties = data)
            .catch(error => alert(error));
    }

    showMap() {
        setTimeout(() => {
            this.map = leaflet.map("map").setView([42.361132, -71.070876], 14);
            leaflet.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
                attribution: 'Tiles &copy; Esri'
            }).addTo(this.map);
            this.showMarkers();
        })
    }

    showMarkers() {
        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = leaflet.layerGroup([]);
        this.properties.forEach(property => {
            if (property.lat, property.long) {
                let marker: any = leaflet.marker([property.lat, property.long]).on('click', event => this.openPropertyDetail(event.target.data));
                marker.data = property;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }

}
