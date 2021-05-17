import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IdDocente } from 'src/app/models/idDocente';
import { Listas } from 'src/app/models/listas';
import { JustificarModel } from 'src/app/models/justificar';

import { ConstantsService } from '../services/constants.service';

@Injectable({
  providedIn: 'root'
})
export class ListasService {

  baseAppUrl: string;

  constructor(private http: HttpClient,private _constant: ConstantsService) { 

    this.baseAppUrl =this._constant.baseAppUrl;	

  }

  grupos( idDocente: IdDocente){

    return this.http.post(`${this.baseAppUrl}/gruposDocentes`, idDocente);

  }

  listas( listas: Listas){

    return this.http.post(`${this.baseAppUrl}/listasAlumnos`, listas);

  }

  justificar( justificarM: JustificarModel){

    return this.http.post(`${this.baseAppUrl}/modificacionAlumnoEstatus`, justificarM);

  }
  
}
