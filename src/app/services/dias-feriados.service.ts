import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { DiasFeriadosModel } from 'src/app/models/diasFeriados';
import { ConstantsService } from '../services/constants.service';
import {map} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class DiasFeriadosService {
  
  baseAppUrl: string;

  constructor( private http: HttpClient, private _constant: ConstantsService) {

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  crearDiaFeriado( dia: DiasFeriadosModel){

    return this.http.post(`${this.baseAppUrl}/diasFeriados`, dia);

  }

  actualizarDiaFeriado(dia: DiasFeriadosModel){

    return this.http.post(`${this.baseAppUrl}/modificarDia/`, dia);

  }

  consultarDiasFeriados(){

    return this.http.get(`${this.baseAppUrl}/diasFeriados`);

  }
  
  borrarDiaFeriado( id: number){

    return this.http.delete(`${this.baseAppUrl}/diasFeriados/${id}`);

  }

  obtenerDiaId(id:number){

    return this.http.get(`${this.baseAppUrl}/diasFeriados/${id}`);
    
  }

}
