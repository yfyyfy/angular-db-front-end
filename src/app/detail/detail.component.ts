import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

enum Mode {add, edit, view};

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() mode: Mode;

  countries: string[];

  constructor(
    private heroService: HeroService,
    private route: ActivatedRoute,
    private router: Router) {
    heroService.getColumnValues('country').subscribe(columnValues => this.countries = columnValues);
  }

  ngOnInit(): void {
    const mode = this.route.snapshot.paramMap.get('mode');
    if (mode === 'edit') {
      this.edit();
    } else if (mode === 'view') {
      this.view();
    } else if (mode === 'add') {
      this.add();
    } else {
      // Todo: error
    }
  }

  isAdd(): boolean {
    return this.mode === Mode.add;
  }

  isEdit(): boolean {
    return this.mode === Mode.edit;
  }

  isView(): boolean {
    return this.mode === Mode.view;
  }

  add(): void {
    this.hero = new Hero();
    this.mode = Mode.add;
  }

  edit(): void {
    this.get();
    this.mode = Mode.edit;
  }

  view(): void {
    this.get();
    this.mode = Mode.view;
  }

  delete(): void {
    this.heroService.delete(this.hero)
      .subscribe(deleted => {if (deleted) {this.router.navigate(['']);} else {alert('Delete failed.');}});
  }

  save(): void {
    if (this.isEdit()) {
      this.heroService.update(this.hero)
        .subscribe(updated => {if (updated) {this.view();} else {alert('Update failed.');}});
    } else if (this.isAdd()) {
      this.heroService.insert(this.hero)
        .subscribe(inserted => {if (inserted) {this.router.navigate(['']);} else {alert('Insert failed.');}});
    } else {
      // Todo: error.
      console.log('not implemented');
    }
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.get(id)
      .subscribe(hero => this.hero = hero);
  }
}
