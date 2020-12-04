import { ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

import { SearchPipe } from '../../../pipes/search/search.pipe';
import { ListItemsComponent } from './list-items.component';
import { ItemInterface } from '../item';
import { StoreService } from '../../../services/store/store.service';

describe('ListItemsComponent', () => {
  let component: ListItemsComponent;
  let fixture: ComponentFixture<ListItemsComponent>;

  let items$: Observable<ItemInterface[]>;

  const itemsArray = [{
    id: 1,
    name: 'First',
    isDone: true,
    listId: 1,
  }];

  const fakeActivatedRoute = {
    snapshot: { params: { id: 1 } },
  };

  const service = jasmine.createSpyObj(
    'ApiService',
    ['getItems$', 'getListName$', 'deleteItem$', 'patchItem$', 'putItem$', 'createItem$'],
  );

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [ListItemsComponent, SearchPipe],
      providers: [
        { provide: ActivatedRoute, useValue: fakeActivatedRoute },
        { provide: StoreService, useValue: service },
      ],
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListItemsComponent);
    component = fixture.componentInstance;
    service.getItems$.and.returnValue(of(itemsArray));

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via Lists Service', () => {
    items$ = service.getItems$();
    items$.subscribe((items) => expect(items.length).toBe(1));
  });

  it('should call the deleleItems$ method in the store service', fakeAsync(() => {
    component.onDeleteItem(itemsArray[0]);

    expect(service.deleteItem$).toHaveBeenCalled();
  }));

  it('should call the patchItem$ method in the store service', fakeAsync(() => {
    component.onChangeItem({ item: itemsArray[0], isDone: true });

    expect(service.patchItem$).toHaveBeenCalled();
  }));

  it('should call the putItem$ method in the store service', fakeAsync(() => {
    component.onChangeName({ item: itemsArray[0], name: 'item' });

    expect(service.putItem$).toHaveBeenCalled();
  }));

  it('should call the createItem$ method in the store service', fakeAsync(() => {
    component.onCreateItem('name');

    expect(service.createItem$).toHaveBeenCalled();
  }));
});
