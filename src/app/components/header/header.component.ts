import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public isAuth: boolean;
  public avatar: string;
  public langs: string[] = [];
  public selected = 'English';

  constructor(private translateService: TranslateService) {
    this.langs = this.translateService.getLangs();
    this.isAuth = false;
    this.avatar = '../../../assets/IMG/avatar.jpg';
  }

  ngOnInit(): void {
    if (localStorage.getItem('user')) {
      this.isAuth = true;
      let user = JSON.parse(localStorage.getItem('user')!);
      if (user.avatar) {
        this.avatar = user.avatar;
      }
    }
  }

  changeLang(event: any) {
    this.translateService.use(event);
  }
}
