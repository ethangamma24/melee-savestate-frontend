import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'; // CLI imports router

import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SavestateDetailsComponent } from './pages/savestate-details/savestate-details.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadSavestateComponent } from './pages/upload-savestate/upload-savestate.component';

const routes: Routes = [
  { path: '**', component: HomeComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'savestate-details', component: SavestateDetailsComponent }, // TODO: add parameter based routing for this.
  { path: 'search', component: SearchComponent },
  { path: 'upload', component: UploadSavestateComponent }
]; // sets up routes constant where you define your routes

// configures NgModule imports and exports
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
