import { Component } from '@angular/core'
import { EventService } from '../shared/event.service'
import { ActivatedRoute, Params } from '@angular/router'
import { IEvent, ISession } from '../index';

@Component({
    templateUrl: '/app/events/event-details/event-details.component.html',
    styles: [`
        .container { padding-left:20px; padding-right:20px; }
        .event-image { height: 100px; }
        a { cursor: pointer; } 
    `]
})
export class EventDetailsComponent {
    addMode: boolean;
    event: IEvent
    filterBy: string = 'all'
    sortBy: string = 'votes'

    constructor(private eventService: EventService, private router: ActivatedRoute) {
    }

    ngOnInit() {
        this.router.data.forEach((data) => {
            this.event = data['event']
            this.addMode = false
        })
    }

    addSession() {
        this.addMode = true
    }

    saveNewSession(session: ISession) {
        const maxId = Math.max.apply(null, this.event.sessions.map(session => session.id))
        session.id = maxId + 1
        this.event.sessions.push(session)
        this.eventService.updateEvent(this.event)
        this.addMode = false
    }

    cancelAddSession() {
        this.addMode = false
    }
}