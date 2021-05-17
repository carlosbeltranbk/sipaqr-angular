import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { ConstantsService } from '../../../services/constants.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, public _constant: ConstantsService, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit() {
    if(this._constant.rol==='Alumno') this.router.navigateByUrl("inicio/escanearQR");
    if(this._constant.rol==='Docente') this.router.navigateByUrl("inicio/generarQR");
    if(this._constant.rol==='Administrador') this.router.navigateByUrl("inicio/diasFeriados");
  }

}
