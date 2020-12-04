import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Observable, of } from 'rxjs';

import { StoreService } from '../../../services/store/store.service';
import { ListsComponent } from './lists.component';
import { ListInterface } from '../list';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  let lists$: Observable<ListInterface[]>;
  let service;
  let serviceLists$: Observable<ListInterface[]>;
  const dataArray = [{
    id: 1,
    name: 'First',
    completed: 10,
    total: 5,
  }];

  const list = {
    id: 2,
    name: 'Second',
    completed: 10,
    total: 5,
  };

  beforeEach(async () => {
    service = jasmine.createSpyObj('ListService', ['getLists$', 'createList$', 'deleteList$', 'putList$']);
    await TestBed.configureTestingModule({
      declarations: [ListsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [{ provide: StoreService, useValue: service }],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListsComponent);
        component = fixture.componentInstance;

        service.getLists$.and.returnValue(of(dataArray));
        fixture.detectChanges();
      });
  });

  it('should create the listsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should receive data via Lists Service', () => {
    lists$ = service.getLists$();
    lists$.subscribe((lists) => expect(lists.length).toBe(1));
  });

  it('should call the deleteList$ method in the store service', () => {
    component.onDeleteList(list);

    expect(service.deleteList$).toHaveBeenCalled();
  });

  it('should call the putList$ method in the store service', () => {
    component.onEditList({ listId: list.id, name: 'list' });

    expect(service.putList$).toHaveBeenCalled();
  });

  it('should call the createList$ method in the store service', () => {
    component.onCreateList('name');

    expect(service.createList$).toHaveBeenCalled();
  });
});
