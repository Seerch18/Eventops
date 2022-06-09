import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EtiquetaService } from '../../../services/etiquetas/etiqueta.service';
import { EventoService } from '../../../services/events/evento.service';

@Component({
  selector: 'app-modal-evento',
  templateUrl: './modal-evento.component.html',
  styleUrls: ['./modal-evento.component.css'],
})
export class ModalEventoComponent implements OnInit {
  public eventTags: Array<any>;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private etiquetaService: EtiquetaService,
    private eventoService: EventoService
  ) {
    this.eventTags = [];
  }

  ngOnInit(): void {
    console.log(this.data);
    this.getTagsEvent(this.data.id);
  }

  getTagsEvent(id: any) {
    this.etiquetaService.readEventTag(id).subscribe((resp) => {
      if (resp) {
        console.log(resp);
        this.eventTags = resp;
        let tagsId: Array<any> = [];
        resp.forEach((element: any) => {
          tagsId.push(element.id);
        });
      }
    });
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
  like(eventoId: number) {
    this.eventoService
      .createLike(eventoId)
      .subscribe((resp) => console.log(resp));
  }

  participarEvento(eventoId: number) {}
}
