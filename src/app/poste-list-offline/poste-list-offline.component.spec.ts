import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteListOfflineComponent } from './poste-list-offline.component';

describe('PosteListOfflineComponent', () => {
  let component: PosteListOfflineComponent;
  let fixture: ComponentFixture<PosteListOfflineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteListOfflineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteListOfflineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
