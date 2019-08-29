import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/Product';
import { ProductService } from 'src/app/services/product.service';
import { ToastController, AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ViewController } from '@ionic/core';


class ImageSnippet{
  constructor(public src: String, public file: File){
  }
}

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.page.html',
  styleUrls: ['./create-product.page.scss'],
})
export class CreateProductPage implements OnInit {
  versions:any = [];
  solutions:any = [];
  selectedFile: ImageSnippet;
  image:any = '';
  product:Product = new Product('', this.versions, this.solutions, true);
  constructor(private rest: ProductService, private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private camera: Camera,
    private loadingCtrl: LoadingController,
    private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  Dismiss(){
    this.modalCtrl.dismiss()

  }

  processFile(imageInput:any){
    const file: File = imageInput.files[0];
    const reader = new FileReader();

    reader.addEventListener('load', (event:any) => {
      this.selectedFile = new ImageSnippet(event.target.result, file);
    })
  }

  UploadPhoto(){
    const options: CameraOptions = {
      quality: 100,
      sourceType: 0,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    }
    this.camera.getPicture(options).then((imageData) => {
      let base64Image = 'data:image/jpeg;base64,' + imageData;
      this.image = base64Image;
    }, async (err) => {
      const toast = await this.toastCtrl.create({
        message: 'Error: ' +err,
        duration: 2700
      });
      await toast.present();
    })
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
          handler: (data) => {
            let solution = {
              name: data.names,
              description: data.descriptions
            };
            this.solutions.push(solution);
            solution = null;
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
          handler: (data) => {
            let version = {
              name: data.name,
              description: data.description
            };
            this.versions.push(version);
            version = null;
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

  async Save(){
    const loading = await this.loadingCtrl.create({
      message: 'Guardando...',
      backdropDismiss: false
    });
    await loading.dismiss();
    this.rest.NewProduct(this.product).subscribe(async res => {
      if(res.message || res.errors){
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: res.message,
          duration: 2800,
          showCloseButton: true,
          closeButtonText: 'Cerrar',
          color: 'dark'
        });
        await toast.present();
      }else if(res.product){
        await loading.dismiss();
        const toast = await this.toastCtrl.create({
          message: "Producto guardado con éxito.",
          duration: 2800,
          showCloseButton: true,
          closeButtonText: 'Cerrar',
          color: 'dark'
        });
        await toast.present();
        this.modalCtrl.dismiss();
      }
    })
  }

}
