import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { StoreService } from '../../../store.service';
import { EditItemFormComponent } from './edit-item-form.component';

describe('EditItemFormComponent', () => {
  let component: EditItemFormComponent;
  let fixture: ComponentFixture<EditItemFormComponent>;
  let debugElement: DebugElement;

  let mockDialogRef;
  let mockService;
  let MOCK_MAT_DIALOG_DATA;

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };

    mockService = jasmine.createSpyObj('ItemsService', ['putItem$']);

    MOCK_MAT_DIALOG_DATA = {
      item: {
        id: 1,
        name: 'First',
        total: 0,
        completed: 0,
      },
      currentListId: '1',
    };
    await TestBed.configureTestingModule({
      declarations: [EditItemFormComponent],
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
        }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditItemFormComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should close the edit form when the cancel button is clicked', () => {
    const cancelButton = debugElement.query(By.css('.edit-item__cancel'));

    cancelButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should close dialog when edit button clicked and name.length is more then 0', () => {
    component.name = 'Second';

    const editButton = debugElement.query(By.css('.edit-item__cancel'));

    editButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  });

  it('should not close dialog when edit button clicked but name.length equals 0', () => {
    component.name = '';

    const editButton = debugElement.query(By.css('.edit-item__edit'));

    editButton.triggerEventHandler('click', null);

    expect(mockDialogRef.close.calls.count()).toBe(0, 'dialog is not closed');
  });
});
