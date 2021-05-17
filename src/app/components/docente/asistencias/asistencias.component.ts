import { Component, OnInit } from '@angular/core';
import {FormControl,Validators,FormGroupDirective, NgForm,} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';
import { Router } from '@angular/router';
import { ConstantsService } from '../../../services/constants.service';
import { ListasService } from 'src/app/services/listas.service';
import { Observable } from 'rxjs';
import { IdDocente } from 'src/app/models/idDocente';
import { JustificarModel } from 'src/app/models/justificar';
import Swal from 'sweetalert2';
import { Listas } from 'src/app/models/listas';
import { ReporteModel } from 'src/app/models/reporte';
import { GenerarReporteService } from 'src/app/services/generar-reporte.service';
import * as fs from 'file-system';


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const PICK_FORMATS = {
  parse: {dateInput: {month: 'short', year: 'numeric', day: 'numeric'}},
  display: {
      dateInput: 'input',
      monthYearLabel: {year: 'numeric', month: 'short'},
      dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
      monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

class PickDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
      if (displayFormat === 'input') {
          return formatDate(date,'dd-MM-yyyy',this.locale);;
      } else {
          return date.toDateString();
      }
  }
}

interface Statu {
  value: string;
  viewValue: string;
}

interface Grupos {
  idGrupo: any;
  nombre: string;
  nombreCarrera: string;
  Materia: string;
  alias:string;
}

@Component({
  selector: 'app-asistencias',
  templateUrl: './asistencias.component.html',
  styleUrls: ['./asistencias.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]
})
export class AsistenciasComponent implements OnInit {

  maxDate = new Date();

  fechaAsistencia = new FormControl('',[
    Validators.required
  ])

  grupoAsignado = new FormControl('',[
    Validators.required
  ])


  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  Toast2 = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timerProgressBar: false
  })

  status: Statu[] = [
    {value: 'Asistencia', viewValue: 'Asistencia'},
    {value: 'Inasistencia', viewValue: 'Inasistencia'},
    {value: 'Justificado', viewValue: 'Justificado'}
  ];

  idDocnete:number;
  grupos:Grupos[] = [];
  idDoModel:IdDocente = new IdDocente();
  justificarModel:JustificarModel = new JustificarModel();
  reporteModel:ReporteModel = new ReporteModel();
  listasModel:Listas = new Listas();
  selectedStatus = this.status[2].value;
  mostrar:boolean;
  alumnos:any;
  msjFail:string;
  showFail:boolean;
  nombreCarrera:string = null;
  alias:string;
  idMateria:number;
  materia:string;

  constructor(private router: Router,private _constant: ConstantsService, private listasService: ListasService, private reporteService: GenerarReporteService) { 
    this.idDoModel.idDocente = 1;

    this.listasModel.idDocente = 1;
    //this.listasModel.fecha = "2020-06-01";
    this.listasModel.nombre = "9°A";

    this.mostrar = false;
    this.showFail = false;
  }

  ngOnInit() {
    this.obtenerGrupos();
  }

  crearReporte(id:number, grupo:string, carrera:string){
    this.Toast2.fire({
      icon: 'info',
      title: 'Generando reporte...'
    });
    this.Toast2.showLoading();
    this.reporteModel.idMateria = id;
    this.reporteModel.nombreGrupo = grupo;
    let peticion: Observable<any>;

    peticion = this.reporteService.generarReporte(this.reporteModel);

    peticion.subscribe(
      resp=>{	
        this.Toast2.close();
        this.downloadFile(resp);
      },
      fail=>{
        Swal.fire(
          'Ups!',
          'Sucedió algo inesperado, intentalo más tarde.',
          'error'
        );
      });
  }

  downloadFile(data: any) {
    const blob = new Blob([data], { type: 'application/vnd.ms-excel' });
    const url= window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    document.body.appendChild(a);
    a.href = url;
    a.download = "ReporteListaAsistencia";
    a.click();
    window.URL.revokeObjectURL(url);
  }
  
  obtenerGrupos(){

    let peticion: Observable<any>;

    peticion = this.listasService.grupos(this.idDoModel);

    peticion.subscribe(resp=>{	
      this.grupos[0] = resp[0];
    });
  }

  consultarListas(){

    this.Toast2.fire({
      icon: 'info',
      title: 'Consultado lista...'
    });
    this.Toast2.showLoading();

    let nom = this.nombreCarrera.split("-");
    
    this.listasModel.nombre = nom[0];
    this.nombreCarrera = nom[1];
    this.idMateria = parseInt(nom[2]);
    this.materia = nom[3];
    this.alias = nom[4];

    let peticion: Observable<any>;

    peticion = this.listasService.listas(this.listasModel);

    peticion.subscribe(
      resp=>{	
        
        this.Toast2.close();

        this.showFail = false;
        this.alumnos = resp;
        this.mostrar = true;
      },
      fail=>{
        this.Toast2.close();

        this.mostrar = false;
        this.msjFail = fail.error.errors[0].message;
        this.showFail = true;
      });
  }

  validacionConsultar(){
    if(this.nombreCarrera == null || this.listasModel.fecha == null){
      this.Toast2.fire({
        icon: 'error',
        title: 'Información no valida'
      });
    }else{
      this.consultarListas();
    }
  }

  justificar(dato:any, idAsistencia:number){

    this.Toast2.fire({
      icon: 'info',
      title: 'Actualizando...'
    });
    this.Toast2.showLoading();

    this.justificarModel.idAsistencia = idAsistencia;
    this.justificarModel.estado = dato.value;

    let peticion: Observable<any>;

    peticion = this.listasService.justificar(this.justificarModel);

    peticion.subscribe(
      resp=>{	
        this.Toast2.close();
        if(resp.status==="Se modificó correctamente."){
          this.Toast.fire({
            icon: 'success',
            title: 'Guardado con éxito.'
          });
        }else{
          this.Toast.fire({
            icon: 'error',
            title: 'Intentalo más tarde.'
          });
        }
        // this.consultarListas();
      },fail=>{
        this.Toast.fire({
          icon: 'error',
          title: 'Intentalo más tarde.'
        });
      });
  }  
  
  
}
