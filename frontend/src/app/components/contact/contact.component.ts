import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LanguageService } from '../../services/language.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contactForm!: FormGroup;
  currentLang = 'es';
  isSubmitting = false;
  submitSuccess = false;
  submitError = '';

  constructor(
    private fb: FormBuilder,
    private languageService: LanguageService,
    private apiService: ApiService
  ) {}

  ngOnInit(): void {
    this.currentLang = this.languageService.getCurrentLanguage();
    this.initForm();
  }

  private initForm(): void {
    this.contactForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      company: [''],
      email: ['', [Validators.required, Validators.email]],
      service: ['', Validators.required],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  get f() {
    return this.contactForm.controls;
  }

  onSubmit(): void {
    if (this.contactForm.invalid) {
      this.contactForm.markAllAsTouched();
      return;
    }

    this.isSubmitting = true;
    this.submitError = '';
    this.submitSuccess = false;

    this.apiService.sendContactForm(this.contactForm.value).subscribe({
      next: (response) => {
        this.isSubmitting = false;
        if (response.success) {
          this.submitSuccess = true;
          this.contactForm.reset();
          setTimeout(() => {
            this.submitSuccess = false;
          }, 5000);
        } else {
          this.submitError = response.message || 'Error al enviar el formulario';
        }
      },
      error: (error) => {
        this.isSubmitting = false;
        this.submitError = this.currentLang === 'es' 
          ? 'Error al enviar el formulario. Por favor, intenta de nuevo.'
          : 'Error sending form. Please try again.';
      }
    });
  }
}
