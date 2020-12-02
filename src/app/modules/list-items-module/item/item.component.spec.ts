import {
  ComponentFixture, TestBed, fakeAsync, tick,
} from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCheckbox } from '@angular/material/checkbox';

import { By } from '@angular/platform-browser';
import { ListItemsMaterialModule } from '../list-items-material.module';
import { ItemComponent } from './item.component';
import { ListItemsService } from '../list-items.service';

describe('ItemComponent', () => {
  let component: ItemComponent;
  let fixture: ComponentFixture<ItemComponent>;
  let dialog: MatDialog;

  const service = jasmine.createSpyObj('ItemsService', ['deleteItem$']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ItemComponent],
      imports: [ListItemsMaterialModule, BrowserAnimationsModule],
      providers: [{
        provide: ListItemsService, useValue: service,
      }],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemComponent);
    component = fixture.componentInstance;
    dialog = <MatDialog>TestBed.get(MatDialog);
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
    const compiledTemplate = fixture.debugElement.nativeElement as HTMLElement;

    expect(compiledTemplate.querySelector('mat-card-title').textContent).toContain('Item1');
  });

  it('should open edit form when the openEditForm is called', fakeAsync(() => {
    spyOn(dialog, 'open').and.callThrough();
    component.openEditForm();
    fixture.detectChanges();
    tick();

    expect(dialog.open).toHaveBeenCalled();
  }));

  it('should shange the checkbox state, when it is clicked', fakeAsync(() => {
    spyOn(component, 'changeState').and.callThrough();
    const checkbox = fixture.debugElement.query(By.directive(MatCheckbox));

    checkbox.triggerEventHandler('change', { checked: true });

    fixture.detectChanges();

    expect(component.changeState).toHaveBeenCalled();
  }));
});
