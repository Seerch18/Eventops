import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AdminService } from '../../services/admin/admin.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public frmUsuario: FormGroup;
  public user: any;
  public canEdit: boolean;
  private selectedUserId: any;
  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private params: ActivatedRoute,
    private adminService: AdminService
  ) {
    this.canEdit = false;
    this.frmUsuario = this.frmBuilder.group({
      nick: new FormControl({ value: '', disabled: true }, Validators.required),
      name: new FormControl({ value: '', disabled: true }, Validators.required),
      email: new FormControl({ value: '', disabled: true }, [
        Validators.required,
        Validators.email,
      ]),
    });
  }

  ngOnInit(): void {
    this.getUserData();
    if (this.params.snapshot.paramMap.get('id')) {
      this.selectedUserId = this.params.snapshot.paramMap.get('id');
      this.addDataFields(this.selectedUserId);
    } else {
      this.datosCamposFormulario(
        this.user.nick,
        this.user.nombre,
        this.user.email
      );
    }
  }

  getUserData() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  addDataFields(id: any) {
    this.adminService.getUser(id).subscribe((usuario) => {
      this.datosCamposFormulario(usuario.nick, usuario.nombre, usuario.email);
    });
    if (this._router.url.includes('profile/' + id)) {
      if (this.user.rol == 'ADMIN') {
        this.editarUsuario();
      }
    }
  }

  datosCamposFormulario(nick: any, name: any, email: any) {
    this.frmUsuario.controls['nick'].setValue(nick);
    this.frmUsuario.controls['name'].setValue(name);
    this.frmUsuario.controls['email'].setValue(email);
  }

  editarUsuario() {
    this.frmUsuario.controls['nick'].enable();
    this.frmUsuario.controls['name'].enable();
    this.frmUsuario.controls['email'].enable();
    this.canEdit = true;
  }

  editar() {
    this.adminService
      .editUser(this.frmUsuario.value, this.selectedUserId)
      .subscribe((resp) => {
        // console.log(resp);
        // let usuario = resp;
        // this.datosCamposFormulario(usuario.nick, usuario.name, usuario.email);
        this._router.navigateByUrl('admin/listUsers');
      });
  }
}
