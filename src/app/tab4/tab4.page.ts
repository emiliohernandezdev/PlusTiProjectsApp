import { Component, OnInit, ViewChild } from '@angular/core';
import { IonInfiniteScroll, ToastController } from '@ionic/angular';
import {Storage} from "@ionic/storage";

@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {
  proyects:any = "";
  searcher:String = "";
  searching: boolean = false;
  nodata = [ 1, 2, 3, 4, 5, 6
  ]
  constructor(private toastCtrl: ToastController, private st: Storage) { }

  ngOnInit() {
    this.proyects = [];
    this.initElems();
  }

  initElems(){

    setTimeout(() => { 
      this.proyects = [
        {name: 'App De Ionic', image: 'https://ionicframework.com/blog/wp-content/uploads/2018/11/ionic-logo-white-300x300.png'},
        {name: 'App de Angular', image: 'https://angular.io/assets/images/logos/angularjs/AngularJS-Shield.svg'}
      ] || this.st.get('storedProyects');
      this.st.set('storedProyects', this.proyects);
    }, 2000)

  }

  Filter(){
    if(this.searcher === ""){
      this.searching = false;
      this.initElems();
    }
    this.proyects = this.proyects.filter((proyect) => {
      return proyect.name.toLowerCase().indexOf(this.searcher.toLowerCase()) > -1;
    })
  }

  async doRefresh(event) {
    this.searching = false;
    this.proyects = [];

    setTimeout(async() => {
      this.initElems();
      event.target.complete();
    }, 1900);
  }


}
