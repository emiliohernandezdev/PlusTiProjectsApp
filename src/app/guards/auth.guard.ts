import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(public router: Router, private st: Storage){

  }

  canActivate() : Observable<boolean> | Promise<boolean> | boolean{
    let token: String= ''
    this.st.get('token_session').then((val) => {
      token= val;
    })

    if(token !== null){
      return true;
    }else{
      this.router.navigate(['/login']);
      return false;
    }

  }
  
}
