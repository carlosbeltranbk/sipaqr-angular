import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../../services/constants.service';
import { Router } from '@angular/router';

import {EscanearQrService } from '../../../services/escanear-qr.service';
import { escanearQR } from 'src/app/models/escanearQR';
import { Observable } from 'rxjs';

import Swal from 'sweetalert2';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-escanear-qr',
  templateUrl: './escanear-qr.component.html',
  styleUrls: ['./escanear-qr.component.css']
})

export class EscanearQRComponent implements OnInit {

  qr:escanearQR = new escanearQR();
  public idAlumno:number;
  public grupo:string;

  mostrar:boolean;
  correcto:boolean;

  constructor(private _constant: ConstantsService,private router: Router, private escanearService: EscanearQrService) {
    this.mostrar = true;
    this.correcto = false;

    this.idAlumno = _constant.idAlumno;
    this.grupo = _constant.grupo;
  }

  Toast = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  Toast2 = Swal.mixin({
    toast: true,
    position: 'center',
    showConfirmButton: false,
    timerProgressBar: false
  })
  
  enviarDatos(qr: any){

    this.mostrar = false;

    this.Toast2.fire({
      icon: 'info',
      title: 'Espere...'
    });
    this.Toast2.showLoading();

    let bytes  = CryptoJS.AES.decrypt(qr, 'secret key sipaqr4781');
    let data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));

    this.qr.grupoNombre='9°A';
    this.qr.idAlumno=5;
    this.qr.idLista=2;

    this.qr.idModulo = 2;

    this.qrEscaneado();

  }
  ngOnInit() {
  }

  qrEscaneado(){

    let peticion: Observable<any>;
    peticion = this.escanearService.pasarLista(this.qr);

    peticion.subscribe(resp=>{
      this.Toast2.close();
      if(resp.status==='Exito'){
        this.mostrar = false;
        this.Toast.fire({
          icon: 'success',
          title: 'Asistencia registrada'
        });
        this.correcto=true;
      }else{
        this.mostrar = true;

        this.Toast.fire({
          icon: 'error',
          title: 'Error'
        });
      }
    });

  }

}
