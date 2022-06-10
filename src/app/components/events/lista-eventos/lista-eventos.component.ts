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
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteEventoComponent } from '../../dialog/delete-evento/delete-evento.component';

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
  durationInSeconds = 3;

  constructor(
    private eventoService: EventoService,
    public dialog: MatDialog,
    private adminService: AdminService,
    private _router: Router,
    private _snackBar: MatSnackBar
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

  /**
   * Carga el usuario guardado en sesión
   */
  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!);
    }
  }

  /**
   * Crea un me gusta del evento para el usuario
   * @param eventoId
   */
  like(eventoId: number) {
    this.eventoService.createLike(eventoId).subscribe((resp) => {
      this.openSnackBar('Añadido a... Me Gustan');
    });
  }

  /**
   * Abre una ventana modal con los datos del evento filtrado por id
   * @param eventoId
   */
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

  /**
   * Eliminar evento filtrado por su id
   * @param eventoId
   */
  eliminarEvento(eventoId: number) {
    let isAdmin = false;
    if (this.user.rol == 'ADMIN') {
      isAdmin = true;
    }
    this.openDeleteDialog(isAdmin, { id: eventoId });
  }

  /**
   * Carga en el array de eventos los datos recibidos de la llamada al servicio
   */
  cargarEventos() {
    this.eventoService
      .listEvents()
      .subscribe((eventos) => (this.aEventos = eventos));
  }

  /**
   * Elimina o crea un me gusta para el usuario
   * @param eventoId
   */
  likeOrDeleteLike(eventoId: number) {
    if (this.user) {
      this.eventoService.getLikeEvents(eventoId).subscribe((resp) => {
        if (resp.length == 0) {
          this.like(eventoId);
        } else {
          this.eventoService.deleteLike(eventoId).subscribe((resp) => {
            this.openSnackBar('Eliminado de... Me Gustan');
          });
        }
      });
    } else {
      this._router.navigateByUrl('login');
    }
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

  /**
   * Llama a un componente que muestra un aviso
   * @param isAdmin
   * @param id
   */
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
   * Muestra una alerta con el mensaje recibido por parámetro
   * @param message
   */
  openSnackBar(message: any) {
    this._snackBar
      .open(message, 'UNDO', {
        duration: this.durationInSeconds * 1000,
      })
      .afterOpened()
      .subscribe(() => {});
  }
}
