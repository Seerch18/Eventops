import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'proyecto';
  public menu_col: string = 'col-2';
  public body_col: string = 'col-10';

  constructor(public auth: AuthService) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe((resp) => {
      if(resp){
        this.body_col = 'col-10';
      }else{
        this.body_col = 'col-12';
      }
    })
  }
}
