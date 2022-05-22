import { Injectable } from '@angular/core';

declare var google: any;
declare var window: any;

@Injectable({
  providedIn: 'root',
})
export class GooglemapsService {
  apiKey = 'AIzaSyDzjKgXo682mL_NZCN0wqb4qhrQlSMrkNg';
  mapsLoaded = false;

  constructor() {}

  init(renderer: any, document: any) {
    return new Promise((resolve, reject) => {
      if (this.mapsLoaded) {
        console.log('google is preview loaded');
        resolve(true);
        return;
      } else {
        console.log('google no loaded');
      }

      const script = renderer.createElement('script');
      script.id = 'googleMaps';

      window['mapInit'] = () => {
        this.mapsLoaded = true;
        if (google) {
          console.log('google is loaded');
        } else {
          console.log('google is not Defined');
        }
        resolve(true);
        return;
      };

      if (this.apiKey) {
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=' +
          this.apiKey +
          '&callback=mapInit';
      } else {
        script.src = 'https://maps.googleapis.com/maps/api/js?callback=mapInit';
      }

      script.src = script.src + "&libraries=places"

      renderer.appendChild(document.body, script);
    });
  }
}
