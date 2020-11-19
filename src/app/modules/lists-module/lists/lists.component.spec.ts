import { ComponentFixture, TestBed, async } from '@angular/core/testing';

import { ListsComponent } from './lists.component';
import { ListComponent } from '../list/list.component';
import { ListsServiceService } from '../lists-service.service';

describe('ListsComponent', () => {
  let component: ListsComponent;
  let fixture: ComponentFixture<ListsComponent>;
  const testLists = [{
    id: 1,
    name: 'First',
    total: 10,
    completed: 5,
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListsComponent, ListComponent],
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(ListsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
      });
  }));

  it('should create the listsComponent', () => {
    expect(component).toBeTruthy();
  });
});
