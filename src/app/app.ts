import { Component } from '@angular/core';

import { SidebarComponent } from './layout/sidebar';

@Component({
  selector: 'app-root',
  imports: [SidebarComponent],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {}
