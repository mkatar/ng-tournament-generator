import { MatchResult } from "./matchResult";

export interface IMatch {
  id: number;
  homeTeamId: number;
  homeTeamName: string;
  homeTeamGoalScore: number;
  homeTeamResult: MatchResult;

  awayTeamId: number;
  awayTeamName: string;
  awayTeamGoalScore: number;
  awayTeamResult: MatchResult;

  matchFinalScore: string;
}
