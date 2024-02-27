import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingpageComponent } from './components/landingpage/landingpage.component';
import { LoginComponent } from './components/login/login.component';
import { BrowseComponent } from './components/browse/browse.component';
import { authGuard } from './shared/guard/auth.guard';
import { NewComponent } from './components/browse/new/new.component';
import { ManageComponent } from './components/browse/manage/manage.component';
import { EditComponent } from './components/browse/edit/edit.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LandingpageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'browse', component: BrowseComponent, canActivate: [authGuard] },
  { path: 'new', component: NewComponent, canActivate: [authGuard] },
  { path: 'manage', component: ManageComponent, canActivate: [authGuard] },
  { path: 'edit/:id', component: EditComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: 'browse'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
