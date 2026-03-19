import { Component, HostListener } from '@angular/core';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  mobileMenuOpen = false;
  currentLang = 'es';

  constructor(private languageService: LanguageService) {
    this.currentLang = this.languageService.getCurrentLanguage();
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  setLanguage(lang: string): void {
    this.currentLang = lang;
    this.languageService.setLanguage(lang);
    this.closeMobileMenu();
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    // Add logic for scroll effects if needed
  }

  scrollTo(targetId: string): void {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      this.closeMobileMenu();
    }
  }
}
