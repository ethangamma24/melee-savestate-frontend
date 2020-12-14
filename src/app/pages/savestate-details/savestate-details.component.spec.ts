import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavestateDetailsComponent } from './savestate-details.component';

describe('SavestateDetailsComponent', () => {
  let component: SavestateDetailsComponent;
  let fixture: ComponentFixture<SavestateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavestateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavestateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
