import { Component, OnInit, Inject } from '@angular/core'
import { MAT_DIALOG_DATA } from '@angular/material/dialog'
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service'
import { EventoService } from '../../../services/events/evento.service'
import { MatSnackBar } from '@angular/material/snack-bar'
import { MatDialog, MatDialogRef } from '@angular/material/dialog'
import { Router } from '@angular/router'
import { environment } from '../../../../environments/environment.prod'

@Component({
  selector: 'app-modal-evento',
  templateUrl: './modal-evento.component.html',
  styleUrls: ['./modal-evento.component.css']
})
export class ModalEventoComponent implements OnInit {
  public eventTags: Array<any>
  private durationInSeconds = 5
  public participa = false
  public me_gusta = false
  private user: any
  public outLikeUrl = false
  public outActivityUrl = false
  public countUsers: any = 0

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private etiquetaService: EtiquetaService,
    private eventoService: EventoService,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,
    private _router: Router
  ) {
    this.eventTags = []
  }

  ngOnInit(): void {
    this.getLSUser()
    this.getTagsEvent(this.data.id)

    if (!this.data.avatar) {
      this.data.avatar = environment.HREF_BASE + '/assets/IMG/avatar.jpg'
    }

    if (this._router.url != '/likes') {
      this.outLikeUrl = true
    }

    if (this._router.url != '/activity') {
      this.outActivityUrl = true
    }

    if (this.user) {
      this.eventoService
        .readParticipacionesEvento(this.data.id, true)
        .subscribe((resp) => {
          if (resp.length > 0) {
            this.participa = true
          }
        })

      this.eventoService.getLikeEvents(this.data.id).subscribe((resp) => {
        if (resp.length > 0) {
          this.me_gusta = true
        }
      })

      this.eventoService
        .readParticipacionesEvento(this.data.id)
        .subscribe((resp) => {
          if (resp) {
            if (resp.length > 0) {
              this.countUsers = resp.length
            }
          }
        })
    }
  }

  /**
   * Carga el usuario guardado en sesión
   */
  getLSUser() {
    if (localStorage.getItem('user')) {
      this.user = JSON.parse(localStorage.getItem('user')!)
    }
  }

  getTagsEvent(id: any) {
    this.etiquetaService.readEventTag(id).subscribe((resp) => {
      if (resp) {
        this.eventTags = resp
        let tagsId: Array<any> = []
        resp.forEach((element: any) => {
          tagsId.push(element.id)
        })
      }
    })
  }

  likeOrDeleteLike(eventoId: number) {
    if (this.user) {
      this.eventoService.getLikeEvents(eventoId).subscribe((resp) => {
        if (resp.length == 0) {
          this.like(eventoId)
        } else {
          this.eventoService.deleteLike(eventoId).subscribe((resp) => {
            this.me_gusta = false
            this.openSnackBar('Eliminado de... Me Gustan')
          })
        }
      })
    } else {
      this.dialog.closeAll()
      this._router.navigateByUrl('login')
    }
  }

  like(eventoId: number) {
    this.eventoService.createLike(eventoId).subscribe((resp) => {
      this.me_gusta = true
      this.openSnackBar('Añadido a... Me Gustan')
    })
  }

  participarEvento(eventoId: number) {
    if (this.user) {
      if (this.participa) {
        // eliminar la participación
        this.eventoService.eliminarParticipacion(eventoId).subscribe((resp) => {
          this.participa = false
          this.openSnackBar('Se ha eliminado la participación')
        })
      } else {
        // añadir la participación
        this.eventoService.crearParticipacion(eventoId).subscribe((resp) => {
          this.participa = true
          this.openSnackBar('!Estas participando en este evento!')
        })
      }
    } else {
      this.dialog.closeAll()
      this._router.navigateByUrl('login')
    }
  }

  /**
   * Muestra una alerta con el mensaje recibido por parámetro
   * @param message
   */
  openSnackBar(message: any) {
    this._snackBar.open(message, 'UNDO', {
      duration: this.durationInSeconds * 1000
    })
  }
}
