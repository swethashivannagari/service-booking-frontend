import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-unauthorized',
  template: `
    <div class="p-6 text-center">
      <h2 class="text-xl font-semibold text-red-600">
        Access Denied
      </h2>
      <p class="mt-2">You are not authorized to view this page.</p>
    </div>
  `
})
export class UnauthorizedComponent {}

