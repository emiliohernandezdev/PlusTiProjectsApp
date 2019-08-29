import { Component } from '@angular/core';
import { ModalController, LoadingController } from '@ionic/angular';
import { ShowClientPage } from '../pages/show-client/show-client.page';
import { ClientService } from '../services/client.service';



@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  clients= [];
  searcher:string ="";
  constructor(private modalCtrl: ModalController,
    private loadingCtrl: LoadingController, private rest: ClientService) {
        this.initElems()
  }

  initElems(){
    this.rest.GetClients().subscribe(res => {
      console.log(res);
    })
  }

  Filter(){

    this.clients = this.clients.filter((client) => {
      return client.name.toLowerCase().indexOf(this.searcher.toLowerCase()) > -1;
    })
  }

  async doRefresh(event) {
    this.clients = [];
    setTimeout(async() => {

      event.target.complete();
      this.initElems()
    }, 2000);
  }

  async ShowClient(client){
    const modal = await this.modalCtrl.create({
      component: ShowClientPage,
      componentProps: {client: client}
    });

    return modal.present();

  }

}
