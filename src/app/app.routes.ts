import { Routes } from '@angular/router'
import { HotelsComponent } from './hotels/hotels.component'

export const routes: Routes = [
  {
    path: 'hoteles',
    component: HotelsComponent
  },
  {
    path: '**',
    redirectTo: 'hoteles'
  }
]
