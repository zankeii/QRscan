import { Injectable } from '@angular/core';
import {RegisterModel} from "../models/register.model";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: RegisterModel[] = [];

  constructor() { }

  saveRegister(format: string, text: string) {
    const newRegister = new RegisterModel(format,text);
    this.saved.unshift(newRegister);
    console.log(this.saved)
  }
}
