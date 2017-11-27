import { Injectable } from "@angular/core";
import { Router, ActivatedRouteSnapshot, CanActivate } from "@angular/router";
import { EventService } from "../shared/event.service";

@Injectable()
export class EventRouteActivator implements CanActivate {
    constructor(private eventService: EventService, private router: Router) {
    }

    canActivate(route: ActivatedRouteSnapshot) {
        const eventExits = !!this.eventService.getEvent(+route.params['id'])

        if (!eventExits) {
            this.router.navigate(['/404'])
        }

        return eventExits
    }
}