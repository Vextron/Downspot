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
import { DownloadComponent } from './components/download/download.component';
import { PlaylistDetailsComponent } from './components/playlist-details/playlist-details.component';
import { ArtistsPageComponent } from './components/artists-page/artists-page.component';
import { ArtistDetailComponent } from './components/artist-detail/artist-detail.component';
import { AlbumsPageComponent } from './components/albums-page/albums-page.component';
import { AlbumDetailComponent } from './components/album-detail/album-detail.component';

import { ProfileResolver } from './resolvers/profile-resolver.resolver';
import { ArtistsResolver } from './resolvers/artists-resolver.resolver';
import { ArtistDetailResolver } from './resolvers/artist-detail.resolver';
import { AlbumsResolver } from './resolvers/albums-resolver.resolver';
import { AlbumDetailResolver } from './resolvers/album-detail.resolver';
import { PlaylistResolver } from './resolvers/playlists-resolver.resolver';
import { PlaylistDetailResolver } from './resolvers/playlist-detail.resolver';

import { AlbumSongListComponent } from './components/album-song-list/album-song-list.component';
import { PlaylistsPageComponent } from './components/playlists-page/playlists-page.component';
import { PlaylistSongListComponent } from './components/playlist-song-list/playlist-song-list.component';

const app_routes: Routes = [

  { path: '',  component: LandingComponent },
  { path: 'navigation', canActivate: [AuthGuard], component: NavigationComponent, children: [

      {path: '', redirectTo: 'profile' , pathMatch: 'full'},
      {path: 'search', component: WebDownloaderComponent},
      {path: 'profile', component: ProfileComponent, resolve: { profile_data: ProfileResolver }},
      {path: 'artists', component: ArtistsPageComponent, resolve: { artists_data: ArtistsResolver }},
      {path: 'artist/:id', component: ArtistDetailComponent, resolve: { artist_data: ArtistDetailResolver }},
      {path: 'albums', component: AlbumsPageComponent, resolve: { albums_data: AlbumsResolver }},
      {path: 'album/:id', component: AlbumDetailComponent, resolve: { album_tracks: AlbumDetailResolver }},
      {path: 'playlists', component: PlaylistsPageComponent, resolve: { playlists: PlaylistResolver }},
      {path: 'playlist/:id', component: PlaylistDetailsComponent, resolve: { playlist_tracks: PlaylistDetailResolver }},
      {path: 'download', component: DownloadComponent}

  ]},
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
    DownloadComponent,
    PlaylistDetailsComponent,
    ArtistsPageComponent,
    ArtistDetailComponent,
    AlbumsPageComponent,
    AlbumDetailComponent,
    AlbumSongListComponent,
    PlaylistsPageComponent,
    PlaylistSongListComponent
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
  providers: [SpotifyService, DataShareService, ProfileResolver, ArtistsResolver, ArtistDetailResolver, AlbumsResolver,
              AlbumDetailResolver, PlaylistResolver, PlaylistDetailResolver],
  bootstrap: [AppComponent]
})



export class AppModule { }
