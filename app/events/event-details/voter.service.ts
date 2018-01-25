import { Injectable } from '@angular/core'
import { ISession } from '../index';
import { Http, Headers, RequestOptions } from "@angular/http";
import { Observable } from 'rxjs/Observable';

@Injectable()
export class VoterService {
    constructor(private http: Http) {
    }

    deleteVoter(eventId: number, session: ISession, voterName: string) {
        session.voters = session.voters.filter(voter => voter !== voterName)

        this.http.delete(`/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`)
            .catch(this.handleError).subscribe()
    }

    addVoter(eventId: number, session: ISession, voterName: string) {
        session.voters.push(voterName)

        let header: Headers = new Headers({ 'Content-Type': 'application/json' })
        let options: RequestOptions = new RequestOptions({ headers: header })

        let url: string = `/api/events/${eventId}/sessions/${session.id}/voters/${voterName}`

        this.http.post(url, {}, options).catch(this.handleError).subscribe()
    }

    userHasVoted(session: ISession, voterName: string) {
        return session.voters.some(voter => voter === voterName)
    }

    private handleError(error: Response) {
        return Observable.throw(error.statusText)
    }
}