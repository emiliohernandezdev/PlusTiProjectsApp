import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Product } from '../models/Product';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ProductService {

  constructor(private http: HttpClient) { }
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

  public GetProducts() : Observable<any>{
    return this.http.get(this.enpoint + 'products/page/1/size/100', this.httpOptions)
    .pipe(map(this.extractData));
  }

  public GetProduct(id:any) : Observable<any>{
    return this.http.get(this.enpoint + 'products/' + id, this.httpOptions)
    .pipe(map(this.extractData));
  }
 
  public NewProduct(product: Product) : Observable<any>{
    let body = JSON.stringify(product);
    return this.http.post(this.enpoint + 'products', body, this.httpOptions)
    .pipe(map(this.extractData));
  }

  public UpdateProduct(id:any, product: Product) : Observable<any>{
    let body = JSON.stringify(product);
    return this.http.put(this.enpoint + 'products/inactive/' + id, body, this.httpOptions)
    .pipe(map(this.extractData));
  }

  public DeleteProduct(id:any) : Observable<any>{
    return this.http.delete(this.enpoint + 'products/' + id, this.httpOptions)
    .pipe(map(this.extractData));
  }
}
