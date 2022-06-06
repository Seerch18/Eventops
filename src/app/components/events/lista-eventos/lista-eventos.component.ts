import {
  Component,
  OnInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { EventoService } from '../../../services/events/evento.service';
import { ModalEventoComponent } from '../modal-evento/modal-evento.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminService } from '../../../services/admin/admin.service';
import { DeleteComponent } from '../../dialog/delete/delete.component';

@Component({
  selector: 'app-lista-eventos',
  templateUrl: './lista-eventos.component.html',
  styleUrls: ['./lista-eventos.component.css'],
})
export class ListaEventosComponent implements OnInit {
  @Input() aEventos: any;
  @Input() eventos: any;
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
      // this.adminService.deleteEvent(eventoId).subscribe((resp) => {
      //   if (!resp['delete']) {
      //     alert('Error al eliminar el registro');
      //   }
      //   this.cargarEventos();
      // });
    } else {
      // this.eventoService.deleteEvent(eventoId).subscribe((resp) => {
      //   if (!resp['delete']) {
      //     alert('Error al eliminar el registro');
      //   }
      //   this.cargarEventos();
      // });
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

  limitar_cadena(cadena: any, limite: any, sufijo: any) {
    // Si la longitud es mayor que el límite...
    if (cadena.length > limite) {
      // Entonces corta la cadena y ponle el sufijo
      return cadena.slice(0, limite) + sufijo;
    }

    // Si no, entonces devuelve la cadena normal
    return cadena;
  }

  openDeleteDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string,
    element: any,
    object: any
  ): void {
    this.dialog.open(DeleteComponent, {
      width: '250px',
      data: {
        element: element,
        object: object,
      },
    });
  }
}
