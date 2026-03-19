import { Component, OnInit } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { Location } from '../../models/models';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  currentLang = 'es';
  locations: Location[] = [];

  constructor(private languageService: LanguageService) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.loadLocations();
  }

  private loadLocations(): void {
    this.locations = [
      {
        flag: '🇪🇸',
        country: 'ESPAÑA',
        city: 'Madrid',
        timezone: 'CET (UTC+1)',
        descEs: 'Centro de operaciones europeo',
        descEn: 'European operations center'
      },
      {
        flag: '🇺🇸',
        country: 'USA',
        city: 'Miami, FL',
        timezone: 'EST (UTC-5)',
        descEs: 'Hub tecnológico en América',
        descEn: 'Technology hub in America'
      },
      {
        flag: '🇦🇺',
        country: 'AUSTRALIA',
        city: 'Sydney',
        timezone: 'AEST (UTC+10)',
        descEs: 'Base en Asia-Pacífico',
        descEn: 'Asia-Pacific base'
      }
    ];
  }
}
