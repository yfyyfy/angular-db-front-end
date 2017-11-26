import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-input-onedit',
  templateUrl: './input-onedit.component.html',
  styleUrls: ['./input-onedit.component.css']
})
export class InputOneditComponent implements OnInit {
  @Input() model: any;
  @Input() label: string;
  @Input() property: string;
  @Input() placeholder: string;
  @Input() editMode: boolean;
  @Input() source: any[];

  constructor() { }

  ngOnInit() {
  }

}
