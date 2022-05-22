import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/Usuario';
import { AuthService } from '../service/auth.service';
import { IApiUserAuthenticated } from '../../models/iapi-user-authenticated';
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

  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private authService: AuthService
  ) {
    this.usuario = {} as Usuario;
    this.frmUsuario = this.frmBuilder.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {}

  checkUserLogin(usuario: any){
    this.authService.setUserToLocalStorage(usuario);
    this._router.navigateByUrl('/');
  }

  userSignIn(){
    const formulario = this.frmUsuario.value;
    
  }

  async login() {
    this.authService.login(this.frmUsuario.value).subscribe((usuario) => {
      usuario ? this.checkUserLogin(usuario) : this.userSignIn();
    });
  }
}
