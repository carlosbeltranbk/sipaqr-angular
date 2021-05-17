import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SessionGuard implements CanActivate {

  constructor(private _constant: ConstantsService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {

    if(!localStorage.getItem("sesion")){
      this.router.navigateByUrl("inicioSesion");
      return false;
    }else{
      this._constant.session = localStorage.getItem("sesion");
      return true;
    }

  }
  
}
