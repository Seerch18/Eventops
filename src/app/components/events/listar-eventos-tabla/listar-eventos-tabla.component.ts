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
        console.log('pasa');
        this.isAdmin = true;
      }
    }
  }

  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
      // console.log(this.user);
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
    if (this.user.rol == 'ADMIN') {
      this.openDeleteDialog('', '', 'admin_evento', { id: eventoId });
    } else {
      this.openDeleteDialog('', '', 'evento', { id: eventoId });
    }
  }

  cargarEventos() {
    this.eventoService
      .listEvents()
      .subscribe((eventos) => (this.aEventos = eventos));
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
        this.cargarEventos();
      });
  }
}
