import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl,
} from '@angular/forms';
import { Usuario } from '../../models/user/usuario';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  public frmUsuario: FormGroup;
  public usuario: Usuario;
  hide = true;

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
    this.usuario = {} as Usuario;
    this.frmUsuario = this.frmBuilder.group({
      nick: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this._router.navigateByUrl('/');
    }
  }

  /**
   * Registra al usuario
   */
  async register() {
    if (this.frmUsuario.valid) {
      this.authService.register(this.frmUsuario.value).subscribe((resp) => {
        if (resp) {
          let datos = {
            password: this.frmUsuario.value['password'],
            email: this.frmUsuario.value['email'],
          };
          console.log(datos);
          this.authService.login(datos).subscribe((usuario) => {
            usuario ? this.checkUserLogin(usuario) : this.userSignIn();
          });
        }
      });
    }
  }

  /**
   * Comprueba si el usuario existe en la base de datos
   * @param usuario
   */
  checkUserLogin(usuario: any) {
    this.authService.setUserToLocalStorage(usuario);
    this._router.navigateByUrl('/');
    window.location.reload();
  }

  /**
   * Rellena el formulario con los datos introducidos por el usuario
   */
  userSignIn() {
    const formulario = {
      nick: this.frmUsuario.value['nick'],
      name: this.frmUsuario.value['name'],
      email: this.frmUsuario.value['email'],
    };
  }
}
