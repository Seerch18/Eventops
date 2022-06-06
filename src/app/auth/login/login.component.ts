import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { AuthService } from '../service/auth.service';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public frmUsuario: FormGroup;
  public usuario: Usuario;
  invalidCredentials = false;

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
    this.usuario = {} as Usuario;
    this.frmUsuario = this.frmBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        // Validators.minLength(8),
      ]),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this._router.navigateByUrl('/');
    }
  }

  checkUserLogin(usuario: any) {
    this.authService.setUserToLocalStorage(usuario);
    this._router.navigateByUrl('/');
    window.location.reload();
  }

  userSignIn() {
    const formulario = this.frmUsuario.value;
    this.invalidCredentials = true;
    let email = document.getElementById('email');
    email?.addEventListener('focus', () => {
      this.invalidCredentials = false;
    });
    let pass = document.getElementById('password');
    pass?.addEventListener('focus', (resp) => {
      console.log(resp);
      this.invalidCredentials = false;
    });
  }

  async login() {
    if (this.frmUsuario.valid) {
      this.authService.login(this.frmUsuario.value).subscribe((usuario) => {
        usuario ? this.checkUserLogin(usuario) : this.userSignIn();
      });
    }
  }
}
