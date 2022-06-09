import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AboutComponent } from '../dialog/about/about.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean;
  public avatar: string;
  public langs: string[] = [];
  public selected = 'Español';
  public idioma: string;
  private spanish: string = '../../../assets/IMG/banderas/spanish.png';
  private english: string = '../../../assets/IMG/banderas/english.png';

  constructor(
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {
    this.langs = this.translateService.getLangs();
    this.isAuth = false;
    this.avatar = '../../../assets/IMG/avatar.jpg';
    this.idioma = this.spanish;
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isAuth = true;
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.avatar) {
        if (!user.avatar.includes('avatar.jpg')) {
          this.avatar = user.avatar;
        }
      }
    }
  }

  /**
   * Cambia el lenguaje de la aplicación y la imagen
   * @param event
   */
  changeLang(event: any) {
    this.translateService.use(event);
    if (event == 'English') {
      this.idioma = this.english;
    } else {
      this.idioma = this.spanish;
    }
  }

  openDialog() {
    this.dialog.open(AboutComponent);
  }
}
