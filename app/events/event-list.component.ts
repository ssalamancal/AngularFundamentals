import { Component } from '@angular/core'
import { EventService } from './shared/event.service'
import { OnInit } from '@angular/core'
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './index';

@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <hr/>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    `
})
export class EventListComponent implements OnInit {
    events: IEvent

    constructor(private eventService: EventService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.events = this.route.snapshot.data["events"]
    }
}