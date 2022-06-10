import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventoComponent } from '../../events/modal-evento/modal-evento.component';
import { AdminService } from '../../../services/admin/admin.service';
import { Router } from '@angular/router';
import { DeleteComponent } from '../../dialog/delete/delete.component';
import { DeleteUserComponent } from '../../dialog/delete-user/delete-user.component';
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
        this.isAdmin = true;
      } else {
        this._router.navigateByUrl('/');
      }
    }
    this.cargarUsuarios();
  }

  /**
   * Carga el usuario de la sesión
   */
  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  /**
   * Paginación y ordenación
   */
  pagAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  /**
   * Elimina un usuario de la base de datos
   * @param usuarioId
   */
  eliminarUsuario(usuarioId: number) {
    if (this.user.rol == 'ADMIN') {
      this.openDeleteDialog(true, { id: usuarioId });
    }
  }

  /**
   * Carga en un array los usuarios obtenidos de la llamada al servicio
   */
  cargarUsuarios() {
    this.adminService.listAllUsers().subscribe((usuarios) => {
      if (usuarios['list']) {
        this._router.navigateByUrl('/');
      } else {
        this.aUsuarios = usuarios;
      }
    });
  }

  /**
   * Llama a un componente y muestra un aviso
   * @param isAdmin
   * @param id
   */
  openDeleteDialog(isAdmin: boolean, id: any): void {
    this.dialog
      .open(DeleteUserComponent, {
        width: '250px',
        data: {
          isAdmin: isAdmin,
          usuarioId: id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.cargarUsuarios();
      });
  }
}
