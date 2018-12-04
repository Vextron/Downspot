import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebDownloaderComponent } from './web-downloader.component';

describe('WebDownloaderComponent', () => {
  let component: WebDownloaderComponent;
  let fixture: ComponentFixture<WebDownloaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebDownloaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebDownloaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
