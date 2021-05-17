import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { escanearQR } from 'src/app/models/escanearQR';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class EscanearQrService {

  baseAppUrl: string;

  constructor(private http: HttpClient,private _constant: ConstantsService) { 

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  pasarLista( escanearModel: escanearQR){

    return this.http.post(`${this.baseAppUrl}/pasarLista`, escanearModel);

  }

}
