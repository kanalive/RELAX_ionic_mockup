import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PropertyListingPage } from './property-listing';

@NgModule({
  declarations: [
    PropertyListingPage,
  ],
  imports: [
    IonicPageModule.forChild(PropertyListingPage),
  ],
})
export class PropertyListingPageModule {}
