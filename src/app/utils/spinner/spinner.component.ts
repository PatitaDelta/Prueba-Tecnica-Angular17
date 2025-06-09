import { Component } from '@angular/core'

@Component({
  selector: 'app-spinner',
  standalone: true,
  imports: [],
  template: `
    <div
      class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
      role="status" aria-label="loading">
      <span class="sr-only">Loading...</span>
    </div>
  `
})
export class SpinnerComponent { }
