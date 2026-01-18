import { Component, inject } from '@angular/core';

import { ButtonModule } from 'primeng/button';

import { ThemeService } from '../../../core/services/ThemeService';

@Component({
  selector: 'theme-icon-button',
  standalone: true,
  imports: [ButtonModule],
  template: ` <p-button [icon]="themeService.isDarkMode() ? 'pi pi-sun' : 'pi pi-moon'" (click)="themeService.toggleTheme()" variant="outlined" severity="secondary" /> `,
  styles: [
    `
      :host {
        display: inline-block;
      }
    `,
  ],
})
export class ThemeIconButtonComponent {
  public themeService = inject(ThemeService);
}
