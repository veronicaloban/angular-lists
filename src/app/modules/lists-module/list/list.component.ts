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
}
