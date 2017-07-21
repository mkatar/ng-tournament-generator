import { Component, OnInit } from '@angular/core'
import { TournamentService } from "../../tournament.service";
import { ITeam } from "../../models/team";
import { IMatch } from "../../models/match";

@Component({
    moduleId: module.id,
    templateUrl: './tournament-view.component.html',
    providers: [TournamentService]
})
export class TournamentViewComponent extends OnInit {
    pageTitle: string = 'Tournament';
    teams: ITeam[];
    matchsHistory: IMatch[];

    constructor(private tournamentServise: TournamentService) {
        super();
    }

    ngOnInit(): void {
        this.teams = this.tournamentServise.getTeams().sort(function (a, b) { return b.points - a.points });;
        this.matchsHistory = this.tournamentServise.getMatches();
    }
}