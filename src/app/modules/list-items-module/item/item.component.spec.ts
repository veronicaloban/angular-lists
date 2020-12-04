import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatCheckbox } from '@angular/material/checkbox';
import { DebugElement } from '@angular/core';
import { Observable, of } from 'rxjs';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListItemsMaterialModule } from '../list-items-material.module';

import { ItemComponent } from './item.component';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let debugElement: DebugElement;
  let checkbox: MatCheckbox;

  const matDialogMock = {
    open: (): { afterClosed(): Observable<string> } => ({
      afterClosed: (): Observable<string> => of('list'),
    }),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [ListItemsMaterialModule, BrowserAnimationsModule],
      providers: [{ provide: MatDialog, useValue: matDialogMock }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    debugElement = fixture.debugElement;

    component.item = {
      id: 1,
      name: 'Item1',
      isDone: true,
      listId: 1,
    };

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render name in a mat-card-title tag', () => {
    const compiledTemplate = debugElement.nativeElement as HTMLElement;

    expect(compiledTemplate.querySelector('mat-card-title').textContent).toContain('Item1');
  });

  it('should emit deleteItem when the onDelete method is called', fakeAsync(() => {
    spyOn(component.deleteItem, 'emit');

    component.onDeleteItem();
    fixture.detectChanges();
    tick();

    expect(component.deleteItem.emit).toHaveBeenCalledWith(component.item);
  }));

  it('should emit changeItem when check box changes its state', fakeAsync(() => {
    spyOn(component.changeItem, 'emit');

    component.changeState({ checked: false, source: checkbox });
    fixture.detectChanges();
    tick();

    expect(component.changeItem.emit).toHaveBeenCalledWith({ item: component.item, isDone: false });
  }));

  it('should open edit form when the openEditForm is called', fakeAsync(() => {
    spyOn(matDialogMock, 'open').and.callThrough();
    component.openEditForm();
    fixture.detectChanges();
    tick();

    expect(matDialogMock.open).toHaveBeenCalled();
  }));

  it('should emit changeName when the openEditForm is closed with a value', fakeAsync(() => {
    spyOn(component.changeName, 'emit');

    component.openEditForm();

    fixture.detectChanges();
    tick();

    const dialogRef = matDialogMock.open();

    dialogRef.afterClosed().subscribe((result) => {
      expect(result).toBe('list');
      expect(component.changeName.emit).toHaveBeenCalledWith({ name: 'list', item: component.item });
    });
  }));
});
