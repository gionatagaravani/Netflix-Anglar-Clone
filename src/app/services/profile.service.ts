import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Profile, ProfileData } from '../models/profile';
import { BehaviorSubject, Observable, map, tap } from 'rxjs';
import { DB } from '../shared/config';
import { AuthService } from './auth.service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  private user: User;
  private params = new HttpParams();
  private url: string;

  private profileSubject$ = new BehaviorSubject<ProfileData[] | undefined>(
    undefined
  );
  profiles$ = this.profileSubject$.asObservable();

  constructor(
    private readonly http: HttpClient,
    private readonly auth: AuthService
  ) {
    this.user = this.auth.getAuthLocal();
    this.params = this.params.append(
      'auth',
      this.user.stsTokenManager.accessToken
    );
    this.url = DB.URL + this.user.uid;
    this.getProfiles().subscribe();
  }

  getProfiles(): Observable<ProfileData[]> {
    return this.http
      .get<any>(this.url + '/profile.json', {
        params: this.params,
      })
      .pipe(
        map((data) => {
          return this.handleProfileData(data);
        }),
        tap((data) => this.profileSubject$.next(data))
      );
  }

  private handleProfileData(data: any): ProfileData[] {
    if (!data) {
      return [];
    }
    const pdata: ProfileData[] = [];
    Object.keys(data).map((id) => {
      pdata.push({ id: id, data: data[id] });
    });
    return pdata;
  }

  getProfile(id: string): Observable<Profile> {
    return this.http.get<Profile>(this.url + '/profile/' + id + '.json', {
      params: this.params,
    });
  }

  createProfile(data: Profile): Observable<any> {
    return this.http
      .post(this.url + '/profile.json', data, {
        params: this.params,
      })
  }

  editProfile(data: Profile): Observable<any> {
    return this.http.put(this.url + '/profile.json', data, {
      params: this.params,
    });
  }

  deleteProfile(id: string): Observable<any> {
    return this.http.delete(this.url + '/profile/' + id + '.json', {
      params: this.params,
    });
  }
}
