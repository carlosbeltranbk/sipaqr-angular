import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReporteModel } from 'src/app/models/reporte';
import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class GenerarReporteService {

  baseAppUrl: string;

  constructor(private http: HttpClient,private _constant: ConstantsService) { 

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  generarReporte( reporte: ReporteModel){

    return this.http.post(`${this.baseAppUrl}/reporte`, reporte, { responseType: 'blob'});

  }

}
