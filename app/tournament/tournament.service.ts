import { Injectable } from '@angular/core';

import { ITeam } from './models/team'
import { IMatch } from './models/match'
import { MatchResult } from "./models/matchResult";
import { IMatchTeams } from "./interfaces/IMatchTeams";
import { ITeamMatchStats } from "./interfaces/ITeamMatchStats";
import { ITournamentService } from "./interfaces/ITournamentService";

@Injectable()
export class TournamentService implements ITournamentService {
    private teamsSource: ITeam[] = [];
    private matchsSource: IMatch[] = [];
    readonly additionOperations: boolean = true;
    readonly subtractionOperations: boolean = false;

    private matchResults = {
        // might be not obvious at first it evaluates name of the MatchResult.Win to object prop name
        // basically [MathResult.Win] === 'Win' will end as object with { 'Win': () => {} }
        [MatchResult.Win]: (team: ITeam, operation: boolean) => {
            if (operation) {
                team.wins += 1;
                team.points += 3;
                team.played += 1;
                return;
            }

            team.wins -= 1;
            team.points -= 3;
            team.played -= 1;
        },
        [MatchResult.Draw]: (team: ITeam, operation: boolean) => {
            if (operation) {
                team.draws += 1;
                team.points += 1;
                team.played += 1;
                return;
            }

            team.draws -= 1;
            team.points -= 1;
            team.played -= 1;
        },
        [MatchResult.Lose]: (team: ITeam, operation: boolean) => {
            if (operation) {
                team.losses += 1;
                team.played += 1;
                return;
            }

            team.losses -= 1;
            team.played -= 1;
        }
    };

    // Service  commands
    addTeam(team: ITeam): void {
        this.teamsSource.push(team);
    }

    getTeams(): ITeam[] {
        return this.teamsSource;
    }

    getMatches(): IMatch[] {
        return this.matchsSource;
    }

    addMatch(match: IMatch): void {
        this.matchsSource.push(match);
        this.updateTeamsStats(match);
        this.teamsSource.sort((a, b) => { return b.points - a.points });
    }

    getMatchTeams(match: IMatch): IMatchTeams {
        const [homeTeam, awayTeam] = [
            this.teamsSource.find(x => x.id === match.homeTeamId),
            this.teamsSource.find(x => x.id === match.awayTeamId)
        ];

        return {
            homeTeam,
            awayTeam
        };
    }

    updateTeamsStats(match: IMatch): void {
        const { homeTeam, awayTeam } = this.getMatchTeams(match);
        var homeTeamMatchStats: ITeamMatchStats = this.getTeamMatchStats(match.homeTeamGoalScore, match.awayTeamGoalScore, match.homeTeamResult);
        var awayTeamMatchStats: ITeamMatchStats = this.getTeamMatchStats(match.awayTeamGoalScore, match.homeTeamGoalScore, match.awayTeamResult);

        this.toggleTeamStats(homeTeam, homeTeamMatchStats, this.additionOperations);
        this.toggleTeamStats(awayTeam, awayTeamMatchStats, this.additionOperations);
    }

    undoMatch(matchId: number): void {
        const match = this.matchsSource.find(x => x.id === matchId);
        const { homeTeam, awayTeam } = this.getMatchTeams(match);
        var homeTeamMatchStats: ITeamMatchStats = this.getTeamMatchStats(match.homeTeamGoalScore, match.awayTeamGoalScore, match.homeTeamResult);
        var awayTeamMatchStats: ITeamMatchStats = this.getTeamMatchStats(match.awayTeamGoalScore, match.homeTeamGoalScore, match.awayTeamResult);

        this.toggleTeamStats(homeTeam, homeTeamMatchStats, this.subtractionOperations);
        this.toggleTeamStats(awayTeam, awayTeamMatchStats, this.subtractionOperations);
    }

    toggleTeamStats(team: ITeam, teamMatchStats: ITeamMatchStats, operation: boolean): void {
        operation ? team.scored += teamMatchStats.scoredGoals : team.scored -= teamMatchStats.scoredGoals;
        operation ? team.against += teamMatchStats.receivedGoals : team.against -= teamMatchStats.receivedGoals;
        team.difference = team.scored - team.against;

        this.matchResults[teamMatchStats.matchResult](team, operation);
    }

    getMatchResult(scoredGoals: number, receivedGoals: number): MatchResult {
        if (scoredGoals === receivedGoals) {
            return MatchResult.Draw;
        }
        else if (scoredGoals > receivedGoals) {
            return MatchResult.Win;
        }

        return MatchResult.Lose;
    }

    getTeamMatchStats(scoredGoals: number, receivedGoals: number, matchResult: MatchResult): ITeamMatchStats {
        return {
            scoredGoals,
            receivedGoals,
            matchResult
        }
    }
}