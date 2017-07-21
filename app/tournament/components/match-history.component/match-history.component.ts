import { Component, Input } from '@angular/core'
import { IMatch } from '../../models/match'
import { TournamentService } from "../../tournament.service";

@Component({
    selector: 'match-history',
    moduleId: module.id,
    templateUrl: './match-history.component.html',
})
export class MatchHistoryComponent {
    @Input() matchsHistory: IMatch[];

    constructor(private tournamentService: TournamentService) { }

    removeMatch(matchId: number, rowIndex: number) {
        this.tournamentService.undoMatch(matchId);
        this.matchsHistory.splice(rowIndex, 1);
    }
}