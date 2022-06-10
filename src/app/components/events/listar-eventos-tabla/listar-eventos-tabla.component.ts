import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from '../../../services/events/evento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventoComponent } from '../modal-evento/modal-evento.component';
import { AdminService } from '../../../services/admin/admin.service';
import { DeleteComponent } from '../../dialog/delete/delete.component';
import { DeleteEventoComponent } from '../../dialog/delete-evento/delete-evento.component';

@Component({
  selector: 'app-listar-eventos-tabla',
  templateUrl: './listar-eventos-tabla.component.html',
  styleUrls: ['./listar-eventos-tabla.component.css'],
})
export class ListarEventosTablaComponent implements OnInit {
  @Input() aEventos: any;
  dataSource: any;
  displayedColumns: string[] = [
    'nombre',
    'descripcion',
    'fechaInicio',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  private user: any;
  public isAdmin: boolean;

  constructor(
    private eventoService: EventoService,
    public dialog: MatDialog,
    private adminService: AdminService
  ) {
    this.isAdmin = false;
  }

  ngOnInit(): void {
    this.getLSUser();
    if (this.user) {
      if (this.user.rol == 'ADMIN') {
        this.isAdmin = true;
      }
    }
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  pagAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  like(eventoId: number) {
    this.eventoService
      .createLike(eventoId)
      .subscribe((resp) => console.log(resp));
  }

  openDialog(eventoId: number) {
    this.eventoService.readEvent(eventoId).subscribe((resp) => {
      if (resp) {
        this.dialog.open(ModalEventoComponent, {
          height: '600px',
          width: '800px',
          data: resp,
        });
      }
    });
  }

  eliminarEvento(eventoId: number) {
    let isAdmin = false;
    if (this.user.rol == 'ADMIN') {
      isAdmin = true;
    }
    this.openDeleteDialog(isAdmin, { id: eventoId });
  }

  /**
   * Carga un array los eventos obtenidos de la llamada al servicio
   */
  listAllEvents() {
    if (this.isAdmin) {
      this.adminService.listAllEvents().subscribe((resp) => {
        if (resp) {
          this.aEventos = resp;
        }
      });
    }
  }

  likeOrDeleteLike(eventoId: number) {
    this.eventoService.getLikeEvents(eventoId).subscribe((resp) => {
      console.log(resp.length);
      if (resp.length == 0) {
        this.like(eventoId);
      } else {
        this.eventoService
          .deleteLike(eventoId)
          .subscribe((resp) => console.log(resp));
      }
    });
  }

  openDeleteDialog(isAdmin: boolean, id: any): void {
    this.dialog
      .open(DeleteEventoComponent, {
        width: '250px',
        data: {
          isAdmin: isAdmin,
          eventoId: id,
        },
      })
      .afterClosed()
      .subscribe(() => {
        this.listAllEvents();
      });
  }

  /**
   * Limita una cadena recibida por parámetro
   * @param cadena
   * @param limite
   * @param sufijo
   * @returns
   */
  limitar_cadena(cadena: any, limite: any, sufijo: any) {
    // Si la longitud es mayor que el límite...
    if (cadena.length > limite) {
      // Entonces corta la cadena y ponle el sufijo
      return cadena.slice(0, limite) + sufijo;
    }

    // Si no, entonces devuelve la cadena normal
    return cadena;
  }
}
