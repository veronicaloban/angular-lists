import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CreateItemButtonComponent } from './create-item-button.component';

describe('AddItemButtonComponent', () => {
  let component: CreateItemButtonComponent;
  let fixture: ComponentFixture<CreateItemButtonComponent>;
  let debugElement: DebugElement;

  const dialog = {
    open: jasmine.createSpy('open'),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateItemButtonComponent],
      providers: [{ provide: MatDialog, useValue: dialog }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemButtonComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open the addItemForm when the + button is clicked', () => {
    const openButton = debugElement.query(By.css('button'));

    openButton.triggerEventHandler('click', null);

    expect(dialog.open.calls.count()).toBe(1, 'dialog opened');
  });
});
