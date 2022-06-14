import { Component, OnInit, Inject } from '@angular/core'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { EventoService } from '../../../services/events/evento.service'
import { UsuarioService } from '../../../services/usuario/usuario.service'
import { Router } from '@angular/router'

@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit {
  EVENTO: string = 'evento'
  ADMIN_EVENTO: string = 'admin_evento'
  ADMIN_USUARIO: string = 'admin_usuario'
  constructor(
    public dialogRef: MatDialogRef<DeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventoService: EventoService,
    private usuarioService: UsuarioService,
    private _router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Borra de la base de datos el elemento recibod en data
   */
  borrar() {
    if (this.data['element'] == this.EVENTO) {
      this.eventoService.deleteEvent(this.data['object'].id).subscribe(() => {
        this._router.navigateByUrl('/listEvents')
      })
    } else if (this.data['element'] == this.ADMIN_USUARIO) {
      this.usuarioService.deleteUser(this.data['object'].id).subscribe(() => {
        this._router.navigateByUrl('/admin/listUsers')
      })
    } else if (this.data['element'] == this.ADMIN_EVENTO) {
      this.eventoService.deleteEvent(this.data['object'].id).subscribe(() => {
        this._router.navigateByUrl('/admin/listEvents')
      })
    }
  }
}
