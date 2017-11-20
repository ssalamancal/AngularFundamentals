import { NgModule } from '@angular/common'
import { BrowserModule } from '@angular/platform-browser'

import { EventsAppComponent } from './events-app.component'

@NgModule({
    import: [BrowserModule],
    declaration: [EventsAppComponent],
    bootstrap: [EventsAppComponent]
})
export class AppModule {

}