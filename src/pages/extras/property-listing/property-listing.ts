import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage({
  name: 'page-property-listing',
  segment: 'extras/property-listing'
})

@Component({
  selector: 'page-property-listing',
  templateUrl: 'property-listing.html',
})

export class PropertyListingPage {

  estateProperty = {
    name: 'Pretty house',
    description: `It’s a 2 bedroom, 2 bathroom laneway house that also has a spacious study off the upstairs landing.
                  Sporting modern finishes and some cute touches like wall niches and bamboo accents,
                  this laneway house is a great example of what can be built on most of Vancouver’s standard 33 x 122
                  foot lots.`,
    price: '850000',
    image: 'assets/img/properties/house03.jpg',
    style: 'Modern Interior',
    size: '33\' Lot',
    features: [
      {
        icon: 'paw',
        title: 'Pet Friendly'
      },
      {
        icon: 'bicycle',
        title: 'Bike Stations'
      },
      {
        icon: 'rose',
        title: 'Beautiful Garden'
      }
    ]
  };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PropertyListingPage');
  }

}
