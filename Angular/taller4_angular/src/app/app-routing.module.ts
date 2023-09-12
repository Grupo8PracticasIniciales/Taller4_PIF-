import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { LoginComponent } from './components/login/login.component';
import { RegistrarseComponent } from './components/registrarse/registrarse.component';

const routes: Routes = [
  {path: 'mainPage',component: MainPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'registrarse', component: RegistrarseComponent},
  {path: '**', component: LoginComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }