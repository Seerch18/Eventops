import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Usuario } from '../../models/user/usuario';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginbutton',
  templateUrl: './loginbutton.component.html',
  styleUrls: ['./loginbutton.component.css'],
})
export class LoginbuttonComponent implements OnInit {
  private usuario: Usuario;
  private nameUserLS = 'user';

  constructor(
    public auth: AuthService,
    private usuarioService: UsuarioService,
    private _router: Router
  ) {
    this.usuario = {} as Usuario;
  }

  ngOnInit(): void {}

  saveUserLocalStorage(usuario: any) {
    if (!localStorage.getItem('user')) {
      localStorage.setItem('user', JSON.stringify(usuario));
    }
  }

  loginWithRedirect(): void {
    this.auth.loginWithPopup().subscribe((resp) => {
      this.auth.isAuthenticated$.subscribe((resp) => {
        if (resp) {
          console.log('Está auntenticado');
          this.auth.user$.subscribe((user) => {
            this.usuario = new Usuario(
              user?.nickname!,
              user?.name!,
              user?.email!,
              user?.picture!,
              user?.sub!
            );

            this.usuarioService
              .readUserIdToken(user?.sub!)
              .subscribe((resp) => {
                let usuarioLS;
                if (resp) {
                  usuarioLS = resp;
                } else {
                  this.usuarioService
                    .createUser(this.usuario)
                    .subscribe((resp) => console.log(resp));
                  usuarioLS = this.usuario;
                }
                this.saveUserLocalStorage(usuarioLS);
              });
          });
        } else {
          console.log('No está auntenticado');
          localStorage.removeItem('user');
        }
      });
    });
  }
}
