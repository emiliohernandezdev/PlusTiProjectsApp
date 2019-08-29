import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-show-client',
  templateUrl: './show-client.page.html',
  styleUrls: ['./show-client.page.scss'],
})
export class ShowClientPage implements OnInit {
  client:any;
  constructor(private modalCtrl: ModalController, private navParams: NavParams) { 
    setTimeout(() => {
      this.client = this.navParams.get('client');
    }, 5000)
  }

  ngOnInit() {

  }

  Dismiss(){
    this.modalCtrl.dismiss();
  }

}
