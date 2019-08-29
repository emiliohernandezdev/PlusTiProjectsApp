import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";
import { Client } from '../models/Client';
import { FileTransfer, FileTransferObject, FileUploadOptions } from '@ionic-native/file-transfer/ngx';

@Injectable()
export class ClientService {

  constructor(private http: HttpClient, private transfer: FileTransfer) { }
  enpoint = 'http://localhost:3000/api/v1/';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  private extractData(res){
    let body = res;
    return body || {} || [];
  }

  public GetClients(): Observable<any>{
    return this.http.get(this.enpoint + 'clients/page/1/size/1')
    .pipe(map(this.extractData));
  }

  public NewClient(client:Client) : Observable<any>{
    let body = JSON.stringify(client);
    return this.http.post(this.enpoint + 'clients', body, this.httpOptions)
    .pipe(map(this.extractData));
  }

  public UploadImage(img, user){
    var url = this.enpoint + '/clients/' + user + '/upload';
    var targetPath = img;

    var options: FileUploadOptions = {
      fileKey: 'image',
      chunkedMode: false,
      mimeType: 'multipart/form-data',
      params: {'user': user}
    };
    let uo: FileTransferObject = this.transfer.create();
    return uo.upload(targetPath, url, options);
  }
}
