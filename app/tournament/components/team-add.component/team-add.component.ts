import { Component, Input } from '@angular/core'
import { TournamentService } from "../../tournament.service";
import { ITeam } from "../../models/team";
import { IdentifierGeneratorService } from "../../../shared/Services/identifier-generator.service";

@Component({
    selector: 'team-add',
    moduleId: module.id,
    templateUrl: './team-add.component.html'
})
export class TeamAddComponent {
    teamName: string = '';
    constructor(private tournamentService: TournamentService, private idGeneratorService: IdentifierGeneratorService) { }

    add(teamName: string): void {
        var newTeam: ITeam = {
            id: this.idGeneratorService.getNextId(),
            name: teamName,
            against: 0,
            difference: 0,
            draws: 0,
            losses: 0,
            played: 0,
            points: 0,
            scored: 0,
            wins: 0
        };

        this.tournamentService.addTeam(newTeam);
        this.teamName = '';
    }
}