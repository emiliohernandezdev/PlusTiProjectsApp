import { Component, OnInit, DoCheck, OnChanges } from '@angular/core';
import { ProductService } from '../services/product.service';
import { ActionSheetController, AlertController, ToastController, ModalController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { UpdateProductPage } from '../pages/update-product/update-product.page';
import { CreateProductPage } from '../pages/create-product/create-product.page';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page implements OnInit {
  products = [];
  searcher: String = '';
  constructor(private rest: ProductService,
    private actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private modalCtr: ModalController,
    private router: Router,
    private loadingCtrl: LoadingController) {
      this.initElems();
    }


  ngOnInit(){
    
  }

  async NewProduct(){
    const modal = await this.modalCtr.create({
      component: CreateProductPage,
    });
    await modal.present();
    await modal.onDidDismiss().then(() => {
      this.initElems();
    })
  }

  Filter(){
    if(this.searcher === ""){
      this.initElems();
    }
    this.products = this.products.filter((product) => {
      return product.name.toLowerCase().indexOf(this.searcher.toLowerCase()) > -1;
    })
  }



  async Options(product){
    const sheet = await this.actionSheetCtrl.create({
      header: product.name,
      buttons: [{
        text: 'Eliminar',
        role: 'destructive',
        icon: 'trash',
        handler: async() => {
          const alert = await this.alertCtrl.create({
            header: 'Desea eliminar el producto?',
            message: product.name + ' va a eliminarse por completo del sistema.',
            buttons: [
              {
                text: 'Cancelar',
                role: 'cancel',
                handler: (blah) => {
                }
              }, {
                text: 'Si, eliminar',
                handler: async() => {
                  const loading = await this.loadingCtrl.create({
                    message: 'Eliminando',
                    backdropDismiss: false,
                  });
                  await loading.present();
                  this.rest.DeleteProduct(product._id).subscribe(async res=> {
                    if(res.deleted){
                      await loading.dismiss();
                      this.initElems();
                      const toast = await this.toastCtrl.create({
                        message: 'Producto eliminado con exito.',
                        duration: 2500,
                        showCloseButton: true,
                        closeButtonText: 'Cerrar',
                        color: 'dark'
                      });
                      await toast.present();
                    }else if(res.message){
                      await loading.dismiss();
                      const toast = await this.toastCtrl.create({
                        message: res.message,
                        duration: 2500,
                        showCloseButton: true,
                        closeButtonText: 'Cerrar',
                        color: 'dark'
                      });
                      await toast.present();
                    }
                  })
                }
              }
            ]
          });
      
          await alert.present();
        }
      }, {
        text: 'Editar',
        icon: 'create',
        handler: async () => {
          const modal = await this.modalCtr.create({
            component: UpdateProductPage,
            componentProps: {id: product._id}
          });
          await modal.present()
          await sheet.dismiss();
          await modal.onDidDismiss().then(() => {
            this.initElems();
          })
        }
      }, {
        text: 'Ver',
        icon: 'eye',
        handler: () => {
          console.log('Play clicked');
        }
      },
      {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          this.initElems();
        }
      }]
    });
    await sheet.present();
  }


  initElems(){
    return this.rest.GetProducts().subscribe(res => {
      this.products = res.content.docs;
    })
  }

  async doRefresh(event) {
    this.products = [];
    setTimeout(async() => {

      event.target.complete();
      this.initElems()
    }, 2000);
  }


}
