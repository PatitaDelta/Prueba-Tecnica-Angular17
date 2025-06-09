export interface Hotel {
  id: string
  name: string
  image: string
  address: string
  stars: number
  rate: number
  price: number
}

export type RegisterHotel = Omit<Hotel, 'id'>

export interface HotelFilter {
  name: string
  rate: number[]
  valoration: number
  price: number
}

export interface HotelPaginator {
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface ListConfig {
  paginator?: HotelPaginator
  filter?: HotelFilter
}
