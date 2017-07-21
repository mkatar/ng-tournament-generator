import { MatchResult } from "../models/matchResult";

export interface ITeamMatchStats {
    scoredGoals: number;
    receivedGoals: number;
    matchResult: MatchResult;
}