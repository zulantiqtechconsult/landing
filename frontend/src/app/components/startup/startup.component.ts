import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';

interface Stat {
  value: string;
  labelEs: string;
  labelEn: string;
}

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.scss']
})
export class StartupComponent implements OnInit {
  currentLang = 'es';
  stats: Stat[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.loadStats();
  }

  private loadStats(): void {
    this.stats = [
      {
        value: '15+',
        labelEs: 'Años de Experiencia',
        labelEn: 'Years of Experience'
      },
      {
        value: '200+',
        labelEs: 'Proyectos Completados',
        labelEn: 'Completed Projects'
      },
      {
        value: '50+',
        labelEs: 'Clientes Satisfechos',
        labelEn: 'Satisfied Clients'
      },
      {
        value: '24/7',
        labelEs: 'Soporte Global',
        labelEn: 'Global Support'
      }
    ];
  }

  scrollTo(targetId: string): void {
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
