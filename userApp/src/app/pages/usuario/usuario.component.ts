import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserModel } from '../../models/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit{
  
  user = new UserModel();  

  constructor( private userService: UserService) { }
  
  ngOnInit(){
  }

  guardar( form:NgForm ){
    
    if ( form.invalid ){
      console.log('Formulario no valido');
      return;
    }
    
    this.userService.crearUsuario(this.user)
      .subscribe( resp => {
          console.log(resp);
      });


  }

}
