import { Component, OnInit } from '@angular/core';
import { LoadingController, ToastController, AlertController } from '@ionic/angular';
import { Storage } from '@ionic/storage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  type: string = "password";
  email:string = "";
  password:string = "";
  constructor(private loadingCtrl: LoadingController,
    private toastCtrl: ToastController, private alertCtrl: AlertController,
    private storage: Storage, private router: Router) { }

  ngOnInit() {
  }

  changeType(){
    if(this.type === "password"){
      this.type = "text"
    }else{
      this.type = "password"
    }
  }

  async DoLogin(){
    if(this.email !== '' && this.password !== ''){
      const loader = await this.loadingCtrl.create({
        message: "Procesando...",
        backdropDismiss: false,
        duration: 2500
      });
  
      await loader.present().then(() => {
        this.storage.set('token_session', 'jwt');
        this.router.navigate(['/tabs/tab1']);
      })
    }else{
      const toast = await this.toastCtrl.create({
        message: "Debes completar todos los campos.",
        duration: 2800,
        position: "bottom",
        color: "dark",
        showCloseButton: true,
        closeButtonText: "Cerrar"
      });

      await toast.present();

    }

  }

  async RecoverPassword(){
    const alert = await this.alertCtrl.create({
      header: "Recuperar contraseña",
      subHeader: "Ingresa tu correo para recuperar",
      inputs: [
        {name: 'email', type: 'email', placeholder: 'Tu email'}
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            console.log(data);
          }
        }
      ]
    });
    return await alert.present();
  }

}
