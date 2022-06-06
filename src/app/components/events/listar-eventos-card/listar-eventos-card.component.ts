import { Component, OnInit, Input } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventoComponent } from '../modal-evento/modal-evento.component';
import { MatButtonModule } from '@angular/material/button';
import { DeleteComponent } from '../../dialog/delete/delete.component';

@Component({
  selector: 'app-listar-eventos-card',
  templateUrl: './listar-eventos-card.component.html',
  styleUrls: ['./listar-eventos-card.component.css'],
})
export class ListarEventosCardComponent implements OnInit {
  @Input() aEventos: any;
  public inLikeUrl: boolean;
  constructor(
    private eventoService: EventoService,
    private _route: Router,
    public dialog: MatDialog
  ) {
    this.inLikeUrl = false;
  }

  ngOnInit(): void {
    if (this._route.url == '/likes') {
      this.inLikeUrl = true;
    }
  }

  eliminarEvento(id: any) {
    this.openDeleteDialog('0ms', '0ms', 'evento', { id: id });
    // this.eventoService.deleteEvent(id).subscribe((resp) => {
    //   if (!resp['delete']) {
    //     alert('Error al eliminar el registro');
    //   }
    //   this.cargarEventos();
    // });
  }

  cargarEventos() {
    this.eventoService
      .listEvents()
      .subscribe((eventos) => (this.aEventos = eventos));
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

  deleteLike(eventoId: number) {
    console.log(eventoId);
    this.eventoService.deleteLike(eventoId).subscribe((resp) => {
      console.log(resp);
      this.eventoService.getLikeEvents().subscribe((resp) => {
        this.aEventos = resp;
      });
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
