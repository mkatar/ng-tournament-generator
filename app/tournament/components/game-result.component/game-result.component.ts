import { Component, Input } from '@angular/core'
import { ITeam } from "../../models/team";
import { TournamentService } from "../../tournament.service";
import { IdentifierGeneratorService } from "../../../shared/Services/identifier-generator.service";
import { IMatch } from "../../models/match";


@Component({
    selector: 'game-result',
    moduleId: module.id,
    templateUrl: './game-result.component.html'
})
export class GameResultComponent {
    homeTeamScore: number;
    awayTeamScore: number;
    selectedHomeTeam: ITeam;
    selectedAwayTeam: ITeam;

    @Input() teams: ITeam[];

    constructor(private tournamentService: TournamentService,
        private idGeneratorService: IdentifierGeneratorService) { }

    onHomeTeamSelection(team: ITeam): void {
        this.selectedHomeTeam = team;
    }

    onAwayTeamSelection(team: ITeam): void {
        this.selectedAwayTeam = team;
    }

    save(): void {
        var match: IMatch = {
            id: this.idGeneratorService.getNextId(),
            awayTeamId: this.selectedAwayTeam.id,
            matchFinalScore: `${this.homeTeamScore} : ${this.awayTeamScore}`,
            awayTeamGoalScore: this.awayTeamScore,
            homeTeamGoalScore: this.homeTeamScore,
            awayTeamName: this.selectedAwayTeam.name,
            homeTeamId: this.selectedHomeTeam.id,
            homeTeamName: this.selectedHomeTeam.name,
            awayTeamResult: this.tournamentService.getMatchResult(this.awayTeamScore, this.homeTeamScore),
            homeTeamResult: this.tournamentService.getMatchResult(this.homeTeamScore, this.awayTeamScore)
        };

        this.tournamentService.addMatch(match);
        this.homeTeamScore = null;
        this.awayTeamScore = null;
    }

    isMatchValid(): boolean {
        return this.homeTeamScore >= 0
            && this.awayTeamScore >= 0
            && (this.selectedHomeTeam !== undefined && this.homeTeamScore !== null)
            && (this.selectedAwayTeam !== undefined && this.awayTeamScore !== null);
    }
}