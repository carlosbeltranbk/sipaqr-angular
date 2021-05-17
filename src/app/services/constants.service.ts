import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConstantsService {

  readonly baseAppUrl: string = 'https://ec0dce7987a4.ngrok.io/api';

  session:any = false;
  rol:any = "";
  nombre:any ="";
  ap1:string="";
  ap2:string="";
  idAlumno:number;
  grupo:string;

  constructor() { }
}
