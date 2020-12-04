import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { CreateItemFormComponent } from './create-item-form.component';

describe('CreateItemFormComponent', () => {
  let component: CreateItemFormComponent;
  let fixture: ComponentFixture<CreateItemFormComponent>;
  let debugElement: DebugElement;

  let mockDialogRef;

  let MOCK_MAT_DIALOG_DATA;

  beforeEach(async () => {
    mockDialogRef = {
      close: (): void => {},
    };

    MOCK_MAT_DIALOG_DATA = {
      name: 'newItem',
    };
    await TestBed.configureTestingModule({
      declarations: [CreateItemFormComponent],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MOCK_MAT_DIALOG_DATA,
        },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateItemFormComponent);
    component = fixture.componentInstance;

    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the addItemForm when the cancel button is clicked', () => {
    spyOn(mockDialogRef, 'close').and.callThrough();

    const cancelButton = debugElement.query(By.css('.create-item__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });
});
