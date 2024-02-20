import { Component, OnDestroy, OnInit } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Profile, ProfileData } from '../../models/profile';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-browse',
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.scss',
})
export class BrowseComponent implements OnInit, OnDestroy {
  constructor(private readonly profileService: ProfileService) {}

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
      return;
    }

    profiles.forEach((profile) => {
      this.profiles.push({
        id: profile.id,
        isChild: profile.data.isChild,
        name: profile.data.name,
        image: profile.data.image ?? '',
        language: profile.data.language
      })
    })
  }
}
