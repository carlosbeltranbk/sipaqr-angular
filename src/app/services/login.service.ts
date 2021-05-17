import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoginModel } from 'src/app/models/login';
import { ConstantsService } from '../services/constants.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class LoginService {
  
  baseAppUrl: string;

  constructor( private http: HttpClient, private _constant: ConstantsService) {

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  login( usuario: LoginModel){

    return this.http.post(`${this.baseAppUrl}/auth/login`, usuario);

  }




}
