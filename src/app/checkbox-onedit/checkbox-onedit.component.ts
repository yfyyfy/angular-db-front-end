import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-checkbox-onedit',
  templateUrl: './checkbox-onedit.component.html',
  styleUrls: ['./checkbox-onedit.component.css']
})
export class CheckboxOneditComponent implements OnInit {
  @Input() model: any;
  @Input() label: string;
  @Input() property: string;
  @Input() editMode: boolean;
  @Input() checkboxString: string;
  @Input() checkedString: string;
  @Input() unCheckedString: string;

  constructor() { }

  ngOnInit() {
  }

}
