import { TestBed } from '@angular/core/testing'

import { HotelService } from './hotel.service'

describe('HotelService', () => {
  let service: HotelService

  beforeEach(() => {
    TestBed.configureTestingModule({})
    service = TestBed.inject(HotelService)
  })

  it('getData', () => {
    expect(service.doFilter()).toBeTruthy()
  })

  it('filter', () => {
    // expect(service.doFilter({}, {})).toBeTruthy()
  })
})
