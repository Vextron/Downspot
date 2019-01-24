import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumSongListComponent } from './album-song-list.component';

describe('AlbumSongListComponent', () => {
  let component: AlbumSongListComponent;
  let fixture: ComponentFixture<AlbumSongListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumSongListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumSongListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
