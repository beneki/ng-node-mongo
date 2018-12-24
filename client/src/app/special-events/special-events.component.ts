import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-special-events',
  templateUrl: './special-events.component.html',
  styleUrls: ['./special-events.component.less']
})
export class SpecialEventsComponent implements OnInit {

  specialEvents = []

  constructor(private specialEventsService: EventService,
    private router: Router) { }

  ngOnInit() {
    this.specialEventsService.getSpecialEvents()
      .subscribe(
        res => this.specialEvents = res,
        err => {
          if(err instanceof HttpErrorResponse){
            if(err.status === 401) {
              this.router.navigate(['/login'])
            }
          }
        },
      )
  }

}
