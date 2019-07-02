import { Injectable } from '@angular/core';
import {RegisterModel} from "../models/register.model";
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: RegisterModel[] = [];

  constructor(private storage: Storage) {
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
  }
}
