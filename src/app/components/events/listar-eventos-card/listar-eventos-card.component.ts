import { Component, OnInit, Input } from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ModalEventoComponent } from '../modal-evento/modal-evento.component';
import { DeleteEventoComponent } from '../../dialog/delete-evento/delete-evento.component';

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
    let isAdmin = false;
    this.openDeleteDialog(isAdmin, { id: id });
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
    this.eventoService.deleteLike(eventoId).subscribe((resp) => {
      this.eventoService.getLikeEvents().subscribe((resp) => {
        this.aEventos = resp;
      });
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
        this.cargarEventos();
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
