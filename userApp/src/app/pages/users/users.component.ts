import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { UserModel } from '../../models/user.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  
  users: UserModel[] = [];

  constructor(private userService: UserService) { }

  ngOnInit(){
    
    this.userService.getUsers()
        .subscribe( resp => {
          console.log(resp);
          this.users=resp;
        });

  }
  deleteUser( user: UserModel, i: number ){
    const nom = user.priNombre;
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-success',
        cancelButton: 'btn btn-danger'
      },
      buttonsStyling: false
    })
    
    swalWithBootstrapButtons.fire({
      title: 'Estas seguro?',
      text: "¡No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: '¡Sí, bórralo!',
      cancelButtonText: '¡No, cancela!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.users.splice(i,1);
        
        this.userService.deleteUser( user.id ).subscribe();
        swalWithBootstrapButtons.fire(
          '¡Eliminado!',
          'El usuario '+ nom +' ha sido eliminado.',
          'success'
        )
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === Swal.DismissReason.cancel
      ) {
        swalWithBootstrapButtons.fire(
          'Cancelado',
          'El usuario '+ nom +' está a salvo :)',
          'error'
        )
      }
    })

    
  }

}
