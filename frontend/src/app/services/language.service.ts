import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private currentLang = 'es';

  constructor() {
    const savedLang = localStorage.getItem('lang');
    if (savedLang) {
      this.currentLang = savedLang;
    }
  }

  getCurrentLanguage(): string {
    return this.currentLang;
  }

  setLanguage(lang: string): void {
    this.currentLang = lang;
    localStorage.setItem('lang', lang);
  }

  toggleLanguage(): void {
    this.currentLang = this.currentLang === 'es' ? 'en' : 'es';
    localStorage.setItem('lang', this.currentLang);
  }
}
