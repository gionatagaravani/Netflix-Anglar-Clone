import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { DB } from '../shared/config';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {

  constructor(private readonly http: HttpClient) {}

  getProfile(): Observable<Profile> {
    return this.http.get<Profile>(DB.URL + 'profile.json');
  }
}
