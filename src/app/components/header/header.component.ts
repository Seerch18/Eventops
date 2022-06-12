import { Component, OnInit } from '@angular/core'
import { TranslateService } from '@ngx-translate/core'
import { AboutComponent } from '../dialog/about/about.component'
import { MatDialog } from '@angular/material/dialog'
import { environment } from '../../../environments/environment.prod'

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean
  public avatar: string
  public langs: string[] = []
  public selected = 'Español'
  public idioma: string
  public HREF_BASE = environment.HREF_BASE
  private spanish: string = this.HREF_BASE + '/assets/IMG/banderas/spanish.png'
  private english: string = this.HREF_BASE + '/assets/IMG/banderas/english.png'

  constructor(
    private translateService: TranslateService,
    public dialog: MatDialog
  ) {
    this.langs = this.translateService.getLangs()
    this.isAuth = false
    this.avatar = this.HREF_BASE + '/assets/IMG/avatar.jpg'
    this.idioma = this.spanish
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isAuth = true
      let user = JSON.parse(localStorage.getItem('user')!)
      if (user.avatar) {
        if (!user.avatar.includes('avatar.jpg')) {
          this.avatar = user.avatar
        }
      }
    }
  }

  /**
   * Cambia el lenguaje de la aplicación y la imagen
   * @param event
   */
  changeLang(event: any) {
    this.translateService.use(event)
    if (event == 'English') {
      this.idioma = this.english
    } else {
      this.idioma = this.spanish
    }
  }

  openDialog() {
    this.dialog.open(AboutComponent)
  }
}
