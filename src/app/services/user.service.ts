import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {map} from "rxjs/operators";

@Injectable()
export class UserService {

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

  public Example() : Observable<any>{
    return this.http.get(this.enpoint + 'example', this.httpOptions)
    .pipe(map(this.extractData))
  }
}
