import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IComment } from '../Models/i-comment';

@Injectable({
  providedIn: 'root'
})
export class RatingService {

  private baseUrl = 'http://EcommerceWebSite.somee.com/api/';

  constructor(private http: HttpClient) { }

  getProductComments(productId: Number): Observable<IComment[]> {
    return this.http.get<IComment[]>(`${this.baseUrl}Comment/product/ ${productId}`);
  }

  makeProductComment( comment: IComment): Observable<any> {
    return this.http.post<IComment>(`${this.baseUrl}Comment`, comment);
  }

}
