export interface ITeam extends IDropdownBase{
    id: number;
    name: string;
    played: number;
    wins: number;
    draws: number;
    losses: number;
    scored: number;
    against: number;
    difference: number;
    points: number;
}