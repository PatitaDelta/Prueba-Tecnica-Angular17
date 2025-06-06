import { ComponentFixture, TestBed } from '@angular/core/testing'

import { ListComponent } from './list.component'
import { Hotel } from '../../hotel/hotel.model'

describe('ListComponent', () => {
  let component: ListComponent<Hotel>
  let fixture: ComponentFixture<any>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListComponent]
    })
      .compileComponents()

    fixture = TestBed.createComponent(ListComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should create', () => {
    expect(component).toBeTruthy()
  })
})
