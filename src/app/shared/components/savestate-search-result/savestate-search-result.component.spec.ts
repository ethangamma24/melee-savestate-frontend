import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SavestateSearchResultComponent } from './savestate-search-result.component';

describe('SavestateSearchResultComponent', () => {
  let component: SavestateSearchResultComponent;
  let fixture: ComponentFixture<SavestateSearchResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavestateSearchResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavestateSearchResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
