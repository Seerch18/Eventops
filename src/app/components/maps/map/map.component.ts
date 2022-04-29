import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent implements OnInit {
  lat = 37.8867462;
  lng = -4.7653552;

  constructor() {}

  ngOnInit(): void {}

  mapClicked($event: MouseEvent) {
    
  }
}
