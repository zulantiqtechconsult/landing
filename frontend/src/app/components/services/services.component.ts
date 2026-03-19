import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Service } from '../../models/models';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent implements OnInit {
  currentLang = 'es';
  services: Service[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.loadServices();
  }

  private loadServices(): void {
    this.services = [
      {
        icon: '🤖',
        titleEs: 'IA & Machine Learning',
        titleEn: 'AI & Machine Learning',
        descEs: 'Soluciones inteligentes con modelos predictivos y procesamiento avanzado de datos',
        descEn: 'Intelligent solutions with predictive models and advanced data processing'
      },
      {
        icon: '☁️',
        titleEs: 'Cloud & DevOps',
        titleEn: 'Cloud & DevOps',
        descEs: 'Arquitecturas escalables en AWS, Azure y GCP con pipelines automatizados',
        descEn: 'Scalable architectures on AWS, Azure, and GCP with automated pipelines'
      },
      {
        icon: '🔒',
        titleEs: 'Ciberseguridad',
        titleEn: 'Cybersecurity',
        descEs: 'Protección integral con auditorías, pentesting y sistemas de seguridad avanzados',
        descEn: 'Comprehensive protection with audits, pentesting, and advanced security systems'
      },
      {
        icon: '📱',
        titleEs: 'Desarrollo Full-Stack',
        titleEn: 'Full-Stack Development',
        descEs: 'Aplicaciones web y móviles modernas con tecnologías de última generación',
        descEn: 'Modern web and mobile applications with cutting-edge technologies'
      },
      {
        icon: '🔗',
        titleEs: 'Blockchain & Web3',
        titleEn: 'Blockchain & Web3',
        descEs: 'Smart contracts, DApps y soluciones descentralizadas',
        descEn: 'Smart contracts, DApps, and decentralized solutions'
      },
      {
        icon: '📊',
        titleEs: 'Data Analytics',
        titleEn: 'Data Analytics',
        descEs: 'Business Intelligence y visualización de datos para decisiones estratégicas',
        descEn: 'Business Intelligence and data visualization for strategic decisions'
      }
    ];
  }
}
