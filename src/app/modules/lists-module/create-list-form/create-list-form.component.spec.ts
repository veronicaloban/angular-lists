import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { CreateListFormComponent } from './create-list-form.component';

describe('CreateNewListComponent', () => {
  let component: CreateListFormComponent;
  let fixture: ComponentFixture<CreateListFormComponent>;
  let debugElement: DebugElement;

  let mockDialogRef;
  let MOCK_MAT_DIALOG_DATA;

  beforeEach(async () => {
    mockDialogRef = {
      close: (): void => {},
    };

    MOCK_MAT_DIALOG_DATA = {
      name: 'newList',
    };
    await TestBed.configureTestingModule({
      declarations: [CreateListFormComponent],
      imports: [BrowserAnimationsModule],
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
    fixture = TestBed.createComponent(CreateListFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the dialog form when Cancel button is clicked', () => {
    spyOn(mockDialogRef, 'close').and.callThrough();
    const cancelButton = debugElement.query(By.css('.create-list__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });
});
