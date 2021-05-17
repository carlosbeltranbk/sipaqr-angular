import { Component, OnInit } from '@angular/core';
import { LoginModel } from 'src/app/models/login';
import { LoginService } from 'src/app/services/login.service';
import { ConstantsService } from '../../../services/constants.service';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  

  usuario:LoginModel = new LoginModel();
  loader:boolean;
  msjFail:string;

  constructor(private router: Router, private loginService: LoginService, private _constant: ConstantsService) {
    this.loader = false;
  }
  
  login(){    
    this.msjFail = '';
    let peticion: Observable<any>;
    peticion = this.loginService.login(this.usuario);
    this.loader = true;
    
    peticion.subscribe(
      resp=>{
        this._constant.session = resp;
        this._constant.rol = this._constant.session[0].rol;
        this._constant.nombre = this._constant.session[0].nombre;
        this._constant.ap1 = this._constant.session[0].apellido1;
        this._constant.ap2 = this._constant.session[0].apellido2;
        this._constant.idAlumno = this._constant.session[0].idAlumno;
        this._constant.grupo = this._constant.session[0].grupo;

        localStorage.setItem("sesion", this._constant.session);

        this.router.navigateByUrl("inicio");
      },
      fail=>{

        this.loader = false;

        if(fail.error.errors[0].message) this.msjFail = fail.error.errors[0].message;
        
      });
  }
  ngOnInit() {
    localStorage.clear();
  }

}
