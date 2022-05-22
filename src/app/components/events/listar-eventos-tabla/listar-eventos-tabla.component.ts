import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from '../../../services/events/evento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from '../../../services/auth.service';

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
    'fechaFin',
    'acciones',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private eventoService: EventoService,
    private auth: AuthService
  ) {}

  ngOnInit(): void {}

  pagAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  like(eventoId: number) {
    this.eventoService
      .createLike(eventoId)
      .subscribe((resp) => console.log(resp));
  }

  verEvento(eventoId: number) {
    // ventana modal que muestre el evento
  }
}
