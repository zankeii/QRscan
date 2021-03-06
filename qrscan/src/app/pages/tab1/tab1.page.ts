import { Component } from '@angular/core';
import {BarcodeScanner} from "@ionic-native/barcode-scanner/ngx";
import {DataLocalService} from "../../services/data-local.service";
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  swiperOpts = {
    allowSlidePrev : false,
    allowSlideNext: false
}

  constructor(private barcodeScanner: BarcodeScanner, private datalocalService: DataLocalService, private iab: InAppBrowser) {}

  scan() {
    this.barcodeScanner.scan().then(barcodeData => {
      console.log('Barcode data', barcodeData);
      if(!barcodeData.cancelled){
        this.datalocalService.saveRegister(barcodeData.format, barcodeData.text);
      }
    }).catch(err => {
      console.log('Error', err);
      //
      this.datalocalService.saveRegister('QRcode', 'geo:40.73151796986687,-74.06087294062502');
    });
  }

}
