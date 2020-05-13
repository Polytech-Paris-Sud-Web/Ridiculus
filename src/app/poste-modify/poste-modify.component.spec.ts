import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PosteModifyComponent } from './poste-modify.component';

describe('PosteModifyComponent', () => {
  let component: PosteModifyComponent;
  let fixture: ComponentFixture<PosteModifyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PosteModifyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PosteModifyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
