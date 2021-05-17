import { Component, OnInit } from '@angular/core';
import { DiasFeriadosModel } from 'src/app/models/diasFeriados';
import { DiasFeriadosService } from 'src/app/services/dias-feriados.service';
import { ConstantsService } from '../../../services/constants.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';
import { Observable, from } from 'rxjs';
import { NativeDateAdapter, DateAdapter, MAT_DATE_FORMATS } from '@angular/material';
import { formatDate } from '@angular/common';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';

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

@Component({
  selector: 'app-dias-feriados',
  templateUrl: './dias-feriados.component.html',
  styleUrls: ['./dias-feriados.component.css'],
  providers: [
    {provide: DateAdapter, useClass: PickDateAdapter},
    {provide: MAT_DATE_FORMATS, useValue: PICK_FORMATS}
  ]

})

export class DiasFeriadosComponent implements OnInit {

  minDate = new Date();
  maxDate = new Date().getFullYear();
  

  boton:string = '';
  diasFeriados: DiasFeriadosModel[] = [];

  diaFeriado:DiasFeriadosModel = new DiasFeriadosModel();
  constructor(private diasService: DiasFeriadosService,private _constant: ConstantsService,private router: Router) { 
  
  }



  Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true
  })

  ngOnInit() {
    this.consultar();
    this.boton = 'Ingresar';
  }
  
  guardar(){

    this.Toast.fire({
      icon: 'info',
      title: 'Guardando información'
    });
    this.Toast.showLoading();

    let peticion: Observable<any>;

    if(this.diaFeriado.id){
      peticion = this.diasService.actualizarDiaFeriado(this.diaFeriado);
      this.boton = 'Ingresar';
    }else{
      peticion = this.diasService.crearDiaFeriado(this.diaFeriado);
    }

    peticion.subscribe(resp=>{
      this.consultar();
      this.Toast.fire({
        icon: 'success',
        title: 'Guardado con éxito.'
      });
      this.diaFeriado.id = null;
      this.diaFeriado.fecha = null;
      this.diaFeriado.razon = null;
      this.razonInput.reset();
      this.fecha.reset();
    });

  }

  borrar(dia:DiasFeriadosModel){

    Swal.fire({
      title: '¿Estas seguro?',
      text: "Se eliminará de forma permanente",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        this.diasService.borrarDiaFeriado(dia.id)
          .subscribe(resp=>{
            Swal.fire(
              'Elimado!',
              'Se ha elimando el día feriado correctamente',
              'success'
            );
            this.consultar();
          }); 
      }
    })
    
  }

  consultar(){
    this.diasService.consultarDiasFeriados()
      .subscribe((resp:any) => this.diasFeriados = resp);
  }

  getDia(id:number){
    this.diasService.obtenerDiaId(id)
      .subscribe((resp:DiasFeriadosModel) => {
        this.diaFeriado = resp[0];
        this.boton = 'Actualizar';
      });
  }

  sendData(){    
    if(this.diaFeriado.razon == null || this.diaFeriado.fecha == null){
      this.Toast.fire({
        icon: 'error',
        title: 'Información no valida'
      });
    }else{
      this.guardar();      
    }
  }

  razonInput = new FormControl('', [
    Validators.required,
    Validators.minLength(10)
  ]); 
  
  fecha = new FormControl('',[
    Validators.required
  ])

  
}
