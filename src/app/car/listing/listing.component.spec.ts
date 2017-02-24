import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListingComponent } from './listing.component';

describe('ListingComponent', () => {
  let component: ListingComponent;
  let fixture: ComponentFixture<ListingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('will be defined', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {

    beforeEach(() => {
      component.ngOnInit();
    });

    it('will define options', () => {
        expect(component.searchOptions).toBeDefined();
    });
  });
});
