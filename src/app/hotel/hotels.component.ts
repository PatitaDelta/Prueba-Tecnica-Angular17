import { Component } from '@angular/core'
import { ListComponent } from '../utils/list/list.component'
import { Hotel, HotelFilter, HotelPaginator } from './hotel.model'
import { HotelService } from './hotel.service'

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [ListComponent],
  providers: [HotelService],
  templateUrl: './hotels.component.html'
})
export class HotelsComponent {
  hotels!: Hotel[]
  loading = true

  filter!: HotelFilter
  paginator: HotelPaginator = {
    page: 1,
    perPage: 12,
    total: 0,
    totalPages: 0
  }

  constructor (private readonly hotelService: HotelService) {
    this.initData()
  }

  private initData (): void {
    this.hotelService.hotels.subscribe(
      (list) => {
        this.paginator.total = list.length
        this.paginator.totalPages = list.length / this.paginator.perPage
        this.hotels = list

        // Configuracion de la paginacion
        const sliceInit = this.paginator.perPage * (this.paginator.page - 1)
        this.hotels = list.slice(sliceInit, sliceInit + this.paginator.perPage)

        this.loading = false
      })
    this.filterData()
  }

  filterData (): void {
    this.loading = true
    this.hotelService.filterHotels({ paginator: this.paginator, filter: this.filter })
  }

  nextPage (): void {
    if (this.paginator.page < this.paginator.totalPages) {
      this.paginator.page = this.paginator.page + 1
      this.filterData()
    }
  }

  previusPage (): void {
    if (this.paginator.page > 1) {
      this.paginator.page = this.paginator.page - 1
      this.filterData()
    }
  }
}
