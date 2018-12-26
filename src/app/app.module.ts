import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AuthGuard } from './auth.guard';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ScrollDispatchModule } from '@angular/cdk/scrolling';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatBadgeModule } from '@angular/material/badge';
import { MatRadioModule } from '@angular/material/radio';

import { SpotifyService } from './services/spotify.service';
import { DataShareService } from './services/data-share.service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingComponent } from './components/landing/landing.component';
import { WebDownloaderComponent } from './components/web-downloader/web-downloader.component';
import { CheckComponent } from './components/check/check.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { PlaylistsComponent } from './components/playlists/playlists.component';
import { SongListComponent } from './components/song-list/song-list.component';
import { AlbumsComponent } from './components/albums/albums.component';
import { ArtistsComponent } from './components/artists/artists.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ProfileResolver } from './resolvers/profile-resolver.resolver';
import { DownloadComponent } from './components/download/download.component';

const app_routes: Routes = [

  { path: '',  component: LandingComponent },
  { path: 'navigation', canActivate: [AuthGuard], component: NavigationComponent, children: [

      {path: '', redirectTo: 'search' , pathMatch: 'full'},
      {path: 'search', component: WebDownloaderComponent},
      {path: 'profile', component: ProfileComponent, resolve: { profile_data: ProfileResolver}},
      {path: 'download', component: DownloadComponent}
  ] },
  { path: 'check', component: CheckComponent },

];
@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    WebDownloaderComponent,
    CheckComponent,
    NavigationComponent,
    PlaylistsComponent,
    SongListComponent,
    AlbumsComponent,
    ArtistsComponent,
    ProfileComponent,
    DownloadComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatListModule,
    MatTabsModule,
    MatSidenavModule,
    MatGridListModule,
    ScrollDispatchModule,
    MatSnackBarModule,
    FormsModule,
    MatBadgeModule,
    MatRadioModule,
    RouterModule.forRoot(app_routes)
  ],
  providers: [SpotifyService, DataShareService, ProfileResolver],
  bootstrap: [AppComponent]
})



export class AppModule { }
