import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

import { Button } from 'primeng/button';

import { ThemeIconButtonComponent } from '../shared/components/button';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, Button, ThemeIconButtonComponent],
  template: `
    <aside class="bg-secondary-700 bg dark:bg-dark-primary-900 flex h-screen w-60 flex-col gap-8 px-2 py-4">
      <div class="flex items-center justify-center gap-4 p-2">
        <img class="h-24 w-auto" src="logo2.png" alt="WiSave" />
      </div>

      <nav class="flex1 flex flex-col justify-between">
        <ul class="flex flex-col gap-1">
          @for (item of navItems; track item.route) {
            <li>
              <a
                [routerLink]="item.route"
                [routerLinkActiveOptions]="{ exact: item.exact }"
                class="hover:bg-secondary-800 dark:hover:bg-dark-primary-800 text-text-100 hover:text-text-200 flex items-center gap-3 rounded-lg px-4 py-2.5 dark:text-slate-300"
                routerLinkActive="bg-slate-800">
                <i [class]="item.icon + ' text-lg'"></i>
                <span class="font-medium">{{ item.label }}</span>
              </a>
            </li>
          }
        </ul>
      </nav>

      <div class="mt-auto flex flex-row justify-around gap-4">
        <p-button variant="outlined" severity="secondary" icon="pi pi-sign-out" />
        <p-button variant="outlined" severity="secondary" icon="pi pi-cog" />
        <theme-icon-button />
      </div>
    </aside>
  `,
  styles: ``,
})
export class SidebarComponent {
  navItems = [
    { route: '/dashboard', label: 'Dashboard', exact: true, icon: 'pi pi-home' },
    { route: '/incomes', label: 'Incomes', exact: false, icon: 'pi pi-money-bill' },
    { route: '/expenses', label: 'Expenses', exact: false, icon: 'pi pi-credit-card' },
    { route: '/calendar', label: 'Calendar', exact: false, icon: 'pi pi-calendar' },
    { route: '/documents', label: 'Documents', exact: false, icon: 'pi pi-file' },
    { route: '/reports', label: 'Reports', exact: false, icon: 'pi pi-chart-line' },
  ];
}
