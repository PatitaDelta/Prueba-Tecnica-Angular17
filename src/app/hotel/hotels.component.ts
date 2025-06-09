import { Component } from '@angular/core'
import { Hotel, HotelFilter, HotelPaginator } from './hotel.model'
import { HotelService } from './hotel.service'
import { CommonModule } from '@angular/common'
import { SpinnerComponent } from '../utils/spinner/spinner.component'

@Component({
  selector: 'app-hotels',
  standalone: true,
  imports: [CommonModule, SpinnerComponent],
  providers: [HotelService],
  templateUrl: './hotels.component.html'
})
export class HotelsComponent {
  hotels!: Hotel[]
  loading = true

  filter!: HotelFilter
  paginator!: HotelPaginator

  constructor (private readonly hotelService: HotelService) {
    this.initData()
  }

  // Inicio

  private initPaginator (): void {
    this.paginator = {
      page: 1,
      perPage: 12,
      total: 0,
      totalPages: 0
    }
  }

  private clearFilters (): void {
    this.filter = {
      name: '',
      rate: [1, 2, 3, 4, 5],
      valoration: 0,
      price: 1000
    }
  }

  private initData (): void {
    this.initPaginator()
    this.clearFilters()
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

  private filterData (): void {
    this.loading = true
    if (
      this.filter.name === '' &&
      this.filter.rate?.length === 5 &&
      this.filter.valoration === 0 &&
      this.filter.price === 1000
    ) {
      this.hotelService.filterHotels({})
    } else {
      this.hotelService.filterHotels({ paginator: this.paginator, filter: this.filter })
    }
  }

  // Paginacion

  public nextPage (): void {
    if (!this.loading && this.paginator.page < this.paginator.totalPages) {
      this.paginator.page = this.paginator.page + 1
      this.filterData()
    }
  }

  public previusPage (): void {
    if (!this.loading && this.paginator.page > 1) {
      this.paginator.page = this.paginator.page - 1
      this.filterData()
    }
  }

  // Filtros

  public filterName (name: string): void {
    this.filter.name = name
    this.initPaginator()
    this.filterData()
  }

  public filterRate (checked: boolean, rate: number): void {
    if (checked) {
      this.filter.rate.push(rate)
    } else {
      const indexElement = this.filter.rate.findIndex((r) => r === rate)
      this.filter.rate.splice(indexElement, 1)
    }
    console.log(this.filter.rate)

    this.initPaginator()
    this.filterData()
  }

  public filterValoration (valoration: number): void {
    this.filter.valoration = valoration

    this.initPaginator()
    this.filterData()
  }

  public filterPrice (price: number): void {
    this.filter.price = price

    this.initPaginator()
    this.filterData()
  }
}
