import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventoService } from '../../../services/events/evento.service';
import { AdminService } from '../../../services/admin/admin.service';

@Component({
  selector: 'app-delete-evento',
  templateUrl: './delete-evento.component.html',
  styleUrls: ['./delete-evento.component.css'],
})
export class DeleteEventoComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<DeleteEventoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private eventoService: EventoService,
    private adminService: AdminService
  ) {}

  ngOnInit(): void {}
  borrar() {
    console.log(this.data['eventoId'].id);
    if (this.data) {
      if (this.data['isAdmin']) {
        this.adminService
          .deleteEvent(this.data['eventoId'].id)
          .subscribe((resp) => console.log(resp));
      } else {
        this.eventoService
          .deleteEvent(this.data['eventoId'].id)
          .subscribe((resp) => console.log(resp));
      }
    }
  }
}
