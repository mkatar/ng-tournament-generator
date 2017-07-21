import { Component, Input } from '@angular/core'
import { ITeam } from '../../models/team'

@Component({
    selector: 'tg-list',
    moduleId: module.id,
    templateUrl: './tournament-list.component.html'
})
export class TournamentListComponent {
    @Input() teams: ITeam[];
}