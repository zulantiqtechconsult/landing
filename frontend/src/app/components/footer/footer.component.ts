import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  currentLang = 'es';
  currentYear = new Date().getFullYear();

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  scrollTo(targetId: string): void {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
