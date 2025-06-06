import { Injectable } from '@angular/core'
import { Hotel, HotelFilter, ListConfig } from './hotel.model'
import { HttpClient } from '@angular/common/http'
import { map, Observable, Subject, switchMap, take } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class HotelService {
  private readonly apiUrl = 'http://localhost:3000/hotels'
  private readonly hotels$ = new Subject<ListConfig>()

  constructor (private readonly http: HttpClient) { }

  get hotels (): Observable<Hotel[]> {
    return this.hotels$.pipe(
      switchMap(
        (config) => this.http.get<Hotel[]>(this.apiUrl).pipe(
          take(1),
          map((hotelList) => {
            if (Object.values(config).length > 0 && config.filter != null) {
              return hotelList.filter((hotel) => this.isHotelInFilter(hotel, config.filter))
            }
            return hotelList
          })
        )
      )
    )
  }

  filterHotels (config: ListConfig): void {
    this.hotels$.next(config)
  }

  private isHotelInFilter (element: Hotel, filter: HotelFilter): boolean {
    // Nombre
    if (element.name.includes(filter.name)) { return true }

    // Categoria
    if (filter.category.includes(element.stars)) { return true }

    // Valoracion
    if (element.rate >= filter.valoration) { return true }

    // Precio
    if (element.price <= filter.price) { return true }

    return false
  }
}
