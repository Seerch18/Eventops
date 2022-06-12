import { Component, OnInit } from '@angular/core'
import { environment } from '../../../../environments/environment.prod'

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  public HREF_BASE = environment.HREF_BASE

  constructor() {}

  ngOnInit(): void {}
}
