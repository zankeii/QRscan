import {Component} from '@angular/core';
import {DataLocalService} from "../../services/data-local.service";
import {ToastController} from "@ionic/angular";

@Component({
    selector: 'app-tab2',
    templateUrl: 'tab2.page.html',
    styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

    constructor(public datalocalService: DataLocalService, public toastController: ToastController) {
    }

    enviarCorreo() {
        this.datalocalService.enviarCorreo();
    }

    abrirRegistro(registro) {
        this.datalocalService.abrirRegistro(registro);
    }

/*async delete(registro) {
  this.datalocalService.delete(registro);
  const toast = await this.toastController.create({
    color: 'light',
    message: 'Deleted',
    duration: 1500
  });
  toast.present();
  this.datalocalService.cargarStorage();

  console.log(this.datalocalService.saved);
}*/

}
