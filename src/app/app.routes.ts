import { Routes } from "@angular/router";
import { LoginComponent } from './components/compartido/login/login.component';
import { PerfilComponent } from './components/compartido/perfil/perfil.component';
import { GenerarQRComponent } from './components/docente/generar-qr/generar-qr.component';
import { AsistenciasComponent } from './components/docente/asistencias/asistencias.component';
import { DiasFeriadosComponent } from './components/admin/dias-feriados/dias-feriados.component';
import { EscanearQRComponent } from './components/estudiante/escanear-qr/escanear-qr.component';
import { AccessDeniedComponent } from './components/errros/access-denied/access-denied.component';
import { NotFoundComponent } from './components/errros/not-found/not-found.component';

import { SessionGuard } from './guards/session.guard'
import { DocenteGuard } from './guards/docente.guard'
import { AdminGuard } from './guards/admin.guard'
import { AlumnoGuard } from './guards/alumno.guard'



export const ROUTES:Routes = [
    { path: 'inicioSesion', component: LoginComponent},
    {
         path: 'inicio', 
         canActivate: [SessionGuard],
         component: PerfilComponent,
         children: [
            { 
                path: 'generarQR', 
                canActivate: [SessionGuard, DocenteGuard],
                component: GenerarQRComponent,
            },
            { 
                path: 'asistencias', 
                canActivate: [SessionGuard, DocenteGuard],
                component: AsistenciasComponent
            },
            { 
                path: 'diasFeriados', 
                canActivate: [SessionGuard, AdminGuard],
                component: DiasFeriadosComponent
            },
            { 
                path: 'escanearQR',
                canActivate: [SessionGuard, AlumnoGuard],
                component: EscanearQRComponent
            },
         ]
    },
    { path: '403', component: AccessDeniedComponent},
    { path: '404', component: NotFoundComponent},
    { path: '', pathMatch:'full', redirectTo:'inicioSesion'},
    { path: '**', pathMatch:'full', redirectTo:'inicioSesion'},

]