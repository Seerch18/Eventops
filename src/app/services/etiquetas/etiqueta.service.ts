import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'
import { F } from '@angular/cdk/keycodes'
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class EtiquetaService {
  API_URL = environment.API_URL
  private url = this.API_URL + '/apirestangular/api/tags'
  private urlEventsTags = this.API_URL + '/apirestangular/api/events_tags'
  private userId: number | undefined

  constructor(private http: HttpClient) {
    if (localStorage.getItem('user')) {
      let usuario = JSON.parse(localStorage.getItem('user')!)
      this.userId = usuario.id
    }
  }

  // Tags
  createTag() {}
  deleteTag() {}
  readTags(id: number = 0): Observable<any> {
    return this.http.get(`${this.url}/readTag.php?id=${id}`)
  }

  // EventTags
  readEventTag(eventoId: number = 0): Observable<any> {
    return this.http.get(
      `${this.urlEventsTags}/readEventTag.php?eventoId=${eventoId}`
    )
  }
  deleteEventTag(eventoId: number = 0, tags: any): Observable<any> {
    return this.http.delete(
      `${this.urlEventsTags}/deleteEventTag.php?eventoId=${eventoId}`,
      tags
    )
  }
  createEventTag() {}
}
