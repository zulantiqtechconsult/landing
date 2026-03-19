import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { WhyItem } from '../../models/models';

@Component({
  selector: 'app-why',
  templateUrl: './why.component.html',
  styleUrls: ['./why.component.scss']
})
export class WhyComponent implements OnInit {
  currentLang = 'es';
  whyItems: WhyItem[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.loadWhyItems();
  }

  private loadWhyItems(): void {
    this.whyItems = [
      {
        icon: '🌍',
        titleEs: 'Presencia Global',
        titleEn: 'Global Presence',
        descEs: 'Operaciones en España, EE.UU. y Australia para soporte 24/7',
        descEn: 'Operations in Spain, USA, and Australia for 24/7 support'
      },
      {
        icon: '⚡',
        titleEs: 'Tecnología Avanzada',
        titleEn: 'Advanced Technology',
        descEs: 'Stack tecnológico de última generación y mejores prácticas',
        descEn: 'Cutting-edge technology stack and best practices'
      },
      {
        icon: '👥',
        titleEs: 'Equipo Experto',
        titleEn: 'Expert Team',
        descEs: 'Profesionales certificados con experiencia internacional',
        descEn: 'Certified professionals with international experience'
      },
      {
        icon: '🚀',
        titleEs: 'Entrega Ágil',
        titleEn: 'Agile Delivery',
        descEs: 'Metodologías ágiles para resultados rápidos y eficientes',
        descEn: 'Agile methodologies for fast and efficient results'
      },
      {
        icon: '🔐',
        titleEs: 'Seguridad Primero',
        titleEn: 'Security First',
        descEs: 'Protocolos de seguridad de nivel empresarial en cada proyecto',
        descEn: 'Enterprise-level security protocols in every project'
      },
      {
        icon: '💎',
        titleEs: 'Calidad Garantizada',
        titleEn: 'Guaranteed Quality',
        descEs: 'Código limpio, documentado y testeado siguiendo estándares internacionales',
        descEn: 'Clean, documented, and tested code following international standards'
      }
    ];
  }
}
