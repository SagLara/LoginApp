import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService,
              private router: Router) { }

  ngOnInit() {
    this.usuario=new UsuarioModel();
  }

  login ( form: NgForm ){
    if (form.invalid) {return;}
    Swal.fire({
      allowOutsideClick: false, 
    icon: 'info', 
    text: 'Espera por Favor..'
    });
    Swal.showLoading()
    this.auth.login(this.usuario).subscribe(
      resp=>{
        console.log(resp);
        
        Swal.close();
        this.router.navigateByUrl("/home")
      }, (err)=>{
        Swal.fire({
          icon: 'error', 
          title: 'Error al autenticar',
          text: err.error.mensaje
        });
      });
      Swal.close();
  }

  
}
