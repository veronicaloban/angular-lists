import {
  ComponentFixture, TestBed,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { StoreService } from '../../../store.service';
import { EditListFormComponent } from './edit-list-form.component';

describe('EditListFormComponent', () => {
  let component: EditListFormComponent;
  let fixture: ComponentFixture<EditListFormComponent>;
  let debugElement: DebugElement;
  let mockDialogRef;
  let mockService;

  const MOCK_MAT_DIALOG_DATA = {
    listRef: {
      id: 1,
      name: 'First',
      total: 0,
      completed: 0,
    },
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockService = jasmine.createSpyObj('ItemsService', ['putList$']);

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
        {
          provide: StoreService,
          useValue: mockService,
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
    const cancelButton = debugElement.query(By.css('.edit-list__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should close dialog when edit button clicked and name.length is more then 0', () => {
    component.name = 'First';

    const createButton = debugElement.query(By.css('.edit-list__edit'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should not close dialog when edit button clicked but name.length equals 0', () => {
    component.name = '';

    const createButton = debugElement.query(By.css('.edit-list__edit'));

    createButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(0, 'dialog is not closed');
  });
});
