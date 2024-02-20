import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile, ProfileData } from '../../models/profile';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

const imgDefault = 'https://occ-0-4581-784.1.nflxso.net/dnm/api/v6/vN7bi_My87NPKvsBoib006Llxzg/AAAABfjwXqIYd3kCEU6KWsiHSHvkft8VhZg0yyD50a_pHXku4dz9VgxWwfA2ontwogStpj1NE9NJMt7sCpSKFEY2zmgqqQfcw1FMWwB9.png?r=229';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit, OnDestroy {
  constructor(private readonly profileService: ProfileService, private readonly route: Router) {}

  profiles: Profile[] = [];
  profileSubscription: Subscription = new Subscription();

  ngOnInit(): void {
    this.subscribeProfiles();
  }

  ngOnDestroy(): void {
    this.profileSubscription.unsubscribe();
  }

  private subscribeProfiles() {
    this.profileSubscription = this.profileService
      .getProfiles()
      .subscribe((p) => this.initializeData(p));
  }

  private initializeData(profiles: ProfileData[]): void {
    if (profiles.length === 0) {
      this.route.navigate(['/new']);
    }

    profiles.forEach((profile) => {
      this.profiles.push({
        id: profile.id,
        isChild: profile.data.isChild,
        name: profile.data.name,
        image: profile.data.image ?? imgDefault,
        language: profile.data.language
      })
    })
  }
}
