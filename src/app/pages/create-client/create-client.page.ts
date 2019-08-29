import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/Client';
import { HttpClient } from '@angular/common/http';
import { ClientService } from 'src/app/services/client.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer/ngx';
import { File } from '@ionic-native/file';

@Component({
  selector: 'app-create-client',
  templateUrl: './create-client.page.html',
  styleUrls: ['./create-client.page.scss'],
})

export class CreateClientPage implements OnInit {
  countries:any;
  adding:boolean = false;
  productInput:String = "";
  products:any = [];
  client: Client = new Client('', '', '', this.products, this.products, null, null);
  imageData:any;
  desc: String;
  constructor(private http: HttpClient, private rest: ClientService,
    private cam: Camera,
    private transfer: FileTransfer,
    private file: File) { }

  ngOnInit() {
    this.http.get('https://restcountries.eu/rest/v2/all').subscribe(res => {
      console.log(res);
      this.countries = res;
    })
  }

  saveImage(){
    this.rest.UploadImage(this.imageData, this.desc)
  }

  Add(){
    this.products.push({product: this.productInput});
    this.productInput = '';
    this.adding = false;
    console.log(this.products);
  }

  Remove(index){
    this.products.splice(index, 1);
    this.adding = false;
  }


  Save(){
    this.rest.NewClient(this.client).subscribe(res => {
      console.log(res);
    })
  }



}
