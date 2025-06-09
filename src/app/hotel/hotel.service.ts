import { Injectable } from '@angular/core'
import { Hotel, ListConfig } from './hotel.model'
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
            if (Object.values(config).length > 0) {
              return hotelList.filter((hotel) => this.isHotelInFilter(hotel, config))
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

  private isHotelInFilter (hotel: Hotel, config: ListConfig): boolean {
    if (config.filter !== undefined) {
      hotel.name = hotel.name.toLocaleLowerCase()
      if (
        hotel.name.includes(config.filter.name) &&
        config.filter?.rate?.includes(hotel.stars) &&
        hotel.rate >= config.filter.valoration &&
        hotel.price <= config.filter.price
      ) {
        return true
      }
    }

    return false
  }
}
