import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { SearchComponent } from './pages/search/search.component';
import { UploadSavestateComponent } from './pages/upload-savestate/upload-savestate.component';
import { SavestateDetailsComponent } from './pages/savestate-details/savestate-details.component';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { SavestateSearchResultComponent } from './shared/components/savestate-search-result/savestate-search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    SearchComponent,
    UploadSavestateComponent,
    SavestateDetailsComponent,
    NavbarComponent,
    SavestateSearchResultComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
