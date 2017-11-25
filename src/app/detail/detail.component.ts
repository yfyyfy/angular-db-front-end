import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Hero }         from '../hero';
import { HeroService }  from '../hero.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: [ './detail.component.css' ]
})
export class DetailComponent implements OnInit {
  @Input() hero: Hero;
  @Input() editMode: boolean;

  constructor(
    private route: ActivatedRoute,
    private heroService: HeroService,
    private location: Location
  ) {}

  ngOnInit(): void {
    const mode = this.route.snapshot.paramMap.get('mode');
    if (mode === 'edit') {
      this.edit();
    } else if (mode === 'view') {
      this.view();
    } else {
      // Todo: error
    }
  }

  edit(): void {
    this.get();
    this.editMode = true;
  }

  view(): void {
    this.get();
    this.editMode = false;
  }

  save(): void {
    this.heroService.update(this.hero)
      .subscribe(updated => {if (updated) {this.view();} else {alert('Update failed.');}});
  }

  get(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.get(id)
      .subscribe(hero => this.hero = hero);
  }
}
