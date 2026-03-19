import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuAndCustomizationComponent } from './menu-and-customization.component';

describe('MenuAndCustomizationComponent', () => {
  let component: MenuAndCustomizationComponent;
  let fixture: ComponentFixture<MenuAndCustomizationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuAndCustomizationComponent]
    });
    fixture = TestBed.createComponent(MenuAndCustomizationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
