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

  public filterHotels (config: ListConfig): void {
    this.hotels$.next(config)
  }

  public isHotelInFilter (hotel: Hotel, config: ListConfig): boolean {
    if (config.filter !== undefined) {
      const name = hotel.name.toLocaleLowerCase()
      const address = hotel.address.toLocaleLowerCase()
      if (
        (name.includes(config.filter.name.toLocaleLowerCase()) || address.includes(config.filter.name.toLocaleLowerCase())) &&
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
