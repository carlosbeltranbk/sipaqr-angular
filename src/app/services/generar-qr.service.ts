import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { QrModel } from 'src/app/models/generarQR';
import { ConstantsService } from '../services/constants.service';



@Injectable({
  providedIn: 'root'
})
export class GenerarQRService {

  baseAppUrl: string;


  constructor(private http: HttpClient,private _constant: ConstantsService) { 

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  generarQr( generarQR: QrModel){

    return this.http.post(`${this.baseAppUrl}/modulos`, generarQR);

  }

}
