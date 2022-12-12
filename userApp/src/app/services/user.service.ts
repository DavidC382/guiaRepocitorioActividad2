import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://usuarios-c1798-default-rtdb.firebaseio.com/usuarios.json'

  constructor( private http: HttpClient ) { }


  crearUsuario( usuario:UserModel ){
    return this.http.post(this.url,usuario)
           .pipe(
             map( (resp:any) => {
               usuario.id = resp.name;
               return usuario; 
             })
           );
  }
  getUser(){
    return this.http.get(this.url)
           .pipe(
            map( this.crearAreglo )
           );
  }
  private crearAreglo( userObj: object ){
    const users: UserModel[] = [];
    console.log(userObj);
    if ( userObj === null ){ return []; }

    return users;
  }

}
