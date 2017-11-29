import { Component } from '@angular/core'
import { EventService } from './shared/event.service'
import { OnInit } from '@angular/core'
import { ToastrService } from '../common/toastr.service'
import { ActivatedRoute } from '@angular/router';

@Component({
    template: `
    <div>
        <h1>Upcoming Angular 2 Events</h1>
        <hr/>
        <div class="row">
            <div *ngFor="let event of events" class="col-md-5">
                <event-thumbnail (click)="handleThumbnailClick(event.name)" [event]="event"></event-thumbnail>
            </div>
        </div>
    </div>
    `
})
export class EventListComponent implements OnInit {
    events: any

    constructor(private eventService: EventService, private toastService: ToastrService, private route: ActivatedRoute) { }

    ngOnInit() {
        this.events = this.route.snapshot.data["events"]
    }

    handleThumbnailClick(name) {
        this.toastService.success(name)
    }
}