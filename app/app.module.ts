import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { EventsAppComponent } from './events-app.component'
import { EventListComponent } from './events/event-list.component'
import { EventThumbnailComponent } from './events/event-thumbnail.component'


@NgModule({
    imports: [BrowserModule],
    declarations: [EventsAppComponent, EventListComponent, EventThumbnailComponent],
    bootstrap: [EventsAppComponent]
})
export class AppModule {

}