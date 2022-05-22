import { Component, OnInit, ViewChild } from '@angular/core';
import { Evento } from 'src/app/models/Evento';
import { EventoService } from '../../../services/events/evento.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort, Sort } from '@angular/material/sort';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-proximos-eventos',
  templateUrl: './proximos-eventos.component.html',
  styleUrls: ['./proximos-eventos.component.css'],
})
export class ProximosEventosComponent implements OnInit {
  proxEvents: Array<Evento>;
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

  constructor(private eventoService: EventoService, private auth: AuthService) {
    this.proxEvents = [];
  }

  ngOnInit(): void {
    this.proximosEventos();
  }

  pagAndSort() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  proximosEventos() {
    this.eventoService.proximosEventos().subscribe((eventos) => {
      this.proxEvents = eventos;
      this.dataSource = new MatTableDataSource(this.proxEvents);
      this.pagAndSort();
    });
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
