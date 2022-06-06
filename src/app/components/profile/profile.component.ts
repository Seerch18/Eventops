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
  constructor(
    private frmBuilder: FormBuilder,
    private _router: Router,
    private params: ActivatedRoute,
    private adminService: AdminService
  ) {
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
      let userId = this.params.snapshot.paramMap.get('id');
      this.addDataFields(userId);
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

  editarUsuario() {}

  addDataFields(id: any) {
    this.adminService.getUser(id).subscribe((usuario) => {
      this.datosCamposFormulario(usuario.nick, usuario.nombre, usuario.email);
    });
  }

  datosCamposFormulario(nick: any, name: any, email: any) {
    this.frmUsuario.controls['nick'].setValue(nick);
    this.frmUsuario.controls['name'].setValue(name);
    this.frmUsuario.controls['email'].setValue(email);
  }
}
