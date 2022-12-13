import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router'
import { UsuarioComponent } from './pages/usuario/usuario.component';
import { HomeComponent } from './pages/home/home.component';
import { UsersComponent } from './pages/users/users.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'usuarios', component: UsersComponent},
  {path: 'usuario/:id', component: UsuarioComponent},
  {path: '**',pathMatch: 'full',redirectTo: 'home'}
];





@NgModule({
  imports: [
    RouterModule.forRoot( routes )
  ],
  exports:[
    RouterModule
  ]
})
export class AppRoutingModule { }
