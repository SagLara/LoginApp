import { Component, OnInit } from '@angular/core';
import { UsuarioModel } from 'src/app/models/usuario.model';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

  usuario: UsuarioModel;

  constructor(private auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.usuario = new UsuarioModel();
  }
  onSubmit(form: NgForm) {

    if (form.invalid) { return; }
    Swal.fire({
      allowOutsideClick: false, 
      icon: 'info', 
      text: 'Espera por Favor..'
    });
    Swal.showLoading();

    this.auth.nuevoUsuario(this.usuario).subscribe(
      resp => {
        console.log(resp);
        Swal.close();
        this.router.navigateByUrl("/login")
      }, (err) => {
        console.log(err.error)
        Swal.fire({
          
          icon: 'error',
          title: 'Error al crear el usuario',
          text: err.error.mensaje
        });
      });
    Swal.close();

    /* this.auth.mensajePB().subscribe((data)=>{
      console.log(data);
      
    }); */
  }
}
