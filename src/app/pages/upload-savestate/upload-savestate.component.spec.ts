import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSavestateComponent } from './upload-savestate.component';

describe('UploadSavestateComponent', () => {
  let component: UploadSavestateComponent;
  let fixture: ComponentFixture<UploadSavestateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSavestateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UploadSavestateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
