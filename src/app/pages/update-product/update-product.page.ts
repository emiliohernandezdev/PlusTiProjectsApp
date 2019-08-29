import { Component, OnInit, OnChanges } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { ToastController, AlertController, NavController, ModalController, NavParams, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.page.html',
  styleUrls: ['./update-product.page.scss'],
})
export class UpdateProductPage implements OnInit {
  product: Product = null;
  versions:any = [];
  solutions:any = [];
  constructor(private activated: ActivatedRoute,
    private rest: ProductService, private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private modalCtrl: ModalController,
    private navParams: NavParams,
    private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.rest.GetProduct(this.navParams.get('id')).subscribe(res => {
      this.product = new Product(res.product.name, res.product.versions, res.product.solutions, res.product.active)  
      this.versions = res.product.versions;
      this.solutions = res.product.solutions;
    })
  }


  async Update(){
    this.product = new Product(this.product.name, this.versions, this.solutions, this.product.active);
    const loader = await this.loadingCtrl.create({
      message: 'Actualizando...',
      backdropDismiss: false
    });
    await loader.present();
    this.rest.UpdateProduct(this.navParams.get('id'), this.product)
    .subscribe(async res => {
      if(res.product){
        await loader.dismiss();
        const toast = await this.toastCtrl.create({
          message: 'Producto actualizado con exito.',
          duration: 2500,
          showCloseButton: true,
          closeButtonText: 'Cerrar',
          color: 'dark'
        });
        await toast.present().then(() => {
          this.modalCtrl.dismiss();
        })
      }else if(res.message){
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

  Dismiss(){
    this.modalCtrl.dismiss();
  }

  async AddSolution(){
    const prompt = await this.alertCtrl.create({
      header: 'Ingresar nueva solucion',
      message: 'Ingrese informacion de la solucion a agregar',
      inputs: [
        {
          name: 'names',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'descriptions',
          type: 'text',
          placeholder: 'Descripcion'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            let solution = {
              name: data.names,
              description: data.descriptions
            };
            this.solutions.push(solution);
            const toast = await this.toastCtrl.create({
              message: 'Solucion agregada con exito.',
              duration: 2500,
              showCloseButton: true,
              closeButtonText: 'Cerrar',
              color: 'dark'
            });
            await toast.present(); 
          }
        }
      ]
    });
    await prompt.present();
  }

  async AddVersion(){
    const prompt = await this.alertCtrl.create({
      header: 'Ingresar nueva version',
      message: 'Ingrese informacion de la version',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Nombre'
        },
        {
          name: 'description',
          type: 'text',
          placeholder: 'Descripcion'
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        },
        {
          text: 'Aceptar',
          handler: async (data) => {
            let version = {
              name: data.name,
              description:data.description
            };
            this.versions.push(version);
            const toast = await this.toastCtrl.create({
              message: 'Version agregada con exito.',
              duration: 2500,
              showCloseButton: true,
              closeButtonText: 'Cerrar',
              color: 'dark'
            });
            await toast.present(); 
          }
        }
      ]
    });
    await prompt.present();

  }

  async RemoveSolution(solution){
    if(this.solutions.length > 0){
      this.solutions.splice(solution.index, 1)
      const toast = await this.toastCtrl.create({
        message: 'Solucion removida con exito',
        duration: 2500,
        showCloseButton: true,
        closeButtonText: 'Cerrar',
        color: 'dark'
      });
      await toast.present(); 
    }
  }

  async Remove(version){
    if(this.versions.length > 0){
      this.versions.splice(version.index, 1)
      const toast = await this.toastCtrl.create({
        message: 'Version removida con exito',
        duration: 2500,
        showCloseButton: true,
        closeButtonText: 'Cerrar',
        color: 'dark'
      });
      await toast.present(); 
    }
  
  }

}
