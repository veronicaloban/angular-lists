import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';

import { ListsService } from '../lists.service';
import { EditListFormComponent } from './edit-list-form.component';
import { ListsMaterialModule } from '../lists-material.module';

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
  };

  beforeEach(async () => {
    mockDialogRef = {
      close: jasmine.createSpy('close'),
    };
    await TestBed.configureTestingModule({
      declarations: [EditListFormComponent],
      imports: [
        HttpClientModule,
        BrowserAnimationsModule,
        ListsMaterialModule,
      ],
      providers: [
        {
          provide: MatDialogRef,
          useValue: mockDialogRef,
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: MOCK_MAT_DIALOG_DATA,
        },
        ListsService],
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

  it('should close dialog when close button clicked', fakeAsync(() => {
    component.onCancel();
    fixture.detectChanges();
    tick();

    expect(mockDialogRef.close.calls.count()).toBe(1, 'dialog closed');
  }));

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
