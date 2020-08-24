import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioModel } from '../models/usuario.model';
import { map }  from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})



export class AuthService {
  userToken: string;
  nombre: string;
  path ='/api/mensaje';
  
  constructor(private http: HttpClient ) { 
    this.leerToken();
  }

  logout(){
    localStorage.removeItem('token');
    localStorage.removeItem('nombre');
    window.location.reload();
  }
  login(usuario: UsuarioModel){
    /* this.userToken="asdasd45645" */
    return this.http.post('/api/login',usuario
    ).pipe(
      map( resp=>{
        this.guradarToken( resp['idToken'],resp['nombre']);
        return resp;
      })
    );
  }
  public nuevoUsuario(usuario: UsuarioModel){
    var authData ={
      email: usuario.email,
      nombre: usuario.nombre,
      password: usuario.password
    };
    return this.http.post('/api/newUser', authData);
  }
  public mensajePB(){
    return this.http.get(this.path);

  }
  private guradarToken( idToken: string, nombre: string){
    this.userToken =idToken;
    localStorage.setItem('token',idToken);
    this.nombre =nombre;
    localStorage.setItem('nombre',nombre);
  }
  leerToken(){
    if(localStorage.getItem('token')){
      this.userToken= localStorage.getItem('token');
      this.nombre= localStorage.getItem('nombre');
    } else{
      this.userToken="";
      this.nombre="";
    }
  }
  public estaAutenticado(): boolean{
    return this.userToken.length > 2
  }

}
