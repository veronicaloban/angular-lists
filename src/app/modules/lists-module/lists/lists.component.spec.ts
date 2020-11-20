import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

import { ListsComponent } from './lists.component';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  const listsArray = [{
    id: 1,
    name: 'First',
    total: 10,
    completed: 5,
  }];
  let listService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ListsComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [HttpClientModule],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListsComponent);
        component = fixture.componentInstance;
        listService = jasmine.createSpyObj('ListServiceService', ['getLists']);
        listService.getLists.and.returnValue(of(listsArray));
        fixture.detectChanges();
      });
  });

  it('should create the listsComponent', () => {
    expect(component).toBeTruthy();
  });

  it('should return the first object in an array based on the service data', () => {
    listService.getLists().subscribe(([result]) => {
      expect(result.id).toBe(1);
      expect(result.name).toBe('First');
      expect(result.total).toBe(10);
      expect(result.completed).toBe(5);
    });
  });
});
