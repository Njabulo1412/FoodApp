import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LANDINGPAGEComponent } from './landingpage.component';

describe('LANDINGPAGEComponent', () => {
  let component: LANDINGPAGEComponent;
  let fixture: ComponentFixture<LANDINGPAGEComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LANDINGPAGEComponent]
    });
    fixture = TestBed.createComponent(LANDINGPAGEComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
