import { Injectable } from '@angular/core';
import {RegisterModel} from "../models/register.model";
import { Storage } from '@ionic/storage';
import {NavController} from "@ionic/angular";
import {InAppBrowser} from "@ionic-native/in-app-browser/ngx";
import { File } from '@ionic-native/file/ngx';
import {EmailComposer} from "@ionic-native/email-composer/ngx";

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {

  saved: RegisterModel[] = [];

  constructor(private storage: Storage, private navCtrl: NavController, private iab: InAppBrowser,private file: File, private emailComposer: EmailComposer) {
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

  delete(registro){
    let pos = registro;
    this.saved.splice(pos,1);
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

  enviarCorreo() {
    const arrayTemp = [];
    const titulo = 'Type, Format, Created at, Text\n';
    arrayTemp.push(titulo);

    this.saved.forEach(registro=>{
      const row = `${registro.type}, ${registro.format}, ${registro.created}, ${registro.text.replace(',',' ')}\n`;
      arrayTemp.push(row);
    })
    this.crearArchivoFisico(arrayTemp.join(''));
  }

  crearArchivoFisico(text: string){
    this.file.checkFile(this.file.dataDirectory, 'record.csv').then(existe =>{
      console.log('Existe Archivo', existe);
      return this.escribirEnArchivo(text);
    }).catch(err =>{
      return this.file.createFile(this.file.dataDirectory, 'record.csv', false).then(creado=>this.escribirEnArchivo(text)).catch(err2 =>
      console.log('No se pudo crear el archivo', err2));
    })
  }

  async escribirEnArchivo(text:string){
    await this.file.writeExistingFile(this.file.dataDirectory, 'record.csv', text);
    const archivo = `${this.file.dataDirectory}record.csv`;
    //console.log(this.file.dataDirectory + 'record.csv');

    const email = {
      to: '',
      //cc: 'erika@mustermann.de',
      //bcc: ['john@doe.com', 'jane@doe.com'],
      attachments: [
        archivo
      ],
      subject: 'QRscan BackUp',
      body: 'This is your BackUp from QRscanner',
      isHtml: true
    }

// Send a text message using default options
    this.emailComposer.open(email);
  }


}
