import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ConstantsService } from '../services/constants.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DocenteGuard implements CanActivate {

  constructor(private _constant: ConstantsService, private router: Router){
    
  }
  
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean {
      
      if(this._constant.rol === 'Docente'){
        return true;
      }else{
        this.router.navigateByUrl("403");
      }

  }
  
}
