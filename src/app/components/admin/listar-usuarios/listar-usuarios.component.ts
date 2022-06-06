import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventoComponent } from '../../events/modal-evento/modal-evento.component';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';
import { DeleteComponent } from '../../dialog/delete/delete.component';
@Component({
  selector: 'app-listar-usuarios',
  templateUrl: './listar-usuarios.component.html',
  styleUrls: ['./listar-usuarios.component.css'],
})
export class ListarUsuariosComponent implements OnInit {
  public aUsuarios: Array<any>;
  dataSource: any;
  displayedColumns: string[] = ['nick', 'nombre', 'email', 'acciones'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private user: any;
  public isAdmin: boolean;

  constructor(
    public dialog: MatDialog,
    private adminService: AdminService,
    private _router: Router
  ) {
    this.isAdmin = false;
    this.aUsuarios = [];
  }

  ngOnInit(): void {
    this.getLSUser();
    if (this.user) {
      if (this.user.rol == 'ADMIN') {
        console.log('pasa');
        this.isAdmin = true;
      } else {
        this._router.navigateByUrl('/');
      }
    }
    this.cargarUsuarios();
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      console.log(this.user);
    }
  }

  pagAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  eliminarUsuario(usuarioId: number) {
    if (this.user.rol == 'ADMIN') {
      this.openDeleteDialog('', '', 'admin_usuario', { id: usuarioId });
      // this.adminService.deleteUser(usuarioId).subscribe((resp) => {
      //   if (!resp['delete']) {
      //     alert('Error al eliminar el registro');
      //   }
      //   this.cargarUsuarios();
      // });
    }
  }

  cargarUsuarios() {
    this.adminService.listAllUsers().subscribe((usuarios) => {
      if (usuarios['list']) {
        this._router.navigateByUrl('/');
      } else {
        this.aUsuarios = usuarios;
        console.log(this.aUsuarios);
      }
    });
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any,
    object: any
  ): void {
    this.dialog
      .open(DeleteComponent, {
        width: '250px',
        data: {
          element: element,
          object: object,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.cargarUsuarios();
      });
  }
}
