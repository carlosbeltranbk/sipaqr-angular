import { Component, OnInit } from '@angular/core';
import { ConstantsService } from '../../../services/constants.service';
import { QRService } from '../../../services/qr.service';
import { Router } from '@angular/router';
import { QrModel } from 'src/app/models/generarQR';
import { QRData } from 'src/app/models/QRmodel';

import { GenerarQRService } from 'src/app/services/generar-qr.service';
import { Observable } from 'rxjs';
import { stringify } from 'querystring';

import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-generar-qr',
  templateUrl: './generar-qr.component.html',
  styleUrls: ['./generar-qr.component.css']
})
export class GenerarQRComponent implements OnInit{

  qr:QrModel = new QrModel();
  qrData:QRData = new QRData();


  public myAngularxQrCode: string = null;
  public session:any;
  public QRdata:any;	

  constructor(private _constant: ConstantsService,private QR: QRService, private router: Router,private qrService: GenerarQRService) { 
    this.session = this._constant.session;
    this.session = JSON.stringify(this.session);	
  }

  ngOnInit() {
    this.generarQR();
  }

  encriptar(QR){
    this.QRdata = CryptoJS.AES.encrypt(JSON.stringify(QR), 'secret key sipaqr4781').toString();
  }

  generarQR(){

    let peticion: Observable<any>;

    // this.qr.usuario = 

    peticion = this.qrService.generarQr(this.qr);

    peticion.subscribe(resp=>{
      this.QR.QRData = resp[0];
      this.qrData.id = resp[0][0].id;
      this.qrData.nombre = resp[0][0].Nombre;
      this.qrData.ap1 = resp[0][0].apellido1;
      this.qrData.ap2 = resp[0][0].apellido2;
      this.qrData.materia = resp[0][0].materia;
      this.qrData.horaInicio = resp[0][0].horaInicio;
      this.qrData.horaFin = resp[0][0].horaFin;
      this.qrData.grupo = resp[0][0].nombre;
      this.qrData.fecha = resp[0][1].Fecha;
      
      this.encriptar(this.QR.QRData);
    });
  }
}
