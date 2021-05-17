import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'

import { AppComponent } from './app.component';

import { LoginComponent } from './components/compartido/login/login.component';
import { ROUTES } from './app.routes';
import { PerfilComponent } from './components/compartido/perfil/perfil.component';
import { GenerarQRComponent } from './components/docente/generar-qr/generar-qr.component';
import { AsistenciasComponent } from './components/docente/asistencias/asistencias.component';
import { DiasFeriadosComponent } from './components/admin/dias-feriados/dias-feriados.component';

import { QRCodeModule } from 'angularx-qrcode';

import { ConstantsService } from './services/constants.service';
import { SidenavComponent } from './components/compartido/sidenav/sidenav.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import {MatSidenavModule} from '@angular/material/sidenav'; 
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material';

import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter'; 

import {MatSelectModule} from '@angular/material/select';
import {MatButtonModule, MatCheckboxModule, MatToolbarModule, MatCardModule, 
  MatExpansionModule, MatDatepickerModule, MatInputModule, MatTabsModule, 
  MatTooltipModule, MatFormFieldModule, MatMenuModule, MatSnackBarModule} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 

import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { ZXingScannerModule } from '@zxing/ngx-scanner';
import { EscanearQRComponent } from './components/estudiante/escanear-qr/escanear-qr.component';
import { AccessDeniedComponent } from './components/errros/access-denied/access-denied.component';
import { NotFoundComponent } from './components/errros/not-found/not-found.component';
//Rutas

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PerfilComponent,
    GenerarQRComponent,
    SidenavComponent,
    AsistenciasComponent,
    DiasFeriadosComponent,
    EscanearQRComponent,
    AccessDeniedComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    QRCodeModule,
    MatTooltipModule,
    MatMenuModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatTabsModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    MatInputModule,
    MatExpansionModule,
    MatSelectModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    ZXingScannerModule,
    RouterModule.forRoot(ROUTES,{useHash:true}),
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    BrowserAnimationsModule,
    MatMomentDateModule

  ],
  providers: [
    ConstantsService,
    MatDatepickerModule,
    MatNativeDateModule 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
