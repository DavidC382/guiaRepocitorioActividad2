import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private url = 'https://usuarios-c1798-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient ) { }


  crearUsuario( usuario:UserModel ){
    return this.http.post(`${this.url}/usuarios.json`,usuario)
           .pipe(
             map( (resp:any) => {
               usuario.id = resp.name;
               return usuario; 
             })
           );
  }

  actualizarusuario( user:UserModel  ){

    const userTemp = {
      ...user
    } as Partial<UserModel>;;

    delete userTemp.id;

    return this.http.put(`${this.url}/usuarios/${user.id}.json`,userTemp);
  }
  
  deleteUser( id: string ){
    return this.http.delete(`${this.url}/usuarios/${id}.json`);
  }

  getUser( id: string ){
    return this.http.get(`${this.url}/usuarios/${id}.json`);
  }

  getUsers(){
      return this.http.get(`${this.url}/usuarios.json`)
             .pipe(
                map(this.crearArreglo)
             );
  }
  
  private crearArreglo( userObj: any ){
      
      const usuarios: UserModel[] = [];   
      console.log(userObj);
      if ( userObj === null ) { return []; }
      
      Object.keys( userObj ).forEach( key => {
        
        const usuario: UserModel = userObj[key];
        usuario.id = key;
        usuarios.push(usuario);
      });
      
      return usuarios;
  }


}
