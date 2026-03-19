import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {
  currentLang = 'es';

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.languageService.getCurrentLanguage();
  }

  scrollTo(targetId: string): void {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
