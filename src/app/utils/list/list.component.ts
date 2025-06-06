import { CommonModule } from '@angular/common'
import { Component, input } from '@angular/core'

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- lista de elementos -->
    <div
      class="mb-10 sm:mb-0 mt-10 grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      @if(!loading()){
        @for (elm of elements(); track elm) {
          @defer (on viewport) {
            <div class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex justify-center space-y-2 items-center cursor-pointer rounded-md hover:smooth-hover hover:scale-95 duration-200 md:h-78">
              <ng-content />{{elm | json}}
            </div>
          }
          @placeholder {
            <div
              class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex justify-center space-y-2 items-center cursor-pointer rounded-md hover:smooth-hover hover:scale-95 duration-200 md:h-78">
              <div
                class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
                role="status" aria-label="loading">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
          }
        }
      }
      @else {
        <div
          class="relative group bg-gray-900 py-10 sm:py-20 px-4 flex justify-center space-y-2 items-center cursor-pointer rounded-md hover:smooth-hover hover:scale-95 duration-200 md:h-78">
          <div
            class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-gray-400 rounded-full"
            role="status" aria-label="loading">
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      }
    </div>
  `
})

export class ListComponent<T> {
  elements = input.required<T[] | null>()
  page = input.required<number>()
  perPage = input.required<number>()
  total = input.required<number>()
  totalPages = input.required<number>()
  loading = input.required<boolean>()
}
