import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProfileService } from '../../../services/profile.service';
import { Profile } from '../../../models/profile';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.scss',
})
export class EditComponent implements OnInit, OnDestroy {
  profile: Profile | undefined = undefined;

  routingSubscription: Subscription = new Subscription();
  profileSubscription: Subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private readonly profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.subscribeRouteId();
  }

  ngOnDestroy(): void {
    this.routingSubscription.unsubscribe();
    this.profileSubscription.unsubscribe();
  }

  private subscribeRouteId() {
    this.routingSubscription = this.route.params.subscribe((params) => {
      this.subscribeProfileData(params['id']);
    });
  }

  private subscribeProfileData(id: string): void {
    this.profileSubscription = this.profileService.getProfile(id).subscribe((data) => {
      this.profile = data;
      this.profile.id = id;
    });
  }
}
