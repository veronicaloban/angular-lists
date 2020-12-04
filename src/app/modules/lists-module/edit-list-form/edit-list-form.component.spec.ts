import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { EditListFormComponent } from './edit-list-form.component';

describe('EditListFormComponent', () => {
  let component: EditListFormComponent;
  let fixture: ComponentFixture<EditListFormComponent>;
  let debugElement: DebugElement;
  let mockDialogRef;

  const MOCK_MAT_DIALOG_DATA = {
    listRef: {
      id: 1,
      name: 'First',
      total: 0,
      completed: 0,
    },
    newName: 'newName',
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: (): void => {},
    };

    await TestBed.configureTestingModule({
      declarations: [EditListFormComponent],

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
    fixture = TestBed.createComponent(EditListFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close dialog when close button clicked', () => {
    spyOn(mockDialogRef, 'close').and.callThrough();
    const cancelButton = debugElement.query(By.css('.edit-list__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });
});
