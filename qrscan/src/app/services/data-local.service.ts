import { Injectable } from '@angular/core';
import {RegisterModel} from "../models/register.model";
import { Storage } from '@ionic/storage';
import {NavController} from "@ionic/angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: RegisterModel[] = [];

  constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser) {
    this.cargarStorage();
  }

  async cargarStorage() {
    this.saved = await this.storage.get('registros') || [];
  }

  async saveRegister(format: string, text: string) {
    await this.cargarStorage();
    const newRegister = new RegisterModel(format,text);
    this.saved.unshift(newRegister);
    console.log(this.saved)

    this.storage.set('registros', this.saved);

    this.abrirRegistro(newRegister);
  }

  abrirRegistro(registro: RegisterModel){
    this.navCtrl.navigateForward('/tabs/tab2');
    switch (registro.type) {
      case 'http':
        this.iab.create(registro.text, '_system');
        break;
      case 'geo':
        this.navCtrl.navigateForward(`/tabs/tab2/maps/${registro.text}`)
        break;
    }
  }


}
