import {Component, OnInit} from '@angular/core';
import {Hero} from "../hero";
import {HeroService} from "../hero.service";
import {ActivatedRoute} from "@angular/router";
import {Location} from "@angular/common";

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero?: Hero;

  constructor(private heroService: HeroService, private route: ActivatedRoute, private location: Location) { }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    let id = Number(this.route.snapshot.paramMap.get("id"));
    this.heroService.getHero(id)
      .subscribe(hero => this.hero = hero);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.hero) {
      this.heroService.updateHero(this.hero).subscribe(_ => this.goBack());
    }
  }
}
