import { Component, OnInit, Input } from '@angular/core';
import { ListInterface } from '../list';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  @Input() public list: ListInterface;

  public ngOnInit(): void {
  }

  public get listProgress(): number {
    return (this.list.completed * 100) / this.list.total;
  }

  public get isEverythingDone(): boolean {
    return this.listProgress === 100;
  }
}
