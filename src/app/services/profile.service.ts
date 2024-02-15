import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile } from '../models/profile';
import { Observable } from 'rxjs';
import { DB } from '../shared/config';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  user: User;

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService
  ) {
    this.user = auth.getAuthLocal();
  }

  getProfiles(): Observable<Profile> {
    return this.http.get<Profile>(DB.URL + this.user.localId + '/profile.json');
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(
      DB.URL + this.user.localId + '/profile/' + id + '.json'
    );
  }

  createProfile(data: Profile): Observable<any> {
    return this.http.post(DB.URL + this.user.localId + '/profile.json', data);
  }

  editProfile(data: Profile): Observable<any> {
    return this.http.put(DB.URL + this.user.localId + '/profile.json', data);
  }

  deleteProfile(id: string): Observable<any> {
    return this.http.delete(
      DB.URL + this.user.localId + '/profile/' + id + '.json'
    );
  }
}
