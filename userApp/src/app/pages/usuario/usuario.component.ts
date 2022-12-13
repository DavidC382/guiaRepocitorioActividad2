import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

import Swal from 'sweetalert2';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  
  user = new UserModel();  

  constructor( private userService: UserService,
               private route: ActivatedRoute ) { }
  
  ngOnInit(){

    const id = this.route.snapshot.paramMap.get('id');
    if ( id !== 'nuevo') {
       this.userService.getUser( id+"" )
           .subscribe( (resp: UserModel|any) =>{
              this.user = resp;
              this.user.id = id+""; 
           });
    }
  }

  guardar( form:NgForm ){
    
    if ( form.invalid ){
      console.log('Formulario no valido');
      return;
    }
    
    let peticion: Observable<any>;

    if ( this.user.id ){
      peticion = this.userService.actualizarusuario(this.user);
    }else{
      peticion = this.userService.crearUsuario(this.user);
    }
    peticion.subscribe( resp => {
      const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
      })
      
      Toast.fire({
        icon: 'success',
        title: this.user.priNombre,
        text: 'Se actualizó correctamente'
      })
    });


  }

}
