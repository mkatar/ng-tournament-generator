import { ITeam } from "../models/team";
import { IMatch } from "../models/match";
import { IMatchTeams } from "./IMatchTeams";
import { MatchResult } from "../models/matchResult";
import { ITeamMatchStats } from "./ITeamMatchStats";

export interface ITournamentService {
    addTeam(team: ITeam): void;
    getTeams(): ITeam[];
    getMatches(): IMatch[];
    addMatch(match: IMatch): void;
    getMatchTeams(match: IMatch): IMatchTeams;
    updateTeamsStats(match: IMatch): void;
    undoMatch(matchId: number): void;
    toggleTeamStats(team: ITeam, teamMatchStats: ITeamMatchStats, add: boolean): void;
    getMatchResult(scoredGoals: number, receivedGoals: number): MatchResult;
    getTeamMatchStats(scoredGoals: number, receivedGoals: number, matchResult: MatchResult): ITeamMatchStats;
}