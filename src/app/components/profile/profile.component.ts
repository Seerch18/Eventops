import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
// import { Auth0Client, Auth0ClientOptions } from '@auth0/auth0-spa-js';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profileJson: string = '';

  constructor(public auth: AuthService) {
  }

  ngOnInit(): void {
    // subscribe user from sdk in the profile component
    console.log(this.auth.user$);
    this.auth.idTokenClaims$.subscribe((resp) => {
      console.log(resp);
    });

    this.auth.getIdTokenClaims().subscribe((resp) => console.log(resp));

    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }
}
